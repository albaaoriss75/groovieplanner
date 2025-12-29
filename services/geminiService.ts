
import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, PlanOutput, Language } from "../types";

export const generatePlan = async (prefs: UserPreferences, lang: Language): Promise<PlanOutput> => {
  // Always use {apiKey: process.env.API_KEY} as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Generate a personalized "Groovie" life growth plan for a person with the following details:
    Name: ${prefs.name}
    Age: ${prefs.age}
    Primary Goal: ${prefs.primaryGoal}
    Focus Area: ${prefs.focusArea}
    Current Habits: ${prefs.currentHabits}
    Target Habits: ${prefs.targetHabits}
    Commitment Level: ${prefs.timeCommitment}
    
    The plan should be encouraging, retro-styled in tone, and highly actionable.
    Please provide the output in ${lang === 'en' ? 'English' : 'Bulgarian'}.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          dailyRoutine: {
            type: Type.OBJECT,
            properties: {
              morning: { type: Type.ARRAY, items: { type: Type.STRING } },
              afternoon: { type: Type.ARRAY, items: { type: Type.STRING } },
              evening: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["morning", "afternoon", "evening"]
          },
          habits: { type: Type.ARRAY, items: { type: Type.STRING } },
          milestones: { type: Type.ARRAY, items: { type: Type.STRING } },
          quote: { type: Type.STRING }
        },
        required: ["title", "summary", "dailyRoutine", "habits", "milestones", "quote"]
      }
    }
  });

  // The .text property is a getter, do not call it as a function.
  const text = response.text;
  if (!text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(text);
};
