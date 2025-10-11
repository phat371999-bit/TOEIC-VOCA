import React from 'react';
import SelectionCard from './SelectionCard';
import { allReadingTests } from '../services/readingLibrary';

interface ReadingPracticeScreenProps {
    onSelectTestSet: (testId: number) => void;
}

const ReadingPracticeScreen: React.FC<ReadingPracticeScreenProps> = ({ onSelectTestSet }) => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Luyện tập Reading</h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Choose a full test to begin your reading comprehension practice.
                    </p>
                </div>
                
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center border-b pb-4">
                        TEST 2024
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {allReadingTests.map(test => (
                             <SelectionCard 
                                key={test.id}
                                title={test.title}
                                description={test.description}
                                onClick={() => onSelectTestSet(test.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadingPracticeScreen;
