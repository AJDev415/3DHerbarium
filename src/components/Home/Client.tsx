/**
 * @fileoverview home page client
 */
'use client'

import { isMobileOrTablet } from '@/functions/client/utils/isMobile'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import dynamic from 'next/dynamic'

const HomeModel = dynamic(() => import('@/components/Home/model'), { ssr: false })

export default function HomePageClient() {

    const router = useRouter()

    useEffect(() => { if (isMobileOrTablet()) router.push('/collections/search') }, [router])

    return <HomeModel />
}