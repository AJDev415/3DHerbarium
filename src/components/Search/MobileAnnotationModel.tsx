/**
 * @file src/components/Search/MobileAnnotationModel.tsx
 * 
 * @fileoverview client modal for annotation models on mobile devices
 */

// Typical imports
import { model, model_annotation } from "@prisma/client"
import { SetStateAction, useEffect, useRef, useState, Dispatch } from "react"
import { getAnnotationModel } from "@/functions/server/search"
import { toUpperFirstLetter } from "@/functions/server/utils/toUpperFirstLetter"
import { ModelIncludingSpecimenAndSoftware } from "@/components/Collections/SketchfabApi/ModelAnnotation"
import { getAnnotationModelIncludingSpecimen } from "@/functions/server/collections"

// Default imports
import dynamic from "next/dynamic"

// Dynamic imports
const ModelViewer = dynamic(() => import('@/components/Shared/AnnotationModalModelViewer'), { ssr: false })
const MapWithPoint = dynamic(() => import("@/components/Map/MapWithPoint"), { ssr: false })

// Main JSX
export default function MobileAnnotationModelModal(props: { isOpen: boolean, model: model, setIsOpen: Dispatch<SetStateAction<boolean>> }) {

    // Annotation model data state, loader and effect
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [annotationModelData, setAnnotationModelData] = useState<{ model: ModelIncludingSpecimenAndSoftware, annotation: model_annotation }>()
    const loadAnnotationModelData = async () => setAnnotationModelData({
        model: await getAnnotationModelIncludingSpecimen(props.model.uid) as ModelIncludingSpecimenAndSoftware,
        annotation: await getAnnotationModel(props.model.uid) as model_annotation
    })
    useEffect(() => { loadAnnotationModelData() }, [])

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        if (props.isOpen && !dialog.open) {
            dialog.showModal()
            requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
        }
        if (!props.isOpen && dialog.open) dialog.close()
    }, [props.isOpen])

    useEffect(() => {
        if (!props.isOpen || !annotationModelData?.model.specimen.lat || !annotationModelData?.model.specimen.lng) return
        requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
    }, [props.isOpen, annotationModelData?.model.specimen.lat, annotationModelData?.model.specimen.lng])

    const closeDialog = () => props.setIsOpen(false)

    return <dialog
        ref={dialogRef}
        onClose={closeDialog}
        onClick={(e) => { if (e.target === e.currentTarget) closeDialog() }}
        className="w-screen h-screen max-w-none max-h-none m-0 p-0 bg-black/30 backdrop:bg-black/30"
    >
        <section className="h-full min-h-screen w-full bg-white dark:bg-[#121212] overflow-y-auto">
            <header className="flex justify-end m-0 p-0">
                <div className="flex justify-end text-lg mt-2 mr-6">
                    <button onClick={closeDialog}>x</button>
                </div>
            </header>
            <section className="px-4 pb-4">
                <i><p className="text-center font-medium text-2xl mb-2">{toUpperFirstLetter(props.model.spec_name)}</p></i>
                <div className="w-full h-[50vh] mb-4">
                    <ModelViewer uid={props.model.uid} />
                </div>

                {
                    annotationModelData && annotationModelData.model.specimen.locality && // Locality indicates that the specimen should have all other relevant data for the following contional JSX
                    <>
                        <p dangerouslySetInnerHTML={{ __html: annotationModelData.annotation.annotation }} className='m-auto pr-[3%] pl-[2%] text-center fade' />

                        <div className='text-[1.25rem] border-b border-t border-[#004C46] w-full my-4'>
                            <p className="text-center font-medium text-xl my-1"> Specimen Data </p>
                        </div>

                        {
                            annotationModelData.model.specimen.lat && annotationModelData.model.specimen.lng &&
                            <div className="h-[220px] w-full mb-1">
                                <MapWithPoint position={{ lat: parseFloat(annotationModelData.model.specimen.lat), lng: parseFloat(annotationModelData.model.specimen.lng) }} />
                            </div>
                        }

                        {
                            annotationModelData.model.specimen.locality &&
                            <p dangerouslySetInnerHTML={{ __html: `<span style="font-weight:500;">Locality:</span> ` + toUpperFirstLetter(annotationModelData.model.specimen.locality) }} className='fade inline my-2' />
                        }

                        {annotationModelData.model.specimen.height && <p><span className="font-medium">*Specimen height:</span> {annotationModelData.model.specimen.height} cm</p>}

                        <p className='fade w-[95%] my-1'><span className="font-medium">Annotation by:</span> {annotationModelData.annotation.annotator}</p>
                        <p className='fade w-[95%] my-1'><span className="font-medium">3D Model by:</span> {annotationModelData.annotation.modeler}</p>
                        <p className='fade my-1'><span className="font-medium">Build Method:</span> {annotationModelData.model.build_process}</p>
                        <p className='fade my-1'><span className="font-medium">Build Software:</span> {...annotationModelData.model.software.map((software, index) => index === annotationModelData.model.software.length - 1 ? software.software : software.software + ', ')}</p>

                        <div className="flex justify-center my-8">
                            <button
                                onClick={closeDialog}
                                className="rounded-md bg-[#004C46] px-4 py-2 text-white hover:bg-[#00665f]"
                            >
                                Back to Collections
                            </button>
                        </div>
                    </>
                }

                {
                    annotationModelData && !annotationModelData?.model.specimen.locality && // Lack of locality indicates a legacy annotation model
                    <>
                        <p dangerouslySetInnerHTML={{ __html: annotationModelData.annotation.annotation }} className='m-auto pr-[3%] pl-[2%] fade border-b pb-8' />
                        <p className='fade w-[95%] mt-8'><span className="font-medium">Annotation by:</span> {annotationModelData.annotation.annotator}</p>
                        <p className='fade'><span className="font-medium">3D Model by:</span> {annotationModelData.annotation.modeler}</p>
                        <p className='fade'><span className="font-medium">Build Method:</span> {annotationModelData.model.build_process}</p>
                        <p className='fade'><span className="font-medium">Build Software:</span> {...annotationModelData.model.software.map((software, index) => index === annotationModelData.model.software.length - 1 ? software.software : software.software + ', ')}</p>

                        <div className="flex justify-center my-8">
                            <button
                                onClick={closeDialog}
                                className="rounded-md bg-[#004C46] px-4 py-2 text-white hover:bg-[#00665f]"
                            >
                                Back to Collections
                            </button>
                        </div>
                    </>
                }

            </section>
        </section>
    </dialog>
}