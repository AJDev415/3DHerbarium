//@ts-nocheck

/**
 * @file src/components/Header/LogoAndSignIn.tsx
 * 
 * @fileoverview header logo and sign in 
 * 
 * @todo extract isAdmin()
 */

'use client'

// Typical imports
import { signIn, useSession, signOut } from "next-auth/react"

// Default imports
import Image from "next/image"
import Link from "next/link"

// Main JSX
export default function LogoAndSignIn() {

    // Variables
    const { data: session } = useSession();

    return <section className="hidden lg:flex pl-[0.5vw]">
        <div className="flex items-center mr-2">
            <Link href='/' aria-label="Go to the home page">
                <Image src="/icons/whiteHome.svg" width={35} height={70} alt="Logo" className="pt-[3px]" />
            </Link>
        </div>
        {!session &&
            <button
                className="bg-[#004C46] text-white hover:bg-[#00665f] rounded-xl font-semibold p-1 px-2"
                onClick={() => signIn()}
            >
                Sign In
            </button>
        }
        {
            session &&
            <details className="relative">
                <summary
                    aria-label="Open user navigation menu"
                    className="list-none cursor-pointer flex items-center justify-center bg-[#004C46] rounded-full w-9 h-9"
                >
                    <Image src="/icons/user.svg" alt="User" width={27} height={30} />
                </summary>
                <nav className="absolute right-0 mt-2 min-w-[220px] rounded-lg border border-[#D9D2B0] bg-[#F5F3E7] shadow-lg overflow-hidden z-50">
                    <Link href="/dashboard" className="block px-4 py-3 text-[#004C46] hover:bg-[#D9D2B0]/70">
                        Dashboard
                    </Link>
                    <Link href="/modelSubmit" className="block px-4 py-3 text-[#004C46] hover:bg-[#D9D2B0]/70">
                        Contribute a 3D Model
                    </Link>
                    <button
                        className="block w-full text-left px-4 py-3 text-[#004C46] hover:bg-[#D9D2B0]/70"
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </button>
                </nav>
            </details>

        }
    </section>
}

// <Dropdown>
//     <DropdownTrigger>
//         <Avatar
//             isFocusable={true}
//             src={session?.user?.image!}
//             name={session?.user?.name!}
//             aria-label="Avatar dropdown menu"
//         />
//     </DropdownTrigger>
//     <DropdownMenu
//         aria-label="Static Actions"
//         classNames={{
//             base: "bg-[#F5F3E7] text-[#004C46] border border-[#D9D2B0] shadow-lg",
//             list: "bg-[#F5F3E7] text-[#004C46]",
//             emptyContent: "text-[#004C46]"
//         }}
//         itemClasses={{
//             base: "text-[#004C46] data-[hover=true]:bg-[#D9D2B0]/70 data-[pressed=true]:bg-[#D9D2B0]/90"
//         }}
//     >
//         <DropdownItem aria-label="dashboard option" key="dashboard" onClick={() => router.push('/dashboard')}>Dashboard</DropdownItem>
//         <DropdownItem aria-label="submit model option" key="modelSubmit" onClick={() => router.push('/modelSubmit')}>Submit 3D Model</DropdownItem>
//         {
//             isAdministrator && process.env.NEXT_PUBLIC_LOCAL_ENV === 'development' && session.user?.email !== 'aj@3dherbarium.net' &&
//             <DropdownItem aria-label="dev admin option" key="devAdmin" onClick={() => router.push('/admin')}>Admin</DropdownItem>
//         }
//         {session.user?.email === 'aj@3dherbarium.net' && <DropdownItem aria-label="admin option" key="admin" onClick={() => router.push('/admin')}>Admin</DropdownItem>}
//         <DropdownItem aria-label="Sign out" key="signOut" onClick={() => signOut()}>Sign Out</DropdownItem>
//     </DropdownMenu>
// </Dropdown>