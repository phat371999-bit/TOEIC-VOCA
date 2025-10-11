import React, { useState, useEffect, useCallback } from 'react';
import { generateSentenceForTranslation, evaluateTranslation } from '../services/geminiService';
import { TranslationEvaluationResult } from '../types';
import { LoadingIcon, ArrowLeftIcon, SparklesIcon, RefreshIcon } from './icons';
import AudioPlayer from './AudioPlayer';

interface ListeningTranslationScreenProps {
    onBack: () => void;
}

type ExerciseState = 'generating' | 'answering' | 'evaluating' | 'result';

const ListeningTranslationScreen: React.FC<ListeningTranslationScreenProps> = ({ onBack }) => {
    const [exerciseState, setExerciseState] = useState<ExerciseState>('generating');
    const [error, setError] = useState<string | null>(null);
    const [originalSentence, setOriginalSentence] = useState<string>('');
    const [userTranslation, setUserTranslation] = useState<string>('');
    const [evaluation, setEvaluation] = useState<TranslationEvaluationResult | null>(null);

    const generateNewExercise = useCallback(async () => {
        setExerciseState('generating');
        setError(null);
        setUserTranslation('');
        setEvaluation(null);
        try {
            const sentence = await generateSentenceForTranslation();
            if (sentence) {
                setOriginalSentence(sentence);
                setExerciseState('answering');
            } else {
                throw new Error("Failed to generate a sentence.");
            }
        } catch (err) {
            console.error(err);
            setError("Could not generate a new exercise. Please check your connection and API key.");
            setExerciseState('answering'); // Go to a state where user can try again
        }
    }, []);

    useEffect(() => {
        generateNewExercise();
    }, [generateNewExercise]);
    
    const handleSubmit = async () => {
        if (!userTranslation.trim()) {
            setError("Please enter your translation.");
            return;
        }
        setExerciseState('evaluating');
        setError(null);
        try {
            const result = await evaluateTranslation(originalSentence, userTranslation);
            if (result) {
                setEvaluation(result);
                setExerciseState('result');
            } else {
                throw new Error("Received an invalid evaluation from the AI.");
            }
        } catch (err) {
             console.error(err);
             setError("Sorry, an error occurred during evaluation. Please try again.");
             setExerciseState('answering');
        }
    };

    const renderGenerating = () => (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
            <LoadingIcon className="h-12 w-12 text-blue-600 animate-spin" />
            <h3 className="mt-6 text-xl font-semibold text-slate-700 dark:text-slate-200">Generating New Exercise...</h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400">The AI is creating a sentence for you.</p>
        </div>
    );
    
    const renderAnswering = () => (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center mb-2">Listen and Translate</h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-6">Listen to the English sentence, then type your Vietnamese translation below.</p>
            
            <div className="mb-6">
                <AudioPlayer audioScript={originalSentence} />
            </div>

            <textarea
                value={userTranslation}
                onChange={(e) => setUserTranslation(e.target.value)}
                className="w-full h-40 p-4 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700 dark:text-white"
                placeholder="Nhập bản dịch tiếng Việt của bạn ở đây..."
                disabled={exerciseState === 'evaluating'}
            />
            
            {error && <p className="text-red-500 text-center mt-4 font-semibold">{error}</p>}

            <div className="mt-6">
                <button
                    onClick={handleSubmit}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                    disabled={exerciseState === 'evaluating'}
                >
                    {exerciseState === 'evaluating' ? (
                        <>
                            <LoadingIcon className="h-6 w-6 animate-spin" />
                            <span>Evaluating...</span>
                        </>
                    ) : (
                        "Submit for AI Evaluation"
                    )}
                </button>
            </div>
        </div>
    );

    const renderResult = () => {
        if (!evaluation) return null;

        const getScoreColor = (score: number) => {
            if (score >= 90) return 'text-green-500';
            if (score >= 70) return 'text-blue-500';
            if (score >= 50) return 'text-yellow-500';
            return 'text-red-500';
        };

        return (
             <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 text-center mb-6">Kết quả đánh giá</h2>
                <div className="text-center bg-slate-100 dark:bg-slate-700/50 p-6 rounded-lg mb-6">
                    <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">Điểm của bạn</p>
                    <p className={`text-7xl font-bold my-2 ${getScoreColor(evaluation.score)}`}>{evaluation.score}%</p>
                </div>
                
                <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg mb-6">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Nhận xét từ AI:</h4>
                    <p className="text-slate-600 dark:text-slate-300 mt-1 italic">{evaluation.feedback_vi}</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-slate-500 dark:text-slate-400">Câu gốc (Tiếng Anh):</h4>
                        <p className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-md text-slate-800 dark:text-slate-200">{originalSentence}</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-slate-500 dark:text-slate-400">Bản dịch của bạn (Tiếng Việt):</h4>
                        <p className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-md text-slate-800 dark:text-slate-200">{userTranslation}</p>
                    </div>
                </div>

                <div className="mt-8">
                     <button
                        onClick={generateNewExercise}
                        className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <RefreshIcon className="h-6 w-6" />
                        Next Exercise
                    </button>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        switch (exerciseState) {
            case 'generating':
                return renderGenerating();
            case 'answering':
            case 'evaluating':
                return renderAnswering();
            case 'result':
                return renderResult();
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <button onClick={onBack} className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Practice Hub
                </button>
                {renderContent()}
            </div>
        </div>
    );
};

export default ListeningTranslationScreen;
