/**
 * @file src/components/Collections/SketchfabApi/AIReference.tsx
 *
 * @fileoverview Renders a Gemini-powered reference panel with an initial botany fact and follow-up chat.
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { getAiContent, getInitialBotanyFact } from '@/functions/server/ai'

export interface AIReferenceProps {
	species?: string | null
	className?: string
	title?: string
	placeholder?: string
	width?: string
}

interface ChatLine {
	id: string
	role: 'user' | 'assistant' | 'system'
	text: string
}

const isStringWithText = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0

const isRateLimitError = (error: unknown): boolean => {
	if (!error) return false

	if (typeof error === 'string') {
		const text = error.toLowerCase()
		return text.includes('rate limit') || text.includes('too many requests') || text.includes('429')
	}

	if (typeof error === 'object') {
		const typedError = error as { message?: unknown; status?: unknown; code?: unknown }
		const message = isStringWithText(typedError.message) ? typedError.message.toLowerCase() : ''
		const status = String(typedError.status ?? '')
		const code = String(typedError.code ?? '').toLowerCase()

		return (
			message.includes('rate limit') ||
			message.includes('too many requests') ||
			message.includes('429') ||
			status === '429' ||
			code.includes('rate')
		)
	}

	return false
}

const escapeHtml = (value: string): string =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')

const renderMarkdownLikeText = (value: string): string => {
	const escaped = escapeHtml(value)

	return escaped
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/\*(.+?)\*/g, '<em>$1</em>')
		.replace(/\n/g, '<br />')
}

const getGeminiText = (response: unknown): string => {
	if (isStringWithText(response)) return response.trim()
	if (!response || typeof response !== 'object') return ''

	const typedResponse = response as {
		text?: unknown
		candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
	}

	if (isStringWithText(typedResponse.text)) return typedResponse.text.trim()

	if (typeof typedResponse.text === 'function') {
		const functionText = (typedResponse.text as () => string)()
		if (isStringWithText(functionText)) return functionText.trim()
	}

	const partText = typedResponse.candidates
		?.flatMap((candidate) => candidate.content?.parts ?? [])
		.map((part) => part.text ?? '')
		.join('\n')

	if (isStringWithText(partText)) return partText.trim()

	return ''
}

const makeLine = (role: ChatLine['role'], text: string): ChatLine => ({
	id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
	role,
	text
})

export default function AIReference(props: AIReferenceProps) {
	const {
		species,
		className = '',
		title = 'Have a question? Ask PlantBot!',
		placeholder = 'Ask PlantBot a question about this species...'
	} = props

	const containerRef = useRef<HTMLDivElement>(null)
	const [messages, setMessages] = useState<ChatLine[]>([])
	const [query, setQuery] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isInitializing, setIsInitializing] = useState<boolean>(true)
	const [animatedTitle, setAnimatedTitle] = useState<string>('')
	const [showCursor, setShowCursor] = useState<boolean>(true)

	useEffect(() => {
		if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setAnimatedTitle(title)
			setShowCursor(false)
			return
		}

		setAnimatedTitle('')
		setShowCursor(true)

		let index = 0
		const typingInterval = setInterval(() => {
			index += 1
			setAnimatedTitle(title.slice(0, index))

			if (index >= title.length) {
				clearInterval(typingInterval)
				setTimeout(() => setShowCursor(false), 500)
			}
		}, 35)

		return () => clearInterval(typingInterval)
	}, [title])

	useEffect(() => {
		let mounted = true

		const loadInitialFact = async () => {
			if (!isStringWithText(species)) {
				if (mounted) {
					setMessages([makeLine('system', 'Species context is unavailable. You can still ask general botany questions.')])
					setIsInitializing(false)
				}
				return
			}

			try {
				const response = await getInitialBotanyFact(species)
				const text = getGeminiText(response)

				if (!mounted) return
				if (isStringWithText(text)) {
					setMessages([makeLine('assistant', text)])
				} else {
					setMessages([makeLine('system', 'PlantBot did not return an initial fact. Try asking a question below.')])
				}
			} catch (error) {
				if (!mounted) return
				console.error(error)
				setMessages([
					makeLine(
						'system',
						isRateLimitError(error)
							? 'PlantBot is busy right now! Try again later.'
							: 'Unable to load the initial botany fact right now.'
					)
				])
			} finally {
				if (mounted) setIsInitializing(false)
			}
		}

		loadInitialFact()

		return () => {
			mounted = false
		}
	}, [species])

	const submitQuery = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!isStringWithText(query) || isLoading) return

		const trimmedQuery = query.trim()
		setQuery('')
		setMessages((previous) => [...previous, makeLine('user', trimmedQuery)])
		setIsLoading(true)

		try {
			const prompt = isStringWithText(species)
				? `Species: ${species}\n\nUser question: ${trimmedQuery}`
				: trimmedQuery
			const response = await getAiContent(prompt)
			const text = getGeminiText(response)

			setMessages((previous) => [
				...previous,
				makeLine('assistant', isStringWithText(text) ? text : 'PlantBot did not return a response. Please try again.')
			])
		} catch (error) {
			console.error(error)
			setMessages((previous) => [
				...previous,
				makeLine(
					'system',
					isRateLimitError(error)
						? 'PlantBot is busy right now! Try again later.'
						: 'PlantBot request failed. Please try again.'
				)
			])
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (!containerRef.current) return
		containerRef.current.scrollTop = containerRef.current.scrollHeight
	}, [messages, isLoading, isInitializing])

	if(process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
		return <section className={`w-[40%] h-full min-h-0 flex flex-col text-[#F5F3E7] ${className}`.trim()} aria-label='PlantBot reference chat'>
			<div className='flex justify-center items-center h-full text-white'>Plantbot panel appears here in production builds</div>
		</section>
	}

	return (
		<section className={`${props.width ?? 'w-[40%]'} h-full min-h-0 flex flex-col text-[#F5F3E7] ${className}`.trim()} aria-label='PlantBot reference chat'>
			<div className='mb-2 px-2 min-h-[34px] flex items-center justify-between gap-3'>
				<h3 className='text-lg font-semibold leading-none flex items-center text-white'>
					{animatedTitle}
					{showCursor && <span className='ml-0.5 inline-block w-[0.6ch] animate-pulse'>|</span>}
				</h3>
				<p className='text-xs text-[#F5F3E7] text-right whitespace-nowrap leading-none'>
					PlantBot is powered by{' '}
					<a href='https://gemini.google.com' target='_blank' rel='noopener noreferrer' className='text-white underline hover:text-[#F5F3E7]'>
						Gemini
					</a>
				</p>
			</div>

			<div
				ref={containerRef}
				className='w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden rounded border border-[#57B7A8] bg-[#081512] p-3'
			>
				{isInitializing && <p className='text-sm text-[#F5F3E7]'>Loading a fun botany fact...</p>}

				{!isInitializing && messages.length === 0 && (
					<p className='text-sm text-[#F5F3E7]'>PlantBot is ready. Ask a botany question to begin.</p>
				)}

				{messages.map((line) => {
					const isEntry = line.role === 'user'
					const isResponse = line.role === 'assistant'

					return (
						<article
							key={line.id}
							className={`mb-3 rounded p-3 ${
								isEntry
									? 'bg-[#103128] border border-[#2E7A6C] text-[#F5F3E7]'
									: isResponse
										? 'bg-[#0B1F1A] border border-[#57B7A8] text-white'
										: 'bg-[#1B1B1B] border border-[#616161] text-[#F5F3E7]'
							}`}
						>
							<p className='mb-1 text-xs font-semibold tracking-wide uppercase text-[#F5F3E7]'>
								{isEntry ? 'You' : isResponse ? 'PlantBot' : 'System'}
							</p>
							<p
								className='text-sm text-[#F5F3E7] break-words leading-relaxed'
								dangerouslySetInnerHTML={{ __html: renderMarkdownLikeText(line.text) }}
							/>
						</article>
					)
				})}

				{isLoading && (
					<article className='mb-3 rounded p-3 bg-[#0B1F1A] border border-[#57B7A8] text-white'>
						<p className='mb-1 text-xs font-semibold tracking-wide uppercase text-[#F5F3E7]'>PlantBot</p>
						<p className='text-sm text-[#F5F3E7] whitespace-pre-wrap break-words leading-relaxed'>Thinking...</p>
					</article>
				)}
			</div>

			<form onSubmit={submitQuery} className='mt-3 flex gap-2 pb-1'>
				<input
					type='text'
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder={placeholder}
					disabled={isLoading || isInitializing}
					className='w-full rounded border border-[#57B7A8] bg-[#0B1F1A] px-3 py-2 text-sm text-[#F5F3E7] placeholder:text-[#D9D2B0] outline-none focus:border-white'
				/>
				<button
					type='submit'
					disabled={isLoading || isInitializing || !isStringWithText(query)}
					className='rounded border border-[#57B7A8] bg-[#103128] px-4 py-2 text-sm font-semibold text-[#F5F3E7] hover:bg-[#154238] disabled:opacity-50'
				>
					Send
				</button>
			</form>
		</section>
	)
}
