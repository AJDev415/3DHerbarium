/**
 * @file src/components/Shared/Foot.tsx
 * 
 * @fileoverview Footer
 */

// Typical imports
import { Divider } from '@heroui/react'

// Default imports
import Image from 'next/image'
import Link from 'next/link'

// Main JSX
export default function Foot() {
  return <footer>

    {/***** Large screen footer *****/}

    <section className='w-full h-28 bg-[#004C46] dark:bg-[#212121] flex-col hidden md:flex'>

      {/* Top part of the footer (above the divider) */}
      <section className="w-full h-3/5 flex justify-between">

        {/* Logos in lower left hand corner*/}
        <section className='flex w-full justify-between'>

          {/*logo*/}
          <section className="ml-8 mt-6 flex flex-col justify-center items-center">
              <div className="h-12 relative bottom-[65px] right-[10px]">
                <Image src="/logos/svg/_3dHerbariumWhiteLogoNoBg.svg" alt='3D Herbarium Logo' width={150} height={0} />
              </div>
          </section>

          <div className='flex items-center relative right-[30px] space-x-6'>
            <Image src="/icons/white/twitter.svg" alt='Twitter Logo' width={32} height={0} />
            <Image src="/icons/white/instagram.svg" alt='Instagram Logo' width={32} height={0} />
            <Image src="/icons/white/tiktok.svg" alt='TikTok Logo' width={32} height={0} />
          </div>

        </section>

      </section>

      {/* Lower footer div (with divider and copyright) */}
      <div className='flex w-full justify-center'>
        <Divider className='bg-white w-[calc(100%-64px)]' />
      </div>

      {/*Copyright*/}
      <section className='flex relative justify-between w-full h-2/5 mt-2 z-50'>
        <section className="text-white flex mr-4 justify-around ml-4">
          <p className='mx-4'><Link href="/about">About</Link></p>
          <p className='mx-4'><Link href="/contribute">Contribute</Link></p>
          <p className='mx-4'><Link href="/licensing">License</Link></p>
          <p className='mx-4'><Link href="/contact">Contact</Link></p>
        </section>

        <p className='text-white text-right mr-8'>&#169; 2025 3dherbarium.net | 501(c)(3) nonprofit | EIN: 41-2784175</p>
      </section>

    </section>

    {/***** small-medium screen footer *****/}

    <section className='w-full h-fit bg-[#004C46] dark:bg-[#212121] flex flex-col md:hidden justify-center items-center'>

      {/*Logo*/}
      <div className="flex items-center w-full">
        <div className="h-36 w-full relative">
          <Image src="/logos/svg/3dHerbariumWhiteLogoNoBg.svg" alt='3D Herbarium Logo' fill />
        </div>
      </div>


      <div className='flex items-center relative space-x-12 mb-12'>
        <Image src="/icons/white/twitter.svg" alt='Twitter Logo' width={30} height={0} />
        <Image src="/icons/white/instagram.svg" alt='Instagram Logo' width={30} height={0} />
        <Image src="/icons/white/tiktok.svg" alt='TikTok Logo' width={30} height={0} />
      </div>

      {/* Links */}
      <div className="text-white grid grid-cols-3 text-center min-[385px]:flex min-[385px]:justify-between min-[385px]:mx-2 w-full">
        <p className='mx-2 text-center'><Link href="/about">About</Link></p>
        <p className='mx-2 text-center'><Link href="/contribute">Contribute</Link></p>
        <p className='mx-2 text-center'><Link href="/licensing">License</Link></p>
        <p className='mx-2 text-center'><Link href="/contact">Contact</Link></p>
      </div>

      {/*Divider*/}
      <div className='flex w-full justify-center'>
        <Divider className='bg-white w-full mt-2' />
      </div>

      {/*Copyright*/}
      <p className='text-white text-center mt-2'>&#169; 2025 3dherbarium.net</p>

    </section>

  </footer>
}