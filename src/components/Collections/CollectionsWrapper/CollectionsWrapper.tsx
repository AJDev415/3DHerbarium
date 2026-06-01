/**
 * @file src/components/Collections/CollectionsWrapper.tsx
 * 
 * @fileoverview client wrapper for the collections page
 * 
 * @todo move community model fetch server side, eliminating the useEffect hook
 * 
 */

"use client"

// Typical imports
import { useEffect, useState, createContext, useReducer } from 'react'
import { useSearchParams } from "next/navigation"
import { isMobileOrTablet } from '@/functions/client/utils/isMobile'
import { annotations, userSubmittal } from '@prisma/client'
import { CollectionsWrapperData } from '@/ts/reducer'
import { CollectionsWrapperProps } from '@/ts/collections'
import { getCommunityModel } from '@/functions/client/collections/collectionsWrapper'

// Default imports
import Header from '../../Header/Header'
import CollectionsSubheader from '../SubHeader'
import CommunityModelWithoutGmatch from '@/components/Collections/CommunityWithoutGmatch'
import collectionsMediaReducer from '@/functions/client/reducers/CollectionsMediaStateReducer'
import Foot from '@/components/Shared/Foot'
import CollectionsWrapperIdError from '../../Error/CollectionsWrapper'
import CollectionsHerbariumModel from './HerbariumModel'
import CollectionsCommunityModel from './CommunityModel'
import CollectionsNoModel from './NoModel'

// Exported context
export const CollectionsContext = createContext<'' | CollectionsWrapperData>('')

// Main JSX
export default function MainWrap(props: CollectionsWrapperProps) {

  // Variable Declarations
  const collectionsWrapperProps = { ...props }
  const searchParams = useSearchParams()
  const modelHeight = isMobileOrTablet() ? "calc(100vh - 160px)" : "calc(100vh - 214px)"

  // User model, community id param, id error state, annotation switch boolean
  const [userModel, setUserModels] = useState<userSubmittal>()
  const [communityId] = useState<string | null>(searchParams.get('communityId'))
  const [idError, setIdError] = useState<boolean>(false)
  const [isSelected, setIsSelected] = useState(true)

  // Dynamic sizes
  const getSizes = () => {
    const viewportWidth = typeof window === 'undefined' ? 0 : window.innerWidth
    const viewportHeight = typeof window === 'undefined' ? 0 : window.innerHeight

    return {
      viewWidthInPx: viewportWidth,
      viewportHeightInPx: viewportHeight + 200,
      swiperHeight: viewportHeight - 96,
      imgHeight: viewportHeight - 208
    }
  }

  // Sizes object, resize handler
  const [sizes, setSizes] = useState<any>(getSizes)
  useEffect(() => {
    const updateSizes = () => setSizes(getSizes())

    updateSizes()
    window.addEventListener('resize', updateSizes)

    return () => window.removeEventListener('resize', updateSizes)
  }, [])

  // Initial media state and reducer
  const initialMediaState = { modelChecked: true, observationsChecked: false, photosChecked: false, scale: false }
  const [mediaState, mediaStateDispatch] = useReducer(collectionsMediaReducer, initialMediaState)

  // Context object
  const collectionsContext: CollectionsWrapperData = { mediaState, mediaStateDispatch, collectionsWrapperProps, userModel }

  // Check for community model if there is a community ID parameter or no herbarium 3D model found for the searched specimen name
  useEffect(() => { if (communityId || !props.model.length) getCommunityModel(collectionsWrapperProps, communityId, setUserModels, setIdError) }, [])

  console.log(props.model.length && props.gMatch.hasInfo)
  console.log(props.gMatch.hasInfo)

  // Return error page if idError is true
  if (idError) return <CollectionsWrapperIdError specimenName={props.specimenName} />

  // Else return appropriate collections content
  else {
    return <CollectionsContext.Provider value={collectionsContext}>
      <Header
        searchTerm={props.specimenName}
        headerTitle={props.specimenName}
        hasModel={!!props.model.length}
        pageRoute="collections"
        annotationsEnabled={isSelected}
        setAnnotationsEnabled={setIsSelected} />
      {
        // Displayed if there is an herbarium 3D model available for searched specimen
        !!props.model.length && !communityId &&
        <>
          <CollectionsSubheader isSelected={isSelected} setIsSelected={setIsSelected} communityId={communityId} />
          <CollectionsHerbariumModel sizes={sizes} modelHeight={modelHeight} numberOfAnnotations={props.annotations?.length as number} annotations={props.annotations as annotations[]} />
        </>
      }
      {
        // Displayed if there is a communityId parameter (and the corresponding model uid is found), or if there are only community model(s) available for the searched specimen
        (!props.model.length || communityId) && userModel && props.gMatch.hasInfo &&
        <>
          <CollectionsSubheader isSelected={isSelected} setIsSelected={setIsSelected} communityId={communityId} />
          <CollectionsCommunityModel sizes={sizes} modelHeight={modelHeight} userModel={userModel} />
        </>
      }
      {
        // Displayed for community specimens where no external data is found (such as ornamental plants)
        (!props.model.length || communityId) && userModel && !props.gMatch.hasInfo && <><CommunityModelWithoutGmatch communityModel={userModel} /><Foot /></>
      }
      {
        // Displayed when no 3D models are available (only images and observations are displayed)
        !props.model.length && props.gMatch.hasInfo && userModel === undefined &&
        <>
          <CollectionsSubheader isSelected={isSelected} setIsSelected={setIsSelected} communityId={communityId} />
          <CollectionsNoModel sizes={sizes} modelHeight={modelHeight} />
        </>
      }
    </CollectionsContext.Provider>
  }
}


