import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { X, History } from 'lucide-react';

export function LessonHistory({ lessons, currentLessonId, isOpen, onToggle }) {
  // Show toggle button when history is closed or when there are lessons
  if (lessons.length === 0 && !isOpen) {
    return null;
  }

  // Show only toggle button when closed
  if (!isOpen) {
    return (
      <div className="absolute top-4 right-4 z-10">
        <Button 
          onClick={onToggle}
          className="bg-slate-800/95 hover:bg-slate-700/95 border border-slate-600 text-green-100 p-3 rounded-lg shadow-xl backdrop-blur-sm"
          size="sm"
        >
          <History className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute top-4 right-4 w-80 max-h-96 bg-slate-800/95 backdrop-blur-sm rounded-lg border border-slate-600 shadow-xl z-10">
      <div className="p-4 border-b border-slate-600 flex items-center justify-between">
        <h3 className="text-green-100 font-mono">Lesson History</h3>
        <Button 
          onClick={onToggle}
          variant="ghost"
          size="sm"
          className="text-green-100 hover:bg-slate-700/50 p-1 h-auto"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      {lessons.length > 0 && (
        <ScrollArea className="h-80">
          <div className="p-4 space-y-4">
            {lessons.map((lesson, index) => (
              <div 
                key={lesson.id}
                className={`p-3 rounded-lg border transition-all ${
                  lesson.id === currentLessonId 
                    ? 'border-green-400 bg-green-900/30' 
                    : 'border-slate-600 bg-slate-700/50 hover:bg-slate-700/70'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-green-300 font-mono">
                      Q{lessons.length - index}:
                    </span>
                    <span className="text-xs text-slate-400">
                      {lesson.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-green-100 font-mono leading-relaxed">
                    {lesson.question}
                  </p>
                  
                  <div className="pt-2 border-t border-slate-600">
                    <p className="text-xs text-green-200 opacity-80 font-mono line-clamp-3">
                      {lesson.answer.substring(0, 100)}
                      {lesson.answer.length > 100 && '...'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
      
      {lessons.length === 0 && (
        <div className="p-4 text-center">
          <p className="text-green-300 opacity-60 font-mono text-sm">
            No lessons yet. Ask a question to get started!
          </p>
        </div>
      )}
    </div>
  );
}