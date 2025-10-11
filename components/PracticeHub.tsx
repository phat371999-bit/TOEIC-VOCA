import React from 'react';

interface PracticeHubProps {
  onNavigateToVocabulary: () => void;
}

const PracticeCard: React.FC<{title: string, description: string, onClick: () => void}> = ({ title, description, onClick }) => (
    <button 
        onClick={onClick}
        className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-700 text-left w-full h-full flex flex-col"
    >
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 flex-grow">{description}</p>
    </button>
);


const PracticeHub: React.FC<PracticeHubProps> = ({ 
    onNavigateToVocabulary
}) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">TOEIC không khó, học CHẮC bao ĐẬU</h2>
        <p className="mt-4 text-lg text-red-600 font-bold">
          Vì đây là sản phẩm đang phát triển. Nếu có sai sót, xin vui lòng nhắn tin cho thầy Phát qua Facebook cá nhân ở cuối trang.
        </p>
      </div>
      <div className="max-w-md mx-auto">
        <PracticeCard 
            title="Từ vựng"
            description="Review saved vocabulary using a spaced repetition system to build your word bank."
            onClick={onNavigateToVocabulary}
        />
      </div>
    </div>
  );
};

export default PracticeHub;