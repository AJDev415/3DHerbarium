/**
 * @file src/app/modelSubmit/page.tsx
 * 
 * @fileoverview server modelSubmit page
 */

// Typical imports
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { serverErrorHandler } from "@/functions/server/error"

// Default imports
import Header from '@/components/Header/Header'
import Foot from "@/components/Shared/Foot"
import ModelSubmitForm from "@/components/ModelSubmit/Form"
import FullPageError from "@/components/Error/FullPageError"

// Path
const path = 'src/app/modelSubmit/page.tsx'

// Main JSX
export default async function Page() {

    var session

    // await session, redirect if there isn't a session or user
    try { session = await getServerSession(authOptions).catch(e => serverErrorHandler(path, e.message, "Couldn't get session", "getServerSession()", false)) }
    catch (e: any) { return <FullPageError clientErrorMessage={e.message} /> }

    if (!session || !session.user) redirect('/api/auth/signin')

    // Note there is no client wrapper; just header => form => footer
    return (
        <>
            <Header headerTitle='Submit a 3D Model' pageRoute='modelSubmit' />
            {/* <ModelSubmitForm /> */}
            <div className="h-[calc(100vh-177px)] flex flex-col justify-center items-center">
                <p>The 3D Digital Herbarium is currently transitioning its underlying 3D model infrastructure. This will enable to improve the submission process and enhance the overall user experience.</p>
                <p>To help enable this effort and find out more about this transition, please visit our <u><a href="/contributions">contributions</a></u> page.</p>
                <p>We appreciate your patience and understanding during this time of change.</p>
            </div>
            <Foot />
        </>
    )
}