'use client'

import React, { FormEvent, useState } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button } from '@heroui/react'

const ContributionForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const [errorMessage, setErrorMessage] = useState<string>()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // 
        event.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        const { error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/collections/search',
                // Example return_url: http://localhost:3000/collections/search?payment_intent=pi_3Sc9wp6MGs02isuf1VKIBixW&payment_intent_client_secret=pi_3Sc9wp6MGs02isuf1VKIBixW_secret_DavtE87lAGw00eQ1TBnnUVTQJ&redirect_status=succeeded
            },
        })


        if (error) {
            setErrorMessage(error.message)
        } else {

        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button disabled={!stripe}>Submit</button>
        </form>
    )
}

export default ContributionForm