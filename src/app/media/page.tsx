/**
 * @fileoverview 3D Digital Herbarium Media Page
 */

'use client'

import Image from "next/image"
import dynamic from "next/dynamic"
import Foot from "@/components/Shared/Foot"
import { Divider } from "@heroui/react"
const Header = dynamic(() => import('@/components/Header/Header'), { ssr: false })

export default function Page() {
    return <>
        <meta name="description" content="Follow the 3D Digital Herbarium on social media for the latest updates and news."></meta>
        <Header pageRoute="collections" headerTitle='Media' />
        <main className="flex flex-col overflow-y-auto p-8 min-w-[300px] w-full overflow-x-auto">

            <article className='w-full h-fit flex flex-col justify-center'>
                <p className="text-3xl md:ml-24 mb-1">Social</p>
                <Divider />
                <div className="flex w-full flex-col items-center justify-center my-8">

                    <div className="flex justify-center items-center">
                        <a href="https://x.com/3DHerbarium" target="_blank" rel="noopener noreferrer" className="text-lg">
                            <Image src="/icons/x.svg" width={32} height={0} alt="X Logo" className="inline-block mr-4 my-4" />
                        </a>
                        <p>@3DHerbarium </p>
                    </div>

                    <div className="flex justify-center items-center">
                        <a href="https://instagram.com/3DHerbarium" target="_blank" rel="noopener noreferrer" className="text-lg">
                            <Image src="/icons/instagram.svg" width={42} height={40} alt="Instagram Logo" className="inline-block mr-4 my-4" />
                        </a>
                        <p>@3DHerbarium</p>
                    </div>

                    <div className="flex justify-center items-center">
                        <a href="https://tiktok.com/@3d.herbarium" target="_blank" rel="noopener noreferrer" className="text-lg">
                            <Image src="/icons/tiktok.svg" width={40} height={40} alt="TikTok Logo" className="inline-block mr-4 my-4" />
                        </a>
                        <p>@3D.Herbarium</p>
                    </div>

                </div>
            </article>

            <article className='w-full h-fit flex flex-col justify-center'>
                <p className="text-3xl md:ml-24 mb-1">Conference Presentations</p>
                <Divider />
                <div className="flex w-full flex-col items-center justify-center mt-2">

                    <div className="flex flex-col my-12 w-full justify-center items-center">
                        <p className="text-2xl my-2">Code4Lib2025</p>
                        <div className="flex justify-center w-full max-w-[560px]">
                            <iframe
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/ktQ2rznlIr8?si=5TXhCs_62yJFM-RS&amp;start=14157"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>

                    <div className="flex flex-col mb-12 w-full justify-center items-center">
                        <p className="text-2xl my-2 text-center">Coalition for Networked Information (CNI) 2024</p>
                        <div className="flex justify-center w-full max-w-[560px]">
                            <iframe
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/5QJwIixjhaM?si=uMUX7aO_7QEqqdii"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>

                    <div className="flex flex-col mb-12 w-full justify-center items-center">
                        <p className="text-2xl my-2">Access 2023</p>
                        <div className="flex justify-center w-full max-w-[560px]">
                            <iframe
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/4F2EaxomLEs?si=xouzVHd5eltV1qIB"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>

                </div>
            </article>

            <article className='w-full h-fit flex flex-col justify-center'>
                <p className="text-3xl md:ml-24 mb-1">Promotions</p>
                <Divider />
                <div className="flex w-full flex-col items-center justify-center">

                    <div className="flex flex-col my-12 w-full justify-center items-center">
                        <p className="text-2xl my-2">NSF TIDE Support</p>
                        <div className="flex justify-center w-full max-w-[560px]">
                            <iframe
                                width="100%"
                                height="315"
                                src="https://humboldt.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=fefb3ccc-a4c8-4536-8a41-b31a013b4d4b&amp;autoplay=false&amp;offerviewer=true&amp;showtitle=true&amp;showbrand=false&amp;captions=true&amp;interactivity=all"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>

                    <div className="flex flex-col mb-12 w-full justify-center items-center">
                        <p className="text-2xl my-2 text-center">When Programmers Need Botanists</p>
                        <div className="flex justify-center w-full max-w-[560px]">
                            <iframe
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/kUW6duHD2e8?si=Bdaf6btM8yceoyis"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>

                </div>
            </article>

        </main>
        <Foot />
    </>
}