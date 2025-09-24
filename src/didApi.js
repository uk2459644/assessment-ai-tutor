export async function generateTalkingAvatar(text) {
  const response = await fetch("https://api.d-id.com/talks", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_DID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source_url: "https://images.unsplash.com/photo-1758127211804-aed1aa3aa5ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwYXZhdGFyJTIwY2FydG9vbiUyMGNoYXJhY3RlcnxlbnwxfHx8fDE3NTg2ODMyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", // Your avatar image
      script: { type: "text", input: text },
      voice: "alloy", // preset voice
    }),
  });

  const data = await response.json();
  return data.output_url; // URL to generated video
}
