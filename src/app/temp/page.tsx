import Viewer from "@/components/Collections/three/Viewer"

const objUrl = "/api/models/obj?sid=3aaa9063-ead9-4d7d-aca1-b786aaa7bc83&file=obj"
const mtlUrl = "/api/models/obj?sid=3aaa9063-ead9-4d7d-aca1-b786aaa7bc83&file=mtl"

const objUrl2 = "/api/models/obj?sid=4bd0d093-8442-41b0-81bf-db619b4271d4&file=obj"
const mtlUrl2 = "/api/models/obj?sid=4bd0d093-8442-41b0-81bf-db619b4271d4&file=mtl"

export default function Page() {
    return <div className="w-full h-screen flex items-center justify-center">
        <Viewer objUrl={objUrl} mtlUrl={mtlUrl} />
    </div>
}
