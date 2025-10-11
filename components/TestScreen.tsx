import React, { useState, useEffect, useCallback, useRef } from 'react';
// FIX: Imported missing types for test data and user answers.
import { TestData, UserAnswers, Question, QuestionOption } from '../types';
import Timer from './Timer';
import QuestionPalette from './QuestionPalette';
import AudioPlayer from './AudioPlayer';
import AddVocabPopup from './AddVocabPopup';
import { useWordSelection } from './useWordSelection';

interface TestScreenProps {
  testData: TestData;
  userAnswers: UserAnswers;
  onSubmit: (answers: UserAnswers) => void;
}

const TestScreen: React.FC<TestScreenProps> = ({ testData, userAnswers: initialAnswers, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>(initialAnswers);
  const [time, setTime] = useState(testData.duration);
  const contentRef = useRef<HTMLDivElement>(null);
  const { selectionPopup, toastMessage, handleMouseUp, handleSaveWord } = useWordSelection(contentRef);
  
  const currentQuestion = testData.questions[currentQuestionIndex];

  const handleTimeUp = useCallback(() => {
    onSubmit(answers);
  }, [onSubmit, answers]);

  const handleAnswerSelect = (questionId: number | string, option: QuestionOption) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < testData.questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < testData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
       {toastMessage && (
          <div className="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
              {toastMessage}
          </div>
        )}
      {selectionPopup && <AddVocabPopup top={selectionPopup.top} left={selectionPopup.left} onSave={handleSaveWord} />}
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg border" ref={contentRef} onMouseUp={handleMouseUp}>
          <h2 className="text-xl font-bold mb-4 text-slate-800">Question {currentQuestionIndex + 1} of {testData.questions.length}</h2>
          
          {currentQuestion.part === 1 && currentQuestion.image && (
            <div className="mb-4 rounded-lg overflow-hidden">
                <img src={currentQuestion.image} alt="TOEIC Part 1" className="w-full object-cover"/>
            </div>
          )}

          {currentQuestion.audioScript && (
            <div className="mb-6">
                <p className="font-semibold text-slate-700 mb-2">Listen to the audio:</p>
                <AudioPlayer audioScript={currentQuestion.audioScript} />
            </div>
          )}

          <div className="text-lg text-slate-800 mb-6 space-y-2">
             <p dangerouslySetInnerHTML={{ __html: currentQuestion.questionText.replace(/____/g, '<span class="font-bold text-blue-600">____</span>') }} />
          </div>

          <div className="space-y-3">
            {(Object.keys(currentQuestion.options) as QuestionOption[]).map(optionKey => (
              currentQuestion.options[optionKey] && (
                 <label key={optionKey} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${answers[currentQuestion.id] === optionKey ? 'bg-blue-100 border-blue-500 shadow-sm' : 'bg-white border-slate-300 hover:border-blue-400'}`}>
                    <input 
                        type="radio" 
                        name={`question-${currentQuestion.id}`} 
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                        checked={answers[currentQuestion.id] === optionKey}
                        onChange={() => handleAnswerSelect(currentQuestion.id, optionKey)}
                    />
                    <span className="ml-4 text-base text-slate-700"><span className="font-bold">{optionKey}.</span> {currentQuestion.options[optionKey]}</span>
                 </label>
              )
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="mt-8 lg:mt-0 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border">
                <Timer initialTime={time} onTimeUp={handleTimeUp} />
                <button 
                    onClick={() => { if(window.confirm('Are you sure you want to submit your answers?')) onSubmit(answers); }}
                    className="w-full mt-4 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                    Submit Test
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border">
                <h3 className="text-lg font-bold mb-4">Question Palette</h3>
                <QuestionPalette 
                    questions={testData.questions}
                    answers={answers} 
                    currentQuestionIndex={currentQuestionIndex}
                    onQuestionSelect={goToQuestion}
                />
                 <div className="flex justify-between mt-6">
                    <button onClick={goToPrev} disabled={currentQuestionIndex === 0} className="px-4 py-2 bg-slate-200 rounded-md font-semibold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300">Previous</button>
                    <button onClick={goToNext} disabled={currentQuestionIndex === testData.questions.length - 1} className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700">Next</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TestScreen;
