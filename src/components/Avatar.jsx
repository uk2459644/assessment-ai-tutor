import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Avatar({ videoUrl, isSpaking }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-gradient-to-br from-amber-50 to-orange-100 min-h-0">
      <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-amber-200 flex items-center justify-center">
        {isSpaking && !videoUrl && (
          // 🔄 Loading spinner while fetching video
          <div className="absolute inset-0 flex items-center justify-center bg-amber-100">
            <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-amber-200 flex items-center justify-center">
            <ImageWithFallback
              src="https://d-id-public-bucket.s3.us-west-2.amazonaws.com/alice.jpg"
              alt="AI Tutor Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="mt-5 text-center">
        <h3 className="text-amber-800 text-lg font-semibold mb-1">
          Professor AI
        </h3>
        <p className="text-amber-600 text-sm max-w-xs">
          {isSpaking
            ? videoUrl
              ? "Speaking..."
              : "Generating your lesson video..."
            : "Ready to help you learn!"}
        </p>
      </div>
    </div>
  );
}
