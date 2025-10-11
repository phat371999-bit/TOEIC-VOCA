import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
// FIX: Moved generateDeterminerExercise to import from geminiService as it is not exported from grammarLibrary
import { getGrammarTopicContent, getGrammarQuizQuestions, getGrammarQuizLevels } from '../services/grammarLibrary';
import { generateDeterminerExercise } from '../services/geminiService';
import { GrammarTopicContent, GrammarQuestion, QuestionOption, DeterminerExercise } from '../types';
import SelectionCard from './SelectionCard';
import QuestionPalette from './QuestionPalette';
import { CheckCircleIcon, XCircleIcon, ArrowLeftIcon, SparklesIcon, LoadingIcon } from './icons';

interface UserAnswers {
    [questionId: string]: QuestionOption | null;
}

interface GrammarTopicScreenProps {
  topic: string;
  onBack: () => void;
}

const GrammarTopicScreen: React.FC<GrammarTopicScreenProps> = ({ topic, onBack }) => {
    const [content, setContent] = useState<GrammarTopicContent | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [questions, setQuestions] = useState<GrammarQuestion[]>([]);
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentQuestionIdInView, setCurrentQuestionIdInView] = useState<string | null>(null);
    
    // State for interactive determiner exercise
    const [interactiveExercise, setInteractiveExercise] = useState<DeterminerExercise | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [clickedWords, setClickedWords] = useState<Record<number, 'correct' | 'incorrect'>>({});
    const [isExerciseSubmitted, setIsExerciseSubmitted] = useState(false);
    const [exerciseError, setExerciseError] = useState<string | null>(null);

    const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const quizLevels = useMemo(() => getGrammarQuizLevels(topic), [topic]);

    useEffect(() => {
        setContent(getGrammarTopicContent(topic));
        setSelectedLevel(null);
        setQuestions([]);
        setUserAnswers({});
        setIsSubmitted(false);
        setInteractiveExercise(null);
        setIsGenerating(false);
        setClickedWords({});
        setIsExerciseSubmitted(false);
        setExerciseError(null);
    }, [topic]);

    // Handlers for standard quiz
    const handleLevelSelect = (level: string) => {
        const quizQuestions = getGrammarQuizQuestions(topic, level);
        setQuestions(quizQuestions);
        setSelectedLevel(level);
        setIsSubmitted(false);
        setUserAnswers({});
        questionRefs.current = {};
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const handleTryAgain = () => {
        setIsSubmitted(false);
        setUserAnswers({});
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const handleAnswerSelect = (questionId: string, option: QuestionOption) => {
        if (isSubmitted) return;
        setUserAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    const handleQuestionSelect = (index: number) => {
        const questionId = questions[index]?.id;
        if (questionId && questionRefs.current[questionId]) {
            questionRefs.current[questionId]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };
    
    const handleBackToLevelSelect = () => {
        setSelectedLevel(null);
        setQuestions([]);
    };
    
    // Handlers for new interactive exercise
    const handleStartDeterminerExercise = useCallback(async () => {
        setIsGenerating(true);
        setInteractiveExercise(null);
        setClickedWords({});
        setIsExerciseSubmitted(false);
        setExerciseError(null);
        try {
            const data = await generateDeterminerExercise();
            if (data) {
                setInteractiveExercise(data);
            } else {
                setExerciseError("Failed to generate exercise. Please try again.");
            }
        } catch (e) {
            console.error(e);
            setExerciseError("An error occurred while fetching the exercise.");
        } finally {
            setIsGenerating(false);
        }
    }, []);

    const handleWordClick = (word: string, index: number) => {
        if (isExerciseSubmitted || clickedWords[index]) return;
        
        const cleanedWord = word.toLowerCase().replace(/[^a-z0-9]/gi, '');
        if (!cleanedWord) return;

        const isDeterminer = interactiveExercise?.determiners.includes(cleanedWord);
        setClickedWords(prev => ({ ...prev, [index]: isDeterminer ? 'correct' : 'incorrect' }));
    };
    
    const renderDeterminerClicker = () => {
        const paragraphWords = interactiveExercise?.paragraph.split(/\s+/) || [];
        
        const getWordClasses = (word: string, index: number) => {
            const cleanedWord = word.toLowerCase().replace(/[^a-z0-9]/gi, '');
            const isDeterminer = interactiveExercise?.determiners.includes(cleanedWord);
            
            let classes = "cursor-pointer transition-all duration-200 rounded px-1 py-0.5";
            
            if (isExerciseSubmitted) {
                if (isDeterminer) return `${classes} bg-blue-200 text-blue-800 font-bold`;
                return classes;
            }

            if (clickedWords[index] === 'correct') {
                return `${classes} bg-green-200 text-green-800 font-bold`;
            }
            if (clickedWords[index] === 'incorrect') {
                return `${classes} bg-red-200 text-red-800 line-through`;
            }
            
            return `${classes} hover:bg-yellow-100`;
        };

        const correctCount = Object.values(clickedWords).filter(v => v === 'correct').length;
        const totalDeterminers = interactiveExercise?.determiners.length || 0;

        return (
            <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Interactive Exercise</h3>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                    {isGenerating && (
                        <div className="flex justify-center items-center p-8">
                            <LoadingIcon className="h-8 w-8 text-blue-600 animate-spin" />
                            <span className="ml-4 text-slate-600">Generating paragraph...</span>
                        </div>
                    )}
                    {exerciseError && <p className="text-red-500 text-center">{exerciseError}</p>}

                    {!isGenerating && !interactiveExercise && (
                        <div className="text-center">
                            <p className="text-slate-600 mb-4">Test your knowledge! Click the button to generate a paragraph and identify the determiners.</p>
                            <button onClick={handleStartDeterminerExercise} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
                                <SparklesIcon className="h-5 w-5" />
                                Start AI Exercise
                            </button>
                        </div>
                    )}

                    {interactiveExercise && (
                        <div>
                             <p className="text-lg leading-loose text-slate-700 p-4 bg-slate-50 rounded-md">
                                {paragraphWords.map((word, index) => (
                                    <span key={index} onClick={() => handleWordClick(word, index)} className={getWordClasses(word, index)}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="font-semibold text-slate-700">
                                    Found: {correctCount} / {totalDeterminers}
                                </p>
                                <div className="flex gap-2">
                                     <button onClick={() => setIsExerciseSubmitted(true)} disabled={isExerciseSubmitted} className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-slate-400">
                                        Check Answers
                                    </button>
                                    <button onClick={handleStartDeterminerExercise} className="px-5 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700">
                                        New Paragraph
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderQuizView = () => {
        const getOptionClasses = (question: GrammarQuestion, option: QuestionOption) => {
            if (!isSubmitted) return 'bg-white border-slate-300 hover:border-blue-400';

            const isCorrect = option === question.correctAnswer;
            const isSelected = userAnswers[question.id] === option;

            if (isCorrect) return 'bg-green-100 border-green-500';
            if (isSelected && !isCorrect) return 'bg-red-100 border-red-500';
            return 'bg-white border-slate-300';
        };

        const currentQuestionIndex = questions.findIndex(q => q.id === currentQuestionIdInView);
        const currentIndex = currentQuestionIndex > -1 ? currentQuestionIndex : 0;
        
        const goToNext = () => {
            if (currentIndex < questions.length - 1) {
                handleQuestionSelect(currentIndex + 1);
            }
        };

        const goToPrev = () => {
            if (currentIndex > 0) {
                handleQuestionSelect(currentIndex - 1);
            }
        };


        return (
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                     <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">{topic} - {selectedLevel}</h2>
                         <div className="space-y-10">
                            {questions.map((q, index) => (
                                <div key={q.id} id={q.id} ref={el => { if (el) questionRefs.current[q.id] = el; }} className="scroll-mt-24 border-b border-slate-200 pb-8 last:border-b-0">
                                    <p className="text-lg text-slate-800 mb-4 font-semibold">
                                        {index + 1}. {q.questionText}
                                    </p>
                                    <div className="space-y-3">
                                        {(Object.keys(q.options) as QuestionOption[]).map(optionKey => (
                                            q.options[optionKey as QuestionOption] && (
                                                <label key={optionKey} className={`flex items-start p-4 border rounded-lg transition-all duration-200 ${!isSubmitted ? 'cursor-pointer' : ''} ${getOptionClasses(q, optionKey)}`}>
                                                    <div className="flex-shrink-0 mt-1">
                                                        {!isSubmitted && (
                                                            <input 
                                                                type="radio" 
                                                                name={`question-${q.id}`} 
                                                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                                checked={userAnswers[q.id] === optionKey}
                                                                onChange={() => handleAnswerSelect(q.id, optionKey as QuestionOption)}
                                                            />
                                                        )}
                                                         {isSubmitted && userAnswers[q.id] === optionKey && userAnswers[q.id] !== q.correctAnswer && <XCircleIcon className="h-5 w-5 text-red-600"/>}
                                                         {isSubmitted && optionKey === q.correctAnswer && <CheckCircleIcon className="h-5 w-5 text-green-600"/>}
                                                    </div>
                                                    <span className="ml-4 text-base text-slate-700"><span className="font-bold">{optionKey}.</span> {q.options[optionKey as QuestionOption]}</span>
                                                </label>
                                            )
                                        ))}
                                    </div>
                                    {isSubmitted && (
                                        <div className="mt-4 bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
                                            <h5 className="font-bold text-slate-800">Explanation:</h5>
                                            <p className="text-slate-600 mt-1 whitespace-pre-wrap">{q.explanation}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                         </div>
                     </div>
                </div>
                {/* Right Sidebar */}
                <div className="mt-8 lg:mt-0 space-y-8 sticky top-24 self-start">
                     <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Question Palette</h3>
                        <QuestionPalette 
                            questions={questions.map(q => ({ id: q.id }))}
                            answers={userAnswers}
                            currentQuestionIndex={currentIndex}
                            onQuestionSelect={handleQuestionSelect}
                        />
                         <div className="flex justify-between mt-6">
                            <button onClick={goToPrev} disabled={currentIndex === 0} className="px-4 py-2 bg-slate-200 rounded-md font-semibold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300">Previous</button>
                            <button onClick={goToNext} disabled={currentIndex === questions.length - 1} className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700">Next</button>
                        </div>
                         <div className="text-center mt-6">
                            {!isSubmitted ? (
                                <button onClick={handleSubmit} className="w-full px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-200">
                                    Check Answers
                                </button>
                            ) : (
                                <button onClick={handleTryAgain} className="w-full px-8 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors duration-200">
                                    Try Again
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderLevelSelection = () => (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900">{topic} Quizzes</h2>
                <p className="mt-2 text-lg text-slate-600">Select a level to begin your practice.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quizLevels.map(level => {
                    const isExercise = level.startsWith('Bài tập') || level.startsWith('Exercise');
                    const title = isExercise ? level : `Level ${level}`;
                    const description = isExercise ? `Multiple-choice questions for ${topic}` : `Multiple-choice questions for the ${level} target score.`;
    
                    return (
                        <SelectionCard 
                            key={level}
                            title={title}
                            description={description}
                            onClick={() => handleLevelSelect(level)}
                        />
                    );
                })}
            </div>
        </div>
    );
    
    const renderOriginalContent = () => {
         if (!content) {
            return (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-700">Topic Not Found</h2>
                    <p className="mt-4 text-slate-600">The requested grammar topic could not be found.</p>
                </div>
            );
        }
        return (
             <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6 border-b pb-4">{content.title}</h2>
                
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Explanation</h3>
                    <div className="space-y-4 text-slate-700 leading-relaxed">
                        {content.explanation.map((paragraph, index) => (
                            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Examples</h3>
                    <div className="space-y-5">
                        {content.examples.map((example, index) => (
                            <div key={index} className="p-4 bg-slate-50 border-l-4 border-blue-500 rounded-r-lg">
                                <p className="font-mono text-slate-800" dangerouslySetInnerHTML={{ __html: example.sentence }} />
                                <p className="text-sm text-slate-500 italic mt-1">{example.translation}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {content.interactiveExercise === 'determiner_clicker' && renderDeterminerClicker()}
            </div>
        )
    };
    
     useEffect(() => {
        if (questions.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const intersectingEntry = entries.find(entry => entry.isIntersecting);
                if (intersectingEntry) {
                    setCurrentQuestionIdInView(intersectingEntry.target.id);
                }
            },
            { 
                rootMargin: '0px 0px -80% 0px',
                threshold: 0.1
            }
        );

        const refs = questionRefs.current;
        const validRefs = Object.values(refs).filter(ref => ref !== null) as HTMLDivElement[];
        validRefs.forEach((ref) => observer.observe(ref));

        return () => {
            validRefs.forEach((ref) => observer.unobserve(ref));
        };
    }, [questions]);
    
    const hasQuizzes = quizLevels.length > 0;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <button onClick={selectedLevel ? handleBackToLevelSelect : onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    {selectedLevel ? `Back to ${topic} Quizzes` : 'Back to All Topics'}
                </button>
                {hasQuizzes ? (
                    selectedLevel ? renderQuizView() : renderLevelSelection()
                ) : (
                    renderOriginalContent()
                )}
            </div>
        </div>
    );
};

export default GrammarTopicScreen;