import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // store key in .env
  dangerouslyAllowBrowser: true // only for demo purposes; do NOT use in production
});

// Function to get AI answer
export async function fetchAIAnswer(question) {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini", // fast + cheaper
    messages: [
      { role: "system", content: "You are a friendly AI tutor. Explain topics simply, step by step, with examples." },
      { role: "user", content: question }
    ]
  });

  return completion.choices[0].message.content;
}

// Generate audio from text
export async function fetchAIAudio(text) {
  const response = await client.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "alloy", // can also use "verse" or "shimmer"
    input: text
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  return URL.createObjectURL(new Blob([buffer], { type: "audio/mpeg" }));
}