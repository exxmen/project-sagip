import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Language, RemediationData } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const remediationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    conceptReview: {
      type: Type.STRING,
      description: "A kind, encouraging explanation of the error and the correct concept. Written in the requested language/dialect.",
    },
    practiceProblems: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "A practice problem rooted in Filipino context."
      },
      description: "List of 5 practice problems.",
    },
  },
  required: ["conceptReview", "practiceProblems"],
};

export const analyzeQuizImage = async (
  base64Image: string,
  language: Language
): Promise<RemediationData> => {
  try {
    // Strip the data URL prefix if present to get raw base64
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

    const prompt = `
      You are an expert Filipino Master Teacher (Guro III) specializing in remedial education.
      
      Task:
      1. Analyze the attached image of a student's failed quiz/worksheet.
      2. Identify the specific misconception or error the student made.
      3. Create a 'Concept Review': Explain the correct concept simply. Use an encouraging tone. Use the language: ${language}.
      4. Create 5 'Practice Problems': Generate new problems similar to the error but DIFFERENT values. 
         - Contextualize these problems using Filipino culture (e.g., sari-sari store, jeepney fare, mangoes, wet market, peso coins, local geography).
      
      Output must be strictly JSON matching the schema provided.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg", // Assuming JPEG for simplicity, though the API handles others
              data: cleanBase64,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: remediationSchema,
        temperature: 0.4, // Lower temperature for more focused educational content
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as RemediationData;
    } else {
      throw new Error("No response text received from Gemini.");
    }
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};