import { GoogleGenerativeAI } from '@google/generative-ai'

import type { GeminiRiskAnalysis } from '../types'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' })

const FALLBACK: GeminiRiskAnalysis = {
  risk_score: 50,
  risk_level: 'caution',
  risk_explanation:
    'Automated risk analysis unavailable — proceed carefully and verify the seller directly.',
}

export async function analyseListing(
  title: string,
  description: string,
  price: number
): Promise<GeminiRiskAnalysis> {
  const prompt = `You are a fraud-detection analyst for a Nigerian P2P marketplace.
Evaluate this listing for fraud risk:
Title: "${title}"
Description: "${description}"
Price: ${price}

Return a JSON object with:
- risk_score: integer 0-100 (0 = no risk, 100 = certain fraud)
- risk_level: "clear" (0-29), "caution" (30-54), "suspicious" (55-79), or "high_risk" (80-100)
- risk_explanation: one plain-language sentence a buyer would understand, explaining the score.
Return only valid JSON. No markdown, no backticks, no explanation outside the JSON.`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()
    return JSON.parse(text) as GeminiRiskAnalysis
  } catch (err) {
    console.error('Gemini analysis failed, using fallback:', err)
    return FALLBACK
  }
}
