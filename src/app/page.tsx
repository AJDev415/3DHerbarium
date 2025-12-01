/**
 * @file src/app/page.tsx
 * 
 * @fileoverview home page server component
 */

// Default imports
import dynamic from 'next/dynamic'

// Dynamic imports
const HomePageClient = dynamic(() => import('@/components/Home/Client'))

// Main JSX
export default async function Page() {

  return <>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1"></meta>
    <meta name="description" content="The New Home of the World's First 3D Digital Herbarium"></meta>

    <title>3D Digital Herbarium</title>

    <section className='h-[100vh]'>
        <HomePageClient />
    </section>
  </>
}

