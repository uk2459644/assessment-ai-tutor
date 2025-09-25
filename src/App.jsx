import { useState, useRef } from 'react';
import { Avatar } from './components/Avatar.jsx';
import { Blackboard } from './components/Blackboard.jsx';
import { InputSection } from './components/InputSection.jsx';
import { LessonHistory } from './components/LessonHistory.jsx';
import { fetchAIAnswer, fetchAIAudio, generateTalkingAvatar } from './api.js';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSpaking, setIsSpaking] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [lessons, setLessons] = useState([]);
  const [currentLessonId, setCurrentLessonId] = useState();
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const audioRef = useRef(null);

  const [videoUrl, setVideoUrl] = useState(null);

  const handleAskQuestion = async (question) => {
    if (!question) return;

    setIsLoading(true);
    setCurrentAnswer("");

    const lessonId = `lesson-${Date.now()}`;
    setCurrentLessonId(lessonId);

    let answerText = "";

    try {
      // ✅ 1. Call GPT for explanation (critical)
      answerText = await fetchAIAnswer(question);

      const newLesson = {
        id: lessonId,
        question,
        answer: answerText,
        timestamp: new Date(),
      };
      setLessons((prev) => [newLesson, ...prev]);

      // Always show text on blackboard
      setIsAnimating(true);
      setCurrentAnswer(answerText);
    } catch (error) {
      console.error("❌ GPT error:", error);
      setCurrentAnswer(
        "Sorry, I encountered an error fetching the explanation. Please try again."
      );
      setIsLoading(false);
      return; // stop here, don’t try video
    }

    setIsLoading(false);

    // ✅ 2. Try optional extras (video only)
    try {
      setIsSpaking(true);

      // 🎥 Avatar video (handles lipsync internally)
      try {
        const avatarVideoUrl = await generateTalkingAvatar(answerText);
        setVideoUrl(avatarVideoUrl);
        console.log("✅ Avatar video URL:", avatarVideoUrl);
      } catch (err) {
        console.warn("⚠️ Avatar generation failed:", err);
      }
    } catch (outerErr) {
      console.warn("⚠️ Non-critical media error:", outerErr);
    } finally {
      setIsSpaking(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-amber-100 to-orange-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-700 to-orange-700 text-white shadow-lg">
        <div className="px-6 py-4">
          <h1 className="text-center text-2xl tracking-wide">
            🎓 AI Classroom Tutor
          </h1>
          <p className="text-center text-amber-100 text-sm mt-1">
            Your personal AI teacher is ready to help you learn!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* Left Side - Avatar */}
        <div className="w-1/3 border-r-4 border-amber-300">
          <Avatar videoUrl={videoUrl} isSpaking={isSpaking} />
        </div>

        {/* Right Side - Blackboard */}
        <div className="flex-1 relative min-h-0">
          <Blackboard
            currentAnswer={currentAnswer}
            isAnimating={isAnimating}
          />

          <LessonHistory
            lessons={lessons}
            currentLessonId={currentLessonId}
            isOpen={isHistoryOpen}
            onToggle={() => setIsHistoryOpen(!isHistoryOpen)}
          />
        </div>
      </div>

      {/* Bottom - Input Section */}
      <div className="flex-none">
        <InputSection
          onAskQuestion={handleAskQuestion}
          isLoading={isLoading}
        />
      </div>

      {/* Hidden audio for TTS */}
      <audio ref={audioRef} />
    </div>
  );
}
