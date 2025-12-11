/**
 * @fileoverview page containing information on how to contribute to the 3D Digital Herbarium project.
 */

import ContributionFormWrapper from '@/components/Contribution/ContributionFormWrapper'
import Header from '@/components/Header/Header'
import Footer from '@/components/Shared/Foot'

const Contribute = () => {
  return <>
    <Header headerTitle="contribute" pageRoute="collections" />
    <div className="min-h-[calc(100vh-177px)] h-full p-8">
      {/* <ContributionFormWrapper /> */}
      <p>If you would like to contribute to the 3D Digital Herbarium project, firstly, thank you for your interest!</p>
      <p>We will be working on a fundraiser soon, and will also be accepting donations here on the site. Please follow our socials to find out more!</p>
    </div>
    <Footer />
  </>
}
export default Contribute