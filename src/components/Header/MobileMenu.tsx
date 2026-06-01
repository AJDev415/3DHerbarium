'use client'

import { useEffect, useRef } from "react"
import Link from "next/link"
import { signIn, signOut, useSession, } from "next-auth/react"


export default function MobileMenu(props: { isOpen: boolean }) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const { data: session } = useSession();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (props.isOpen) {
            if (!dialog.open) dialog.show();
        }
        else {
            if (dialog.open) dialog.close();
        }
    }, [props.isOpen]);

    return <dialog
        id="mobileMenuDialog"
        ref={dialogRef}
        className="fixed left-0 top-[44px] m-0 h-[calc(100vh-44px)] w-screen max-w-none border-0 p-0"
    >
        <div className="flex h-full w-full flex-col bg-[#F5F3E7] px-6 py-8 dark:bg-[#1a1a1a]">
            {session ? (
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => signOut()} className="px-6 py-2 bg-[#004C46] text-white rounded font-semibold">
                        Sign Out
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => signIn()} className="px-6 py-2 bg-[#004C46] text-white rounded font-semibold">
                        Sign In
                    </button>
                </div>
            )}
            <nav className="flex flex-col gap-5 text-2xl">
                <Link className="text-[#004C46] dark:text-white" href="/">Home</Link>
                <Link className="text-[#004C46] dark:text-white" href="/collections/search">Collections</Link>
                <Link className="text-[#004C46] dark:text-white" href="/plantid">Plant.id</Link>
                <Link className="text-[#004C46] dark:text-white" href="/media">Media</Link>
                <Link className="text-[#004C46] dark:text-white" href="/contribute">Contribute</Link>
                <Link className="text-[#004C46] dark:text-white" href="/about">About</Link>
                <Link className="text-[#004C46] dark:text-white" href="/license">License</Link>
            </nav>
        </div>
    </dialog>
}