import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { VocabularyTest, VocabItem } from '../types';
import { updateWordSrsLevel } from '../services/vocabularyService';
import { BookOpenIcon, BrainIcon, ShuffleIcon, ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, XCircleIcon, GridIcon, PuzzleIcon, TypeIcon, LightBulbIcon, HeadphoneIcon, TargetIcon, LinkIcon, FlipIcon, LoadingIcon, RefreshIcon } from './icons';
import AudioPlayer from './AudioPlayer';

type StudyMode = 'flashcards' | 'quiz' | 'matching_game' | 'scrambler' | 'spelling_recall' | 'audio_dictation' | 'definition_match';

interface QuizQuestion {
    questionText: string; // The definition
    options: string[]; // Array of words
    correctAnswer: string; // The correct word
    userAnswer: string | null;
    isCorrect: boolean | null;
}

interface ScramblerQuestion {
    scrambled: string;
    original: VocabItem;
    userAnswer: string;
    isCorrect: boolean | null;
}

interface SpellingQuestion {
    original: VocabItem;
    userAnswer: string;
    isCorrect: boolean | null;
    revealedCount: number;
}

interface AudioDictationQuestion {
    original: VocabItem;
    userAnswer: string;
    isCorrect: boolean | null;
    meaningRevealed: boolean;
}

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

const WORDS_PER_MATCHING_TURN = 6;
type MatchingItem = { item: VocabItem; type: 'word' | 'definition' };

const WORDS_PER_DMATCH_TURN = 8;
type DMatchItemType = { item: VocabItem; type: 'word' | 'definition' };


const VocabularyTestScreen: React.FC<{ testData: VocabularyTest, onBack: () => void }> = ({ testData, onBack }) => {
    const wordsForSession = useMemo(() => {
        const words = testData.words;
        if (words.length > 50) {
            return shuffleArray(words).slice(0, 50);
        }
        return words;
    }, [testData.words]);

    const [mode, setMode] = useState<StudyMode>('flashcards');
    const [deck, setDeck] = useState<VocabItem[]>(wordsForSession);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isQuizSessionFinished, setIsQuizSessionFinished] = useState(false);

    // State for matching game
    const [fullMatchingDeck, setFullMatchingDeck] = useState<VocabItem[]>([]);
    const [matchingTurn, setMatchingTurn] = useState(0);
    const [currentTurnItems, setCurrentTurnItems] = useState<VocabItem[]>([]);
    const [matchingGridItems, setMatchingGridItems] = useState<MatchingItem[]>([]);
    const [selectedMatchingItem, setSelectedMatchingItem] = useState<MatchingItem | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
    const [incorrectPairItems, setIncorrectPairItems] = useState<{ item1: MatchingItem, item2: MatchingItem } | null>(null);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [isTurnFinished, setIsTurnFinished] = useState(false);

    // State for scrambler game
    const [scramblerQuestions, setScramblerQuestions] = useState<ScramblerQuestion[]>([]);
    const [currentScramblerIndex, setCurrentScramblerIndex] = useState(0);
    const [scramblerScore, setScramblerScore] = useState(0);
    const [isScramblerSessionFinished, setIsScramblerSessionFinished] = useState(false);

    // State for spelling recall game
    const [spellingQuestions, setSpellingQuestions] = useState<SpellingQuestion[]>([]);
    const [currentSpellingIndex, setCurrentSpellingIndex] = useState(0);
    const [spellingScore, setSpellingScore] = useState(0);
    const [isSpellingSessionFinished, setIsSpellingSessionFinished] = useState(false);

    // State for audio dictation game
    const [audioDictationQuestions, setAudioDictationQuestions] = useState<AudioDictationQuestion[]>([]);
    const [currentAudioDictationIndex, setCurrentAudioDictationIndex] = useState(0);
    const [audioDictationScore, setAudioDictationScore] = useState(0);
    const [isAudioDictationSessionFinished, setIsAudioDictationSessionFinished] = useState(false);

    // State for Definition Match
    const [fullDMatchDeck, setFullDMatchDeck] = useState<VocabItem[]>([]);
    const [dMatchTurn, setDMatchTurn] = useState(0);
    const [dMatchWords, setDMatchWords] = useState<DMatchItemType[]>([]);
    const [dMatchDefinitions, setDMatchDefinitions] = useState<DMatchItemType[]>([]);
    const [selectedDMatchWord, setSelectedDMatchWord] = useState<DMatchItemType | null>(null);
    const [correctDMatches, setCorrectDMatches] = useState<string[]>([]); // array of word strings
    const [incorrectDMatchPair, setIncorrectDMatchPair] = useState<string[] | null>(null); // [word, definition]
    const [isDMatchGameFinished, setIsDMatchGameFinished] = useState(false);
    const [isDMatchTurnFinished, setIsDMatchTurnFinished] = useState(false);

    const generateQuizQuestions = useCallback(() => {
        const shuffledWords = shuffleArray(wordsForSession);
        const questions = shuffledWords.map((correctItem: VocabItem) => {
            const distractors = shuffleArray(wordsForSession.filter((w: VocabItem) => w.word !== correctItem.word)).slice(0, 3).map((d: VocabItem) => d.word);
            const options = shuffleArray([correctItem.word, ...distractors]);
            return {
                questionText: correctItem.definition,
                options: options,
                correctAnswer: correctItem.word,
                userAnswer: null,
                isCorrect: null,
            };
        });
        setQuizQuestions(questions);
    }, [wordsForSession]);
    
    const startQuizSession = useCallback(() => {
        generateQuizQuestions();
        setCurrentQuizIndex(0);
        setScore(0);
        setIsQuizSessionFinished(false);
    }, [generateQuizQuestions]);

    const setupMatchingTurn = useCallback((deck: VocabItem[], turn: number) => {
        const startIndex = turn * WORDS_PER_MATCHING_TURN;
        const turnItems = deck.slice(startIndex, startIndex + WORDS_PER_MATCHING_TURN);

        if (turnItems.length === 0) {
            setIsGameFinished(true);
            return;
        }

        const wordsForGrid = turnItems.map(item => ({ item, type: 'word' as const }));
        const defsForGrid = turnItems.map(item => ({ item, type: 'definition' as const }));
        
        setMatchingGridItems(shuffleArray([...wordsForGrid, ...defsForGrid]));
        setCurrentTurnItems(turnItems);
        
        setMatchingTurn(turn);
        setSelectedMatchingItem(null);
        setMatchedPairs([]);
        setIncorrectPairItems(null);
        setIsGameFinished(false);
        setIsTurnFinished(false);
    }, []);

    const startMatchingGame = useCallback(() => {
        const shuffledDeck = shuffleArray(wordsForSession);
        setFullMatchingDeck(shuffledDeck);
        setupMatchingTurn(shuffledDeck, 0);
    }, [wordsForSession, setupMatchingTurn]);
    
    const scrambleWord = (word: string): string => {
        if (word.length <= 1) return word;
        let scrambled: string;
        let attempts = 0;
        do {
            scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
            attempts++;
        } while (scrambled === word && attempts < 10); // Prevent infinite loop on short words
        return scrambled;
    };

    const generateScramblerQuestions = useCallback(() => {
        const shuffledWords = shuffleArray(wordsForSession);
        const questions = shuffledWords.map((item: VocabItem) => ({
            scrambled: scrambleWord(item.word),
            original: item,
            userAnswer: '',
            isCorrect: null,
        }));
        setScramblerQuestions(questions);
    }, [wordsForSession]);

    const startScramblerGame = useCallback(() => {
        generateScramblerQuestions();
        setCurrentScramblerIndex(0);
        setScramblerScore(0);
        setIsScramblerSessionFinished(false);
    }, [generateScramblerQuestions]);

    const handleShuffleScrambler = useCallback(() => {
        const unansweredQuestions = scramblerQuestions.slice(currentScramblerIndex).filter(q => q.isCorrect === null);
        if (unansweredQuestions.length < 2) {
            setToastMessage("Not enough words left to shuffle!");
            setTimeout(() => setToastMessage(null), 2000);
            return;
        }
    
        setScramblerQuestions(prev => {
            const currentItem = prev[currentScramblerIndex];
            const remainingItems = [
                ...prev.slice(0, currentScramblerIndex),
                ...prev.slice(currentScramblerIndex + 1)
            ];
            return [...remainingItems, currentItem];
        });
    }, [scramblerQuestions, currentScramblerIndex]);

    const generateSpellingQuestions = useCallback(() => {
        const shuffledWords = shuffleArray(wordsForSession);
        const questions = shuffledWords.map((item: VocabItem) => ({
            original: item,
            userAnswer: '',
            isCorrect: null,
            revealedCount: 0,
        }));
        setSpellingQuestions(questions);
    }, [wordsForSession]);

    const startSpellingGame = useCallback(() => {
        generateSpellingQuestions();
        setCurrentSpellingIndex(0);
        setSpellingScore(0);
        setIsSpellingSessionFinished(false);
    }, [generateSpellingQuestions]);
    
    const generateAudioDictationQuestions = useCallback(() => {
        const shuffledWords = shuffleArray(wordsForSession);
        const questions = shuffledWords.map((item: VocabItem) => ({
            original: item,
            userAnswer: '',
            isCorrect: null,
            meaningRevealed: false,
        }));
        setAudioDictationQuestions(questions);
    }, [wordsForSession]);

    const startAudioDictationGame = useCallback(() => {
        generateAudioDictationQuestions();
        setCurrentAudioDictationIndex(0);
        setAudioDictationScore(0);
        setIsAudioDictationSessionFinished(false);
    }, [generateAudioDictationQuestions]);

    const setupDMatchTurn = useCallback((deck: VocabItem[], turn: number) => {
        const startIndex = turn * WORDS_PER_DMATCH_TURN;
        const turnItems = deck.slice(startIndex, startIndex + WORDS_PER_DMATCH_TURN);

        if (turnItems.length === 0) {
            setIsDMatchGameFinished(true);
            return;
        }
        
        setDMatchWords(turnItems.map(item => ({ item, type: 'word' as const })));
        setDMatchDefinitions(shuffleArray(turnItems).map(item => ({ item, type: 'definition' as const })));
        
        setFullDMatchDeck(deck);
        setDMatchTurn(turn);
        setSelectedDMatchWord(null);
        setCorrectDMatches([]);
        setIncorrectDMatchPair(null);
        setIsDMatchGameFinished(false);
        setIsDMatchTurnFinished(false);
    }, []);

    const startDMatchGame = useCallback(() => {
        const shuffledDeck = shuffleArray(wordsForSession);
        setupDMatchTurn(shuffledDeck, 0);
    }, [wordsForSession, setupDMatchTurn]);
    
    useEffect(() => {
        setDeck(wordsForSession);
        setCurrentCardIndex(0);
        setIsFlipped(false);
        if (mode === 'quiz') startQuizSession();
        if (mode === 'matching_game') startMatchingGame();
        if (mode === 'scrambler') startScramblerGame();
        if (mode === 'spelling_recall') startSpellingGame();
        if (mode === 'audio_dictation') startAudioDictationGame();
        if (mode === 'definition_match') startDMatchGame();
    }, [mode, wordsForSession, startQuizSession, startMatchingGame, startScramblerGame, startSpellingGame, startAudioDictationGame, startDMatchGame]);
    
    const handleWordPractice = useCallback((word: VocabItem, performance: 'good' | 'hard') => {
        const wordId = word.word.toLowerCase();
        updateWordSrsLevel(wordId, performance, word, `From '${testData.title}' list.`);
    }, [testData.title]);
    
    const handleNextCard = () => {
        setIsFlipped(false);
        setCurrentCardIndex(prev => (prev + 1) % deck.length);
    };

    const handlePrevCard = () => {
        setIsFlipped(false);
        setCurrentCardIndex(prev => (prev - 1 + deck.length) % deck.length);
    };

    const handleShuffle = () => {
        setDeck(shuffleArray(deck));
        setCurrentCardIndex(0);
        setIsFlipped(false);
    };
    
    const handleQuizAnswer = (selectedOption: string) => {
        if (quizQuestions[currentQuizIndex].userAnswer !== null) return;

        const currentQuestion = quizQuestions[currentQuizIndex];
        const isCorrect = selectedOption === currentQuestion.correctAnswer;

        if (isCorrect) {
            setScore(prev => prev + 1);
        }
        
        const vocabItem = wordsForSession.find(w => w.word === currentQuestion.correctAnswer);
        if (vocabItem) {
            handleWordPractice(vocabItem, isCorrect ? 'good' : 'hard');
        }

        const updatedQuestions = [...quizQuestions];
        updatedQuestions[currentQuizIndex] = { ...currentQuestion, userAnswer: selectedOption, isCorrect };
        setQuizQuestions(updatedQuestions);

        setTimeout(() => {
            if (currentQuizIndex + 1 < quizQuestions.length) {
                setCurrentQuizIndex(prev => prev + 1);
            } else {
                setIsQuizSessionFinished(true);
            }
        }, 1500);
    };
    
    const handleMatchingItemSelect = (clickedItem: MatchingItem) => {
        if (matchedPairs.includes(clickedItem.item.word) || incorrectPairItems) return;

        if (!selectedMatchingItem) {
            setSelectedMatchingItem(clickedItem);
        } else {
            if (selectedMatchingItem.item.word === clickedItem.item.word && selectedMatchingItem.type !== clickedItem.type) {
                // Match
                const newMatchedPairs = [...matchedPairs, clickedItem.item.word];
                setMatchedPairs(newMatchedPairs);
                setSelectedMatchingItem(null);
                if (newMatchedPairs.length === currentTurnItems.length) {
                    setIsTurnFinished(true);
                }
            } else {
                // Mismatch
                setIncorrectPairItems({ item1: selectedMatchingItem, item2: clickedItem });
                setSelectedMatchingItem(null);
                setTimeout(() => {
                    setIncorrectPairItems(null);
                }, 1000);
            }
        }
    };

    // Scrambler handlers
    const handleScramblerInputChange = (index: number, value: string) => {
        const newQuestions = [...scramblerQuestions];
        newQuestions[index].userAnswer = value;
        setScramblerQuestions(newQuestions);
    };

    const handleScramblerSubmit = (index: number) => {
        const question = scramblerQuestions[index];
        const isCorrect = question.userAnswer.trim().toLowerCase() === question.original.word.toLowerCase();
        
        const newQuestions = [...scramblerQuestions];
        newQuestions[index].isCorrect = isCorrect;
        setScramblerQuestions(newQuestions);
        
        if(isCorrect) setScramblerScore(s => s + 1);

        setTimeout(() => {
            if (currentScramblerIndex + 1 < scramblerQuestions.length) {
                setCurrentScramblerIndex(prev => prev + 1);
            } else {
                setIsScramblerSessionFinished(true);
            }
        }, 1000);
    };
    
    // Spelling Recall handlers
    const handleSpellingInputChange = (index: number, value: string) => {
        const newQuestions = [...spellingQuestions];
        newQuestions[index].userAnswer = value;
        setSpellingQuestions(newQuestions);
    };

    const handleSpellingSubmit = (index: number) => {
        const question = spellingQuestions[index];
        const isCorrect = question.userAnswer.trim().toLowerCase() === question.original.word.toLowerCase();
        
        const newQuestions = [...spellingQuestions];
        newQuestions[index].isCorrect = isCorrect;
        setSpellingQuestions(newQuestions);
        
        if (isCorrect) {
            const points = question.original.word.length - question.revealedCount;
            setSpellingScore(s => s + Math.max(0, points));
        }

        setTimeout(() => {
             if (currentSpellingIndex + 1 < spellingQuestions.length) {
                setCurrentSpellingIndex(prev => prev + 1);
            } else {
                setIsSpellingSessionFinished(true);
            }
        }, 1200);
    };
    
    const handleRevealLetter = (index: number) => {
        setSpellingQuestions(prev => {
            const newQuestions = [...prev];
            const q = newQuestions[index];
            if (q.revealedCount < q.original.word.length) {
                q.revealedCount++;
                q.userAnswer = q.original.word.substring(0, q.revealedCount);
            }
            return newQuestions;
        });
    };

    const handleAudioDictationInputChange = (index: number, value: string) => {
        const newQuestions = [...audioDictationQuestions];
        newQuestions[index].userAnswer = value;
        setAudioDictationQuestions(newQuestions);
    };

    const handleAudioDictationSubmit = (index: number) => {
        const question = audioDictationQuestions[index];
        const isCorrect = question.userAnswer.trim().toLowerCase() === question.original.word.toLowerCase();
        
        const newQuestions = [...audioDictationQuestions];
        newQuestions[index].isCorrect = isCorrect;
        setAudioDictationQuestions(newQuestions);

        let points = 0;
        if (isCorrect) {
            points = question.meaningRevealed ? 1 : 2;
        }
        setAudioDictationScore(s => s + points);

        setTimeout(() => {
             if (currentAudioDictationIndex + 1 < audioDictationQuestions.length) {
                setCurrentAudioDictationIndex(prev => prev + 1);
            } else {
                setIsAudioDictationSessionFinished(true);
            }
        }, 1200);
    };

    const handleToggleMeaning = (index: number) => {
        setAudioDictationQuestions(prev => {
            const newQuestions = [...prev];
            newQuestions[index].meaningRevealed = !newQuestions[index].meaningRevealed;
            return newQuestions;
        })
    };

    // Definition Match handlers
    const handleDMatchWordSelect = (wordItem: DMatchItemType) => {
        if(correctDMatches.includes(wordItem.item.word)) return;
        setIncorrectDMatchPair(null);
        setSelectedDMatchWord(wordItem);
    };

    const handleDMatchDefinitionSelect = (defItem: DMatchItemType) => {
        if (!selectedDMatchWord || correctDMatches.includes(defItem.item.word)) return;

        if (selectedDMatchWord.item.word === defItem.item.word) {
            const newCorrect = [...correctDMatches, defItem.item.word];
            setCorrectDMatches(newCorrect);
            setSelectedDMatchWord(null);
            if (newCorrect.length === dMatchWords.length) {
                setIsDMatchTurnFinished(true);
            }
        } else {
            setIncorrectDMatchPair([selectedDMatchWord.item.word, defItem.item.definition]);
            setSelectedDMatchWord(null);
            setTimeout(() => setIncorrectDMatchPair(null), 1200);
        }
    };

    
    
    // RENDER FUNCTIONS FOR EACH MODE
    
    const renderFlashcards = () => {
        const currentCard = deck[currentCardIndex];
        return (
            <div>
                <div className="relative mb-6">
                    <div 
                        className={`w-full h-80 flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 transition-transform duration-500 cursor-pointer [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        {/* Front */}
                        <div className="absolute w-full h-full flex flex-col items-center justify-center p-8 [backface-visibility:hidden]">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Word</span>
                            <h3 className="text-5xl font-bold text-slate-800 dark:text-slate-100 tracking-tight text-center">{currentCard.word}</h3>
                        </div>
                        {/* Back */}
                        <div className="absolute w-full h-full flex flex-col items-center justify-center p-8 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                             <span className="text-sm text-slate-500 dark:text-slate-400">Definition</span>
                            <p className="text-xl text-slate-700 dark:text-slate-200 text-center">{currentCard.definition}</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                    <button onClick={handlePrevCard} className="p-4 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" aria-label="Previous card"><ArrowLeftIcon className="h-6 w-6" /></button>
                    <span className="font-semibold text-lg">{currentCardIndex + 1} / {deck.length}</span>
                    <button onClick={handleNextCard} className="p-4 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" aria-label="Next card"><ArrowRightIcon className="h-6 w-6" /></button>
                </div>

                 <div className="flex justify-center items-center gap-4 mt-8">
                     <button onClick={() => setIsFlipped(!isFlipped)} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600">
                        <FlipIcon className="h-5 w-5"/> Flip
                     </button>
                     <button onClick={handleShuffle} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600">
                        <ShuffleIcon className="h-5 w-5"/> Shuffle
                     </button>
                 </div>
            </div>
        );
    };

    const renderQuiz = () => {
        if (isQuizSessionFinished) {
            return (
                <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Quiz Complete!</h3>
                    <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 my-4">{Math.round((score / quizQuestions.length) * 100)}%</p>
                    <p className="text-lg text-slate-600 dark:text-slate-400">You got {score} out of {quizQuestions.length} correct.</p>
                    <button onClick={startQuizSession} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Try Again
                    </button>
                </div>
            );
        }

        const currentQuestion = quizQuestions[currentQuizIndex];
        if (!currentQuestion) return null;

        return (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Quiz</h3>
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{currentQuizIndex + 1} / {quizQuestions.length}</span>
                </div>
                <div className="mb-8 text-center bg-slate-50 dark:bg-slate-700/50 p-6 rounded-lg min-h-[120px] flex items-center justify-center">
                    <p className="text-2xl font-semibold text-slate-700 dark:text-slate-200">{currentQuestion.questionText}</p>
                </div>
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                        let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all font-semibold ";
                        if (currentQuestion.userAnswer) {
                            if (option === currentQuestion.correctAnswer) {
                                buttonClass += "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-300";
                            } else if (option === currentQuestion.userAnswer) {
                                buttonClass += "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-300";
                            } else {
                                buttonClass += "bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 opacity-60";
                            }
                        } else {
                             buttonClass += "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30";
                        }
                        return (
                            <button key={index} onClick={() => handleQuizAnswer(option)} disabled={!!currentQuestion.userAnswer} className={buttonClass}>
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderMatchingGame = () => {
         if (isGameFinished) {
            const totalTurns = Math.ceil(fullMatchingDeck.length / WORDS_PER_MATCHING_TURN);
            return (
                <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Matching Game Complete!</h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">You matched all {fullMatchingDeck.length} pairs in {totalTurns} turn{totalTurns > 1 ? 's' : ''}.</p>
                    <button onClick={startMatchingGame} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            );
        }

        return (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Matching Game</h3>
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Turn {matchingTurn + 1} / {Math.ceil(fullMatchingDeck.length / WORDS_PER_MATCHING_TURN)}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {matchingGridItems.map((gridItem, index) => {
                        const isSelected = selectedMatchingItem?.item.word === gridItem.item.word && selectedMatchingItem.type === gridItem.type;
                        const isMatched = matchedPairs.includes(gridItem.item.word);
                        const isIncorrect = (incorrectPairItems?.item1.item.word === gridItem.item.word && incorrectPairItems?.item1.type === gridItem.type) || (incorrectPairItems?.item2.item.word === gridItem.item.word && incorrectPairItems?.item2.type === gridItem.type);

                        let cardClass = "h-28 flex items-center justify-center p-3 text-center rounded-lg border-2 font-semibold transition-all duration-300 text-sm ";
                        if (isMatched) {
                            cardClass += "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-300 opacity-50 cursor-default";
                        } else if (isIncorrect) {
                            cardClass += "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-300 transform -translate-x-1";
                        } else if (isSelected) {
                            cardClass += "bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-300 scale-105 shadow-lg";
                        } else {
                            cardClass += "bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-600 cursor-pointer";
                        }

                        return (
                            <button key={index} onClick={() => handleMatchingItemSelect(gridItem)} className={cardClass} disabled={isMatched}>
                                {gridItem.type === 'word' ? gridItem.item.word : gridItem.item.definition}
                            </button>
                        );
                    })}
                </div>
                {isTurnFinished && (
                     <div className="text-center mt-6">
                        <button onClick={() => setupMatchingTurn(fullMatchingDeck, matchingTurn + 1)} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                            Next Turn
                        </button>
                    </div>
                )}
            </div>
        );
    };

    const renderScrambler = () => {
        if (isScramblerSessionFinished) {
            return (
                <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Game Over!</h3>
                    <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 my-4">{scramblerScore}</p>
                    <p className="text-lg text-slate-600 dark:text-slate-400">You unscrambled {scramblerScore} out of {scramblerQuestions.length} words correctly.</p>
                    <button onClick={startScramblerGame} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            );
        }

        const currentQuestion = scramblerQuestions[currentScramblerIndex];
        if (!currentQuestion) return null;

        let inputClass = "w-full text-center text-2xl font-bold tracking-widest uppercase p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700 dark:text-white ";
        if (currentQuestion.isCorrect === true) {
            inputClass += "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-700";
        } else if (currentQuestion.isCorrect === false) {
            inputClass += "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-700";
        } else {
            inputClass += "border-slate-300 dark:border-slate-600";
        }

        return (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Unscramble the Word</h3>
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{currentScramblerIndex + 1} / {scramblerQuestions.length}</span>
                </div>
                <div className="mb-6 text-center bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Definition:</p>
                    <p className="text-lg font-medium text-slate-700 dark:text-slate-200">{currentQuestion.original.definition}</p>
                </div>
                <p className="text-center text-4xl font-bold tracking-[0.5em] my-6 p-4 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg text-yellow-800 dark:text-yellow-200">{currentQuestion.scrambled}</p>
                <form onSubmit={(e) => { e.preventDefault(); handleScramblerSubmit(currentScramblerIndex); }}>
                    <input
                        type="text"
                        value={currentQuestion.userAnswer}
                        onChange={(e) => handleScramblerInputChange(currentScramblerIndex, e.target.value)}
                        className={inputClass}
                        autoComplete="off"
                        autoCapitalize="off"
                        disabled={currentQuestion.isCorrect !== null}
                    />
                    {currentQuestion.isCorrect === false && (
                        <p className="text-center text-green-600 font-bold mt-2">Correct answer: {currentQuestion.original.word}</p>
                    )}
                    <div className="mt-6 flex justify-between items-center">
                         <button type="button" onClick={handleShuffleScrambler} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors">
                            Shuffle
                        </button>
                        <button type="submit" className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50" disabled={currentQuestion.isCorrect !== null}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    };
    
    const renderSpellingRecall = () => {
        if (isSpellingSessionFinished) {
            const totalPossibleScore = spellingQuestions.reduce((sum, q) => sum + q.original.word.length, 0);
            return (
                <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Spelling Practice Complete!</h3>
                    <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 my-4">{spellingScore}</p>
                    <p className="text-lg text-slate-600 dark:text-slate-400">You scored {spellingScore} out of a possible {totalPossibleScore} points.</p>
                    <button onClick={startSpellingGame} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            );
        }
        const currentQuestion = spellingQuestions[currentSpellingIndex];
        if (!currentQuestion) return null;
    
        let inputClass = "w-full text-lg p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700 dark:text-white ";
        if (currentQuestion.isCorrect === true) {
            inputClass += "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-700";
        } else if (currentQuestion.isCorrect === false) {
            inputClass += "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-700";
        } else {
            inputClass += "border-slate-300 dark:border-slate-600";
        }
    
        return (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Spelling Recall</h3>
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{currentSpellingIndex + 1} / {spellingQuestions.length}</span>
                </div>
                <div className="mb-6 text-center bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Definition:</p>
                    <p className="text-lg font-medium text-slate-700 dark:text-slate-200">{currentQuestion.original.definition}</p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); handleSpellingSubmit(currentSpellingIndex); }}>
                     <input
                        type="text"
                        value={currentQuestion.userAnswer}
                        onChange={(e) => handleSpellingInputChange(currentSpellingIndex, e.target.value)}
                        className={inputClass}
                        autoComplete="off"
                        autoCapitalize="off"
                        disabled={currentQuestion.isCorrect !== null}
                        placeholder="Type the word..."
                    />
                     {currentQuestion.isCorrect === false && (
                        <p className="text-center text-green-600 font-bold mt-2">Correct spelling: {currentQuestion.original.word}</p>
                    )}
                     <div className="mt-6 flex justify-between items-center">
                        <button type="button" onClick={() => handleRevealLetter(currentSpellingIndex)} className="px-4 py-2 bg-yellow-400 text-yellow-900 font-semibold rounded-lg hover:bg-yellow-500 disabled:opacity-50" disabled={currentQuestion.isCorrect !== null || currentQuestion.revealedCount >= currentQuestion.original.word.length -1}>
                            Reveal Letter
                        </button>
                        <button type="submit" className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50" disabled={currentQuestion.isCorrect !== null}>
                            Check Spelling
                        </button>
                    </div>
                </form>
            </div>
        );
    };
    
    const renderAudioDictation = () => {
        if (isAudioDictationSessionFinished) {
            return (
                <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Audio Dictation Complete!</h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">You scored {audioDictationScore} out of a possible {audioDictationQuestions.length * 2} points.</p>
                    <button onClick={startAudioDictationGame} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            );
        }
        const currentQuestion = audioDictationQuestions[currentAudioDictationIndex];
        if (!currentQuestion) return null;
    
        let inputClass = "w-full text-lg p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700 dark:text-white ";
        if (currentQuestion.isCorrect === true) {
            inputClass += "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-700";
        } else if (currentQuestion.isCorrect === false) {
            inputClass += "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-700";
        } else {
            inputClass += "border-slate-300 dark:border-slate-600";
        }
        
        return (
             <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Audio Dictation</h3>
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{currentAudioDictationIndex + 1} / {audioDictationQuestions.length}</span>
                </div>
                <p className="text-center text-slate-600 dark:text-slate-400 mb-4">Listen to the word and type what you hear.</p>
                <div className="mb-6">
                    <AudioPlayer audioScript={currentQuestion.original.word} />
                </div>
                {currentQuestion.meaningRevealed && (
                    <div className="mb-4 text-center bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-lg">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">Hint: {currentQuestion.original.definition}</p>
                    </div>
                )}
                 <form onSubmit={(e) => { e.preventDefault(); handleAudioDictationSubmit(currentAudioDictationIndex); }}>
                     <input
                        type="text"
                        value={currentQuestion.userAnswer}
                        onChange={(e) => handleAudioDictationInputChange(currentAudioDictationIndex, e.target.value)}
                        className={inputClass}
                        autoComplete="off"
                        autoCapitalize="off"
                        disabled={currentQuestion.isCorrect !== null}
                        placeholder="Type the word you hear..."
                    />
                    {currentQuestion.isCorrect === false && (
                        <p className="text-center text-green-600 font-bold mt-2">Correct word: {currentQuestion.original.word}</p>
                    )}
                    <div className="mt-6 flex justify-between items-center">
                         <button type="button" onClick={() => handleToggleMeaning(currentAudioDictationIndex)} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors disabled:opacity-50" disabled={currentQuestion.isCorrect !== null}>
                            {currentQuestion.meaningRevealed ? 'Hide' : 'Show'} Hint
                        </button>
                        <button type="submit" className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50" disabled={currentQuestion.isCorrect !== null}>
                            Check Word
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    const renderDefinitionMatch = () => {
        if (isDMatchGameFinished) {
            return (
                <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Well Done!</h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">You've matched all the words and definitions.</p>
                    <button onClick={startDMatchGame} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            );
        }
        
        return (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Definition Match</h3>
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Turn {dMatchTurn + 1} / {Math.ceil(fullDMatchDeck.length / WORDS_PER_DMATCH_TURN)}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Words Column */}
                    <div className="space-y-2">
                        {dMatchWords.map((wordItem, index) => {
                            const isSelected = selectedDMatchWord?.item.word === wordItem.item.word;
                            const isCorrect = correctDMatches.includes(wordItem.item.word);
                            const isIncorrect = incorrectDMatchPair?.[0] === wordItem.item.word;
                            let btnClass = "w-full text-left p-3 rounded-lg border-2 font-semibold transition-all duration-200 ";
    
                            if (isCorrect) btnClass += "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-300 opacity-50 cursor-default";
                            else if (isIncorrect) btnClass += "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-300";
                            else if (isSelected) btnClass += "bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-300 ring-2 ring-blue-300";
                            else btnClass += "bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-400 cursor-pointer";
    
                            return <button key={`word-${index}`} onClick={() => handleDMatchWordSelect(wordItem)} className={btnClass} disabled={isCorrect}>{wordItem.item.word}</button>;
                        })}
                    </div>
                    {/* Definitions Column */}
                    <div className="space-y-2">
                        {dMatchDefinitions.map((defItem, index) => {
                             const isCorrect = correctDMatches.includes(defItem.item.word);
                             const isIncorrect = incorrectDMatchPair?.[1] === defItem.item.definition;
                             let btnClass = "w-full text-left p-3 rounded-lg border-2 text-sm transition-all duration-200 truncate ";
    
                             if (isCorrect) btnClass += "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-300 opacity-50 cursor-default";
                             else if (isIncorrect) btnClass += "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-300";
                             else btnClass += "bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-400 cursor-pointer";
    
                             return <button key={`def-${index}`} onClick={() => handleDMatchDefinitionSelect(defItem)} className={btnClass} disabled={isCorrect} title={defItem.item.definition}>{defItem.item.definition}</button>
                        })}
                    </div>
                </div>
                 {isDMatchTurnFinished && (
                     <div className="text-center mt-6">
                        <button onClick={() => setupDMatchTurn(fullDMatchDeck, dMatchTurn + 1)} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                            Next Set
                        </button>
                    </div>
                )}
            </div>
        );
    };

    const renderContent = () => {
        switch (mode) {
            case 'flashcards': return renderFlashcards();
            case 'quiz': return renderQuiz();
            case 'matching_game': return renderMatchingGame();
            case 'scrambler': return renderScrambler();
            case 'spelling_recall': return renderSpellingRecall();
            case 'audio_dictation': return renderAudioDictation();
            case 'definition_match': return renderDefinitionMatch();
            default:
                return renderFlashcards();
        }
    };
    
     const studyModes: { id: StudyMode; name: string; icon: React.FC<any> }[] = [
        { id: 'flashcards', name: 'Flashcards', icon: BookOpenIcon },
        { id: 'quiz', name: 'Quiz', icon: BrainIcon },
        { id: 'matching_game', name: 'Matching Game', icon: GridIcon },
        { id: 'definition_match', name: 'Definition Match', icon: LinkIcon },
        { id: 'scrambler', name: 'Scrambler', icon: PuzzleIcon },
        { id: 'spelling_recall', name: 'Spelling Recall', icon: TypeIcon },
        { id: 'audio_dictation', name: 'Audio Dictation', icon: HeadphoneIcon },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
             {toastMessage && (
                <div className="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
                    {toastMessage}
                </div>
            )}
            <div className="max-w-5xl mx-auto">
                <button onClick={onBack} className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Test Selection
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{testData.title}</h2>
                    <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">{wordsForSession.length} words</p>
                </div>
                
                <div className="mb-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                         {studyModes.map(m => (
                            <button 
                                key={m.id}
                                onClick={() => setMode(m.id)}
                                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${mode === m.id ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}`}
                            >
                                <m.icon className="h-5 w-5"/>
                                <span>{m.name}</span>
                            </button>
                         ))}
                    </div>
                </div>
                
                <div>
                     {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default VocabularyTestScreen;