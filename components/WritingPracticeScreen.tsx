import React from 'react';
import SelectionCard from './SelectionCard';

interface WritingPracticeScreenProps {
    onSelectPart: (part: number) => void;
}

const WritingPracticeScreen: React.FC<WritingPracticeScreenProps> = ({ onSelectPart }) => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Luyện tập Writing</h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Choose a part to begin your writing practice.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SelectionCard 
                        title="Part 1: Writing a sentence"
                        description="Write one sentence based on a picture and two given words."
                        onClick={() => onSelectPart(1)}
                    />
                    <SelectionCard 
                        title="Part 2: Writing an email"
                        description="Read and respond to an email message."
                        onClick={() => onSelectPart(2)}
                    />
                    <SelectionCard 
                        title="Part 3: Writing an essay"
                        description="Write an opinion essay in response to a question."
                        onClick={() => onSelectPart(3)}
                    />
                </div>
            </div>
        </div>
    );
};

export default WritingPracticeScreen;