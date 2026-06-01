'use client'

import { forwardRef, SetStateAction, Dispatch, useEffect, useRef } from "react"
import AutoComplete from "./Autocomplete"

export const MobileSearch = forwardRef((props: { autocompleteOptions: any[], fetchAutoCompleteOptions: Function, isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (props.isOpen) {
            if (!dialog.open) dialog.showModal();
        }
        else {
            if (dialog.open) dialog.close();
        }
    }, [props.isOpen]);

    return (
        <dialog
            ref={dialogRef}
            className="fixed inset-0 m-0 h-[100dvh] min-h-[100dvh] w-screen max-w-none max-h-none border-0 p-0 lg:hidden backdrop:bg-transparent"
        >
            <div className="flex h-full min-h-full w-full flex-col bg-[#F5F3E7] dark:bg-[#1a1a1a] p-4">
                <div className="pt-4">
                    <AutoComplete 
                        autocompleteOptions={props.autocompleteOptions}
                        fetchAutoCompleteOptions={props.fetchAutoCompleteOptions}
                        ref={ref}
                        width='max-w-[calc(100vw-78px)] w-[80vw] sm:max-w-[400px]'
                        listWidth="max-w-[calc(100vw-78px)] w-[80vw] sm:max-w-[400px]"
                    />
                </div>
                <div className="mt-auto pb-4 flex justify-center">
                    <button
                        onClick={() => props.setIsOpen(false)}
                        className="px-6 py-2 bg-[#004C46] text-white rounded hover:bg-[#00332E] font-semibold"
                    >
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    )
})

MobileSearch.displayName = 'mobileSearch'
export default MobileSearch
