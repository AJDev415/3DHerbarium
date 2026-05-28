'use server'

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

const getResponseText = (response: unknown): string => {
    if (typeof response === 'string') return response
    if (!response || typeof response !== 'object') return ''

    const typedResponse = response as {
        text?: unknown
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
    }

    if (typeof typedResponse.text === 'string') return typedResponse.text

    if (typeof typedResponse.text === 'function') {
        const value = (typedResponse.text as () => string)()
        return typeof value === 'string' ? value : ''
    }

    const candidateText = typedResponse.candidates
        ?.flatMap((candidate) => candidate.content?.parts ?? [])
        .map((part) => part.text ?? '')
        .join('\n')

    return typeof candidateText === 'string' ? candidateText : ''
}

export const getAiContent = async (query: string) => {
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: query,
    })
    return getResponseText(response).trim()
}

export const getInitialBotanyFact = async (species: string) => {
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Provide an interesting fact about the plant species ${species} that would be suitable for a general audience. 
        Keep the response concise and engaging.`,
    })
    return getResponseText(response).trim()
}
