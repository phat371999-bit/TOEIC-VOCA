import React from 'react';

// A generic card for selecting parts, tests, or exercises
const SelectionCard: React.FC<{title: string, description: string, onClick: () => void}> = ({ title, description, onClick }) => (
    <button 
        onClick={onClick}
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-200 text-left w-full h-full flex flex-col"
    >
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm flex-grow">{description}</p>
    </button>
);

export default SelectionCard;