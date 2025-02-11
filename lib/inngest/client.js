import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "NextAI",
  name: "NextAI",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
