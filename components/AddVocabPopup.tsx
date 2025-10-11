import React from 'react';

interface AddVocabPopupProps {
    top: number;
    left: number;
    onSave: () => void;
}

const AddVocabPopup: React.FC<AddVocabPopupProps> = ({ top, left, onSave }) => {
    return (
        <div
            className="absolute z-50"
            style={{ top: `${top}px`, left: `${left}px`, transform: 'translateY(-110%)' }}
        >
            <button
                onClick={onSave}
                className="bg-blue-600 text-white px-3 py-1 rounded-md shadow-lg text-sm font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
                Save Word
            </button>
        </div>
    );
};

export default AddVocabPopup;