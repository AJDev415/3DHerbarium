export default function Page() {
    return <div className="flex flex-col p-8 overflow-y-auto">
        <p className="mb-4"><strong>Date of Last Revision:</strong> 12/10/2025</p>

        <h2 className="text-xl">1. Introduction</h2>
        <p className="ml-4 my-2">This Privacy Policy describes how 3Dherbarium.net (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and shares your personal data when you use our website and services (the &quot;Service&quot;). By using our Service, you agree to the collection and use of information in accordance with this policy.</p>

        <h2 className="text-xl mt-2">2. Information We Collect</h2>
        <p className="ml-4 my-2">We only collect the minimum amount of data necessary to provide our Service:</p>

        <h3 className="ml-4 my-1">A. Information You Provide to Us (Account Data)</h3>
        <ul className="ml-8">
            <li className="my-2"><strong>Email Address:</strong> We collect your email address when you register for an account.</li>
            <li className="my-2"><strong>Purpose:</strong> This information is used solely for the purpose of creating your user account, enabling you to log in, and sending essential Service-related communications (e.g., password reset links, order confirmations).</li>
        </ul>

        <h3 className="ml-4 my-1">B. Information Collected by Third-Party Processors (Payment Data)</h3>
        <p className="ml-4 my-2">When you make a purchase, payment details are processed directly by our third-party payment processor, <strong>Stripe</strong>.</p>
        <ul className="ml-8">
            <li className="my-2"><strong>We DO NOT store or have access to your full credit card number.</strong> Stripe handles all sensitive financial data.</li>
            <li className="my-2">Stripe may collect and process information such as your name, billing address, IP address, and transaction details, in accordance with their own <a href="[Insert Link to Stripe's Privacy Policy]" target="_blank">Privacy Policy</a>, to complete the transaction and prevent fraud.</li>
        </ul>

        <h3 className="ml-4 my-1">C. Cookies and Tracking Technologies</h3>
        <p className="ml-4 my-2">Our Service utilizes cookies **strictly necessary** for the functioning of the Stripe payment gateway and for maintaining your logged-in session. These cookies are used to provide the Service, ensure security, and are not used for advertising or non-essential tracking.</p>

        <h2 className="text-xl">3. How We Use Your Information</h2>
        <p className="ml-4 my-2">We use the minimal data we collect for the following purposes:</p>
        <ul className="ml-8">
            <li className="my-2"><strong>To Provide and Maintain the Service:</strong> To create and manage your account and allow you to log in.</li>
            <li className="my-2"><strong>To Process Transactions:</strong> To fulfill your purchases through our payment processor, Stripe.</li>
            <li className="my-2"><strong>Security:</strong> To protect the integrity and security of the Service and prevent fraudulent activity.</li>
        </ul>

        <h2 className="text-xl">4. Sharing Your Personal Data</h2>
        <p className="ml-4 my-2">We do not sell, rent, or trade your email address or any other personal data we directly collect. We only share data with the following essential third party:</p>
        <ul className="ml-8">
            <li className="my-2"><strong>Stripe:</strong> We share necessary transaction data (like order amount, billing information) with Stripe to facilitate payments and prevent fraud. Stripe acts as an independent controller of your payment data.</li>
        </ul>

        <h2 className="text-xl">5. Data Retention</h2>
        <p className="ml-4 my-2">We retain your email address for as long as your account is active. If you close your account, we will delete your email address, unless legally required to keep it for compliance or regulatory purposes.</p>

        <h2 className="text-xl">6. Your Data Protection Rights</h2>
        <p className="ml-4 my-2">Depending on where you live (e.g., if you are an EU/UK or California resident), you may have the right to access, correct, delete, or object to the processing of your personal data. To exercise any of these rights, please contact us using the information provided in Section 7.</p>

        <h2 className="text-xl">7. Contact Us</h2>
        <p className="ml-4 my-2">If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us at:</p>
        <p className="ml-4"><strong>3dherbarium.net</strong></p>
        <p className="ml-4"><strong>Email:</strong> support@3dherbarium.net</p>
        <p className="ml-4"><strong>Address:</strong> PO Box 243, Arcata, CA 95521</p>

    </div>
}