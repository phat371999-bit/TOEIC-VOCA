import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeftIcon, LoadingIcon, RefreshIcon, StopIcon, TrophyIcon, MicrophoneIcon, PlayIcon, PauseIcon } from './icons';
// FIX: Corrected import for generateSpeakingPart4Task and evaluateSpeakingPart4
import { generateSpeakingPart4Task, evaluateSpeakingPart4 } from '../services/geminiService';
import { SpeakingPart4Task, SpeakingPart4EvaluationResult } from '../types';
import AudioPlayer from './AudioPlayer';

const PREP_TIME = 30;
const Q8_RESPONSE_TIME = 15;
const Q9_RESPONSE_TIME = 15;
const Q10_RESPONSE_TIME = 30;

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

interface SpeakingPart4ScreenProps {
  onBack: () => void;
}

const SpeakingPart4Screen: React.FC<SpeakingPart4ScreenProps> = ({ onBack }) => {
    const [practiceState, setPracticeState] = useState<PracticeState>('idle');
    const [taskData, setTaskData] = useState<SpeakingPart4Task | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null); // null for prep, 0 for Q8, 1 for Q9, 2 for Q10
    const [timer, setTimer] = useState(0);
    const [results, setResults] = useState<SpeakingPart4EvaluationResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isTimerPaused, setIsTimerPaused] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[][]>([[], [], []]);
    const timerIntervalRef = useRef<number | null>(null);
    const audioStreamRef = useRef<MediaStream | null>(null);
    const onCompleteRef = useRef<(() => void) | null>(null);

    const responseTimers = [Q8_RESPONSE_TIME, Q9_RESPONSE_TIME, Q10_RESPONSE_TIME];
    const questionTexts = [taskData?.question8, taskData?.question9, taskData?.question10];
    
    const cleanup = useCallback(() => {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
        if (audioStreamRef.current) audioStreamRef.current.getTracks().forEach(track => track.stop());
        timerIntervalRef.current = null;
        mediaRecorderRef.current = null;
        audioStreamRef.current = null;
        onCompleteRef.current = null;
    }, []);

    const handleReset = useCallback(() => {
        cleanup();
        setPracticeState('idle');
        setTaskData(null);
        setResults(null);
        setError(null);
        setCurrentQuestionIndex(null);
    }, [cleanup]);

    useEffect(() => () => cleanup(), [cleanup]);

    const formatDocumentContent = (content: string | undefined): { __html: string } => {
        if (!content) return { __html: '' };
    
        let importantNote = '';
        let mainContent = content;
    
        const noteIndex = content.toLowerCase().indexOf('important note:');
        if (noteIndex !== -1) {
            mainContent = content.substring(0, noteIndex).trim();
            importantNote = content.substring(noteIndex);
        }
    
        const lines = mainContent.split('\n').filter(line => line.trim());
        let html = '';
        let headerCells: string[] = [];
        
        const headerLine = lines.find(line => line.includes('|') && !line.startsWith('||') && line.split('|').length > 3);
        
        if (headerLine) {
            const preHeaderLines = lines.slice(0, lines.indexOf(headerLine));
            preHeaderLines.forEach(line => {
                html += `<p class="text-slate-500 dark:text-slate-400 mb-2">${line.replace(/\|/g, '')}</p>`;
            });

            const headerParts = headerLine.split('|').map(p => p.trim()).filter(Boolean);
            if (headerParts.length > 0) {
                 if (headerParts.length > 4 && isNaN(Date.parse(headerParts[0]))) {
                    html += `<p class="text-slate-500 dark:text-slate-400 mb-2">${headerParts[0]}</p>`;
                    headerCells = headerParts.slice(1);
                } else {
                    headerCells = headerParts;
                }
            }
        } else {
            lines.forEach(line => {
                 if (!line.startsWith('||')) {
                    html += `<p class="text-slate-600 dark:text-slate-300 mb-2">${line}</p>`;
                 }
            });
        }
    
        const dataLine = lines.find(l => l.startsWith('||'));
        if (dataLine && headerCells.length > 0) {
            html += '<table class="w-full text-sm text-left border-collapse my-4">';
            html += '<thead><tr class="bg-slate-100 dark:bg-slate-700">';
            headerCells.forEach(header => {
                html += `<th class="p-3 border-b-2 border-slate-200 dark:border-slate-600 font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider">${header}</th>`;
            });
            html += '</tr></thead><tbody>';
            
            const dataRows = dataLine.replace(/^\|\|/, '').split('| |').filter(row => row.trim());
            
            dataRows.forEach(rowStr => {
                const cells = rowStr.split('|').map(c => c.trim()).filter(Boolean);
    
                if (cells.length > 0) {
                    html += '<tr class="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">';
                    cells.forEach((cell) => {
                         html += `<td class="p-3 text-slate-600 dark:text-slate-300">${cell}</td>`;
                    });
                    for(let i = cells.length; i < headerCells.length; i++) {
                         html += '<td class="p-3"></td>';
                    }
                    html += '</tr>';
                }
            });
    
            html += '</tbody></table>';
        }
    
        if (importantNote) {
            html += `<div class="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/50 border-l-4 border-yellow-400 text-yellow-800 dark:text-yellow-200 rounded-r-md"><p class="font-bold">${importantNote.split(':')[0]}</p><p>${importantNote.split(':').slice(1).join(':').trim()}</p></div>`;
        }
    
        if (!html.trim() && content) {
            let processedContent = content
                .replace(/---/g, '<hr class="my-3 border-slate-300 dark:border-slate-600" />')
                .replace(/\*\*\*(.*?)\*\*\*/g, '<h4 class="font-bold text-lg mt-4 mb-2">$1</h4>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-slate-100">$1</strong>')
                .split('\n').map(line => line.trim() ? `<p class="mb-1.5">${line}</p>` : '').join('');
            return { __html: processedContent };
        }
    
        return { __html: html };
    };

    const startTimer = (duration: number, onComplete: () => void) => {
        setTimer(duration);
        onCompleteRef.current = onComplete;
        setIsTimerPaused(false);
    };

    const handleGenerateTask = async () => {
        setPracticeState('generating');
        setError(null);
        setResults(null);
        audioChunksRef.current = [[], [], []];
        try {
            const data = await generateSpeakingPart4Task();
            if (data) {
                setTaskData(data);
                setCurrentQuestionIndex(null);
                setPracticeState('preparing');
            } else {
                throw new Error("Failed to generate task.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again.");
            setPracticeState('idle');
        }
    };
    
    const startRecordingForCurrentQuestion = useCallback(async () => {
         if (currentQuestionIndex === null) return;
         try {
            audioStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(audioStreamRef.current);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current[currentQuestionIndex] = [];

            mediaRecorder.ondataavailable = (event) => {
                if(event.data.size > 0) {
                    audioChunksRef.current[currentQuestionIndex].push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                if (currentQuestionIndex < 2) {
                    setCurrentQuestionIndex(prev => (prev ?? -1) + 1);
                    setPracticeState('idle'); 
                } else if (currentQuestionIndex === 2) {
                    setPracticeState('evaluating');
                }
            };

            mediaRecorder.start();
            setPracticeState('recording');
            startTimer(responseTimers[currentQuestionIndex], () => {
                 if (mediaRecorderRef.current?.state === 'recording') {
                    mediaRecorderRef.current.stop();
                }
            });
        } catch (err) {
            console.error("Mic access denied:", err);
            setError("Microphone access is required. Please enable it.");
            handleReset();
        }
    }, [currentQuestionIndex, handleReset, responseTimers]);
    
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

    useEffect(() => {
        if (practiceState === 'preparing' && currentQuestionIndex === null) {
            startTimer(PREP_TIME, () => setCurrentQuestionIndex(0));
        } else if (practiceState === 'evaluating') {
            const processEvaluation = async () => {
                try {
                    if (!taskData) throw new Error("Task data is missing.");
                    
                    const audioBlobs = audioChunksRef.current.map(chunks => chunks.length > 0 ? new Blob(chunks, { type: chunks[0]?.type || 'audio/webm' }) : null);
                    const base64Audios = await Promise.all(audioBlobs.map(blob => blob ? blobToBase64(blob) : Promise.resolve(null)));
                    const mimeTypes = audioBlobs.map(blob => blob?.type || 'audio/webm');
                    
                    const evaluationResult = await evaluateSpeakingPart4(taskData, base64Audios as (string | null)[], mimeTypes);
                    if (evaluationResult) {
                        setResults(evaluationResult);
                        setPracticeState('results');
                    } else {
                        throw new Error("Invalid evaluation from AI.");
                    }
                } catch (apiError) {
                    console.error("Evaluation failed:", apiError);
                    setError("Sorry, evaluation failed. Please try again.");
                    setPracticeState('idle');
                } finally {
                    cleanup();
                }
            };
            processEvaluation();
        } else if ((practiceState === 'idle' || practiceState === 'preparing') && currentQuestionIndex !== null && currentQuestionIndex < 3) {
            startRecordingForCurrentQuestion();
        }
    }, [practiceState, currentQuestionIndex, cleanup, startRecordingForCurrentQuestion, taskData]);


    const handleStopRecording = () => {
        if (mediaRecorderRef.current?.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }
    };
    
    const handlePause = () => setIsTimerPaused(true);
    const handleResume = () => setIsTimerPaused(false);
    const handleResetTimer = () => {
        setIsTimerPaused(true);
        if (practiceState === 'preparing') {
            setTimer(PREP_TIME);
        } else if (practiceState === 'recording' && currentQuestionIndex !== null) {
            setTimer(responseTimers[currentQuestionIndex]);
        }
    };

    const renderIdle = () => (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Part 4: Respond using provided info</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">You will see a document and answer 3 questions about it. You'll have 30 seconds to read it. Then, you'll answer each question as it appears, with 15 seconds for the first two and 30 for the last one.</p>
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
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-6">Generating Task...</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">The AI is creating a document and questions for you.</p>
        </div>
    );

    const renderPractice = () => (
         <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <div className={`px-4 py-1 rounded-full font-semibold text-white ${practiceState === 'preparing' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                    {practiceState === 'preparing' && 'Preparation Time'}
                    {practiceState === 'recording' && `Recording Q${(currentQuestionIndex ?? 0) + 8}...`}
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        { isTimerPaused ? <button onClick={handleResume} className="p-2" aria-label="Resume"><PlayIcon className="h-6 w-6" /></button> : <button onClick={handlePause} className="p-2" aria-label="Pause"><PauseIcon className="h-6 w-6" /></button> }
                        <button onClick={handleResetTimer} className="p-2" aria-label="Reset"><RefreshIcon className="h-6 w-6" /></button>
                    </div>
                    <div className="text-3xl font-bold">{timer}s</div>
                </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-600 mb-6">
                <h3 className="text-xl font-bold text-center mb-4">{taskData?.documentTitle}</h3>
                <div className="prose prose-sm max-w-none text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={formatDocumentContent(taskData?.documentContent)} />
            </div>

            {currentQuestionIndex !== null && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h4 className="font-bold text-lg text-blue-800 dark:text-blue-200 text-center">Question {currentQuestionIndex + 8}</h4>
                    <AudioPlayer audioScript={questionTexts[currentQuestionIndex]} />
                </div>
            )}
             
            {practiceState === 'recording' && (
                <div className="mt-6 text-center">
                    <button onClick={handleStopRecording} className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">
                        <StopIcon className="h-5 w-5" /> Stop Recording
                    </button>
                </div>
            )}
        </div>
    );

    const renderEvaluating = () => (
        <div className="bg-white p-8 rounded-xl shadow-lg border text-center">
            <LoadingIcon className="h-12 w-12 text-blue-600 mx-auto animate-spin" />
            <h2 className="text-2xl font-bold mt-6">Evaluating your responses...</h2>
        </div>
    );
    
    const FeedbackSection: React.FC<{title: string; content: {english: string; vietnamese: string}}> = ({title, content}) => (
        <div>
            <h4 className="text-lg font-bold mb-2">{title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-100 p-4 rounded-lg">
                <div>
                    <p className="text-sm font-semibold text-slate-500 mb-1">English</p>
                    <p>{content.english}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-500 mb-1">Tiếng Việt</p>
                    <p>{content.vietnamese}</p>
                </div>
            </div>
        </div>
    );

    const renderResults = () => {
        if (!results) return null;
        return (
             <div className="bg-white p-8 rounded-xl shadow-lg border">
                <div className="text-center border-b pb-6 mb-6">
                    <TrophyIcon className="h-16 w-16 text-yellow-500 mx-auto" />
                    <h2 className="text-3xl font-bold mt-4">Evaluation Results</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-8">
                    <div className="bg-blue-50 p-4 rounded-lg"><p className="text-sm font-semibold text-blue-700">Task Score</p><p className="text-4xl font-bold text-blue-600">{results.taskScore} / 5</p></div>
                    <div className="bg-blue-50 p-4 rounded-lg"><p className="text-sm font-semibold text-blue-700">Est. Score</p><p className="text-3xl font-bold text-blue-600">{results.estimatedScoreBand}</p></div>
                    <div className="bg-blue-50 p-4 rounded-lg"><p className="text-sm font-semibold text-blue-700">Level</p><p className="text-3xl font-bold text-blue-600">{results.proficiencyLevel}</p></div>
                </div>
                <h3 className="text-xl font-bold mb-4">Detailed Feedback</h3>
                <div className="space-y-4 mb-8">
                    <FeedbackSection title="General Summary" content={results.generalSummary} />
                    <FeedbackSection title="Accuracy (Q8 & Q9)" content={results.accuracy} />
                    <FeedbackSection title="Response to Q10" content={results.responseToQ10} />
                    <FeedbackSection title="Language Use" content={results.languageUse} />
                    <FeedbackSection title="Delivery" content={results.delivery} />
                </div>
                <button onClick={handleReset} className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700">
                    <RefreshIcon className="h-6 w-6" /> Practice Again
                </button>
            </div>
        );
    };

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
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold disabled:opacity-50" disabled={practiceState !== 'idle'}>
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Speaking Hub
                </button>
                {renderContent()}
            </div>
        </div>
    );
};

export default SpeakingPart4Screen;