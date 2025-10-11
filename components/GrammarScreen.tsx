import React, { useState } from 'react';
import SelectionCard from './SelectionCard';
import { generateRandomGrammarQuiz } from '../services/geminiService';
import { TestData } from '../types';
import { LoadingIcon, SparklesIcon } from './icons';

const grammarTopics = [
    { title: "Danh từ & Cụm danh từ", description: "Nouns & Noun Phrases" },
    { title: "Động từ", description: "Verbs" },
    { title: "Tính từ", description: "Adjectives" },
    { title: "Trạng từ", description: "Adverbs" },
    { title: "Giới từ & Liên từ", description: "Prepositions & Conjunctions" },
    { title: "Hạn định từ", description: "Determiners" },
    { title: "Đại từ", description: "Pronouns" },
    { title: "Mệnh đề quan hệ", description: "Relative Clauses" },
    { title: "Mệnh đề danh từ", description: "Noun Clauses" },
    { title: "Đảo ngữ", description: "Inversions" },
    { title: "So sánh", description: "Comparisons" },
    { title: "Các loại khác", description: "Other Topics" }
];

interface GrammarScreenProps {
    onSelectTopic: (topic: string) => void;
    onStartRandomTest: (testData: TestData) => void;
}

const GrammarScreen: React.FC<GrammarScreenProps> = ({ onSelectTopic, onStartRandomTest }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateQuiz = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const testData = await generateRandomGrammarQuiz();
            if (testData && testData.questions.length > 0) {
                onStartRandomTest(testData);
            } else {
                setError('Failed to generate a valid quiz. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while generating the quiz. Please check your API key and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Ngữ pháp</h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Review key grammar concepts for the TOEIC test.
                    </p>
                </div>

                <div className="mb-12">
                     <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 text-center">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">
                            Ôn tập ngẫu nhiên (AI)
                        </h3>
                        <p className="text-slate-600 mb-4">
                            Generate 20 random grammar questions covering all topics.
                        </p>
                         <button
                            onClick={handleGenerateQuiz}
                            disabled={isLoading}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
                        >
                            {isLoading ? (
                                <>
                                    <LoadingIcon className="animate-spin h-5 w-5"/>
                                    <span>Generating Quiz...</span>
                                </>
                            ) : (
                                <>
                                    <SparklesIcon className="h-5 w-5" />
                                    <span>Start Random Quiz</span>
                                </>
                            )}
                        </button>
                         {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {grammarTopics.map(topic => (
                        <SelectionCard 
                            key={topic.title}
                            title={topic.title}
                            description={topic.description}
                            onClick={() => onSelectTopic(topic.title)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GrammarScreen;