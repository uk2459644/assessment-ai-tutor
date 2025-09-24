import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Avatar({ videoUrl, isSpaking }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-gradient-to-br from-amber-50 to-orange-100 min-h-0">
      <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-amber-200">
        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-amber-200 flex items-center justify-center">
            <ImageWithFallback 
            src="https://images.unsplash.com/photo-1758127211804-aed1aa3aa5ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwYXZhdGFyJTIwY2FydG9vbiUyMGNoYXJhY3RlcnxlbnwxfHx8fDE3NTg2ODMyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="AI Tutor Avatar"
            className="w-full h-full object-cover"
          />
          </div>
        )}
      </div>

      <div className="mt-5 text-center">
        <h3 className="text-amber-800 text-lg font-semibold mb-1">Professor AI</h3>
        <p className="text-amber-600 text-sm max-w-xs">
          {isSpaking ? "Speaking..." : "Ready to help you learn!"}
        </p>
      </div>
    </div>
  );
}
