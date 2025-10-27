import React, { useState, useEffect, useCallback, useRef } from 'react';
import { WordPronunciationEvaluationResult } from '../types';
import { generateRandomWordsWithPhonetics, evaluateWordPronunciation } from '../services/geminiService';
import { ArrowLeftIcon, LoadingIcon, MicrophoneIcon, RefreshIcon, StopIcon, TrophyIcon } from './icons';

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

type PracticeState = 'loading' | 'ready' | 'recording' | 'evaluating' | 'results';
const TURN_LENGTH = 5;
const RECORDING_DURATION = 5000; // 5 seconds

const PronunciationPracticeScreen: React.FC<{ mode: 'word', onBack: () => void }> = ({ onBack }) => {
    const [practiceState, setPracticeState] = useState<PracticeState>('loading');
    const [words, setWords] = useState<{ word: string, phonetic: string }[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [evaluations, setEvaluations] = useState<WordPronunciationEvaluationResult[]>([]);
    const [error, setError] = useState<string | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioStreamRef = useRef<MediaStream | null>(null);
    const recordingTimeoutRef = useRef<number | null>(null);

    const cleanup = useCallback(() => {
        if (recordingTimeoutRef.current) {
            clearTimeout(recordingTimeoutRef.current);
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        if (audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach(track => track.stop());
            audioStreamRef.current = null;
        }
    }, []);

    const startNewTurn = useCallback(async () => {
        setPracticeState('loading');
        setError(null);
        setCurrentIndex(0);
        setEvaluations([]);
        try {
            const generatedWords = await generateRandomWordsWithPhonetics(TURN_LENGTH);
            if (generatedWords && generatedWords.length === TURN_LENGTH) {
                setWords(generatedWords);
                setPracticeState('ready');
            } else {
                throw new Error("Failed to generate a full set of words.");
            }
        } catch (err) {
            console.error(err);
            setError("Could not start a new practice turn. Please try again.");
            setPracticeState('ready');
        }
    }, []);

    useEffect(() => {
        startNewTurn();
        return cleanup;
    }, [startNewTurn, cleanup]);

    const handleStopRecording = useCallback(() => {
        if (recordingTimeoutRef.current) {
            clearTimeout(recordingTimeoutRef.current);
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
    }, []);

    const handleStartRecording = useCallback(async () => {
        setError(null);
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setError("Microphone access is not supported by your browser.");
            return;
        }

        try {
            audioStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
            setPracticeState('recording');
            const mediaRecorder = new MediaRecorder(audioStreamRef.current);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                setPracticeState('evaluating');
                const mimeType = mediaRecorder.mimeType;
                const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });

                if (audioBlob.size === 0) {
                    setError("No audio was recorded. Please try again.");
                    setPracticeState('ready');
                    return;
                }

                try {
                    const audioBase64 = await blobToBase64(audioBlob);
                    const currentWordData = words[currentIndex];
                    const result = await evaluateWordPronunciation(currentWordData.word, currentWordData.phonetic, audioBase64, mimeType);
                    
                    if (result) {
                        setEvaluations(prev => [...prev, result]);
                        if (currentIndex + 1 < TURN_LENGTH) {
                            setCurrentIndex(prev => prev + 1);
                            setPracticeState('ready');
                        } else {
                            setPracticeState('results');
                        }
                    } else {
                        throw new Error("AI evaluation returned an invalid result.");
                    }
                } catch (apiError) {
                    console.error("Evaluation API error:", apiError);
                    setError("Sorry, we couldn't evaluate your speech. Please try again.");
                    setPracticeState('ready');
                } finally {
                    cleanup();
                }
            };
            
            mediaRecorder.start();
            recordingTimeoutRef.current = window.setTimeout(handleStopRecording, RECORDING_DURATION);

        } catch (err) {
            console.error("Microphone access denied:", err);
            setError("Microphone access is required. Please enable it in your browser settings.");
            setPracticeState('ready');
        }
    }, [words, currentIndex, cleanup, handleStopRecording]);

    const renderLoading = () => (
        <div className="flex flex-col items-center justify-center p-12">
            <LoadingIcon className="h-12 w-12 text-blue-600 animate-spin" />
            <h3 className="mt-6 text-xl font-semibold text-slate-700 dark:text-slate-200">Generating Words...</h3>
        </div>
    );
    
    const renderPractice = () => {
        if (words.length === 0) return renderLoading();
        const currentWord = words[currentIndex];

        return (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
                <p className="text-slate-500 dark:text-slate-400 font-semibold mb-2">Word {currentIndex + 1} of {TURN_LENGTH}</p>
                <div className="p-8 bg-slate-100 dark:bg-slate-700/50 rounded-lg min-h-[10rem] flex flex-col justify-center">
                    <p className="text-4xl md:text-5xl font-mono text-slate-800 dark:text-slate-200 tracking-wider">/{currentWord.phonetic}/</p>
                </div>
                {error && <p className="text-red-500 font-semibold mt-4">{error}</p>}
                <div className="mt-8 flex flex-col items-center">
                    {practiceState !== 'recording' ? (
                        <button onClick={handleStartRecording} className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg hover:bg-red-600 transition-colors" aria-label="Start recording">
                            <MicrophoneIcon className="h-10 w-10 text-white" />
                        </button>
                    ) : (
                        <div className="flex flex-col items-center">
                            <button disabled className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse cursor-not-allowed">
                                <MicrophoneIcon className="h-10 w-10 text-white" />
                            </button>
                            <p className="text-red-500 font-semibold mt-2 animate-pulse">Recording...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };
    
    const renderEvaluating = () => (
         <div className="flex flex-col items-center justify-center p-12">
            <LoadingIcon className="h-12 w-12 text-blue-600 animate-spin" />
            <h3 className="mt-6 text-xl font-semibold text-slate-700 dark:text-slate-200">Evaluating...</h3>
        </div>
    );

    const renderResults = () => {
        const getPhonemeColor = (score: number) => {
            if (score >= 0.85) return 'text-green-600 dark:text-green-400 font-bold';
            if (score >= 0.6) return 'text-yellow-500 dark:text-yellow-400 font-bold';
            return 'text-red-600 dark:text-red-400 font-bold';
        };

        return (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                 <div className="text-center border-b dark:border-slate-600 pb-6 mb-6">
                    <TrophyIcon className="h-16 w-16 text-yellow-500 mx-auto" />
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-4">Kết quả luyện tập</h2>
                </div>

                <div className="space-y-6">
                    {evaluations.map((result, index) => (
                        <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-600">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{result.word}</h3>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result.overallScore}%</p>
                            </div>
                            <p className="font-mono text-xl mt-2 tracking-wider">
                                {result.phonemeEvaluations.map((p, i) => (
                                    <span key={i} className={getPhonemeColor(p.accuracyScore)}>{p.phoneme}</span>
                                ))}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 italic"><strong>Góp ý:</strong> {result.feedback_vi}</p>
                        </div>
                    ))}
                </div>
                
                 <button
                    onClick={startNewTurn}
                    className="w-full flex items-center justify-center gap-3 mt-8 py-4 px-6 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <RefreshIcon className="h-6 w-6" />
                    Practice Again
                </button>
            </div>
        );
    };

    const renderContent = () => {
        switch (practiceState) {
            case 'loading': return renderLoading();
            case 'ready':
            case 'recording': return renderPractice();
            case 'evaluating': return renderEvaluating();
            case 'results': return renderResults();
            default: return null;
        }
    };
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                 <button onClick={onBack} className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Pronunciation Hub
                </button>
                {renderContent()}
            </div>
        </div>
    )
};

export default PronunciationPracticeScreen;