/**
 * @file /components/Header/Header.tsx
 * 
 * @fileoverview the header component used throughout the application.
 * It contains a search bar, the site logo, and links to the other pages.
 * It doubles as a drawer component to allow navigation in mobile browsers.
 */

'use client'

// Typical imports
import { MobileSearch } from "./MobileSearch"
import { useSession, } from "next-auth/react"
import { useParams } from "next/navigation"
import { useRef, useState, useEffect } from "react"
import { Switch } from "@heroui/react"
import { toUpperFirstLetter } from "@/functions/server/utils/toUpperFirstLetter"
import { SearchIcon } from "./SearchIcon"
import { SearchHeaderProps } from "@/ts/types"
import { addDarkThemeListener, detectDarkTheme, removeDarkThemeListener } from "@/components/Header/headerLogic"

// Default imports
import LogoAndSignIn from "./LogoAndSignIn"
import AutoComplete from "./Autocomplete"
import Links from "./Links"
import MobileSessionOptions from "./MobileSessionOptions"
import MobileModelOptions from "./MobileModelOptions"
import MobileMenuOptions from "./MobileMenuOptions"
import MobileMenu from "./MobileMenu"

// Main JSX
export default function Header(props: SearchHeaderProps) {

  // Variable declarations
  const params = useParams()
  const { data: session } = useSession()

  const [autocompleteOptions, setAutocompleteOptions] = useState<any[]>([])
  const [mobileSearchOpen, setMobileSearchOpen] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const searchQuery = useRef<string>(undefined)

  const headerTitle: string = props.headerTitle;
  const specimenName: string = (params['specimenName']) as string ?? headerTitle ?? ''

  const menuItems: string[] = [
    "Home",
    "Collections",
    "Plant.id",
    "Media"
  ]

  const userItems: string[] = [
    "Dashboard",
    "Submit a 3D Model",
  ]

  const fetchAutoCompleteOptions = async () => {
    const autocompleteOptions = await fetch(`https://api.inaturalist.org/v1/taxa/autocomplete?taxon_id=47126&rank=species,genus&q=${searchQuery.current}`).then(res => res.json()).then(json => json.results)
    setAutocompleteOptions(autocompleteOptions)
  }

  // Dark theme effects
  useEffect(() => detectDarkTheme(), [])
  useEffect(() => { addDarkThemeListener(); return () => removeDarkThemeListener() }, [])

  return <>
    <header className="justify-between max-w-none bg-[#004C46] dark:bg-[#212121] text-white
     dark:text-white h-[44px] lg:h-[64px] flex items-center px-[2vw] lg:pl-[1vw] lg:pr-[2vw] w-screen z-10 relative">

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-white p-2 lg:hidden" /* added padding to make the button easily clickable */
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        <svg
          aria-hidden="true"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            /* "X" (Close) Icon Path */
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            /* Hamburger (Menu) Icon Path */
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Hidden switch for annotation switch reference */}

      {
        props.setAnnotationsEnabled &&
        <div className="justify-start hidden">
          <Switch defaultSelected id="annotationSwitchMobileHidden" isSelected={props.annotationsEnabled} color='secondary' onValueChange={props.setAnnotationsEnabled}></Switch>
        </div>
      }

      {/* Autocomplete search bar*/}

      <div className="items-center hidden lg:flex justify-start">
        <AutoComplete autocompleteOptions={autocompleteOptions} fetchAutoCompleteOptions={fetchAutoCompleteOptions} ref={searchQuery} />
      </div>

      {/* Mobile Species Title*/}

      <div className="lg:hidden pr-3 flex justify-center">
        <p className="font-bold text-[white]"><i>{toUpperFirstLetter(decodeURIComponent(specimenName))}</i></p>
      </div>

      {/* Large screen link section */}

      <div className="hidden lg:flex gap-4 justify-center">
        <Links page={props.page} />
      </div>

      {/* Mobile search button/icon */}

      <div className="items-center lg:hidden flex justify-end">
        <button onClick={() => setMobileSearchOpen(true)}>
          <SearchIcon size={22} width="" height="" />
        </button>
      </div>

      <LogoAndSignIn />

    </header>

    <MobileMenu isOpen={isMenuOpen} />
    <MobileSearch isOpen={mobileSearchOpen} setIsOpen={setMobileSearchOpen} autocompleteOptions={autocompleteOptions} fetchAutoCompleteOptions={fetchAutoCompleteOptions} ref={searchQuery} />

  </>
}


// <NavbarMenu className="z-20 border">

//   {/* User section header */}

//   <NavbarMenuItem>
//     <h1 className="text-center">User</h1>
//     <Divider />
//   </NavbarMenuItem>

//   {/* Mobile session-based options */}

//   <MobileSessionOptions session={session} userItems={userItems} />

//   {/* Navigation Section Header */}

//   <NavbarMenuItem>
//     <h1 className="text-center">Navigation</h1>
//     <Divider />
//   </NavbarMenuItem>

//   {/* Static mobile navigation */}

//   <MobileMenuOptions menuItems={menuItems} />

//   {/* Mobile rendering conditional on whether there is a model */}

//   {
//     props.setAnnotationsEnabled &&
//     <MobileModelOptions hasModel={props.hasModel} isSelected={props.annotationsEnabled} setIsSelected={props.setAnnotationsEnabled} />
//   }
// </NavbarMenu>