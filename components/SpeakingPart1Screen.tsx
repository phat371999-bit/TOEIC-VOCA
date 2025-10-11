import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeftIcon, HeadphoneIcon, LoadingIcon, RefreshIcon, SparklesIcon, TrophyIcon, PauseIcon, PlayIcon } from './icons';
import { evaluateSpeakingPart1, generateSpeakingPart1Text } from '../services/geminiService';
import { SpeakingPart1EvaluationResult } from '../types';

const PREP_TIME = 45;
const READ_TIME = 45;

const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                const base64Data = reader.result.split(',')[1];
                resolve(base64Data);
            } else {
                reject(new Error("Failed to read blob as a base64 string."));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

const defaultText = "Attention passengers on flight 2B to London. The flight is now boarding at gate 12. Please have your boarding pass and identification ready for inspection. We'd like to remind you that carry-on luggage is limited to one small bag. All other baggage must be checked before boarding. We wish you a pleasant flight.";

type PracticeState = 'idle' | 'preparing' | 'recording' | 'evaluating' | 'results';

interface SpeakingPart1ScreenProps {
  onBack: () => void;
}

const SpeakingPart1Screen: React.FC<SpeakingPart1ScreenProps> = ({ onBack }) => {
    const [practiceState, setPracticeState] = useState<PracticeState>('idle');
    const [textToRead, setTextToRead] = useState(defaultText);
    const [timer, setTimer] = useState(PREP_TIME);
    const [results, setResults] = useState<SpeakingPart1EvaluationResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isGeneratingText, setIsGeneratingText] = useState(false);
    const [isTimerPaused, setIsTimerPaused] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerIntervalRef = useRef<number | null>(null);
    const audioStreamRef = useRef<MediaStream | null>(null);
    const onCompleteRef = useRef<(() => void) | null>(null);

    const cleanup = useCallback(() => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        if (audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach(track => track.stop());
            audioStreamRef.current = null;
        }
        onCompleteRef.current = null;
    }, []);

    useEffect(() => {
        return () => {
            cleanup();
        };
    }, [cleanup]);

    const startTimer = (duration: number, onComplete: () => void) => {
        setTimer(duration);
        onCompleteRef.current = onComplete;
        setIsTimerPaused(false);
    };

    useEffect(() => {
        if (isTimerPaused || (practiceState !== 'preparing' && practiceState !== 'recording')) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            return;
        }
    
        if (timer <= 0) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            if (onCompleteRef.current) {
                const callback = onCompleteRef.current;
                onCompleteRef.current = null;
                callback();
            }
            return;
        }
    
        timerIntervalRef.current = window.setInterval(() => {
            setTimer(t => t - 1);
        }, 1000);
    
        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        };
    }, [timer, isTimerPaused, practiceState]);

    const handleStartPractice = async () => {
        if (textToRead.trim().length === 0) {
            setError("Please enter some text to practice.");
            return;
        }
        setError(null);
        setResults(null);
        setPracticeState('preparing');
        startTimer(PREP_TIME, async () => {
            try {
                audioStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
                setPracticeState('recording');
            } catch (err) {
                console.error("Microphone access denied:", err);
                setError("Microphone access is required for this practice. Please enable it in your browser settings.");
                setPracticeState('idle');
            }
        });
    };
    
    useEffect(() => {
        if (practiceState === 'recording' && audioStreamRef.current) {
            const mediaRecorder = new MediaRecorder(audioStreamRef.current);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                const mimeType = mediaRecorder.mimeType;
                const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
                
                if (audioBlob.size === 0) {
                    setError("No audio was recorded. Please check your microphone and try again.");
                    setPracticeState('idle');
                    return;
                }

                setPracticeState('evaluating');
                try {
                    const audioBase64 = await blobToBase64(audioBlob);
                    const evaluationResult = await evaluateSpeakingPart1(textToRead, audioBase64, mimeType);
                    if (evaluationResult) {
                        setResults(evaluationResult);
                        setPracticeState('results');
                    } else {
                        throw new Error("The AI returned an invalid evaluation.");
                    }
                } catch (apiError) {
                    console.error("Evaluation failed:", apiError);
                    setError("Sorry, we couldn't evaluate your speech. Please try again.");
                    setPracticeState('idle');
                } finally {
                    cleanup();
                }
            };

            mediaRecorder.start();
            startTimer(READ_TIME, () => {
                if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                    mediaRecorderRef.current.stop();
                }
            });
        }
    }, [practiceState, textToRead, cleanup]);

    const handleReset = () => {
        cleanup();
        setPracticeState('idle');
        setResults(null);
        setError(null);
        setTimer(PREP_TIME);
    };

    const handleGenerateText = useCallback(async () => {
        setIsGeneratingText(true);
        setError(null);
        try {
            const generatedText = await generateSpeakingPart1Text();
            if (generatedText) {
                setTextToRead(generatedText);
            } else {
                setError("Could not generate text. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred while generating text. Please try again later.");
        } finally {
            setIsGeneratingText(false);
        }
    }, []);

    const handlePause = () => setIsTimerPaused(true);
    const handleResume = () => setIsTimerPaused(false);
    const handleResetTimer = () => {
        setIsTimerPaused(true);
        if (practiceState === 'preparing') {
            setTimer(PREP_TIME);
        } else if (practiceState === 'recording') {
            setTimer(READ_TIME);
        }
    };

    const renderIdle = () => (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 text-center mb-4">Part 1: Read a text aloud</h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-6">Enter or paste the text you want to practice reading below. You will have 45 seconds to prepare, and then 45 seconds to read the text aloud.</p>
            
            <textarea
                value={textToRead}
                onChange={(e) => setTextToRead(e.target.value)}
                className="w-full h-40 p-4 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700 dark:text-white mb-4"
                placeholder="Enter text here..."
            />
            {error && <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>}
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={handleGenerateText}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed"
                    disabled={isGeneratingText}
                >
                    {isGeneratingText ? (
                        <LoadingIcon className="h-5 w-5 animate-spin" />
                    ) : (
                        <SparklesIcon className="h-5 w-5" />
                    )}
                    <span>{isGeneratingText ? 'Generating...' : 'AI Generate'}</span>
                </button>
                <button
                    onClick={handleStartPractice}
                    className="w-full flex-grow flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                    disabled={!textToRead.trim() || isGeneratingText}
                >
                    <HeadphoneIcon className="h-6 w-6" />
                    Start Practice
                </button>
            </div>
        </div>
    );
    
    const renderPractice = () => (
         <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
             <div className="flex justify-between items-center mb-4">
                 <div className={`px-4 py-1 rounded-full font-semibold text-white ${practiceState === 'preparing' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                    {practiceState === 'preparing' ? 'Preparation Time' : 'Recording...'}
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        { isTimerPaused ? (
                            <button onClick={handleResume} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600" aria-label="Resume timer">
                                <PlayIcon className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                            </button>
                        ) : (
                            <button onClick={handlePause} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600" aria-label="Pause timer">
                                <PauseIcon className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                            </button>
                        )}
                        <button onClick={handleResetTimer} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600" aria-label="Reset timer">
                            <RefreshIcon className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                        </button>
                    </div>
                    <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{timer}s</div>
                </div>
             </div>

             {practiceState === 'recording' && (
                <div className="flex justify-center items-center gap-2 mb-4 text-red-500 animate-pulse">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <span className="font-semibold">RECORDING</span>
                </div>
             )}

             <div className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-600">
                <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">{textToRead}</p>
             </div>
             <div className="mt-6 text-center">
                 <button onClick={handleReset} className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-600 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500">
                    Cancel
                 </button>
             </div>
        </div>
    );

    const renderEvaluating = () => (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
            <LoadingIcon className="h-12 w-12 text-blue-600 mx-auto animate-spin" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-6">Evaluating your speech...</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">The AI is analyzing your pronunciation, intonation, and stress. This may take a moment.</p>
        </div>
    );

    const FeedbackSection: React.FC<{title: string; summary: string; examples: string[]}> = ({title, summary, examples}) => (
        <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">{title}</h4>
            <p className="text-slate-600 dark:text-slate-300 mt-2">{summary}</p>
            {examples.length > 0 && (
                <div className="mt-3">
                    <h5 className="font-semibold text-sm text-slate-500 dark:text-slate-400">Examples:</h5>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 text-sm mt-1">
                        {examples.map((ex, i) => <li key={i}>{ex}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );

    const renderResults = () => {
        if (!results) return renderEvaluating(); // Should not happen, but a good fallback
        return (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="text-center border-b dark:border-slate-600 pb-6 mb-6">
                    <TrophyIcon className="h-16 w-16 text-yellow-500 mx-auto" />
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-4">Evaluation Results</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Task Score</p>
                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{results.taskScore} / 3</p>
                    </div>
                     <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Est. Score Band</p>
                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{results.estimatedScoreBand}</p>
                    </div>
                     <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Proficiency Level</p>
                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{results.proficiencyLevel}</p>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Detailed Feedback</h3>
                <div className="space-y-4 mb-8">
                    <FeedbackSection title="Pronunciation" {...results.pronunciationFeedback} />
                    <FeedbackSection title="Intonation & Stress" {...results.intonationAndStressFeedback} />
                </div>
                
                <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <RefreshIcon className="h-6 w-6" />
                    Practice Another Text
                </button>
            </div>
        );
    }
    
    const renderContent = () => {
        switch (practiceState) {
            case 'idle':
                return renderIdle();
            case 'preparing':
            case 'recording':
                return renderPractice();
            case 'evaluating':
                return renderEvaluating();
            case 'results':
                return renderResults();
            default:
                return null;
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors disabled:opacity-50" disabled={practiceState !== 'idle'}>
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Speaking Hub
                </button>
                {renderContent()}
            </div>
        </div>
    );
};

export default SpeakingPart1Screen;