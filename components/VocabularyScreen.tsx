
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getVocabularyList, getWordsForReview, updateWordSrsLevel, deleteVocabularyWord } from '../services/vocabularyService';
import { VocabularyWord, VocabularyPart } from '../types';
import { LoadingIcon, BrainIcon, BookOpenIcon, TrashIcon, LightBulbIcon } from './icons';
import { vocabularyData } from '../services/vocabularyLibrary';
import SelectionCard from './SelectionCard';

type InternalView = 'main_hub' | 'srs_hub' | 'srs_review' | 'srs_list';

interface VocabularyScreenProps {
    onSelectPart: (partId: number) => void;
}

const VocabularyScreen: React.FC<VocabularyScreenProps> = ({ onSelectPart }) => {
    const [view, setView] = useState<InternalView>('main_hub');
    const [allWords, setAllWords] = useState<VocabularyWord[]>([]);
    const [reviewQueue, setReviewQueue] = useState<VocabularyWord[]>([]);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [isDefinitionVisible, setIsDefinitionVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const loadSrsWords = useCallback(async () => {
        setIsLoading(true);
        const words = await getVocabularyList();
        setAllWords(words);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (view !== 'main_hub') {
            loadSrsWords();
        } else {
            setIsLoading(false);
        }
    }, [view, loadSrsWords]);
    
    const wordsDueForReview = useMemo(() => getWordsForReview(allWords), [allWords]);

    const startReviewSession = () => {
        setReviewQueue(wordsDueForReview);
        setCurrentReviewIndex(0);
        setIsDefinitionVisible(false);
        setView('srs_review');
    };

    const handleReviewAction = async (performance: 'hard' | 'good' | 'easy') => {
        if (currentReviewIndex >= reviewQueue.length) return;
        const currentWord = reviewQueue[currentReviewIndex];
        await updateWordSrsLevel(currentWord.id, performance);
        
        if (currentReviewIndex + 1 < reviewQueue.length) {
            setCurrentReviewIndex(prev => prev + 1);
            setIsDefinitionVisible(false);
        } else {
            // End of session, go back to hub which will trigger a refetch
            setView('srs_hub');
        }
    };
    
    const handleDeleteWord = async (wordId: string) => {
        if (window.confirm("Are you sure you want to delete this word? This action cannot be undone.")) {
            await deleteVocabularyWord(wordId);
            loadSrsWords(); // Refetch the list
        }
    };
    
    const renderSrsHub = () => (
        <div className="max-w-4xl mx-auto">
             <button onClick={() => setView('main_hub')} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to Vocabulary Hub
            </button>
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">My Flashcards (SRS)</h2>
                <p className="mt-4 text-lg text-slate-600">
                    Master your personally saved vocabulary with smart flashcards.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-12">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                    <p className="text-5xl font-bold text-blue-600">{wordsDueForReview.length}</p>
                    <p className="text-slate-600 font-semibold mt-1">Words to Review</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                    <p className="text-5xl font-bold text-slate-800">{allWords.length}</p>
                    <p className="text-slate-600 font-semibold mt-1">Total Words Saved</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                    <p className="text-5xl font-bold text-green-600">{allWords.filter(w => w.srsLevel > 0).length}</p>
                    <p className="text-slate-600 font-semibold mt-1">Words Learned</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <button
                    onClick={startReviewSession}
                    disabled={wordsDueForReview.length === 0}
                    className="flex-1 flex flex-col items-center justify-center p-8 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    <BrainIcon className="h-12 w-12 mb-3" />
                    <span className="text-2xl font-bold">Start Review Session</span>
                    <span className="text-blue-200">{wordsDueForReview.length > 0 ? `${wordsDueForReview.length} words due` : 'All caught up!'}</span>
                </button>
                <button
                    onClick={() => setView('srs_list')}
                    className="flex-1 flex flex-col items-center justify-center p-8 bg-white text-slate-800 rounded-xl shadow-lg hover:bg-slate-100 transition-all duration-300 border border-slate-200"
                >
                    <BookOpenIcon className="h-12 w-12 mb-3 text-slate-500" />
                    <span className="text-2xl font-bold">View All Saved Words</span>
                    <span className="text-slate-500">{allWords.length} words saved</span>
                </button>
            </div>
        </div>
    );
    
    const renderSrsReviewSession = () => {
        if (reviewQueue.length === 0) {
            return (
                <div className="text-center max-w-xl mx-auto">
                    <h3 className="text-2xl font-bold text-slate-800">All Done!</h3>
                    <p className="text-slate-600 mt-2">You have no words to review right now. Come back later!</p>
                    <button onClick={() => setView('srs_hub')} className="mt-8 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Back to My Flashcards</button>
                </div>
            );
        }

        const currentWord = reviewQueue[currentReviewIndex];

        return (
            <div className="max-w-2xl mx-auto">
                 <div className="flex justify-between items-center mb-4">
                    <button onClick={() => setView('srs_hub')} className="text-blue-600 font-semibold hover:underline">Exit Session</button>
                    <span className="text-slate-600 font-bold">{currentReviewIndex + 1} / {reviewQueue.length}</span>
                </div>

                <div className="relative bg-white rounded-xl shadow-2xl border border-slate-200 p-8 min-h-[350px] flex flex-col items-center justify-center text-center transition-all duration-500">
                   <h3 className="text-5xl font-bold text-slate-800 tracking-tight">{currentWord.word}</h3>
                   
                   {isDefinitionVisible && (
                       <div className="mt-6 w-full animate-fade-in">
                          <p className="text-xl text-slate-700">{currentWord.definition}</p>
                          {currentWord.sourceText && (
                              <p className="text-sm text-slate-500 italic mt-4 bg-slate-50 p-3 rounded-md">
                                  {currentWord.sourceText}
                              </p>
                          )}
                       </div>
                   )}
                </div>

                <div className="mt-8">
                {!isDefinitionVisible ? (
                     <button onClick={() => setIsDefinitionVisible(true)} className="w-full flex items-center justify-center p-4 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">
                        <LightBulbIcon className="h-6 w-6 mr-2" />
                         Show Definition
                     </button>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button onClick={() => handleReviewAction('hard')} className="p-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors">Hard</button>
                        <button onClick={() => handleReviewAction('good')} className="p-4 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors">Good</button>
                        <button onClick={() => handleReviewAction('easy')} className="p-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">Easy</button>
                    </div>
                )}
                </div>
            </div>
        );
    };

    const renderSrsWordList = () => (
        <div className="max-w-4xl mx-auto">
             <button onClick={() => setView('srs_hub')} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to My Flashcards
            </button>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">All Saved Words ({allWords.length})</h2>
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <ul className="divide-y divide-slate-200">
                    {allWords.length > 0 ? allWords.map(word => (
                        <li key={word.id} className="p-4 md:p-6 flex justify-between items-start hover:bg-slate-50">
                            <div>
                                <h4 className="text-lg font-bold text-slate-800">{word.word}</h4>
                                <p className="text-slate-600 mt-1">{word.definition}</p>
                                <p className="text-xs text-slate-400 mt-2">
                                    Next Review: {new Date(word.nextReviewDate).toLocaleDateString()} (Level {word.srsLevel})
                                </p>
                            </div>
                            <button 
                                onClick={() => handleDeleteWord(word.id)} 
                                className="ml-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                aria-label={`Delete ${word.word}`}
                            >
                                <TrashIcon className="h-5 w-5"/>
                            </button>
                        </li>
                    )) : (
                        <li className="p-8 text-center text-slate-500">You haven't saved any words yet. Select text during a test to save it!</li>
                    )}
                </ul>
            </div>
        </div>
    );
    
    const renderMainHub = () => (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Vocabulary Hub</h2>
                <p className="mt-4 text-lg text-slate-600">
                    Choose a structured learning path or review your personal flashcards.
                </p>
            </div>

            <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">Practice by Part</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {vocabularyData.map(part => (
                        <SelectionCard 
                            key={part.id}
                            title={part.title}
                            description={part.description}
                            onClick={() => onSelectPart(part.id)}
                        />
                    ))}
                </div>
            </div>

            <div className="text-center">
                 <div className="bg-blue-50 p-6 rounded-xl shadow-lg border border-blue-200 inline-block">
                     <h3 className="text-xl font-bold text-slate-800 mb-2">My Personal Flashcards</h3>
                     <p className="text-slate-600 text-sm mb-4">Review words you've saved using our Spaced Repetition System.</p>
                     <button
                        onClick={() => setView('srs_hub')}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Go to My Flashcards
                    </button>
                 </div>
            </div>
        </div>
    );

    const renderContent = () => {
        if (isLoading) {
            return <div className="flex justify-center"><LoadingIcon className="h-10 w-10 text-blue-600 animate-spin"/></div>
        }
        switch (view) {
            case 'main_hub':
                return renderMainHub();
            case 'srs_hub':
                return renderSrsHub();
            case 'srs_review':
                return renderSrsReviewSession();
            case 'srs_list':
                return renderSrsWordList();
            default:
                return renderMainHub();
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {renderContent()}
        </div>
    );
};

export default VocabularyScreen;
