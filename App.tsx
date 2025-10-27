import React, { useState, useCallback } from 'react';
import PracticeHub from './components/PracticeHub';
import VocabularyScreen from './components/VocabularyScreen';
import VocabularyPartScreen from './components/VocabularyPartScreen';
import VocabularyTestScreen from './components/VocabularyTestScreen';
import StatsFooter from './components/StatsFooter';
import PronunciationHub from './components/PronunciationHub';
import PronunciationPracticeScreen from './components/PronunciationPracticeScreen';
import { AppState, VocabularyTest, VocabularyPart } from './types';
import { getVocabularyPart, getVocabularyTest } from './services/vocabularyLibrary';
import { LogoIcon } from './components/icons';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.PracticeHub);
  
  // Vocabulary State
  const [selectedVocabularyPart, setSelectedVocabularyPart] = useState<VocabularyPart | null>(null);
  const [selectedVocabularyTest, setSelectedVocabularyTest] = useState<VocabularyTest | null>(null);

  // Pronunciation State
  const [pronunciationMode, setPronunciationMode] = useState<'word' | 'sentence' | 'paragraph' | null>(null);

  const handleGoHome = useCallback(() => {
    setSelectedVocabularyPart(null);
    setSelectedVocabularyTest(null);
    setPronunciationMode(null);
    setAppState(AppState.PracticeHub);
  }, []);
  
  // Vocabulary Navigation Handlers
  const handleSelectVocabularyPart = useCallback((partId: number) => {
    const partData = getVocabularyPart(partId);
    setSelectedVocabularyPart(partData);
    setAppState(AppState.VocabularyPartHome);
  }, []);

  const handleSelectVocabularyTest = useCallback((partId: number, testId: number) => {
    const test = getVocabularyTest(partId, testId);
    setSelectedVocabularyTest(test);
    setAppState(AppState.VocabularyTest);
  }, []);
  
  const handleBackToVocabularyHome = useCallback(() => {
      setSelectedVocabularyPart(null);
      setAppState(AppState.VocabularyHome);
  }, []);
  
  const handleBackToVocabularyPartHome = useCallback(() => {
      setSelectedVocabularyTest(null);
      setAppState(AppState.VocabularyPartHome);
  }, []);

    const handleNavigateToVocabulary = useCallback(() => setAppState(AppState.VocabularyHome), []);

    // Pronunciation Handlers
    const handleNavigateToPronunciation = useCallback(() => setAppState(AppState.PronunciationHub), []);

    const handleSelectPronunciationMode = useCallback((mode: 'word' | 'sentence' | 'paragraph') => {
        if (mode === 'word') {
            setPronunciationMode(mode);
            setAppState(AppState.PronunciationPractice);
        } else {
            alert('This mode is coming soon!');
        }
    }, []);

    const handleBackToPronunciationHub = useCallback(() => {
        setPronunciationMode(null);
        setAppState(AppState.PronunciationHub);
    }, []);


    const renderContent = () => {
        const practiceHubProps = {
            onNavigateToVocabulary: handleNavigateToVocabulary,
            onNavigateToPronunciation: handleNavigateToPronunciation,
        };
        switch (appState) {
            case AppState.PracticeHub:
                return <PracticeHub {...practiceHubProps} />;
            case AppState.VocabularyHome:
                return <VocabularyScreen onSelectPart={handleSelectVocabularyPart} />;
            case AppState.VocabularyPartHome:
                if (!selectedVocabularyPart) return null;
                return <VocabularyPartScreen partData={selectedVocabularyPart} onSelectTest={handleSelectVocabularyTest} onBack={handleBackToVocabularyHome} />;
            case AppState.VocabularyTest:
                if (!selectedVocabularyTest) return null;
                return <VocabularyTestScreen testData={selectedVocabularyTest} onBack={handleBackToVocabularyPartHome} />;
            case AppState.PronunciationHub:
                return <PronunciationHub onSelectMode={handleSelectPronunciationMode} />;
            case AppState.PronunciationPractice:
                 if (pronunciationMode === 'word') {
                    return <PronunciationPracticeScreen mode={pronunciationMode} onBack={handleBackToPronunciationHub} />;
                }
                return <PronunciationHub onSelectMode={handleSelectPronunciationMode} />;
            default:
                return <PracticeHub {...practiceHubProps} />;
        }
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen font-sans text-slate-900 dark:text-slate-200">
            <header className="bg-white dark:bg-slate-800 shadow-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
                <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={handleGoHome}>
                        <LogoIcon className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold text-slate-800 dark:text-slate-100">TOEIC Zone</span>
                    </div>
                </nav>
            </header>
    
            <main className="py-8">
                {renderContent()}
            </main>
            
            <StatsFooter />
        </div>
    );
};

export default App;