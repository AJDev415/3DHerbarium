'use client'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

import ContributionForm from './ContributionForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || '')

const ContributionFormWrapper = () => {
    const [clientSecret, setClientSecret] = useState('')

    const getClientSecret = async () => {
        try {
            const res = await fetch('/api/createIntent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 1200 }),
            })
            const json = await res.json()
            setClientSecret(json.clientSecret || '')
        } catch (e) {
            console.error('Failed to get clientSecret', e)
        }
    }

    const options = {
        clientSecret: clientSecret,
        appearance: {/*...*/ },
    }

    useEffect(() => { getClientSecret() }, [])

    if (!clientSecret) return <div>Loading payment...</div>

    return (
        <article className='flex flex-col justify-center items-center w-full max-w-[750px] overflow-y-auto'>
            <p>Your donations help us grow and improve the 3D Digital Herbarium project.</p>
            <Elements stripe={stripePromise} options={options}>
                <ContributionForm />
            </Elements>
        </article>
    )
}

export default ContributionFormWrapper