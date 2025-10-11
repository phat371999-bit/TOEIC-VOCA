import React, { useRef } from 'react';
// FIX: Imported missing types for test data, answers, and questions.
import { TestData, UserAnswers, Question, QuestionOption } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';
import AddVocabPopup from './AddVocabPopup';
import { useWordSelection } from './useWordSelection';

interface ResultsScreenProps {
  testData: TestData;
  userAnswers: UserAnswers;
  onGoHome: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ testData, userAnswers, onGoHome }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { selectionPopup, toastMessage, handleMouseUp, handleSaveWord } = useWordSelection(contentRef);
  
  const score = testData.questions.reduce((acc, q) => {
    return userAnswers[q.id] === q.correctAnswer ? acc + 1 : acc;
  }, 0);
  const totalQuestions = testData.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getOptionClasses = (question: Question, option: QuestionOption) => {
    const isCorrect = option === question.correctAnswer;
    const isSelected = userAnswers[question.id] === option;

    if (isCorrect) return 'bg-green-100 border-green-500';
    if (isSelected && !isCorrect) return 'bg-red-100 border-red-500';
    return 'bg-white border-slate-300';
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      {toastMessage && (
          <div className="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
              {toastMessage}
          </div>
      )}
      {selectionPopup && <AddVocabPopup top={selectionPopup.top} left={selectionPopup.left} onSave={handleSaveWord} />}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border" ref={contentRef} onMouseUp={handleMouseUp}>
        <h2 className="text-3xl font-bold text-center mb-2 text-slate-900">Test Results</h2>
        <p className="text-center text-lg text-slate-600 mb-8">{testData.testTitle}</p>

        <div className="text-center bg-slate-100 p-6 rounded-lg mb-10">
          <h3 className="text-xl font-semibold text-slate-800">Your Score</h3>
          <p className="text-6xl font-bold text-blue-600 my-2">{percentage}%</p>
          <p className="text-lg text-slate-600">You answered <span className="font-bold">{score}</span> out of <span className="font-bold">{totalQuestions}</span> questions correctly.</p>
        </div>

        <h3 className="text-2xl font-bold mb-6 border-b pb-3">Detailed Review</h3>

        <div className="space-y-8">
          {testData.questions.map((q, index) => (
            <div key={q.id} className="border-b pb-8">
              <h4 className="text-lg font-semibold mb-4">Question {index + 1}</h4>
              {q.image && <img src={q.image} alt={`Question ${index+1}`} className="rounded-lg mb-4 max-w-sm"/>}
              <p className="text-lg text-slate-800 mb-4" dangerouslySetInnerHTML={{ __html: q.questionText }} />
              <div className="space-y-3 mb-4">
                {(Object.keys(q.options) as QuestionOption[]).map(optionKey => (
                   q.options[optionKey] && (
                     <div key={optionKey} className={`flex items-start p-3 border rounded-lg ${getOptionClasses(q, optionKey)}`}>
                        <div className="flex-shrink-0 mt-1">
                          {userAnswers[q.id] === optionKey && userAnswers[q.id] !== q.correctAnswer && <XCircleIcon className="h-5 w-5 text-red-600"/>}
                          {optionKey === q.correctAnswer && <CheckCircleIcon className="h-5 w-5 text-green-600"/>}
                        </div>
                        <span className="ml-3 text-base text-slate-700"><span className="font-bold">{optionKey}.</span> {q.options[optionKey]}</span>
                     </div>
                   )
                ))}
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h5 className="font-bold text-slate-800">Explanation:</h5>
                <p className="text-slate-600 mt-1">{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
            <button onClick={onGoHome} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Back to Home
            </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
