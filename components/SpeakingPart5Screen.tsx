import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeftIcon, LoadingIcon, RefreshIcon, StopIcon, TrophyIcon, MicrophoneIcon, PlayIcon, PauseIcon, LightBulbIcon, XCircleIcon, QuestionMarkCircleIcon } from './icons';
// FIX: Corrected import for generateSpeakingPart5Scenario and evaluateSpeakingPart5
import { generateSpeakingPart5Scenario, evaluateSpeakingPart5 } from '../services/geminiService';
import { SpeakingPart5Scenario, SpeakingPart5EvaluationResult } from '../types';
import AudioPlayer from './AudioPlayer';

const PREP_TIME = 45;
const RESPONSE_TIME = 60;

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

type PracticeState = 'idle' | 'generating' | 'task_ready' | 'preparing' | 'recording' | 'evaluating' | 'results';

interface SpeakingPart5ScreenProps {
  onBack: () => void;
}

const HintBox: React.FC<{onClose: () => void}> = ({onClose}) => (
    <div className="bg-blue-50 dark:bg-slate-800/50 border-l-4 border-blue-500 text-blue-800 dark:text-blue-300 p-4 rounded-r-lg mt-6 relative">
        <div className="flex">
            <div className="flex-shrink-0">
                <LightBulbIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-3">
                <h3 className="text-lg font-bold">Pro Tip: Propose a Solution</h3>
                <p className="text-sm mt-1">Structure your response like a professional voicemail. 1) Greet the caller and acknowledge you understand the problem. 2) Propose a clear, logical solution with one or two steps. 3) End with a polite closing statement.</p>
            </div>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700" aria-label="Close hint">
            <XCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </button>
    </div>
);

const SpeakingPart5Screen: React.FC<SpeakingPart5ScreenProps> = ({ onBack }) => {
    const [practiceState, setPracticeState] = useState<PracticeState>('idle');
    const [taskData, setTaskData] = useState<SpeakingPart5Scenario | null>(null);
    const [timer, setTimer] = useState(0);
    const [results, setResults] = useState<SpeakingPart5EvaluationResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isTimerPaused, setIsTimerPaused] = useState(false);
    const [showHint, setShowHint] = useState(true);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerIntervalRef = useRef<number | null>(null);
    const audioStreamRef = useRef<MediaStream | null>(null);
    const onCompleteRef = useRef<(() => void) | null>(null);

    const cleanup = useCallback(() => {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
        if (audioStreamRef.current) audioStreamRef.current.getTracks().forEach(track => track.stop());
        timerIntervalRef.current = null;
        audioStreamRef.current = null;
        onCompleteRef.current = null;
    }, []);

    useEffect(() => () => cleanup(), [cleanup]);

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

    const handleGenerateTask = async () => {
        setPracticeState('generating');
        setError(null);
        setResults(null);
        setTaskData(null);
        setShowHint(true);
        try {
            const data = await generateSpeakingPart5Scenario();
            if (data) {
                setTaskData(data);
                setPracticeState('task_ready');
            } else {
                throw new Error("Failed to generate task.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again.");
            setPracticeState('idle');
        }
    };
    
    const handleStartPractice = () => {
        setPracticeState('preparing');
        startTimer(PREP_TIME, () => {
            setPracticeState('recording');
        });
    };
    
     const handleStopRecording = () => {
        if (mediaRecorderRef.current?.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }
    };

    useEffect(() => {
        if (practiceState !== 'recording') {
            return;
        }

        const startRecording = async () => {
            try {
                audioStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new MediaRecorder(audioStreamRef.current);
                mediaRecorderRef.current = mediaRecorder;
                audioChunksRef.current = [];

                mediaRecorder.ondataavailable = event => {
                    if(event.data.size > 0) audioChunksRef.current.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    setPracticeState('evaluating');
                };

                mediaRecorder.start();
                startTimer(RESPONSE_TIME, handleStopRecording);
            } catch (err) {
                console.error("Mic access denied:", err);
                setError("Microphone access is required.");
                setPracticeState('task_ready');
            }
        };

        startRecording();
    }, [practiceState]);


    useEffect(() => {
        if (practiceState !== 'evaluating' || !taskData) {
            return;
        }
        
        const evaluate = async () => {
             const mimeType = audioChunksRef.current[0]?.type || 'audio/webm';
             const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
             
             if (audioBlob.size === 0) {
                 setError("No audio was recorded. Please try again.");
                 setPracticeState('task_ready');
                 return;
             }

             try {
                const audioBase64 = await blobToBase64(audioBlob);
                const result = await evaluateSpeakingPart5(taskData.problem, audioBase64, mimeType);
                if(result) {
                    setResults(result);
                    setPracticeState('results');
                } else {
                    throw new Error("Invalid evaluation from AI.");
                }
             } catch(err) {
                console.error("Evaluation failed:", err);
                setError("Sorry, evaluation failed. Please try again.");
                setPracticeState('task_ready');
             } finally {
                cleanup();
             }
        };

        evaluate();

    }, [practiceState, taskData, cleanup]);
    
    const handleReset = () => {
        cleanup();
        setPracticeState('idle');
        setTaskData(null);
        setResults(null);
        setError(null);
    };
    
    const handlePause = () => setIsTimerPaused(true);
    const handleResume = () => setIsTimerPaused(false);
    const handleResetTimer = () => {
        setIsTimerPaused(true);
        if (practiceState === 'preparing') {
            setTimer(PREP_TIME);
        } else if (practiceState === 'recording') {
            setTimer(RESPONSE_TIME);
        }
    };

    const renderIdle = () => (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Part 5: Propose a Solution</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">You will listen to a voicemail message describing a problem. You will have 45 seconds to prepare, and then 60 seconds to record your response proposing a solution.</p>
            {error && <p className="text-red-500 mb-4 font-semibold">{error}</p>}
            <button
                onClick={handleGenerateTask}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 py-4 px-8 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors"
            >
                <MicrophoneIcon className="h-6 w-6" />
                Start Practice
            </button>
        </div>
    );

    const renderGenerating = () => (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border dark:border-slate-700 text-center">
            <LoadingIcon className="h-12 w-12 text-blue-600 mx-auto animate-spin" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-6">Generating Scenario...</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">The AI is creating a unique problem for you to solve.</p>
        </div>
    );
    
    const renderTaskReady = () => (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center mb-6">Problem Scenario</h2>
            <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-600">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Voicemail from: {taskData?.callerName}</p>
                <p className="mt-2 text-slate-700 dark:text-slate-200">{taskData?.problem}</p>
            </div>
            <div className="mb-6">
                <AudioPlayer audioScript={taskData?.problem} />
            </div>
            {error && <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={handleGenerateTask}
                    className="flex items-center justify-center gap-2 py-3 px-5 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                >
                    <RefreshIcon className="h-5 w-5" />
                    Generate New Scenario
                </button>
                <button
                    onClick={handleStartPractice}
                    className="flex-grow flex items-center justify-center gap-2 py-3 px-6 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition-colors"
                >
                    Start Preparation
                </button>
            </div>
            {showHint && <HintBox onClose={() => setShowHint(false)} />}
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
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-600">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Voicemail from: {taskData?.callerName}</p>
                <p className="mt-2 text-slate-700 dark:text-slate-200">{taskData?.problem}</p>
            </div>
            {practiceState === 'recording' && (
                <div className="mt-6 text-center">
                    <button onClick={handleStopRecording} className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">
                        <StopIcon className="h-5 w-5" />
                        Stop Recording
                    </button>
                </div>
            )}
        </div>
    );
    
    const renderEvaluating = () => (
        <div