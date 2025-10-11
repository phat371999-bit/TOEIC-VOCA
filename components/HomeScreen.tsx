

import React, { useState, useCallback } from 'react';
import { generateTOEICMiniTest } from '../services/geminiService';
// FIX: Imported TestData type.
import { TestData } from '../types';
import { LoadingIcon } from './icons';

interface HomeScreenProps {
  onStartTest: (testData: TestData) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartTest }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateTest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const testData = await generateTOEICMiniTest();
      if (testData && testData.questions.length > 0) {
        onStartTest(testData);
      } else {
        setError('Failed to generate a valid test. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the test. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [onStartTest]);

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Welcome to the Practice Zone</h2>
        <p className="mt-4 text-lg text-slate-600">
          Sharpen your English skills with AI-powered TOEIC practice tests. Click the button below to generate a new mini-test and begin your practice session.
        </p>
        <div className="mt-10">
          <button
            onClick={handleGenerateTest}
            disabled={isLoading}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {isLoading ? (
              <>
                <LoadingIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Generating Test...
              </>
            ) : (
              'Start New Mini-Test'
            )}
          </button>
        </div>
        {error && <p className="mt-6 text-red-500 font-semibold">{error}</p>}
      </div>
    </div>
  );
};

export default HomeScreen;
