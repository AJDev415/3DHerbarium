'use client'

import { useEffect, useState } from "react";
import { isBotanyTouchscreen } from "@/functions/client/touchScreen";

import Link from "next/link"

export default function Links(props: { page?: string }) {

    const [isBotanyTouchscreenState, setIsBotanyTouchscreenState] = useState<boolean>(false)

    useEffect(() => { const setIsTouchscreen = async () => { setIsBotanyTouchscreenState(await isBotanyTouchscreen()); setIsTouchscreen() } }, [])

    return (
        <>
            <div className="pr-[2vw]">
                <Link className="text-white dark:text-[#F5F3E7]" href={`/collections/search`} aria-label="Go to the collections page">
                    Collections
                </Link>
            </div>
            <div className="pr-[2vw]">
                <Link className="text-white dark:text-[#F5F3E7]" href={`/plantid`} aria-label="Go to the plant.id page">
                    Plant.id
                </Link>
            </div>
            <div className="pr-[2vw]">
                <Link className="text-white dark:text-[#F5F3E7]" href={`/media`} aria-label="Go to the media">
                    Media
                </Link>
            </div>
        </>
    )
}

