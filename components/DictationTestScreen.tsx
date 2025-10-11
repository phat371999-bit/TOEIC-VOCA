import React, { useState, useEffect, useRef } from 'react';
// FIX: Imported missing types for dictation exercises and user answers.
import { LibraryDictationExercise, UserAnswers, User } from '../types';
import AudioPlayer from './AudioPlayer';
import QuestionPalette from './QuestionPalette';
import { ArrowLeftIcon, LightBulbIcon, XCircleIcon, QuestionMarkCircleIcon } from './icons';

interface DictationTestScreenProps {
    testData: { id: number; title: string; exercises: LibraryDictationExercise[] };
    onBack: () => void;
    isAiTest?: boolean;
}

const HintBox: React.FC<{onClose: () => void}> = ({onClose}) => (
    <div className="bg-blue-50 dark:bg-slate-800 border-l-4 border-blue-500 text-blue-800 dark:text-blue-300 p-4 rounded-r-lg mb-6 relative">
        <div className="flex">
            <div className="flex-shrink-0">
                <LightBulbIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-3">
                <h3 className="text-lg font-bold">Pro Tip for Dictation</h3>
                <p className="text-sm mt-1">Listen to the full sentence first to understand the context. Then, focus on the sounds of the missing words. Don't worry about perfect spelling on the first try; you can correct it before checking.</p>
            </div>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700" aria-label="Close hint">
            <XCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </button>
    </div>
);

const DictationTestScreen: React.FC<DictationTestScreenProps> = ({ testData, onBack, isAiTest = false }) => {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [allUserAnswers, setAllUserAnswers] = useState<{ [exerciseId: number]: string[] }>({});
    const [checkedExercises, setCheckedExercises] = useState<{ [exerciseId: number]: boolean }>({});
    const [showHint, setShowHint] = useState(true);
    const exerciseRefs = useRef<Record<number, HTMLDivElement | null>>({});

    useEffect(() => {
        const initialAnswers: { [exerciseId: number]: string[] } = {};
        const initialChecked: { [exerciseId: number]: boolean } = {};
        testData.exercises.forEach(ex => {
            initialAnswers[ex.id] = new Array(ex.missingWords.length).fill('');
            initialChecked[ex.id] = false;
        });
        setAllUserAnswers(initialAnswers);
        setCheckedExercises(initialChecked);
        setCurrentExerciseIndex(0);
        exerciseRefs.current = {};
    }, [testData]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const intersectingEntry = entries.find(entry => entry.isIntersecting);
                if (intersectingEntry) {
                    const index = parseInt(intersectingEntry.target.getAttribute('data-index') || '0', 10);
                    setCurrentExerciseIndex(index);
                }
            },
            { 
                rootMargin: '-40% 0px -60% 0px',
                threshold: 0 
            }
        );

        const refs = exerciseRefs.current;
        const validRefs = Object.values(refs).filter(ref => ref !== null) as HTMLDivElement[];
        validRefs.forEach(ref => observer.observe(ref));

        return () => {
            validRefs.forEach(ref => observer.unobserve(ref));
        };
    }, [testData.exercises]);

    const handleTestInputChange = (exerciseId: number, index: number, value: string) => {
        const newAnswers = [...allUserAnswers[exerciseId]];
        newAnswers[index] = value;
        setAllUserAnswers(prev => ({ ...prev, [exerciseId]: newAnswers }));
    };

    const handleCheckTestAnswers = (exerciseId: number) => {
        window.speechSynthesis.cancel();
        setCheckedExercises(prev => ({ ...prev, [exerciseId]: true }));
    };

    const handleTryAgainTest = (exerciseId: number) => {
        const exercise = testData.exercises.find(e => e.id === exerciseId);
        if (!exercise) return;
        setCheckedExercises(prev => ({ ...prev, [exerciseId]: false }));
        setAllUserAnswers(prev => ({ ...prev, [exerciseId]: new Array(exercise.missingWords.length).fill('') }));
    };
    
    const goToExercise = (index: number) => {
         if (index >= 0 && index < testData.exercises.length) {
            exerciseRefs.current[index]?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    };

    const goToNext = () => {
        if (currentExerciseIndex < testData.exercises.length - 1) {
            goToExercise(currentExerciseIndex + 1);
        }
    };

    const goToPrev = () => {
        if (currentExerciseIndex > 0) {
            goToExercise(currentExerciseIndex - 1);
        }
    };

    const renderTextWithInputsForTest = (exercise: LibraryDictationExercise) => {
        const parts = exercise.textWithBlanks.split(/_{2,}/);
        const currentAnswers = allUserAnswers[exercise.id] || [];
        const isCurrentlyChecked = checkedExercises[exercise.id] || false;
        
        return (
            <p className="text-lg md:text-xl leading-[3.5rem] text-slate-700">
                {parts.map((part, index) => {
                    const isLastPart = index === parts.length - 1;
                    const missingWord = exercise.missingWords[index] || '';
                    const userAnswer = currentAnswers[index] || '';
                    const isCorrect = userAnswer.trim().toLowerCase() === missingWord.trim().toLowerCase();
                    
                    let inputClassName = "mx-1 px-2 py-1 border-b-2 bg-slate-100 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors duration-200 rounded-t-md";
                    if (isCurrentlyChecked) {
                        inputClassName += isCorrect ? ' border-green-500 text-green-700' : ' border-red-500 text-red-700';
                    } else {
                        inputClassName += ' border-slate-300';
                    }

                    return (
                        <React.Fragment key={index}>
                            {part}
                            {!isLastPart && (
                                <span className="inline-block relative mx-1">
                                    <input 
                                        type="text"
                                        value={userAnswer}
                                        onChange={(e) => handleTestInputChange(exercise.id, index, e.target.value)}
                                        disabled={isCurrentlyChecked}
                                        className={inputClassName}
                                        style={{ width: `${Math.max(missingWord.length, 8)}ch` }}
                                        aria-label={`Blank number ${index + 1}`}
                                    />
                                    {isCurrentlyChecked && !isCorrect && (
                                        <span className="absolute left-1 -bottom-6 text-sm text-green-600 font-semibold">{missingWord}</span>
                                    )}
                                </span>
                            )}
                        </React.Fragment>
                    );
                })}
            </p>
        );
    };
    
    const paletteAnswers: UserAnswers = Object.entries(checkedExercises).reduce((acc, [key, value]) => {
        acc[key] = value ? 'A' : null; // 'A' as a truthy value for answered
        return acc;
    }, {} as UserAnswers);

    return (
        <div className="container mx-auto p-4 lg:p-8">
             <div className="max-w-7xl mx-auto">
                { !showHint && (
                    <button onClick={() => setShowHint(true)} className="fixed top-24 right-4 z-50 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700" aria-label="Show hint">
                        <QuestionMarkCircleIcon className="h-6 w-6" />
                    </button>
                )}
                <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    {isAiTest ? 'Back to Dictation Hub' : 'Back to Part Selection'}
                </button>
                <h2 className="text-3xl font-bold text-center mb-6 text-slate-900">{testData.title}</h2>
                { showHint && <HintBox onClose={() => setShowHint(false)} /> }
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                         {testData.exercises.map((exercise, index) => {
                            const isExerciseChecked = checkedExercises[exercise.id];
                            const userAnswersForExercise = allUserAnswers[exercise.id] || [];
                            const score = userAnswersForExercise.reduce((acc, answer, idx) => {
                                const correctAnswer = exercise.missingWords[idx] || '';
                                return answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase() ? acc + 1 : acc;
                            }, 0);

                            return (
                                <div 
                                    key={exercise.id}
                                    ref={el => { exerciseRefs.current[index] = el; }}
                                    data-index={index}
                                    className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 scroll-mt-24"
                                >
                                    <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">{exercise.title} (Exercise {index + 1} of {testData.exercises.length})</h3>
                                    <div className="mb-8">
                                        <AudioPlayer 
                                            audioSrc={exercise.audioSrc}
                                            audioScript={exercise.fullText} 
                                        />
                                    </div>
                                    <div className="mb-12 p-4 bg-slate-50 rounded-lg min-h-[10rem]">
                                       {renderTextWithInputsForTest(exercise)}
                                    </div>
                                    
                                    {isExerciseChecked && (
                                        <div className="text-center bg-blue-50 p-6 rounded-lg mb-8">
                                            <h4 className="text-xl font-semibold text-slate-800">Your Score for this Exercise</h4>
                                            <p className="text-5xl font-bold text-blue-600 my-2">
                                                {score} / {exercise.missingWords.length}
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        {!isExerciseChecked ? (
                                            <button onClick={() => handleCheckTestAnswers(exercise.id)} className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-200">
                                                Check Answers
                                            </button>
                                        ) : (
                                            <button onClick={() => handleTryAgainTest(exercise.id)} className="w-full sm:w-auto px-8 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors duration-200">
                                                Try Again
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Right Sidebar */}
                    <div className="mt-8 lg:mt-0 space-y-8 lg:sticky lg:top-24 lg:self-start">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-lg font-bold mb-4">Exercise Palette</h3>
                            <QuestionPalette 
                                questions={testData.exercises}
                                answers={paletteAnswers} 
                                currentQuestionIndex={currentExerciseIndex}
                                onQuestionSelect={goToExercise}
                            />
                             <div className="flex justify-between mt-6">
                                <button onClick={goToPrev} disabled={currentExerciseIndex === 0} className="px-4 py-2 bg-slate-200 rounded-md font-semibold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300">Previous</button>
                                <button onClick={goToNext} disabled={currentExerciseIndex === testData.exercises.length - 1} className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DictationTestScreen;