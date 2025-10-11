import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeftIcon, LoadingIcon, RefreshIcon, TrophyIcon, LightBulbIcon, XCircleIcon, QuestionMarkCircleIcon } from './icons';
// FIX: Corrected import for generateWritingPart1Tasks and evaluateWritingPart1
import { generateWritingPart1Tasks, evaluateWritingPart1 } from '../services/geminiService';
import { WritingPart1Task, WritingPart1EvaluationResult, WritingPart1SingleEvaluation, User } from '../types';
import Timer from './Timer';
import { addTestResult } from '../services/progressService';

const TOTAL_TIME = 8 * 60; // 8 minutes in seconds

type PracticeState = 'idle' | 'generating' | 'practicing' | 'evaluating' | 'results';

interface WritingPart1ScreenProps {
    onBack: () => void;
    currentUser: User;
}

const HintBox: React.FC<{onClose: () => void}> = ({onClose}) => (
    <div className="bg-blue-50 dark:bg-slate-800/50 border-l-4 border-blue-500 text-blue-800 dark:text-blue-300 p-4 rounded-r-lg mb-6 relative">
        <div className="flex">
            <div className="flex-shrink-0">
                <LightBulbIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-3">
                <h3 className="text-lg font-bold">Pro Tip: Write a Sentence</h3>
                <p className="text-sm mt-1">Make sure your sentence is grammatically correct and uses <strong>both</strong> keywords. The sentence should clearly describe an action or scene in the picture. Aim for a complete sentence, not just a phrase.</p>
            </div>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700" aria-label="Close hint">
            <XCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </button>
    </div>
);

const WritingPart1Screen: React.FC<WritingPart1ScreenProps> = ({ onBack, currentUser }) => {
    const [practiceState, setPracticeState] = useState<PracticeState>('idle');
    const [tasks, setTasks] = useState<WritingPart1Task[]>([]);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [evaluationResult, setEvaluationResult] = useState<WritingPart1EvaluationResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showHint, setShowHint] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmitPractice = useCallback(async () => {
        setPracticeState('evaluating');
        try {
            const result = await evaluateWritingPart1(tasks, userAnswers);
            if (result) {
                setEvaluationResult(result);
                if (currentUser) {
                    addTestResult(currentUser.username, 'writing', {
                        id: `writing-p1-${Date.now()}`,
                        title: 'Writing Part 1',
                        score: result.totalRawScore,
                        total: 15,
                        date: Date.now()
                    });
                }
                setPracticeState('results');
            } else {
                throw new Error("Received invalid evaluation from the server.");
            }
        } catch (err) {
            console.error(err);
            setError("Sorry, an error occurred during evaluation. Please try again.");
            setPracticeState('idle'); // Go back to start
        }
    }, [tasks, userAnswers, currentUser]);

    const handleStart = async () => {
        setPracticeState('generating');
        setError(null);
        setEvaluationResult(null);
        setShowHint(true);
        try {
            const generatedTasks = await generateWritingPart1Tasks();
            if (generatedTasks && generatedTasks.length > 0) {
                setTasks(generatedTasks.slice(0, 5)); // Ensure only 5 tasks
                setUserAnswers(new Array(5).fill(''));
                setCurrentQuestionIndex(0);
                setPracticeState('practicing');
            } else {
                throw new Error("Failed to generate a complete set of tasks.");
            }
        } catch (err) {
            console.error(err);
            setError("Could not generate the practice test. Please try again.");
            setPracticeState('idle');
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < 4) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            handleSubmitPractice();
        }
    };
    
    useEffect(() => {
        if (practiceState === 'practicing' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentQuestionIndex, practiceState]);

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = e.target.value;
        setUserAnswers(newAnswers);
    };

    const handleReset = () => {
        setPracticeState('idle');
        setTasks([]);
        setUserAnswers([]);
        setCurrentQuestionIndex(0);
        setEvaluationResult(null);
        setError(null);
    };

    const renderIdle = () => (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Part 1: Write a sentence based on a picture</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">You will be shown 5 pictures. For each picture, you must write one sentence using two given words. You will have 8 minutes for the entire task.</p>
            {error && <p className="text-red-500 mb-4 font-semibold">{error}</p>}
            <button
                onClick={handleStart}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 py-4 px-8 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors"
            >
                Start Practice
            </button>
        </div>
    );

    const renderLoading = (title: string, message: string) => (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
            <LoadingIcon className="h-12 w-12 text-blue-600 mx-auto animate-spin" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-6">{title}</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">{message}</p>
        </div>
    );

    const renderPractice = () => {
        const currentTask = tasks[currentQuestionIndex];
        if (!currentTask) return null;

        return (
            <>
                {showHint && <HintBox onClose={() => setShowHint(false)} />}
                <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Question {currentQuestionIndex + 1} of 5</h2>
                        <Timer initialTime={TOTAL_TIME} onTimeUp={handleSubmitPractice} />
                    </div>
                    <div className="mb-4 rounded-lg overflow-hidden border dark:border-slate-700">
                        <img src={`data:image/jpeg;base64,${currentTask.picture}`} alt="TOEIC Writing Practice" className="w-full h-auto object-contain" />
                    </div>
                    <div className="text-center mb-4 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                            Required words: <span className="text-blue-600 dark:text-blue-400">{currentTask.keywords[0]}</span> / <span className="text-blue-600 dark:text-blue-400">{currentTask.keywords[1]}</span>
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            ref={inputRef}
                            type="text"
                            value={userAnswers[currentQuestionIndex]}
                            onChange={handleAnswerChange}
                            placeholder="Type your sentence here..."
                            className="flex-grow w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 dark:text-white"
                        />
                        <button onClick={handleNextQuestion} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                            {currentQuestionIndex < 4 ? "Next" : "Submit"}
                        </button>
                    </div>
                </div>
            </>
        );
    };

    const FeedbackItem: React.FC<{
        task: WritingPart1Task,
        userSentence: string,
        feedback: WritingPart1SingleEvaluation,
        questionNumber: number
    }> = ({ task, userSentence, feedback, questionNumber }) => (
        <div className="border-t dark:border-slate-700 py-6">
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">Question {questionNumber} (Score: {feedback.score}/3)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <img src={`data:image/jpeg;base64,${task.picture}`} alt={`Question ${questionNumber}`} className="rounded-lg border dark:border-slate-700" />
                <div className="space-y-3">
                    <p><span className="font-semibold">Keywords:</span> {task.keywords.join(' / ')}</p>
                    <p><span className="font-semibold">Your Sentence:</span> {userSentence || <span className="italic text-slate-500">No answer provided.</span>}</p>
                </div>
            </div>
            <div className="space-y-3">
                <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                    <h5 className="font-semibold text-slate-700 dark:text-slate-300">Grammar Feedback (Ngữ pháp):</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{feedback.grammar.english}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 italic">{feedback.grammar.vietnamese}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                    <h5 className="font-semibold text-slate-700 dark:text-slate-300">Relevance Feedback (Sự liên quan):</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{feedback.relevance.english}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 italic">{feedback.relevance.vietnamese}</p>
                </div>
            </div>
        </div>
    );

    const renderResults = () => {
        if (!evaluationResult) return null;
        return (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="text-center border-b dark:border-slate-600 pb-6 mb-6">
                    <TrophyIcon className="h-16 w-16 text-yellow-500 mx-auto" />
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-4">Evaluation Results / Kết quả Đánh giá</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Raw Score / Tổng điểm thô</p>
                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{evaluationResult.totalRawScore} / 15</p>
                    </div>
                     <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Est. Score Band / Dải điểm ước tính</p>
                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{evaluationResult.estimatedScoreBand}</p>
                    </div>
                </div>
                
                <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg mb-6">
                    <h5 className="font-semibold text-slate-700 dark:text-slate-300">Overall Summary / Tóm tắt chung:</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{evaluationResult.overallSummary.english}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 italic">{evaluationResult.overallSummary.vietnamese}</p>
                </div>

                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Detailed Feedback</h3>
                <div className="space-y-4 mb-8">
                    {evaluationResult.questionFeedback.map((feedback, index) => (
                        <FeedbackItem
                            key={index}
                            task={tasks[index]}
                            userSentence={userAnswers[index]}
                            feedback={feedback}
                            questionNumber={index + 1}
                        />
                    ))}
                </div>
                
                <button onClick={handleReset} className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors">
                    <RefreshIcon className="h-6 w-6" />
                    Practice Again
                </button>
            </div>
        );
    };

    const renderContent = () => {
        switch (practiceState) {
            case 'idle':
                return renderIdle();
            case 'generating':
                return renderLoading("Generating Your Test...", "The AI is creating 5 unique pictures and keyword pairs. Please wait.");
            case 'practicing':
                return renderPractice();
            case 'evaluating':
                return renderLoading("Evaluating Your Sentences...", "The AI is analyzing your grammar and relevance for all 5 questions.");
            case 'results':
                return renderResults();
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {!showHint && practiceState === 'practicing' && (
                    <button onClick={() => setShowHint(true)} className="fixed top-24 right-4 z-50 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700" aria-label="Show hint">
                        <QuestionMarkCircleIcon className="h-6 w-6" />
                    </button>
                )}
                <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Writing Practice
                </button>
                {renderContent()}
            </div>
        </div>
    );
};

export default WritingPart1Screen;
