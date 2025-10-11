import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeftIcon, LoadingIcon, RefreshIcon, TrophyIcon, LightBulbIcon, XCircleIcon, QuestionMarkCircleIcon } from './icons';
import { generateWritingPart3Task, evaluateWritingPart3 } from '../services/geminiService';
import { WritingPart3Task, WritingPart3EvaluationResult, User } from '../types';
import Timer from './Timer';
import { addTestResult } from '../services/progressService';

const TOTAL_TIME = 30 * 60; // 30 minutes in seconds

type PracticeState = 'idle' | 'generating' | 'practicing' | 'evaluating' | 'results';

interface WritingPart3ScreenProps {
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
                <h3 className="text-lg font-bold">Pro Tip: Write an Opinion Essay</h3>
                <p className="text-sm mt-1">Plan your essay before writing. Your essay should have a clear introduction (stating your opinion), body paragraphs (with reasons and examples), and a conclusion. Aim for at least 300 words to fully develop your ideas.</p>
            </div>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700" aria-label="Close hint">
            <XCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </button>
    </div>
);


const WritingPart3Screen: React.FC<WritingPart3ScreenProps> = ({ onBack, currentUser }) => {
    const [practiceState, setPracticeState] = useState<PracticeState>('idle');
    const [task, setTask] = useState<WritingPart3Task | null>(null);
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [evaluationResult, setEvaluationResult] = useState<WritingPart3EvaluationResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showHint, setShowHint] = useState(true);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const wordCount = userAnswer.trim().split(/\s+/).filter(Boolean).length;

    const handleSubmitPractice = useCallback(async () => {
        if (!task) return;
        setPracticeState('evaluating');
        try {
            const result = await evaluateWritingPart3(task.question, userAnswer);
            if (result) {
                setEvaluationResult(result);
                if (currentUser) {
                    addTestResult(currentUser.username, 'writing', {
                        id: `writing-p3-${Date.now()}`,
                        title: 'Writing Part 3',
                        score: result.taskScore,
                        total: 5,
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
    }, [task, userAnswer, currentUser]);

    const handleStart = async () => {
        setPracticeState('generating');
        setError(null);
        setEvaluationResult(null);
        setShowHint(true);
        try {
            const generatedTask = await generateWritingPart3Task();
            if (generatedTask) {
                setTask(generatedTask);
                setUserAnswer('');
                setPracticeState('practicing');
            } else {
                throw new Error("Failed to generate a task.");
            }
        } catch (err) {
            console.error(err);
            setError("Could not generate the practice test. Please try again.");
            setPracticeState('idle');
        }
    };

    useEffect(() => {
        if (practiceState === 'practicing' && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [practiceState]);

    const handleReset = () => {
        setPracticeState('idle');
        setTask(null);
        setUserAnswer('');
        setEvaluationResult(null);
        setError(null);
    };

    const renderIdle = () => (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Part 3: Write an opinion essay</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">You will be given a prompt and must write an opinion essay. You should write at least 300 words. You will have 30 minutes to complete the task.</p>
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
        if (!task) return null;

        return (
            <>
                {showHint && <HintBox onClose={() => setShowHint(false)} />}
                <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Question 8: Opinion Essay</h2>
                        <Timer initialTime={TOTAL_TIME} onTimeUp={handleSubmitPractice} />
                    </div>
                    <div className="mb-4 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg border dark:border-slate-600">
                        <h3 className="font-bold text-slate-800 dark:text-slate-200">Directions:</h3>
                        <p className="text-slate-700 dark:text-slate-300 mt-2">Read the question below. You have 30 minutes to plan, write, and revise your essay. Typically, an effective response will contain a minimum of 300 words.</p>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 mt-4">{task.question}</p>
                    </div>
                    <div>
                        <textarea
                            ref={textareaRef}
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder="Write your essay here..."
                            className="w-full h-96 p-4 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 dark:text-white"
                        />
                         <div className="flex justify-between items-center mt-2">
                            <p className={`text-sm ${wordCount < 300 ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'} font-semibold`}>Word count: {wordCount}</p>
                            <button onClick={handleSubmitPractice} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                                Submit Essay
                            </button>
                         </div>
                    </div>
                </div>
            </>
        );
    };

    const FeedbackSection: React.FC<{title: string; content: {english: string; vietnamese: string}}> = ({title, content}) => (
        <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">{title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">English Feedback</p>
                    <p className="text-slate-700 dark:text-slate-300">{content.english}</p>
                </div>
                 <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Nhận xét Tiếng Việt</p>
                    <p className="text-slate-700 dark:text-slate-300 italic">{content.vietnamese}</p>
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
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-4">Evaluation Results</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Task Score</p>
                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{evaluationResult.taskScore} / 5</p>
                    </div>
                     <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Est. Score Band</p>
                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{evaluationResult.estimatedScoreBand}</p>
                    </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Detailed Feedback</h3>
                <div className="space-y-4 mb-8">
                   <FeedbackSection title="Overall Summary / Tóm tắt chung" content={evaluationResult.overallSummary} />
                   <FeedbackSection title="Idea Development / Phát triển ý tưởng" content={evaluationResult.ideaDevelopment} />
                   <FeedbackSection title="Organization / Tổ chức bài viết" content={evaluationResult.organization} />
                   <FeedbackSection title="Grammar & Syntax / Ngữ pháp & Cú pháp" content={evaluationResult.grammarAndSyntax} />
                   <FeedbackSection title="Vocabulary / Từ vựng" content={evaluationResult.vocabulary} />
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
            case 'generating': return renderLoading("Generating Your Prompt...", "The AI is creating an essay question. Please wait.");
            case 'practicing': return renderPractice();
            case 'evaluating': return renderLoading("Evaluating Your Essay...", "The AI is analyzing your writing. This may take a moment.");
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

export default WritingPart3Screen;
