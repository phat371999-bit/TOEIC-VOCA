import React, { useState, useMemo } from 'react';
import { allReadingTests } from '../services/readingLibrary';
import { ReadingTestData } from '../types';

interface ReadingPracticeSetupScreenProps {
    testId: number;
    onStartPractice: (parts: number[], timeLimit: number | null) => void;
    onBack: () => void;
}

const getQuestionCount = (testData: ReadingTestData | undefined) => {
    if (!testData) return 0;
    return testData.passages.reduce((sum, p) => sum + p.questions.length, 0);
};

const partTags: Record<number, string[]> = {
    5: [],
    6: [],
    7: []
};

const ReadingPracticeSetupScreen: React.FC<ReadingPracticeSetupScreenProps> = ({ testId, onStartPractice, onBack }) => {
    const [selectedParts, setSelectedParts] = useState<Record<number, boolean>>({ 5: false, 6: false, 7: false });
    const [timeLimit, setTimeLimit] = useState<string>('');

    const testSet = useMemo(() => allReadingTests.find(t => t.id === testId), [testId]);

    const partInfo = useMemo(() => {
        if (!testSet) return {};
        return {
            5: { count: getQuestionCount(testSet.parts.part5), tags: partTags[5] },
            6: { count: getQuestionCount(testSet.parts.part6), tags: partTags[6] },
            7: { count: getQuestionCount(testSet.parts.part7), tags: partTags[7] }
        }
    }, [testSet]);

    if (!testSet) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <p>Test not found.</p>
                <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Go Back</button>
            </div>
        );
    }
    
    const handlePartToggle = (part: number) => {
        setSelectedParts(prev => ({ ...prev, [part]: !prev[part] }));
    };

    const handleStartClick = () => {
        const partsToPractice = Object.entries(selectedParts)
            .filter(([, isSelected]) => isSelected)
            .map(([part]) => Number(part));
        
        if (partsToPractice.length === 0) return;
        
        const timeInSeconds = timeLimit ? Number(timeLimit) * 60 : null;
        onStartPractice(partsToPractice, timeInSeconds);
    };

    const anyPartSelected = Object.values(selectedParts).some(isSelected => isSelected);
    const timeOptions = Array.from({ length: 15 }, (_, i) => (i + 1) * 5); // 5, 10, ..., 75

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                 <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Test Selection
                </button>
                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">{testSet.title} - Practice Setup</h2>
                    <div className="space-y-6">
                        { ([5, 6, 7] as const).map(partNum => (
                            <div key={partNum} className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                                <label className="flex items-center space-x-4 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedParts[partNum]} 
                                        onChange={() => handlePartToggle(partNum)} 
                                        className="h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-xl font-bold text-slate-800">Part {partNum} ({partInfo[partNum]?.count} câu hỏi)</span>
                                </label>
                                {partInfo[partNum] && partInfo[partNum].tags.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2 pl-10">
                                        {partInfo[partNum].tags.map(tag => (
                                            <span key={tag} className="bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 border-t pt-6">
                        <label htmlFor="time-limit" className="block text-lg font-semibold text-slate-700 mb-3">
                            Giới hạn thời gian (Để trống để làm bài không giới hạn)
                        </label>
                        <select 
                            id="time-limit" 
                            value={timeLimit} 
                            onChange={e => setTimeLimit(e.target.value)} 
                            className="block w-full px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Chọn thời gian --</option>
                            {timeOptions.map(time => (
                                <option key={time} value={time}>{time} minutes</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="mt-8 text-center">
                        <button 
                            onClick={handleStartClick} 
                            disabled={!anyPartSelected} 
                            className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            LUYỆN TẬP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadingPracticeSetupScreen;