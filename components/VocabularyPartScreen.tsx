import React from 'react';
import { VocabularyPart } from '../types';
import SelectionCard from './SelectionCard';

interface VocabularyPartScreenProps {
    partData: VocabularyPart;
    onSelectTest: (partId: number, testId: number) => void;
    onBack: () => void;
}

const VocabularyPartScreen: React.FC<VocabularyPartScreenProps> = ({ partData, onSelectTest, onBack }) => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Vocabulary Hub
                </button>
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">{partData.title}</h2>
                    <p className="mt-4 text-lg text-slate-600">{partData.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {partData.tests.map(test => (
                        <SelectionCard 
                            key={test.id}
                            title={test.title}
                            description={`${test.words.length} words`}
                            onClick={() => onSelectTest(partData.id, test.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VocabularyPartScreen;