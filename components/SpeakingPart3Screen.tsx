import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeftIcon, LoadingIcon, RefreshIcon, StopIcon, TrophyIcon, MicrophoneIcon, PauseIcon, PlayIcon, LightBulbIcon, XCircleIcon, QuestionMarkCircleIcon } from './icons';
// FIX: Corrected import for generateSpeakingPart3Questions and evaluateSpeakingPart3
import { generateSpeakingPart3Questions, evaluateSpeakingPart3 } from '../services/geminiService';
import { SpeakingPart3EvaluationResult } from '../types';

const PREP_TIME = 3;
const Q5_Q6_RESPONSE_TIME = 15;
const Q7_RESPONSE_TIME = 30;

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

type PracticeState = 'idle' | 'generating' | 'preparing' | 'recording' | 'evaluating' | 'results';

interface SpeakingPart3ScreenProps {
  onBack: () => void;
}

const HintBox: React.FC<{onClose: () => void}> = ({onClose}) => (
    <div className="bg-blue-50 dark:bg-slate-800/50 border-l-4 border-blue-500 text-blue-800 dark:text-blue-300 p-4 rounded-r-lg mb-6 relative">
        <div className="flex">
            <div className="flex-shrink-0">
                <LightBulbIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-3">
                <h3 className="text-lg font-bold">Pro Tip: Respond to Questions</h3>
                <p className="text-sm mt-1">Listen carefully to each question. For the first two questions (15 seconds), give a direct answer with a brief reason or example. For the last question (30 seconds), provide a more developed answer with supporting details.</p>
            </div>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700" aria-label="Close hint">
            <XCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </button>
    </div>
);


const SpeakingPart3Screen: React.FC<SpeakingPart3ScreenProps> = ({ onBack }) => {
    const [practiceState, setPracticeState] = useState<PracticeState>('idle');
    const [questions, setQuestions] = useState<{ topic: string, question5: string, question6: string, question7: string } | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 0 for Q5, 1 for Q6, 2 for Q7
    const [timer, setTimer] = useState(0);
    const [results, setResults] = useState<SpeakingPart3EvaluationResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isTimerPaused, setIsTimerPaused] = useState(false);
    const [showHint, setShowHint] = useState(true);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[][]>([[], [], []]);
    const timerIntervalRef = useRef<number | null>(null);
    const audioStreamRef = useRef<MediaStream | null>(null);
    const onCompleteRef = useRef<(() => void) | null>(null);
    
    const questionTimers = [Q5_Q6_RESPONSE_TIME, Q5_Q6_RESPONSE_TIME, Q7_RESPONSE_TIME];
    const questionTexts = [questions?.question5, questions?.question6, questions?.question7];


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

    const advanceToNextStep = () => {
        if (currentQuestionIndex < 2) {
            setCurrentQuestionIndex(prev => prev + 1);
            setPracticeState('preparing');
        } else {
            setPracticeState('evaluating');
        }
    };
    
    const handleStopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        }
    };
    
    const startRecording = async () => {
        try {
            audioStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
            setPracticeState('recording');
        } catch (err) {
            console.error("Microphone access denied:", err);
            setError("Microphone access is required. Please enable it in your browser settings.");
            setPracticeState('idle');
        }
    };

    const handleGenerateQuestions = async () => {
        setPracticeState('generating');
        setError(null);
        setResults(null);
        audioChunksRef.current = [[], [], []];
        setShowHint(true);
        try {
            const generatedQuestions = await generateSpeakingPart3Questions();
            if (generatedQuestions) {
                setQuestions(generatedQuestions);
                setCurrentQuestionIndex(0);
                setPracticeState('preparing');
            } else {
                throw new Error("Failed to generate questions.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred while generating questions. Please try again.");
            setPracticeState('idle');
        }
    };

    useEffect(() => {
        if (practiceState === 'preparing') {
            startTimer(PREP_TIME, startRecording);
        }

        if (practiceState === 'recording' && audioStreamRef.current) {
            const mediaRecorder = new MediaRecorder(audioStreamRef.current);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current[currentQuestionIndex] = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current[currentQuestionIndex].push(event.data);
            };
            
            mediaRecorder.onstop = advanceToNextStep;

            mediaRecorder.start();
            startTimer(questionTimers[currentQuestionIndex], handleStopRecording);
        }
        
        if (practiceState === 'evaluating') {
            const processEvaluation = async () => {
                 try {
                    if (!questions) throw new Error("Questions are not available for evaluation.");

                    const audioBlobs = audioChunksRef.current.map((chunks, index) => {
                         if(chunks.length === 0) {
                            console.warn(`No audio recorded for question ${index + 5}`);
                            return null;
                         }
                         // Use the mimeType from the first chunk if available
                         const mimeType = chunks[0]?.type || 'audio/webm';
                         return new Blob(chunks, { type: mimeType });
                    });

                    const base64Audios = await Promise.all(
                        audioBlobs.map(blob => blob ? blobToBase64(blob) : Promise.resolve(null))
                    );
                    
                    const mimeTypes = audioBlobs.map(blob => blob?.type || 'audio/webm');
                    
                    const evaluationResult = await evaluateSpeakingPart3(
                        questions, 
                        base64Audios as (string|null)[],
                        mimeTypes
                    );

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
            processEvaluation();
        }

    }, [practiceState]);


    const handleReset = () => {
        cleanup();
        setPracticeState('idle');
        setQuestions(null);
        setResults(null);
        setError(null);
        setCurrentQuestionIndex(0);
    };

    const handlePause = () => setIsTimerPaused(true);
    const handleResume = () => setIsTimerPaused(false);
    const handleResetTimer = () => {
        setIsTimerPaused(true);
        if (practiceState === 'preparing') {
            setTimer(PREP_TIME);
        } else if (practiceState === 'recording') {
            setTimer(questionTimers[currentQuestionIndex]);
        }
    };

    const renderIdle = () => (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Part 3: Respond to questions</h2>
            {showHint && <HintBox onClose={() => setShowHint(false)} />}
            <p className="text-slate-600 dark:text-slate-400 mb-8">You will answer three questions about a single topic. You will have 3 seconds to prepare for each response. You have 15 seconds to respond to questions 5 and 6, and 30 seconds to respond to question 7.</p>
            {error && <p className="text-red-500 mb-4 font-semibold">{error}</p>}
            <button
                onClick={handleGenerateQuestions}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 py-4 px-8 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors"
            >
                <MicrophoneIcon className="h-6 w-6" />
                Start Practice
            </button>
        </div>
    );
    
    const renderGenerating = () => (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
            <LoadingIcon className="h-12 w-12 text-blue-600 mx-auto animate-spin" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-6">Generating Questions...</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">The AI is preparing a set of questions for you.</p>
        </div>
    );

    const renderPractice = () => (
         <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
             <div className="flex justify-between items-center mb-4">
                 <div className={`px-4 py-1 rounded-full font-semibold text-white ${practiceState === 'preparing' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                    {practiceState === 'preparing' ? `Preparing... (Q${currentQuestionIndex + 5})` : `Recording... (Q${currentQuestionIndex + 5})`}
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

             <div className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-600 min-h-[100px] flex items-center justify-center">
                <p className="text-xl text-slate-700 dark:text-slate-200 leading-relaxed text-center font-semibold">{questionTexts[currentQuestionIndex]}</p>
             </div>

             {practiceState === 'recording' && (
                <div className="mt-6 text-center">
                     <button onClick={handleStopRecording} className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
                        <StopIcon className="h-5 w-5" />
                        Stop Recording
                     </button>
                </div>
             )}
        </div>
    );

    const renderEvaluating = () => (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
            <LoadingIcon className="h-12 w-12 text-blue-600 mx-auto animate-spin" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-6">Evaluating your responses...</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">The AI is analyzing your answers. This may take a moment.</p>
        </div>
    );
    
    const FeedbackSection: React.FC<{title: string; content: {english: string; vietnamese: string}}> = ({title, content}) => (
        <div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">{title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">English</p>
                    <p className="text-slate-700 dark:text-slate-300">{content.english}</p>
                </div>
                 <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Tiếng Việt</p>
                    <p className="text-slate-700 dark:text-slate-300">{content.vietnamese}</p>
                </div>
            </div>
        </div>
    );

    const renderResults = () => {
        if (!results) return renderEvaluating();
        return (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="text-center border-b dark:border-slate-600 pb-6 mb-6">
                    <TrophyIcon className="h-16 w-16 text-yellow-500 mx-auto" />
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-4">Evaluation Results / Kết quả Đánh giá</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Topic: {questions?.topic}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Task Score / Điểm Bài Thi</p>
                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{results.taskScore} / 5</p>
                    </div>
                     <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Est. Score / Ước tính Điểm</p>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{results.estimatedScoreBand}</p>
                    </div>
                     <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Level / Cấp độ</p>
                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{results.proficiencyLevel}</p>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Detailed Feedback / Phản hồi chi tiết</h3>
                <div className="space-y-4 mb-8">
                    <FeedbackSection title="General Summary / Tóm tắt chung" content={results.generalSummary} />
                    <FeedbackSection title="Grammar & Vocabulary / Ngữ pháp & Từ vựng" content={results.grammarAndVocab} />
                    <FeedbackSection title="Fluency & Cohesion / Độ trôi chảy & Mạch lạc" content={results.fluencyAndCohesion} />
                    <FeedbackSection title="Pronunciation / Phát âm" content={results.pronunciation} />
                    <FeedbackSection title="Response to Q7 / Phản hồi cho Câu 7" content={results.responseToQ7} />
                </div>
                
                <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <RefreshIcon className="h-6 w-6" />
                    Practice Again
                </button>
            </div>
        );
    }
    
    const renderContent = () => {
        switch (practiceState) {
            case 'idle': return renderIdle();
            case 'generating': return renderGenerating();
            case 'preparing':
            case 'recording': return renderPractice();
            case 'evaluating': return renderEvaluating();
            case 'results': return renderResults();
            default: return null;
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {!showHint && practiceState === 'idle' && (
                    <button onClick={() => setShowHint(true)} className="fixed top-24 right-4 z-50 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700" aria-label="Show hint">
                        <QuestionMarkCircleIcon className="h-6 w-6" />
                    </button>
                )}
                <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors disabled:opacity-50" disabled={practiceState !== 'idle'}>
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Speaking Hub
                </button>
                {renderContent()}
            </div>
        </div>
    );
};

export default SpeakingPart3Screen;