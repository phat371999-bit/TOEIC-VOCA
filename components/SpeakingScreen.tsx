import React from 'react';
import SelectionCard from './SelectionCard';

interface SpeakingScreenProps {
    onSelectPart: (part: number) => void;
}

const SpeakingScreen: React.FC<SpeakingScreenProps> = ({ onSelectPart }) => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Luyện tập Speaking</h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Choose a part to begin your speaking practice. These exercises require a microphone.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectionCard 
                        title="Part 1: Read a text aloud"
                        description="Read a piece of text as clearly and articulately as possible."
                        onClick={() => onSelectPart(1)}
                    />
                    <SelectionCard 
                        title="Part 2: Describe a picture"
                        description="Describe a photograph in as much detail as you can."
                        onClick={() => onSelectPart(2)}
                    />
                    <SelectionCard 
                        title="Part 3: Respond to questions"
                        description="Answer a series of questions about a familiar topic."
                        onClick={() => onSelectPart(3)}
                    />
                    <SelectionCard 
                        title="Part 4: Respond to questions using provided information"
                        description="Answer questions using information from a provided document."
                        onClick={() => onSelectPart(4)}
                    />
                    <div className="md:col-span-2">
                        <SelectionCard 
                            title="Part 5: Express an opinion"
                            description="Prepare a response and then give a spoken opinion on a specific topic."
                            onClick={() => onSelectPart(5)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeakingScreen;