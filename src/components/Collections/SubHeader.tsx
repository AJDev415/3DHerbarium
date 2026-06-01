/**
 * @file src/components/Collections/SubHeader.tsx
 * 
 * @fileoverview collections page subheader
 */

'use client'

// Typical imports
import { Switch } from "@heroui/react"
import { SetStateAction, Dispatch, useContext } from "react"
import { CollectionsContext } from "./CollectionsWrapper/CollectionsWrapper"
import { CollectionsWrapperData } from "@/ts/reducer"

// Default imports
import CollectionsMediaRadio from "./Radio"

// Main JSX
export default function CollectionsSubheader(props: { isSelected: boolean, setIsSelected: Dispatch<SetStateAction<boolean>>, communityId: string | null }) {

    // Context, variables
    const context = useContext(CollectionsContext) as CollectionsWrapperData
    const mediaState = context.mediaState
    const collectionsProps = context.collectionsWrapperProps
    const title = context.collectionsWrapperProps.noModelData.title

    // Return JSX
    return <div className="hidden lg:flex h-10 bg-[#00856A] dark:bg-[#212121] text-white items-center justify-between dark:border-t dark:border-t-[#333]">

        <CollectionsMediaRadio setIsSelected={props.setIsSelected} />

        {(mediaState.observationsChecked || mediaState.photosChecked) && <p className="mr-8">{title && mediaState.photosChecked ? title : "Observations by iNaturalist"}</p>}

        {
            mediaState.modelChecked && !!collectionsProps.model.length && !props.communityId &&

            <section className="flex mr-8">

                {mediaState.scale && <Switch className='mr-6 whitespace-nowrap' color='secondary'>Scale (cm)</Switch>}

                {!!collectionsProps.annotations?.length && <label htmlFor="annotationSwitch" className="inline-flex items-center gap-2 pr-[2.5%] cursor-pointer">
                    <input
                        id="annotationSwitch"
                        aria-label="Toggle annotations"
                        type="checkbox"
                        className="sr-only peer"
                        checked={props.isSelected}
                        onChange={e => props.setIsSelected(e.target.checked)}
                    />
                    <span className="relative inline-block h-5 w-10 rounded-full bg-white/35 transition-colors peer-checked:bg-[#004C46] after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform after:content-[''] peer-checked:after:translate-x-5" />
                    <span className="text-white">Annotations</span>
                </label>}
            </section>
        }
    </div>
}