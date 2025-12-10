/**
 * @file /app/contact/page.tsx
 * @fileoverview contains information on how to contact Cyril and AJ :)
 */

import Header from '@/components/Header/Header'
import Footer from '@/components/Shared/Foot'

const Contribute = () => {
  return (
    <>
      <Header headerTitle="contribute" pageRoute="collections" />
      <div className="h-[calc(100vh-177px)] pl-8">
        <br></br>
        <p>All inquiries can be directed to info@3dherbarium.net</p>
      </div>
      <Footer />
    </>
  )
}
export default Contribute