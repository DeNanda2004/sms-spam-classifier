import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { Email, AnalysisResult, EmailCategory, RiskLevel } from "../types";

const SYSTEM_INSTRUCTION = `
You are an elite AI email security analyst specializing in psychological manipulation and impersonation detection.
Analyze the email provided and detect:
1. Category: Spam, Genuine, or Promotions.
2. Risk Level & Score (0-100).
3. Impersonation: Is the sender pretending to be a bank, government, or major brand (Amazon, PayPal, etc.)?
4. Psychological Manipulation: Score (0-10) for Urgency, Fear, Greed, and Authority tactics.
5. Link Safety: Evaluate any URLs mentioned in the text for domain mismatches or phishing signs.
6. Memory Match: If provided with 'past_patterns', identify if this email matches known malicious techniques.
7. Simple Explanation: A one-sentence explanation for a 10-year-old.

Return a valid JSON object strictly following the schema.
`;

const RESPONSE_SCHEMA = {
  type: SchemaType.OBJECT,
  properties: {
    category: { type: SchemaType.STRING, enum: ['Genuine', 'Spam', 'Promotions'] },
    risk_score: { type: SchemaType.NUMBER },
    risk_level: { type: SchemaType.STRING, enum: ['Safe', 'Medium Risk', 'High Risk'] },
    confidence: { type: SchemaType.STRING },
    reasons: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    detected_threats: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    suggested_action: { type: SchemaType.STRING },
    impersonation_target: { type: SchemaType.STRING },
    emotional_triggers: {
      type: SchemaType.OBJECT,
      properties: {
        urgency: { type: SchemaType.NUMBER },
        fear: { type: SchemaType.NUMBER },
        greed: { type: SchemaType.NUMBER },
        authority: { type: SchemaType.NUMBER }
      },
      required: ["urgency", "fear", "greed", "authority"]
    },
    link_analysis: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          url: { type: SchemaType.STRING },
          risk: { type: SchemaType.STRING, enum: ['Low', 'Medium', 'High'] },
          reason: { type: SchemaType.STRING }
        },
        required: ["url", "risk", "reason"]
      }
    },
    simplified_explanation: { type: SchemaType.STRING }
  },
  required: ["category", "risk_score", "risk_level", "confidence", "reasons", "detected_threats", "suggested_action", "emotional_triggers", "link_analysis", "simplified_explanation"]
} as const;

export async function analyzeEmail(email: Partial<Email>, pastPatterns?: string[]): Promise<AnalysisResult> {
  // Initialize GoogleGenerativeAI with API Key
  const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

  const historyText = pastPatterns && pastPatterns.length > 0
    ? `\nKNOW MALICIOUS PATTERNS FROM HISTORY:\n${pastPatterns.join('\n')}`
    : "";

  const prompt = `
    Analyze this email content:
    SENDER_NAME: ${email.sender || 'Unknown'}
    SENDER_EMAIL: ${email.senderEmail || 'Unknown'}
    SUBJECT: ${email.subject || '(No Subject)'}
    BODY: ${email.body || '(Empty Body)'}
    ${historyText}
  `;

  try {
    // Start chat or simple generation model
    // Using gemini-1.5-pro or gemini-1.5-flash
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA as any,
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON
    // Note: If responseMimeType is set to application/json, text() returns JSON string directly
    const jsonStr = text.trim();
    return JSON.parse(jsonStr) as AnalysisResult;

  } catch (error) {
    console.error("AI Response Parsing Error:", error);
    throw new Error("Failed to analyze email security. Please try again later.");
  }
}
