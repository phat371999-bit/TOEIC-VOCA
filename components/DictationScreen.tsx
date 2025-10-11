import React, { useState, useCallback } from 'react';
import { generateDictationExercise, generateDictationFromUserInput } from '../services/geminiService';
import { allDictationTests } from '../services/dictationLibrary';
// FIX: Imported DictationExercise type.
import { DictationExercise, User } from '../types';
import { LoadingIcon } from './icons';
import SelectionCard from './SelectionCard';
import DictationTestScreen from './DictationTestScreen';

interface DictationScreenProps {
    currentUser: User;
    onSelectTestSet: (testId: number) => void;
}

const DictationScreen: React.FC<DictationScreenProps> = ({ currentUser, onSelectTestSet }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState<string | null>(null);
    const [userInput, setUserInput] = useState('');
    const [activeAiExercise, setActiveAiExercise] = useState<DictationExercise | null>(null);

    const startAiExercise = (data: DictationExercise) => {
        setActiveAiExercise(data);
        setGenerationError(null);
    };

    const handleGenerate = useCallback(async () => {
        setIsGenerating(true);
        setActiveAiExercise(null);
        window.speechSynthesis.cancel();
        try {
            const data = await generateDictationExercise();
            if (data) {
                startAiExercise(data);
            } else {
                setGenerationError('Failed to generate a dictation exercise. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setGenerationError('An error occurred. Please check your API key and try again.');
        } finally {
            setIsGenerating(false);
        }
    }, []);

    const handleGenerateCustom = useCallback(async () => {
        if (!userInput.trim()) {
            setGenerationError("Please enter a topic.");
            return;
        }
        setIsGenerating(true);
        setActiveAiExercise(null);
        setGenerationError(null);
        window.speechSynthesis.cancel();

        try {
            const data = await generateDictationFromUserInput(userInput);
            if (data) {
                startAiExercise(data);
            } else {
                 setGenerationError('Failed to generate a dictation exercise. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setGenerationError('An error occurred. Please check your API key and try again.');
        } finally {
            setIsGenerating(false);
        }
    }, [userInput]);

    if (activeAiExercise) {
         return <DictationTestScreen
            testData={{ id: 0, title: 'AI Generated Exercise', exercises: [ { ...activeAiExercise, id: Date.now(), audioSrc: '' } ] }}
            currentUser={currentUser}
            onBack={() => setActiveAiExercise(null)}
            isAiTest={true}
        />
    }

    // RENDER HUB
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Dictation Practice</h2>
                    <p className="mt-4 text-lg text-slate-600">
                      Choose from the library or create your own exercise from any topic.
                    </p>
                </div>

                {isGenerating && (
                    <div className="flex justify-center items-center p-12">
                         <LoadingIcon className="animate-spin h-10 w-10 text-blue-600" />
                         <span className="ml-4 text-lg font-semibold text-slate-700">Generating Exercise...</span>
                    </div>
                )}
                
                {generationError && <p className="mt-6 text-center text-red-500 font-semibold">{generationError}</p>}

                <div className="mb-12">
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                           Tự chọn bài nghe - Bạn muốn học từ vựng về chủ đề gì? 
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-2">
                           <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Hãy nhập một chủ đề mà bạn muốn luyện tập (e.g., 'History of Jazz')"
                                className="flex-grow w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 placeholder:text-slate-400"
                                disabled={isGenerating}
                            />
                             <button
                                onClick={handleGenerateCustom}
                                disabled={isGenerating}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
                            >
                                {isGenerating ? <LoadingIcon className="animate-spin h-5 w-5"/> : 'Generate Exercise'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center border-b pb-4">
                        TEST 2024
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {allDictationTests.map(test => (
                            <SelectionCard 
                                key={test.id}
                                title={test.title}
                                description={test.description}
                                onClick={() => onSelectTestSet(test.id)}
                            />
                        ))}
                    </div>
                </div>

                 <div className="mt-12 text-center">
                     <div className="bg-blue-50 p-6 rounded-xl shadow-lg border border-blue-200 inline-block">
                         <h3 className="text-xl font-bold text-slate-800 mb-2">Need a Random Topic?</h3>
                         <p className="text-slate-600 text-sm mb-4">Let AI generate a brand new dictation exercise for you.</p>
                         <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
                        >
                            {isGenerating ? 'Generating...' : 'Generate Random AI Dictation'}
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default DictationScreen;
