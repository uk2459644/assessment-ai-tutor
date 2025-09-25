// src/api.js - frontend
const BACKEND = import.meta.env.VITE_BACKEND_URL || "https://ai-tutor-server-940j.onrender.com";

// port changed to 4000 in .env

export async function fetchAIAnswer(question) {
  const res = await fetch(`${BACKEND}/api/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error("Failed to fetch answer");
  const data = await res.json();
  return data.answer;
}

export async function fetchAIAudio(text) {
  const res = await fetch(`${BACKEND}/api/audio`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Failed to fetch audio");
  const data = await res.json();
  return data.audio; // data URL
}

export async function generateTalkingAvatar(text) {
  const res = await fetch(`${BACKEND}/api/did-talk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Failed to create avatar");
  const data = await res.json();
  return data.videoUrl;
}
