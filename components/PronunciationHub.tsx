import React from 'react';
import { TypeIcon, BookOpenIcon, SparklesIcon } from './icons';

interface PronunciationHubProps {
    onSelectMode: (mode: 'word' | 'sentence' | 'paragraph') => void;
}

const PracticeCard: React.FC<{title: string, description: string, onClick: () => void, icon: React.FC<any>, disabled?: boolean}> = ({ title, description, onClick, icon: Icon, disabled }) => (
    <button 
        onClick={onClick}
        disabled={disabled}
        className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-700 text-left w-full h-full flex flex-col items-center text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
        <Icon className="h-12 w-12 text-blue-600 mb-4" />
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 flex-grow">{description}</p>
        {disabled && <span className="text-xs font-semibold text-yellow-500 mt-2">Coming Soon</span>}
    </button>
);


const PronunciationHub: React.FC<PronunciationHubProps> = ({ onSelectMode }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">Luyện tập Phát âm</h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Choose a mode to practice your pronunciation with AI-powered feedback.
        </p>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <PracticeCard 
            title="Từ lẻ"
            description="Practice individual words. The AI will show you the phonetic spelling and evaluate your pronunciation."
            onClick={() => onSelectMode('word')}
            icon={TypeIcon}
        />
        <PracticeCard 
            title="Câu"
            description="Read full sentences and get feedback on your flow, intonation, and rhythm."
            onClick={() => onSelectMode('sentence')}
            icon={BookOpenIcon}
            disabled={true}
        />
        <PracticeCard 
            title="Đoạn"
            description="Read a short paragraph and receive a comprehensive analysis of your spoken English."
            onClick={() => onSelectMode('paragraph')}
            icon={SparklesIcon}
            disabled={true}
        />
      </div>
    </div>
  );
};

export default PronunciationHub;
