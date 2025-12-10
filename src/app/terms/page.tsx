import Header from "@/components/Header/Header"
import Foot from "@/components/Shared/Foot"

export default function Page() {
    return <main className="flex flex-col min-h-[100vh-177px] h-full">
        <Header headerTitle='Terms and Conditions' pageRoute='/collections' />
        <div className="flex flex-col p-8">
            <h2 className="text-xl">1. Acceptance of Terms</h2>
            <p className="ml-4 my-2">By accessing and using this website (the &quot;Service&quot;), you agree to be bound by these Terms and Conditions (&quot;Terms&quot;), all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these Terms, you are prohibited from using or accessing this site.</p>

            <h2 className="text-xl mt-2">2. Privacy and Data Usage</h2>

            <h3 className="ml-4 my-1">a. Account Registration Data</h3>
            <p className="ml-8 mt-1 mb-2">We collect and store the email address you provide for the sole purpose of creating and maintaining your user account and enabling your log-in access to the Service. We do not share, sell, or rent this personal data to third parties for marketing purposes.</p>

            <h3 className="ml-4 my-1">b. Payment Processing and Cookies</h3>
            <p className="ml-8 mt-1 mb-2">All payment transactions are handled through a third-party payment processor, <strong>Stripe</strong>.</p>
            <ul className="ml-8">
                <li className="my-2"><strong>Payment Data:</strong> We do not directly store your credit card details. Stripe processes and stores this information securely.</li>
                <li className="my-2"><strong>Cookies:</strong> Our website utilizes cookies strictly necessary for the operation of the Stripe payment gateway. These cookies are set and managed by Stripe to facilitate secure and compliant payment processing. <strong>Stripe may collect and use certain data, including your IP address</strong>, in accordance with their own Privacy Policy to prevent fraud and provide their services. You are encouraged to review Stripe’s privacy documentation.</li>
            </ul>

            <h2 className="text-xl mt-2">3. User Content and 3D Model Submissions</h2>

            <h3 className="ml-8 mt-1 mb-2">a. Definition of User Content</h3>
            <p>&quot;User Content&quot; includes any data, text, files, information, usernames, images, graphics, photos, profiles, audio and video clips, sounds, musical works, works of authorship, applications, links, and other content or materials that you submit or upload to the Service.</p>

            <h3 className="ml-8 mt-1 mb-2">b. 3D Model Uploads and Licensing</h3>
            <p>In the event the Service allows you to upload or submit 3D model files (&quot;3D Models&quot;):</p>
            <ul>
                <li className="my-2"><strong>Ownership:</strong> You retain all ownership rights to your 3D Models. We do not claim any ownership rights over your User Content, including your 3D Models.</li>
                <li className="my-2"><strong>License Grant:</strong> By uploading 3D Models, you grant us a worldwide, non-exclusive, royalty-free, transferable license (with the right to sublicense) to use, reproduce, distribute, prepare derivative works of, display, and perform the 3D Models in connection with the Service and our business, including without limitation for promoting and redistributing part or all of the Service (and derivative works thereof) in any media formats and through any media channels. This license is only granted for the purposes stated within the Service (e.g., displaying the model in your profile, generating thumbnails, etc.).</li>
                <li className="my-2"><strong>Warranties:</strong> You represent and warrant that you have all the necessary rights, power, and authority to grant the above license and that your 3D Models do not infringe, misappropriate, or violate a third party&quot;s patent, copyright, trademark, trade secret, moral rights, or other proprietary or intellectual property rights, or rights of publicity or privacy, or result in the violation of any applicable law or regulation.</li>
            </ul>

            <h2 className="text-xl mt-2">4. Intellectual Property Rights</h2>
            <p className="ml-8 mt-1 mb-2">The content on the Service (excluding User Content), including text, graphics, images, software, and trademarks, is owned by or licensed to us, subject to copyright and other intellectual property rights under law.</p>

            <h2 className="text-xl mt-2">5. Disclaimer and Limitation of Liability</h2>
            <p className="ml-8 mt-1 mb-2">The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no warranties, expressed or implied, regarding the operation or availability of the Service. In no event shall we be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Service.</p>

        </div>
        <Foot />
    </main>
}