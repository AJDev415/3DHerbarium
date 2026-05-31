'use client'

import { useEffect, useRef } from "react"

export default function MobileMenu(props: { isOpen: boolean }) {
    const dialogRef = useRef<HTMLDialogElement>(null)

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
        <div className="flex h-full w-full items-center justify-center">
            <h1 className="text-2xl text-[#004C46] dark:text-white">Mobile Menu</h1>
        </div>
    </dialog>
}