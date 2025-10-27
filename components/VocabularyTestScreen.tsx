
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { VocabularyTest, VocabItem } from '../types';
import { updateWordSrsLevel } from '../services/vocabularyService';
import { BookOpenIcon, BrainIcon, ShuffleIcon, ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, XCircleIcon, GridIcon, PuzzleIcon, TypeIcon, LightBulbIcon, HeadphoneIcon, TargetIcon, LinkIcon, FlipIcon, LoadingIcon, RefreshIcon } from './icons';
import AudioPlayer from './AudioPlayer';

type StudyMode = 'flashcards' | 'quiz' | 'matching_game' | 'crossword' | 'scrambler' | 'spelling_recall' | 'audio_dictation' | 'definition_match';

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

// Types for Crossword
interface CrosswordClue {
    number: number;
    clue: string;
    answer: string;
    direction: 'across' | 'down';
    length: number;
    x: number;
    y: number;
}
interface CrosswordData {
    grid: (string | null)[][];
    clues: CrosswordClue[];
    width: number;
    height: number;
    numberGrid: (number | null)[][];
}

const crosswordThemes = [
    { bg: 'bg-blue-50', border: 'bg-blue-300', text: 'text-blue-800', h_border: 'border-blue-200' },
    { bg: 'bg-green-50', border: 'bg-green-300', text: 'text-green-800', h_border: 'border-green-200' },
    { bg: 'bg-yellow-50', border: 'bg-yellow-200', text: 'text-yellow-800', h_border: 'border-yellow-100' },
    { bg: 'bg-pink-50', border: 'bg-pink-300', text: 'text-pink-800', h_border: 'border-pink-200' },
    { bg: 'bg-purple-50', border: 'bg-purple-300', text: 'text-purple-800', h_border: 'border-purple-200' },
    { bg: 'bg-indigo-50', border: 'bg-indigo-300', text: 'text-indigo-800', h_border: 'border-indigo-200' },
];


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

    // State for Crossword
    const [crosswordData, setCrosswordData] = useState<CrosswordData | null>(null);
    const [userCrosswordGrid, setUserCrosswordGrid] = useState<string[][] | null>(null);
    const [isCrosswordFinished, setIsCrosswordFinished] = useState(false);
    const [crosswordScore, setCrosswordScore] = useState(0);
    const [activeCell, setActiveCell] = useState<{row: number, col: number} | null>(null);
    const gridCellRefs = useRef<(HTMLInputElement | null)[][]>([]);
    const [crosswordTheme, setCrosswordTheme] = useState(crosswordThemes[0]);


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

    const generateCrossword = useCallback((words: VocabItem[]): CrosswordData | null => {
        const cleanWord = (word: string) => word.toUpperCase().replace(/[^A-Z]/g, '').replace(/\s/g, '');
        let wordPool = shuffleArray(words)
            .map(w => ({ ...w, word: cleanWord(w.word) }))
            .filter(w => w.word.length > 2 && w.word.length < 12)
            .slice(0, 7);

        if (wordPool.length < 4) return null;

        wordPool.sort((a, b) => b.word.length - a.word.length);

        const gridSize = 25;
        let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(null as string | null));
        const placedWords: { item: VocabItem, x: number, y: number, direction: 'across' | 'down' }[] = [];

        // Place first word (longest) horizontally in the middle
        const firstWord = wordPool.shift()!;
        const startX = Math.floor((gridSize - firstWord.word.length) / 2);
        const startY = Math.floor(gridSize / 2);
        for (let i = 0; i < firstWord.word.length; i++) {
            grid[startY][startX + i] = firstWord.word[i];
        }
        placedWords.push({ item: firstWord, x: startX, y: startY, direction: 'across' });

        // Function to check if a word can be placed
        const canPlaceWord = (word: string, x: number, y: number, dir: 'across' | 'down') => {
            if (dir === 'across') {
                if (x < 0 || x + word.length > gridSize) return false;
                if (grid[y]?.[x - 1] || grid[y]?.[x + word.length]) return false; // Check ends
                for (let i = 0; i < word.length; i++) {
                    const char = grid[y][x + i];
                    if (char && char !== word[i]) return false; // Collision
                    if (!char && (grid[y - 1]?.[x + i] || grid[y + 1]?.[x + i])) return false; // Adjacent parallel
                }
            } else { // 'down'
                if (y < 0 || y + word.length > gridSize) return false;
                if (grid[y - 1]?.[x] || grid[y + word.length]?.[x]) return false; // Check ends
                for (let i = 0; i < word.length; i++) {
                    const char = grid[y + i]?.[x];
                    if (char && char !== word[i]) return false; // Collision
                    if (!char && (grid[y + i]?.[x - 1] || grid[y + i]?.[x + 1])) return false; // Adjacent parallel
                }
            }
            return true;
        };
        
        // Place subsequent words
        let remainingWords = wordPool;
        let attempts = 0;
        while(remainingWords.length > 0 && attempts < 10) {
            let placedSomething = false;
            remainingWords = remainingWords.filter(wordToPlace => {
                let bestFit = { score: -1, x: 0, y: 0, dir: 'across' as 'across' | 'down' };
                
                for (const pWord of placedWords) {
                    for (let i = 0; i < pWord.item.word.length; i++) {
                        for (let j = 0; j < wordToPlace.word.length; j++) {
                            if (pWord.item.word[i] === wordToPlace.word[j]) {
                                const newDir = pWord.direction === 'across' ? 'down' : 'across';
                                const newX = newDir === 'down' ? pWord.x + i : pWord.x - j;
                                const newY = newDir === 'across' ? pWord.y + i : pWord.y - j;

                                if (canPlaceWord(wordToPlace.word, newX, newY, newDir)) {
                                    let score = 0; // Simple score: number of intersections
                                    for(let k=0; k < wordToPlace.word.length; k++) {
                                        if (newDir === 'across' && grid[newY][newX+k]) score++;
                                        else if (newDir === 'down' && grid[newY+k]?.[newX]) score++;
                                    }

                                    if (score > bestFit.score) {
                                        bestFit = { score, x: newX, y: newY, dir: newDir };
                                    }
                                }
                            }
                        }
                    }
                }
                
                if (bestFit.score > -1) {
                    for (let i = 0; i < wordToPlace.word.length; i++) {
                        if (bestFit.dir === 'across') grid[bestFit.y][bestFit.x + i] = wordToPlace.word[i];
                        else grid[bestFit.y + i][bestFit.x] = wordToPlace.word[i];
                    }
                    placedWords.push({ item: wordToPlace, x: bestFit.x, y: bestFit.y, direction: bestFit.dir });
                    placedSomething = true;
                    return false; // Word is placed, remove from remaining
                }
                return true; // Word not placed, keep in remaining
            });
            if (!placedSomething) attempts++;
        }
        
        // Trim grid and generate clues
        if (placedWords.length < 4) return null;
        let [minX, minY, maxX, maxY] = [gridSize, gridSize, 0, 0];
        placedWords.forEach(w => {
            minX = Math.min(minX, w.x);
            minY = Math.min(minY, w.y);
            maxX = Math.max(maxX, w.direction === 'across' ? w.x + w.item.word.length - 1 : w.x);
            maxY = Math.max(maxY, w.direction === 'down' ? w.y + w.item.word.length - 1 : w.y);
        });

        const finalWidth = maxX - minX + 3;
        const finalHeight = maxY - minY + 3;
        let finalGrid = Array.from({ length: finalHeight }, () => Array(finalWidth).fill(null));
        let numberGrid = Array.from({ length: finalHeight }, () => Array(finalWidth).fill(null));
        const clues: CrosswordClue[] = [];
        let clueNumber = 1;
        const startCoords: { [key: string]: number } = {};
        
        placedWords.sort((a,b) => a.y - b.y || a.x - b.x);

        placedWords.forEach(pWord => {
            const x = pWord.x - minX + 1;
            const y = pWord.y - minY + 1;
            const coordKey = `${y},${x}`;
            let currentClueNumber = startCoords[coordKey];
            if (!currentClueNumber) {
                currentClueNumber = clueNumber;
                startCoords[coordKey] = clueNumber;
                numberGrid[y][x] = clueNumber;
                clueNumber++;
            }
            
            clues.push({
                number: currentClueNumber,
                clue: pWord.item.definition,
                answer: pWord.item.word,
                direction: pWord.direction,
                length: pWord.item.word.length,
                x, y
            });

            for (let i = 0; i < pWord.item.word.length; i++) {
                if (pWord.direction === 'across') finalGrid[y][x + i] = pWord.item.word[i];
                else finalGrid[y + i][x] = pWord.item.word[i];
            }
        });
        
        return { grid: finalGrid, clues, width: finalWidth, height: finalHeight, numberGrid };
    }, []);

    const startCrosswordGame = useCallback(() => {
        const data = generateCrossword(wordsForSession);
        setCrosswordData(data);
        if (data) {
            setUserCrosswordGrid(Array.from({ length: data.height }, () => Array(data.width).fill('')));
            gridCellRefs.current = Array.from({ length: data.height }, () => Array(data.width).fill(null));
            const randomTheme = crosswordThemes[Math.floor(Math.random() * crosswordThemes.length)];
            setCrosswordTheme(randomTheme);
        }
        setIsCrosswordFinished(false);
        setCrosswordScore(0);
        setActiveCell(null);
    }, [generateCrossword, wordsForSession]);
    
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
        if (mode === 'crossword') startCrosswordGame();
    }, [mode, wordsForSession, startQuizSession, startMatchingGame, startScramblerGame, startSpellingGame, startAudioDictationGame, startDMatchGame, startCrosswordGame]);
    
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
        }, isCorrect ? 1000 : 2000);
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
        
        if(isCorrect) setSpellingScore(s => s + 1);

        setTimeout(() => {
            if (currentSpellingIndex + 1 < spellingQuestions.length) {
                setCurrentSpellingIndex(prev => prev + 1);
            } else {
                setIsSpellingSessionFinished(true);
            }
        }, isCorrect ? 1000 : 2000);
    };

    const revealLetter = (index: number) => {
        const newQuestions = [...spellingQuestions];
        const question = newQuestions[index];
        if (question.revealedCount < question.original.word.length -1) {
            question.revealedCount++;
            setSpellingQuestions(newQuestions);
        }
    };
    
    // Audio Dictation Handlers
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
        
        if(isCorrect) setAudioDictationScore(s => s + 1);

        setTimeout(() => {
            if (currentAudioDictationIndex + 1 < audioDictationQuestions.length) {
                setCurrentAudioDictationIndex(prev => prev + 1);
            } else {
                setIsAudioDictationSessionFinished(true);
            }
        }, isCorrect ? 1000 : 2000);
    };

    const revealMeaning = (index: number) => {
        const newQuestions = [...audioDictationQuestions];
        newQuestions[index].meaningRevealed = true;
        setAudioDictationQuestions(newQuestions);
    };

    // Definition Match Handlers
    const handleDMatchWordClick = (word: DMatchItemType) => {
        if (correctDMatches.includes(word.item.word) || incorrectDMatchPair) return;
        setSelectedDMatchWord(word);
    };
    
    const handleDMatchDefinitionClick = (definition: DMatchItemType) => {
        if (!selectedDMatchWord || incorrectDMatchPair) return;

        if (selectedDMatchWord.item.word === definition.item.word) {
            const newCorrects = [...correctDMatches, selectedDMatchWord.item.word];
            setCorrectDMatches(newCorrects);
            setSelectedDMatchWord(null);
            if (newCorrects.length === dMatchWords.length) {
                 setIsDMatchTurnFinished(true);
            }
        } else {
            setIncorrectDMatchPair([selectedDMatchWord.item.word, definition.item.definition]);
            setSelectedDMatchWord(null);
            setTimeout(() => setIncorrectDMatchPair(null), 1000);
        }
    };

    const handleDMatchNextTurn = () => {
        setupDMatchTurn(fullDMatchDeck, dMatchTurn + 1);
    };

    const handleDMatchRestart = () => {
        startDMatchGame();
    };

    // Crossword Handlers
    const handleCrosswordInputChange = (row: number, col: number, value: string) => {
        if (isCrosswordFinished) return;
        const newGrid = userCrosswordGrid!.map(r => [...r]);
        newGrid[row][col] = value.toUpperCase().slice(0, 1);
        setUserCrosswordGrid(newGrid);

        // Auto-move focus
        if(value) {
            // Find current word and move along it
            const activeClue = crosswordData?.clues.find(c => {
                if (c.direction === 'across') {
                    return row === c.y && col >= c.x && col < c.x + c.length;
                } else {
                    return col === c.x && row >= c.y && row < c.y + c.length;
                }
            });

            if (activeClue) {
                 if (activeClue.direction === 'across' && col + 1 < activeClue.x + activeClue.length) {
                    gridCellRefs.current[row]?.[col + 1]?.focus();
                } else if (activeClue.direction === 'down' && row + 1 < activeClue.y + activeClue.length) {
                    gridCellRefs.current[row + 1]?.[col]?.focus();
                }
            }
        }
    };
    
    const handleCrosswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
        let newRow = row;
        let newCol = col;
        switch (e.key) {
            case 'ArrowUp': e.preventDefault(); newRow--; break;
            case 'ArrowDown': e.preventDefault(); newRow++; break;
            case 'ArrowLeft': e.preventDefault(); newCol--; break;
            case 'ArrowRight': e.preventDefault(); newCol++; break;
            case 'Backspace':
                if (!userCrosswordGrid?.[row][col]) {
                     e.preventDefault();
                    // Basic move back logic
                    // A better implementation would follow the word's direction
                     if(col > 0) newCol--; else if (row > 0) {newRow--; newCol = (crosswordData?.width ?? 1) - 1;}
                }
                break;
            default: return;
        }
        gridCellRefs.current[newRow]?.[newCol]?.focus();
    };

    const handleCheckCrossword = () => {
        if (!crosswordData || !userCrosswordGrid) return;
        let correctCount = 0;
        let totalCount = 0;
        for (let r = 0; r < crosswordData.height; r++) {
            for (let c = 0; c < crosswordData.width; c++) {
                if (crosswordData.grid[r][c]) {
                    totalCount++;
                    if (crosswordData.grid[r][c] === userCrosswordGrid[r][c]) {
                        correctCount++;
                    }
                }
            }
        }
        setCrosswordScore(Math.round((correctCount / totalCount) * 100));
        setIsCrosswordFinished(true);
    };

    // RENDER FUNCTIONS
    
    const currentWord = deck[currentCardIndex];
    const activeModeClasses = "bg-blue-600 text-white";
    const inactiveModeClasses = "bg-slate-200 text-slate-700 hover:bg-slate-300";

    // FIX: Added missing render functions.

    const renderFlashcards = () => {
        if (!currentWord) {
            return (
                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
                    <p className="text-slate-500">No words to review in this test set.</p>
                </div>
            );
        }
        return (
            <div>
                <div className="relative mb-6" style={{ perspective: '1000px' }}>
                    <div
                        className={`relative w-full h-64 rounded-xl shadow-xl border border-slate-200 cursor-pointer transition-transform duration-500`}
                        style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        {/* Front of card */}
                        <div className="absolute w-full h-full bg-white rounded-xl flex items-center justify-center p-6 text-center" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                            <h3 className="text-4xl font-bold text-slate-800">{currentWord.word}</h3>
                        </div>
                        {/* Back of card */}
                        <div className="absolute w-full h-full bg-slate-100 rounded-xl flex flex-col items-center justify-center p-6 text-center" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                            <p className="text-xl text-slate-700">{currentWord.definition}</p>
                            {currentWord.example && <p className="text-sm italic text-slate-500 mt-4">"{currentWord.example}"</p>}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                     <button onClick={() => { handleWordPractice(currentWord, 'hard'); handleNextCard(); }} className="p-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors">Hard</button>
                     <button onClick={() => { handleWordPractice(currentWord, 'good'); handleNextCard(); }} className="p-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors">Good</button>
                     <button onClick={handleNextCard} className="p-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">Easy (No SRS)</button>
                </div>

                <div className="flex justify-between items-center">
                    <button onClick={handlePrevCard} className="p-3 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors">
                        <ArrowLeftIcon className="h-6 w-6 text-slate-700" />
                    </button>
                    <span className="font-semibold text-slate-600">{currentCardIndex + 1} / {deck.length}</span>
                    <div className="flex gap-2">
                        <button onClick={handleShuffle} className="p-3 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors">
                            <ShuffleIcon className="h-6 w-6 text-slate-700" />
                        </button>
                        <button onClick={handleNextCard} className="p-3 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors">
                            <ArrowRightIcon className="h-6 w-6 text-slate-700" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    
    const renderQuiz = () => {
        if (quizQuestions.length === 0) return null;
        const currentQuestion = quizQuestions[currentQuizIndex];
        return (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800">Multiple Choice Quiz</h3>
                    <span className="font-semibold text-slate-500">{currentQuizIndex + 1} / {quizQuestions.length}</span>
                </div>
                <div className="p-8 bg-slate-100 rounded-lg text-center min-h-[120px] flex items-center justify-center">
                    <p className="text-lg text-slate-700">{currentQuestion.questionText}</p>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => {
                        let buttonClasses = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 font-semibold ";
                        if (currentQuestion.userAnswer) {
                            if (option === currentQuestion.correctAnswer) {
                                buttonClasses += "bg-green-100 border-green-500 text-green-800";
                            } else if (option === currentQuestion.userAnswer) {
                                buttonClasses += "bg-red-100 border-red-500 text-red-800";
                            } else {
                                buttonClasses += "bg-slate-100 border-slate-200 text-slate-500 opacity-70";
                            }
                        } else {
                            buttonClasses += "bg-white border-slate-300 hover:bg-blue-50 hover:border-blue-400";
                        }

                        return (
                            <button key={index} onClick={() => handleQuizAnswer(option)} disabled={!!currentQuestion.userAnswer} className={buttonClasses}>
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderQuizResults = () => (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
            <h3 className="text-2xl font-bold text-slate-800">Quiz Complete!</h3>
            <p className="text-6xl font-bold text-blue-600 my-4">{score} / {quizQuestions.length}</p>
            <p className="text-lg text-slate-600">You've completed the quiz. Words you got wrong have been marked for 'hard' review in your SRS deck.</p>
            <button onClick={startQuizSession} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                Try Again
            </button>
        </div>
    );

    const renderMatchingGame = () => {
        if (isGameFinished) {
             return (
                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
                    <h3 className="text-2xl font-bold text-slate-800">Game Finished!</h3>
                    <p className="text-lg text-slate-600 mt-2">You've matched all the words.</p>
                    <button onClick={startMatchingGame} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            );
        }

        if (isTurnFinished) {
            return (
                 <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
                    <h3 className="text-2xl font-bold text-slate-800">Round Complete!</h3>
                    <button onClick={() => setupMatchingTurn(fullMatchingDeck, matchingTurn + 1)} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Next Round
                    </button>
                </div>
            );
        }
        
        return (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 text-center mb-4">Matching Game (Round {matchingTurn + 1})</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {matchingGridItems.map((gridItem, index) => {
                        const isSelected = selectedMatchingItem === gridItem;
                        const isMatched = matchedPairs.includes(gridItem.item.word);
                        const isIncorrect = (incorrectPairItems?.item1 === gridItem || incorrectPairItems?.item2 === gridItem);
                        
                        let buttonClasses = "p-4 h-24 flex items-center justify-center text-center rounded-lg border-2 font-semibold transition-all duration-200 ";

                        if (isMatched) {
                            buttonClasses += "bg-green-100 border-green-300 text-green-800 opacity-50 cursor-not-allowed";
                        } else if (isIncorrect) {
                            buttonClasses += "bg-red-100 border-red-500 text-red-800";
                        } else if (isSelected) {
                            buttonClasses += "bg-blue-200 border-blue-500 ring-2 ring-blue-300";
                        } else {
                            buttonClasses += "bg-white border-slate-300 hover:bg-blue-50 hover:border-blue-400 cursor-pointer";
                        }

                        return (
                            <button key={index} onClick={() => handleMatchingItemSelect(gridItem)} className={buttonClasses} disabled={isMatched}>
                                {gridItem.type === 'word' ? gridItem.item.word : gridItem.item.definition}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderScrambler = () => {
        if (scramblerQuestions.length === 0) return null;
        const currentQuestion = scramblerQuestions[currentScramblerIndex];

        return (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800">Word Scrambler</h3>
                    <span className="font-semibold text-slate-500">{currentScramblerIndex + 1} / {scramblerQuestions.length}</span>
                </div>
                <div className="p-6 bg-slate-100 rounded-lg text-center">
                    <p className="text-sm text-slate-500 mb-2">Unscramble the word for:</p>
                    <p className="text-base text-slate-700 font-medium">"{currentQuestion.original.definition}"</p>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-4xl font-bold tracking-widest text-blue-600 my-4 p-4 bg-blue-50 rounded-lg">{currentQuestion.scrambled}</p>
                    <form onSubmit={(e) => { e.preventDefault(); handleScramblerSubmit(currentScramblerIndex); }}>
                        <input
                            type="text"
                            value={currentQuestion.userAnswer}
                            onChange={(e) => handleScramblerInputChange(currentScramblerIndex, e.target.value)}
                            disabled={currentQuestion.isCorrect !== null}
                            className={`w-full text-center text-lg p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200
                                ${currentQuestion.isCorrect === true ? 'bg-green-100 border-green-500' : ''}
                                ${currentQuestion.isCorrect === false ? 'bg-red-100 border-red-500' : 'border-slate-300'}`
                            }
                            placeholder="Type your answer"
                        />
                         {currentQuestion.isCorrect === false && (
                            <p className="text-green-600 font-semibold mt-2">Correct answer: {currentQuestion.original.word}</p>
                        )}
                         {currentQuestion.isCorrect === null && (
                            <div className="mt-4 flex gap-2 justify-center">
                                <button type="button" onClick={handleShuffleScrambler} className="px-4 py-2 bg-slate-200 rounded-md font-semibold text-slate-700 hover:bg-slate-300">Skip/Shuffle</button>
                                <button type="submit" className="px-8 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Check</button>
                            </div>
                         )}
                    </form>
                </div>
            </div>
        );
    };

    const renderScramblerResults = () => (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
            <h3 className="text-2xl font-bold text-slate-800">Scrambler Complete!</h3>
            <p className="text-6xl font-bold text-blue-600 my-4">{scramblerScore} / {scramblerQuestions.length}</p>
            <button onClick={startScramblerGame} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                Play Again
            </button>
        </div>
    );

    const renderSpellingRecall = () => {
        if (spellingQuestions.length === 0) return null;
        const currentQuestion = spellingQuestions[currentSpellingIndex];
        const revealedWord = currentQuestion.original.word.substring(0, currentQuestion.revealedCount) + '_'.repeat(currentQuestion.original.word.length - currentQuestion.revealedCount);

        return (
             <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800">Spelling Recall</h3>
                    <span className="font-semibold text-slate-500">{currentSpellingIndex + 1} / {spellingQuestions.length}</span>
                </div>
                 <div className="p-6 bg-slate-100 rounded-lg text-center min-h-[100px] flex items-center justify-center">
                    <p className="text-base text-slate-700 font-medium">"{currentQuestion.original.definition}"</p>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-2xl font-bold tracking-[0.5em] text-blue-600 my-4 p-2 bg-blue-50 rounded-lg uppercase">{revealedWord}</p>
                     <form onSubmit={(e) => { e.preventDefault(); handleSpellingSubmit(currentSpellingIndex); }}>
                        <input
                            type="text"
                            value={currentQuestion.userAnswer}
                            onChange={(e) => handleSpellingInputChange(currentSpellingIndex, e.target.value)}
                            disabled={currentQuestion.isCorrect !== null}
                            className={`w-full text-center text-lg p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200
                                ${currentQuestion.isCorrect === true ? 'bg-green-100 border-green-500' : ''}
                                ${currentQuestion.isCorrect === false ? 'bg-red-100 border-red-500' : 'border-slate-300'}`
                            }
                            placeholder="Type the word"
                            autoCapitalize="none"
                        />
                         {currentQuestion.isCorrect === false && (
                            <p className="text-green-600 font-semibold mt-2">Correct answer: {currentQuestion.original.word}</p>
                        )}
                         {currentQuestion.isCorrect === null && (
                             <div className="mt-4 flex gap-2 justify-center">
                                <button type="button" onClick={() => revealLetter(currentSpellingIndex)} className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-md font-semibold hover:bg-yellow-500">Hint (Reveal Letter)</button>
                                <button type="submit" className="px-8 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Check</button>
                            </div>
                         )}
                    </form>
                </div>
            </div>
        );
    };
    
    const renderSpellingResults = () => (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
            <h3 className="text-2xl font-bold text-slate-800">Spelling Practice Complete!</h3>
            <p className="text-6xl font-bold text-blue-600 my-4">{spellingScore} / {spellingQuestions.length}</p>
            <button onClick={startSpellingGame} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                Play Again
            </button>
        </div>
    );

    const renderAudioDictation = () => {
        if (audioDictationQuestions.length === 0) return null;
        const currentQuestion = audioDictationQuestions[currentAudioDictationIndex];

        return (
             <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800">Audio Dictation</h3>
                    <span className="font-semibold text-slate-500">{currentAudioDictationIndex + 1} / {audioDictationQuestions.length}</span>
                </div>
                <div className="p-4 bg-slate-100 rounded-lg">
                    <p className="text-sm text-slate-500 mb-2 text-center">Listen to the word and type what you hear.</p>
                    <AudioPlayer audioScript={currentQuestion.original.word} />
                </div>

                {currentQuestion.meaningRevealed && (
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-center">
                        <p className="text-sm text-yellow-700 font-semibold">Hint (Meaning): "{currentQuestion.original.definition}"</p>
                    </div>
                )}
                
                <div className="mt-6 text-center">
                     <form onSubmit={(e) => { e.preventDefault(); handleAudioDictationSubmit(currentAudioDictationIndex); }}>
                        <input
                            type="text"
                            value={currentQuestion.userAnswer}
                            onChange={(e) => handleAudioDictationInputChange(currentAudioDictationIndex, e.target.value)}
                            disabled={currentQuestion.isCorrect !== null}
                            className={`w-full text-center text-lg p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200
                                ${currentQuestion.isCorrect === true ? 'bg-green-100 border-green-500' : ''}
                                ${currentQuestion.isCorrect === false ? 'bg-red-100 border-red-500' : 'border-slate-300'}`
                            }
                            placeholder="Type the word"
                            autoCapitalize="none"
                        />
                         {currentQuestion.isCorrect === false && (
                            <p className="text-green-600 font-semibold mt-2">Correct answer: {currentQuestion.original.word}</p>
                        )}
                         {currentQuestion.isCorrect === null && (
                             <div className="mt-4 flex gap-2 justify-center">
                                <button type="button" onClick={() => revealMeaning(currentAudioDictationIndex)} className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-md font-semibold hover:bg-yellow-500">Hint (Show Meaning)</button>
                                <button type="submit" className="px-8 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Check</button>
                            </div>
                         )}
                    </form>
                </div>
            </div>
        );
    };

    const renderAudioDictationResults = () => (
         <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
            <h3 className="text-2xl font-bold text-slate-800">Audio Dictation Complete!</h3>
            <p className="text-6xl font-bold text-blue-600 my-4">{audioDictationScore} / {audioDictationQuestions.length}</p>
            <button onClick={startAudioDictationGame} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                Play Again
            </button>
        </div>
    );

    const renderDefinitionMatch = () => {
        if (isDMatchGameFinished) {
            return (
                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
                    <h3 className="text-2xl font-bold text-slate-800">Game Finished!</h3>
                    <p className="text-lg text-slate-600 mt-2">You've matched all the words.</p>
                    <button onClick={handleDMatchRestart} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Play Again
                    </button>
                </div>
            );
        }

        if (isDMatchTurnFinished) {
            return (
                 <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
                    <h3 className="text-2xl font-bold text-slate-800">Round Complete!</h3>
                    <p className="text-lg text-slate-600 mt-2">You matched all words for this round.</p>
                    <button onClick={handleDMatchNextTurn} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Next Round
                    </button>
                </div>
            );
        }

        return (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 text-center mb-4">Definition Match (Round {dMatchTurn + 1})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Words Column */}
                    <div className="space-y-3">
                        {dMatchWords.map((wordItem, index) => {
                            const isSelected = selectedDMatchWord === wordItem;
                            const isCorrect = correctDMatches.includes(wordItem.item.word);
                            const isIncorrect = incorrectDMatchPair?.[0] === wordItem.item.word;
                            
                            let classes = "w-full text-left p-3 rounded-lg border-2 font-semibold text-sm transition-all duration-200 min-h-[60px] flex items-center ";
                             if (isCorrect) classes += "bg-green-100 border-green-300 text-green-800 opacity-50 cursor-not-allowed";
                             else if (isIncorrect) classes += "bg-red-100 border-red-500 text-red-800";
                             else if (isSelected) classes += "bg-blue-200 border-blue-500 ring-2 ring-blue-300";
                             else classes += "bg-white border-slate-300 hover:bg-blue-50 hover:border-blue-400 cursor-pointer";

                            return <button key={`word-${index}`} onClick={() => handleDMatchWordClick(wordItem)} className={classes} disabled={isCorrect}>{wordItem.item.word}</button>;
                        })}
                    </div>
                    {/* Definitions Column */}
                    <div className="space-y-3">
                         {dMatchDefinitions.map((defItem, index) => {
                            const isCorrect = correctDMatches.includes(defItem.item.word);
                            const isIncorrect = incorrectDMatchPair?.[1] === defItem.item.definition;

                            let classes = "w-full text-left p-3 rounded-lg border-2 text-sm transition-all duration-200 min-h-[60px] flex items-center ";
                             if (isCorrect) classes += "bg-green-100 border-green-300 text-green-800 opacity-50 cursor-not-allowed";
                             else if (isIncorrect) classes += "bg-red-100 border-red-500 text-red-800";
                             else if (selectedDMatchWord) classes += "bg-white border-slate-300 hover:bg-yellow-100 hover:border-yellow-400 cursor-pointer";
                             else classes += "bg-slate-100 border-slate-200 cursor-not-allowed";
                             
                            return <button key={`def-${index}`} onClick={() => handleDMatchDefinitionClick(defItem)} className={classes} disabled={isCorrect || !selectedDMatchWord}>{defItem.item.definition}</button>;
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const renderCrossword = () => {
        if (!crosswordData || !userCrosswordGrid) {
            return (
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <LoadingIcon className="h-8 w-8 mx-auto animate-spin text-blue-600" />
                    <p className="mt-4 text-slate-600">Generating crossword puzzle...</p>
                    <p className="text-sm text-slate-400 mt-2">If this takes too long, the selected words may not fit well. Try a different test list.</p>
                </div>
            );
        }

        return (
            <div className={`p-4 sm:p-6 rounded-xl shadow-lg border border-slate-200 ${crosswordTheme.bg}`}>
                <h3 className={`text-2xl font-bold ${crosswordTheme.text} mb-4 text-center`}>Crossword Puzzle</h3>
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0 mx-auto">
                        <div 
                            className={`grid gap-px p-px shadow-xl ${crosswordTheme.border}`}
                            style={{ 
                                gridTemplateColumns: `repeat(${crosswordData.width}, minmax(0, 1fr))`,
                                width: `calc(${crosswordData.width} * clamp(20px, 6vw, 38px))`,
                                aspectRatio: `${crosswordData.width} / ${crosswordData.height}`
                            }}
                        >
                            {crosswordData.grid.map((row, r) => row.map((cell, c) => {
                                if (!cell) return <div key={`${r}-${c}`} className={crosswordTheme.border} />;

                                const clueNumber = crosswordData.numberGrid[r][c];
                                const isCorrect = isCrosswordFinished && userCrosswordGrid[r][c] === crosswordData.grid[r][c];
                                
                                let cellBg = 'bg-white';
                                if(isCrosswordFinished) {
                                    cellBg = isCorrect ? 'bg-green-200' : 'bg-red-200';
                                } else if(activeCell?.row === r && activeCell?.col === c) {
                                    cellBg = 'bg-yellow-200';
                                }

                                return (
                                    <div key={`${r}-${c}`} className={`relative ${cellBg} flex items-center justify-center`}>
                                        {clueNumber && <span className="absolute top-0 left-0.5 text-[0.6rem] font-bold text-slate-500">{clueNumber}</span>}
                                        <input
                                            ref={el => {
                                                if(!gridCellRefs.current[r]) gridCellRefs.current[r] = [];
                                                gridCellRefs.current[r][c] = el;
                                            }}
                                            type="text"
                                            maxLength={1}
                                            value={userCrosswordGrid[r][c] || ''}
                                            onChange={e => handleCrosswordInputChange(r, c, e.target.value)}
                                            onKeyDown={e => handleCrosswordKeyDown(e, r, c)}
                                            onFocus={() => setActiveCell({row: r, col: c})}
                                            disabled={isCrosswordFinished}
                                            className="w-full h-full p-0 text-center uppercase font-bold text-lg bg-transparent border-0 focus:ring-0 focus:outline-none"
                                            aria-label={`cell ${r}, ${c}`}
                                        />
                                    </div>
                                );
                            }))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                        <div>
                            <h4 className={`font-bold text-lg border-b-2 ${crosswordTheme.h_border} pb-1 mb-2 ${crosswordTheme.text}`}>ACROSS</h4>
                            <ul className="space-y-1 text-sm text-slate-600">
                                {crosswordData.clues.filter(c => c.direction === 'across').sort((a,b) => a.number - b.number).map(c => 
                                    <li key={`across-${c.number}`}><strong className="mr-1">{c.number}.</strong> {c.clue}</li>
                                )}
                            </ul>
                        </div>
                         <div>
                            <h4 className={`font-bold text-lg border-b-2 ${crosswordTheme.h_border} pb-1 mb-2 ${crosswordTheme.text}`}>DOWN</h4>
                            <ul className="space-y-1 text-sm text-slate-600">
                                {crosswordData.clues.filter(c => c.direction === 'down').sort((a,b) => a.number - b.number).map(c => 
                                    <li key={`down-${c.number}`}><strong className="mr-1">{c.number}.</strong> {c.clue}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                 <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {isCrosswordFinished ? (
                         <>
                            <div className="text-center">
                                <p className="font-semibold text-slate-600">Your Score:</p>
                                <p className="text-3xl font-bold text-blue-600">{crosswordScore}%</p>
                            </div>
                            <button onClick={() => { setIsCrosswordFinished(false); setUserCrosswordGrid(Array.from({ length: crosswordData.height }, () => Array(crosswordData.width).fill(''))) }} className="px-6 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors">
                                Try Again
                            </button>
                         </>
                    ) : (
                        <button onClick={handleCheckCrossword} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                           Check Answers
                        </button>
                    )}
                     <button onClick={startCrosswordGame} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        New Puzzle
                    </button>
                </div>
            </div>
        )
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Test List
            </button>
    
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mb-8">
                    <h2 className="text-3xl font-bold text-slate-800 text-center">{testData.title}</h2>
                    <p className="text-slate-500 text-center mt-2">{wordsForSession.length} words in this session</p>
                </div>
    
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-slate-600 mb-3 text-center">Choose Practice Mode</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        {/* Row 1 */}
                        <button onClick={() => setMode('flashcards')} className={`flex items-center justify-center gap-2 p-3 rounded-lg font-semibold transition-colors ${mode === 'flashcards' ? activeModeClasses : inactiveModeClasses}`}>
                            <FlipIcon className="h-5 w-5" />
                            <span>Flashcards</span>
                        </button>
                        <button onClick={() => setMode('quiz')} className={`flex items-center justify-center gap-2 p-3 rounded-lg font-semibold transition-colors ${mode === 'quiz' ? activeModeClasses : inactiveModeClasses}`}>
                            <BrainIcon className="h-5 w-5" />
                            <span>Quiz</span>
                        </button>
                        <button onClick={() => setMode('matching_game')} className={`flex items-center justify-center gap-2 p-3 rounded-lg font-semibold transition-colors ${mode === 'matching_game' ? activeModeClasses : inactiveModeClasses}`}>
                            <GridIcon className="h-5 w-5" />
                            <span>Matching</span>
                        </button>
                        <button onClick={() => setMode('definition_match')} className={`flex items-center justify-center gap-2 p-3 rounded-lg font-semibold transition-colors ${mode === 'definition_match' ? activeModeClasses : inactiveModeClasses}`}>
                            <LinkIcon className="h-5 w-5" />
                            <span>Def Match</span>
                        </button>
                        {/* Row 2 */}
                        <button onClick={() => setMode('scrambler')} className={`flex items-center justify-center gap-2 p-3 rounded-lg font-semibold transition-colors ${mode === 'scrambler' ? activeModeClasses : inactiveModeClasses}`}>
                            <ShuffleIcon className="h-5 w-5" />
                            <span>Scrambler</span>
                        </button>
                        <button onClick={() => setMode('spelling_recall')} className={`flex items-center justify-center gap-2 p-3 rounded-lg font-semibold transition-colors ${mode === 'spelling_recall' ? activeModeClasses : inactiveModeClasses}`}>
                            <TypeIcon className="h-5 w-5" />
                            <span>Spelling</span>
                        </button>
                        <button onClick={() => setMode('audio_dictation')} className={`flex items-center justify-center gap-2 p-3 rounded-lg font-semibold transition-colors ${mode === 'audio_dictation' ? activeModeClasses : inactiveModeClasses}`}>
                            <HeadphoneIcon className="h-5 w-5" />
                            <span>Dictation</span>
                        </button>
                        <button onClick={() => setMode('crossword')} className={`flex items-center justify-center gap-2 p-3 rounded-lg font-semibold transition-colors ${mode === 'crossword' ? activeModeClasses : inactiveModeClasses}`}>
                            <PuzzleIcon className="h-5 w-5" />
                            <span>Crossword</span>
                        </button>
                    </div>
                </div>
                
                {toastMessage && (
                    <div className="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
                        {toastMessage}
                    </div>
                )}

                {/* Render the selected mode */}
                {mode === 'flashcards' && renderFlashcards()}
                {mode === 'quiz' && (isQuizSessionFinished ? renderQuizResults() : renderQuiz())}
                {mode === 'matching_game' && renderMatchingGame()}
                {mode === 'scrambler' && (isScramblerSessionFinished ? renderScramblerResults() : renderScrambler())}
                {mode === 'spelling_recall' && (isSpellingSessionFinished ? renderSpellingResults() : renderSpellingRecall())}
                {mode === 'audio_dictation' && (isAudioDictationSessionFinished ? renderAudioDictationResults() : renderAudioDictation())}
                {mode === 'definition_match' && renderDefinitionMatch()}
                {mode === 'crossword' && renderCrossword()}

            </div>
        </div>
    );
};

export default VocabularyTestScreen;
