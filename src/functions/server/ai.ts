'use server'

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

const RATE_LIMIT_MESSAGE = 'PlantBot is busy right now! Try again later.'

const isRateLimitError = (error: unknown): boolean => {
    if (!error) return false

    if (typeof error === 'string') {
        const text = error.toLowerCase()
        return text.includes('rate limit') || text.includes('too many requests') || text.includes('429') || text.includes('quota exceeded')
    }

    if (typeof error !== 'object') return false

    const typedError = error as {
        message?: unknown
        status?: unknown
        code?: unknown
        error?: { code?: unknown; status?: unknown; message?: unknown }
    }

    const message = typeof typedError.message === 'string' ? typedError.message.toLowerCase() : ''
    const status = String(typedError.status ?? typedError.error?.status ?? '').toLowerCase()
    const code = String(typedError.code ?? typedError.error?.code ?? '')
    const nestedMessage = typeof typedError.error?.message === 'string' ? typedError.error.message.toLowerCase() : ''

    return (
        message.includes('rate limit') ||
        message.includes('too many requests') ||
        message.includes('429') ||
        message.includes('quota exceeded') ||
        nestedMessage.includes('rate limit') ||
        nestedMessage.includes('too many requests') ||
        nestedMessage.includes('429') ||
        nestedMessage.includes('quota exceeded') ||
        status === 'resource_exhausted' ||
        status === '429' ||
        code === '429' ||
        code.toLowerCase() === 'resource_exhausted'
    )
}

const logAiError = (error: unknown): string => {
    console.error(error)

    if (isRateLimitError(error)) {
        console.error(RATE_LIMIT_MESSAGE)
    }

    return ''
}

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
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: query,
        })
        return getResponseText(response).trim()
    } catch (error) {
        return logAiError(error)
    }
}

export const getInitialBotanyFact = async (species: string) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: `Provide an interesting fact about the plant species ${species} that would be suitable for a general audience. 
        Keep the response concise and engaging.`,
        })
        return getResponseText(response).trim()
    } catch (error) {
        return logAiError(error)
    }
}
