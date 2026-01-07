/**
 * @fileoverview page containing information on how to contribute to the 3D Digital Herbarium project.
 */

// import ContributionFormWrapper from '@/components/Contribution/ContributionFormWrapper'
import Header from '@/components/Header/Header'
import Footer from '@/components/Shared/Foot'

const Contribute = () => {
  return <>
    <Header headerTitle="contribute" pageRoute="collections" />
    <div className="min-h-[calc(100vh-177px)] h-full p-8">
      {/* <ContributionFormWrapper /> */}
      <p>If you would like to contribute to the 3D Digital Herbarium project, firstly, thank you!</p>
      <br></br>
      <p>We are currently transitioning to a new donation platform. In the meantime, you can support us through our <u><a href="https://gofund.me/d5cff183f" rel='noopener noreferrer' target='_blank'>GoFundMe</a></u></p>
    </div>
    <Footer />
  </>
}
export default Contribute