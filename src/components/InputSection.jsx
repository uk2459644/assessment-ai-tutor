import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Loader2, Send, Mic } from 'lucide-react';

export function InputSection({ onAskQuestion, isLoading }) {
  const [question, setQuestion] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Setup Web Speech API
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((res) => res[0].transcript)
          .join('');
        setQuestion(transcript);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn('SpeechRecognition API not supported in this browser.');
    }
  }, []);

  const handleAskQuestion = () => {
    if (question.trim() && !isLoading) {
      onAskQuestion(question.trim());
      setQuestion('');
    }
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-t-2 border-amber-200 p-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        {/* Display the recognized question */}
        <div className="text-amber-800 text-center text-lg font-semibold min-h-[1.5rem]">
          {question || 'Press the mic and ask your question'}
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          {/* Microphone button */}
          <Button
            type="button"
            onClick={toggleRecording}
            disabled={isLoading}
            className={`flex items-center justify-center w-12 h-12 rounded-full border border-amber-400 bg-amber-100 hover:bg-amber-200 transition-all ${isRecording ? 'text-red-500 animate-pulse' : 'text-amber-700'
              }`}
          >
            <Mic className="w-5 h-5" />
          </Button>

          {/* Ask button */}
          <Button
            type="button"
            onClick={handleAskQuestion}
            disabled={!question.trim() || isLoading}
            className="h-12 px-6 bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Ask
              </>
            )}
          </Button>
        </div>

        {/* Sample questions */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {['What is gravity?', 'Explain the water cycle', 'How do plants make food?', 'What causes seasons?'].map(
            (sample) => (
              <Button
                key={sample}
                type="button"
                onClick={() => !isLoading && setQuestion(sample)}
                disabled={isLoading}
                className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-700 px-3 py-1 rounded-full border border-amber-300 transition-colors disabled:opacity-50"
              >
                {sample}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
