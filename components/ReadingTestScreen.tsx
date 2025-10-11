import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { ReadingTestData, QuestionOption, ReadingQuestion } from '../types';
import { CheckCircleIcon, XCircleIcon, ArrowLeftIcon } from './icons';
import Timer from './Timer';
import QuestionPalette from './QuestionPalette';
import AddVocabPopup from './AddVocabPopup';
import { useWordSelection } from './useWordSelection';

interface ReadingTestScreenProps {
  testData: ReadingTestData;
  onBack: () => void;
  durationInSeconds?: number | null;
}

interface UserAnswers {
    [questionId: string]: QuestionOption | null;
}

const ReadingTestScreen: React.FC<ReadingTestScreenProps> = ({ testData, onBack, durationInSeconds }) => {
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentQuestionIdInView, setCurrentQuestionIdInView] = useState<string | null>(null);
    const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
    const contentRef = useRef<HTMLDivElement>(null);
    const { selectionPopup, toastMessage, handleMouseUp, handleSaveWord } = useWordSelection(contentRef);
    const isSubmittedRef = useRef(false);

    const allQuestions = useMemo(() => testData.passages.flatMap(p => p.questions), [testData.passages]);
    const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const handleMarkForReview = (questionId: string) => {
        if (isSubmitted) return;
        setMarkedForReview(prev => {
            const newSet = new Set(prev);
            if (newSet.has(questionId)) {
                newSet.delete(questionId);
            } else {
                newSet.add(questionId);
            }
            return newSet;
        });
    };

    const handleSubmit = useCallback(() => {
        if (isSubmittedRef.current) return;
        isSubmittedRef.current = true;
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleTimeUp = useCallback(() => {
        alert("Time's up! Your answers will be submitted automatically.");
        handleSubmit();
    }, [handleSubmit]);
    
    const handleTryAgain = () => {
        setIsSubmitted(false);
        isSubmittedRef.current = false;
        setUserAnswers({});
        setMarkedForReview(new Set());
    };
    
    const handleAnswerSelect = (questionId: string, option: QuestionOption) => {
        if (isSubmitted) return;
        setUserAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    const getOptionClasses = (question: ReadingQuestion, option: QuestionOption) => {
        if (!isSubmitted) return 'bg-white border-slate-300 hover:border-blue-400';

        const isCorrect = option === question.correctAnswer;
        const isSelected = userAnswers[question.id] === option;

        if (isCorrect) return 'bg-green-100 border-green-500';
        if (isSelected && !isCorrect) return 'bg-red-100 border-red-500';
        return 'bg-white border-slate-300';
    };
    
    const handleQuestionSelect = (index: number) => {
        const questionId = allQuestions[index]?.id;
        if (questionId && questionRefs.current[questionId]) {
            questionRefs.current[questionId]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    useEffect(() => {
        if (allQuestions.length > 0) {
            setCurrentQuestionIdInView(allQuestions[0].id);
        }
        
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setCurrentQuestionIdInView(entry.target.id);
                        // We only care about the first one that's intersecting from the top.
                        return;
                    }
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
    }, [allQuestions]);

    if (testData.passages.length === 0) {
        return (
             <div className="container mx-auto px-4 py-12 text-center">
                 <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Practice Setup
                </button>
                <h2 className="text-2xl font-bold text-slate-700">{testData.title}</h2>
                <p className="mt-4 text-slate-600">This test is currently empty. Content will be added soon!</p>
            </div>
        )
    }

    const currentQuestionIndex = allQuestions.findIndex(q => q.id === currentQuestionIdInView);
    const isPart7 = testData.part === 7 || (testData.part === 0 && testData.passages.some(p => p.questions.some(q => parseInt(q.id, 10) >= 147)));

    const renderSidebar = () => (
        <div className="w-full lg:w-[280px] flex-shrink-0">
            <div className="lg:sticky top-24 self-start space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <button onClick={onBack} className="mb-4 w-full text-left inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Back to Practice Setup
                    </button>
                    
                    {durationInSeconds != null ? (
                        <Timer initialTime={durationInSeconds} onTimeUp={handleTimeUp} />
                    ) : (
                            <div className="text-center p-2 text-slate-500 font-semibold">Untimed Practice</div>
                    )}

                    <div className="text-center mt-4">
                        {!isSubmitted ? (
                            <button onClick={() => { if(window.confirm('Are you sure you want to submit?')) handleSubmit(); }} className="w-full px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-200">
                                Check Answers
                            </button>
                        ) : (
                            <button onClick={handleTryAgain} className="w-full px-8 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors duration-200">
                                Try Again
                            </button>
                        )}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold mb-4">Question Palette</h3>
                    <QuestionPalette 
                        questions={allQuestions}
                        answers={userAnswers}
                        currentQuestionIndex={currentQuestionIndex > -1 ? currentQuestionIndex : 0}
                        onQuestionSelect={handleQuestionSelect}
                        markedForReview={markedForReview}
                    />
                </div>
            </div>
        </div>
    );
    
    // Original layout for Part 5 and 6
    const renderOriginalLayout = () => (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 min-w-0">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200" ref={contentRef} onMouseUp={handleMouseUp}>
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">{testData.title}</h2>
                    {testData.passages.map((passage, pIndex) => (
                        <div key={passage.id} className={pIndex > 0 ? 'mt-12 pt-8 border-t-2 border-slate-200' : ''}>
                            {passage.text && (
                                <div className="mb-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                                        Questions {passage.questions[0].id}-{passage.questions[passage.questions.length - 1].id} refer to the following text.
                                    </h3>
                                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{passage.text}</p>
                                </div>
                            )}
                            <div className="space-y-8">
                                {passage.questions.map((q) => (
                                    <div key={q.id} id={q.id} ref={el => { if (el) questionRefs.current[q.id] = el; }} className="scroll-mt-24">
                                        <p className="text-lg text-slate-800 mb-4 font-semibold flex items-baseline">
                                            <button
                                                onClick={() => handleMarkForReview(q.id)}
                                                className={`font-semibold rounded-md px-2 py-0.5 transition-colors mr-2 ${
                                                    markedForReview.has(q.id)
                                                    ? 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300'
                                                    : isSubmitted ? 'bg-transparent' : 'bg-slate-100 hover:bg-slate-200'
                                                }`}
                                                aria-label={`Mark question ${q.id} for review`}
                                                disabled={isSubmitted}
                                            >
                                                {q.id}.
                                            </button>
                                            <span>{q.questionText}</span>
                                        </p>
                                        <div className="space-y-3">
                                            {(Object.keys(q.options) as QuestionOption[]).map(optionKey => (
                                                <label key={optionKey} className={`flex items-start p-4 border rounded-lg transition-all duration-200 ${!isSubmitted ? 'cursor-pointer' : ''} ${getOptionClasses(q, optionKey)}`}>
                                                    <div className="flex-shrink-0 mt-1">
                                                        {isSubmitted && userAnswers[q.id] === optionKey && userAnswers[q.id] !== q.correctAnswer && <XCircleIcon className="h-5 w-5 text-red-600"/>}
                                                        {isSubmitted && optionKey === q.correctAnswer && <CheckCircleIcon className="h-5 w-5 text-green-600"/>}
                                                        {!isSubmitted && (
                                                            <input 
                                                                type="radio" 
                                                                name={`question-${q.id}`} 
                                                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                                checked={userAnswers[q.id] === optionKey}
                                                                onChange={() => handleAnswerSelect(q.id, optionKey)}
                                                            />
                                                        )}
                                                    </div>
                                                    <span className="ml-4 text-base text-slate-700"><span className="font-bold">{optionKey}.</span> {q.options[optionKey]}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {renderSidebar()}
        </div>
    );
    
    // New 2-column block layout for Part 7
    const renderPart7Layout = () => (
        <div className="flex flex-col lg:flex-row-reverse gap-8">
            {renderSidebar()}
            <div className="flex-1 min-w-0" onMouseUp={handleMouseUp}>
                <div className="space-y-8" ref={contentRef}>
                    {testData.passages.map((passage) => (
                        <div key={passage.id} className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-xl shadow-lg border border-slate-200 scroll-mt-24" id={`passage-${passage.id}`}>
                            {/* Left Column: Passage */}
                            <div className="flex-1 prose prose-slate max-w-none">
                                {passage.text && (
                                    <>
                                        <h3 className="text-base font-semibold text-slate-800 not-prose">
                                            Questions {passage.questions[0].id}-{passage.questions[passage.questions.length - 1].id} refer to the following text.
                                        </h3>
                                        <div className="text-slate-700 leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: passage.text.replace(/^---$/gm, '<hr class="my-4 border-slate-200" />') }}/>
                                    </>
                                )}
                            </div>
                            {/* Right Column: Questions */}
                            <div className="md:w-[450px] lg:w-[400px] xl:w-[450px] flex-shrink-0 space-y-4">
                                {passage.questions.map((q) => (
                                    <div key={q.id} id={q.id} ref={el => { if (el) questionRefs.current[q.id] = el; }} className="scroll-mt-24 p-4 rounded-lg bg-slate-50 border border-slate-200">
                                        <p className="text-base text-slate-800 mb-3 font-semibold flex items-baseline">
                                            <button
                                                onClick={() => handleMarkForReview(q.id)}
                                                className={`font-semibold rounded-md px-2 py-0.5 transition-colors mr-2 ${
                                                    markedForReview.has(q.id)
                                                    ? 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300'
                                                    : isSubmitted ? 'bg-transparent' : 'bg-slate-200 hover:bg-slate-300'
                                                }`}
                                                aria-label={`Mark question ${q.id} for review`}
                                                disabled={isSubmitted}
                                            >
                                                {q.id}.
                                            </button>
                                            <span>{q.questionText}</span>
                                        </p>
                                        <div className="space-y-2">
                                            {(Object.keys(q.options) as QuestionOption[]).map(optionKey => (
                                                <label key={optionKey} className={`flex items-start p-3 border rounded-lg transition-all duration-200 text-sm ${!isSubmitted ? 'cursor-pointer' : ''} ${getOptionClasses(q, optionKey)}`}>
                                                    <div className="flex-shrink-0 mt-1 mr-3">
                                                        {isSubmitted && userAnswers[q.id] === optionKey && userAnswers[q.id] !== q.correctAnswer && <XCircleIcon className="h-5 w-5 text-red-600"/>}
                                                        {isSubmitted && optionKey === q.correctAnswer && <CheckCircleIcon className="h-5 w-5 text-green-600"/>}
                                                        {!isSubmitted && (
                                                            <input 
                                                                type="radio" 
                                                                name={`question-${q.id}`} 
                                                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                                checked={userAnswers[q.id] === optionKey}
                                                                onChange={() => handleAnswerSelect(q.id, optionKey)}
                                                            />
                                                        )}
                                                    </div>
                                                    <span className="flex-1 text-slate-700"><span className="font-bold">{optionKey}.</span> {q.options[optionKey]}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {toastMessage && (
                <div className="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
                    {toastMessage}
                </div>
            )}
            {selectionPopup && <AddVocabPopup top={selectionPopup.top} left={selectionPopup.left} onSave={handleSaveWord} />}
            
            {isPart7 ? renderPart7Layout() : renderOriginalLayout()}
        </div>
    );
};

export default ReadingTestScreen;