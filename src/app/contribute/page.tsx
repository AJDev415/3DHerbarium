/**
 * @file /app/contribute/page.tsx
 * @fileoverview page containing information on how to contribute to the 3D Digital Herbarium project.
 */

import ContributionFormWrapper from '@/components/Contribution/ContributionFormWrapper'
import Header from '@/components/Header/Header'
import Footer from '@/components/Shared/Foot'

const Contribute = () => {
  return <>
      <Header headerTitle="contribute" pageRoute="collections" />
      <div className="min-h-[calc(100vh-177px)] h-full p-8">
        <ContributionFormWrapper />
      </div>
      <Footer />
    </>
}
export default Contribute