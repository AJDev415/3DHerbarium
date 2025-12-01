/**
 * @file /app/contribute/page.tsx
 * @fileoverview page containing information on how to contribute to the 3D Digital Herbarium project.
 */

import Header from '@/components/Header/Header'
import Footer from '@/components/Shared/Foot'

const Contribute = () => {
  return (
    <>
      <Header headerTitle="contribute" pageRoute="collections" />
      <div className="h-[calc(100vh-177px)] pl-8">
        <br></br>
        <p>Thank you for considering contribution!</p>
        <br></br>
        <p>For code contributions, check out our <a href='https://github.com/AJDev415/3DHerbarium' target='_blank' rel='noopener noreferrer'><u>github</u></a></p>
      </div>
      <Footer />
    </>
  )
}
export default Contribute;