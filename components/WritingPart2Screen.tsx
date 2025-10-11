import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeftIcon, LoadingIcon, RefreshIcon, TrophyIcon, LightBulbIcon, XCircleIcon, QuestionMarkCircleIcon } from './icons';
// FIX: Corrected import for generateWritingPart2Tasks and evaluateWritingPart2
import { generateWritingPart2Tasks, evaluateWritingPart2 } from '../services/geminiService';
import { WritingPart2Task, WritingPart2EvaluationResult, WritingPart2SingleEvaluation, User } from '../types';
import Timer from './Timer';
import { addTestResult } from '../services/progressService';

const TOTAL_TIME = 20 * 60; // 20 minutes in seconds

type PracticeState = 'idle' | 'generating' | 'practicing' | 'evaluating' | 'results';

interface WritingPart2ScreenProps {
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
                <h3 className="text-lg font-bold">Pro Tip: Respond to an Email</h3>
                <p className="text-sm mt-1">Make sure to address all parts of the original email. Structure your response like a real email with a greeting, body, and closing. Use a professional and polite tone throughout your writing.</p>
            </div>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700" aria-label="Close hint">
            <XCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </button>
    </div>
);

const WritingPart2Screen: React.FC<WritingPart2ScreenProps> = ({ onBack, currentUser }) => {
    const [practiceState, setPracticeState] = useState<PracticeState>('idle');
    const [tasks, setTasks] = useState<WritingPart2Task | null>(null);
    const [userAnswers, setUserAnswers] = useState<string[]>(['', '']);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 0 for Q6, 1 for Q7
    const [evaluationResult, setEvaluationResult] = useState<WritingPart2EvaluationResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showHint, setShowHint] = useState(true);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const wordCount = userAnswers[currentQuestionIndex]?.trim().split(/\s+/).filter(Boolean).length || 0;

    const handleSubmitPractice = useCallback(async () => {
        if (!tasks) return;
        setPracticeState('evaluating');
        try {
            const result = await evaluateWritingPart2(tasks, userAnswers);
            if (result) {
                setEvaluationResult(result);
                if (currentUser) {
                    addTestResult(currentUser.username, 'writing', {
                        id: `writing-p2-${Date.now()}`,
                        title: 'Writing Part 2',
                        score: result.totalRawScore,
                        total: 8,
                        date: Date.now()
                    });
                }
                setPracticeState('results');
            } else {
                throw new Error("Received invalid evaluation.");
            }
        } catch (err) {
            console.error(err);
            setError("Sorry, an error occurred during evaluation. Please try again.");
            setPracticeState('idle');
        }
    }, [tasks, userAnswers, currentUser]);

    const handleStart = async () => {
        setPracticeState('generating');
        setError(null);
        setEvaluationResult(null);
        setShowHint(true);
        try {
            const generatedTasks = await generateWritingPart2Tasks();
            if (generatedTasks) {
                setTasks(generatedTasks);
                setUserAnswers(['', '']);
                setCurrentQuestionIndex(0);
                setPracticeState('practicing');
            } else {
                throw new Error("Failed to generate tasks.");
            }
        } catch (err) {
            console.error(err);
            setError("Could not generate the practice test. Please try again.");
            setPracticeState('idle');
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex === 0) {
            setCurrentQuestionIndex(1);
        } else {
            handleSubmitPractice();
        }
    };
    
    useEffect(() => {
        if (practiceState === 'practicing' && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [currentQuestionIndex, practiceState]);

    const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = e.target.value;
        setUserAnswers(newAnswers);
    };

    const handleReset = () => {
        setPracticeState('idle');
        setTasks(null);
        setUserAnswers(['', '']);
        setCurrentQuestionIndex(0);
        setEvaluationResult(null);
        setError(null);
    };

    const renderIdle = () => (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Part 2: Respond to a Written Request</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">You will read 2 e-mails and write a response to each one. You will have a total of 20 minutes to read and answer both e-mails.</p>
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
        const currentTask = currentQuestionIndex === 0 ? tasks?.question6 : tasks?.question7;
        if (!currentTask) return null;

        return (
            <>
                {showHint && <HintBox onClose={() => setShowHint(false)} />}
                <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Question {currentQuestionIndex + 6} of 7</h2>
                        <Timer initialTime={TOTAL_TIME} onTimeUp={handleSubmitPractice} />
                    </div>
                    <div className="mb-4 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg border dark:border-slate-600">
                        <h3 className="font-bold text-slate-800 dark:text-slate-200">{currentTask.title}</h3>
                        <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap mt-2">{currentTask.requestText}</p>
                    </div>
                    <div>
                        <textarea
                            ref={textareaRef}
                            value={userAnswers[currentQuestionIndex]}
                            onChange={handleAnswerChange}
                            placeholder="Write your response here..."
                            className="w-full h-64 p-4 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 dark:text-white"
                        />
                         <div className="flex justify-between items-center mt-2">
                            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Word count: {wordCount}</p>
                            <button onClick={handleNextQuestion} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                                {currentQuestionIndex < 1 ? "Next Question" : "Submit"}
                            </button>
                         </div>
                    </div>
                </div>
            </>
        );
    };

    const FeedbackSection: React.FC<{
        title: string,
        feedback: WritingPart2SingleEvaluation,
    }> = ({ title, feedback }) => (
        <div className="border-t dark:border-slate-700 py-6">
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">{title} (Score: {feedback.score}/4)</h4>
            <div className="space-y-3">
                <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                    <h5 className="font-semibold text-slate-700 dark:text-slate-300">Completeness (Hoàn thành):</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{feedback.completeness.english}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 italic">{feedback.completeness.vietnamese}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                    <h5 className="font-semibold text-slate-700 dark:text-slate-300">Language Use (Sử dụng ngôn ngữ):</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{feedback.languageUse.english}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 italic">{feedback.languageUse.vietnamese}</p>
                </div>
                {feedback.organization && (
                    <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                        <h5 className="font-semibold text-slate-700 dark:text-slate-300">Organization (Tổ chức):</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{feedback.organization.english}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 italic">{feedback.organization.vietnamese}</p>
                    </div>
                )}
            </div>
        </div>
    );
    
     const renderResults = () => {
        if (!evaluationResult) return null;
        return (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="text-center border-b dark:border-slate-600 pb-6 mb-6">
                    <TrophyIcon className="h-16 w-16 text-yellow-500 mx-auto" />
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-4">Evaluation Results</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Raw Score</p>
                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{evaluationResult.totalRawScore} / 8</p>
                    </div>
                     <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Est. Score Band</p>
                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{evaluationResult.estimatedScoreBand}</p>
                    </div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg mb-6">
                    <h5 className="font-semibold text-slate-700 dark:text-slate-300">Overall Summary:</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{evaluationResult.overallSummary.english}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 italic">{evaluationResult.overallSummary.vietnamese}</p>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Detailed Feedback</h3>
                <div className="space-y-4 mb-8">
                    <FeedbackSection title="Question 6 Feedback" feedback={evaluationResult.question6Feedback} />
                    <FeedbackSection title="Question 7 Feedback" feedback={evaluationResult.question7Feedback} />
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
            case 'idle': return renderIdle();
            case 'generating': return renderLoading("Generating Your Test...", "The AI is creating 2 email prompts. Please wait.");
            case 'practicing': return renderPractice();
            case 'evaluating': return renderLoading("Evaluating Your Emails...", "The AI is analyzing your responses.");
            case 'results': return renderResults();
            default: return null;
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
                <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors disabled:opacity-50" disabled={practiceState !== 'idle'}>
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Writing Practice
                </button>
                {renderContent()}
            </div>
        </div>
    );
};

export default WritingPart2Screen;