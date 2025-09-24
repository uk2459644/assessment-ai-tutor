import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Loader2, Send } from 'lucide-react';

export function InputSection({ onAskQuestion, isLoading }) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onAskQuestion(question.trim());
      setQuestion('');
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-t-2 border-amber-200 p-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label htmlFor="question" className="block text-amber-800 mb-2">
              Ask your question:
            </label>
            <Input
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Explain photosynthesis in simple terms..."
              disabled={isLoading}
              className="h-12 text-base bg-white border-2 border-amber-200 focus:border-amber-400 rounded-lg shadow-sm"
            />
          </div>
          <Button
            type="submit"
            disabled={!question.trim() || isLoading}
            className="h-12 px-8 bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Ask
              </>
            )}
          </Button>
        </div>
        
        {/* Sample questions */}
        <div className="mt-4">
          <p className="text-amber-700 text-sm mb-2">Sample questions:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "What is gravity?",
              "Explain the water cycle",
              "How do plants make food?",
              "What causes seasons?"
            ].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => !isLoading && setQuestion(sample)}
                disabled={isLoading}
                className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-700 px-3 py-1 rounded-full border border-amber-300 transition-colors disabled:opacity-50"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}