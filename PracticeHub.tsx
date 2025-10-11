
import React from 'react';

interface PracticeHubProps {
  onNavigateToPracticeTest: () => void;
  onNavigateToDictation: () => void;
}

const PracticeCard: React.FC<{title: string, description: string, onClick: () => void}> = ({ title, description, onClick }) => (
    <button 
        onClick={onClick}
        className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-200 text-left w-full"
    >
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
    </button>
);


const PracticeHub: React.FC<PracticeHubProps> = ({ onNavigateToPracticeTest, onNavigateToDictation }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Practice Hub</h2>
        <p className="mt-4 text-lg text-slate-600">
          Choose a practice mode to start improving your English skills.
        </p>
      </div>
      <div className="max-w-2xl mx-auto grid grid-cols-1 gap-8">
        <PracticeCard 
            title="Luyện tập Test"
            description="Take a mini-TOEIC test with multiple-choice questions covering various parts of the exam."
            onClick={onNavigateToPracticeTest}
        />
        <PracticeCard 
            title="Dictation"
            description="Listen to sentences and type what you hear to improve your listening and spelling."
            onClick={onNavigateToDictation}
        />
      </div>
    </div>
  );
};

export default PracticeHub;
