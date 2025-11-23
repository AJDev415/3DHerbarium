import prisma from "@/functions/server/utils/prisma"
import { readFile } from "fs/promises"

export async function GET(request: Request) {

    try {
        const { searchParams } = new URL(request.url)
        const sid = searchParams.get('sid') as string
        const file = searchParams.get('file') as string

        if (!(sid || file)) throw Error('No sid or file provided')

        const species = await prisma.model.findUnique({ where: { sid: sid }, select: { spec_name: true } })

        if (species && file === 'obj') {
            const fileBuffer = await readFile(process.env.DATA_PATH + `/models/${species?.spec_name}-${sid.slice(0, 8)}/final.obj`)
            const typedArray = new Uint8Array(fileBuffer)
            return new Response(typedArray)
        }

        else if (species && file === 'mtl') {
            const fileBuffer = await readFile(process.env.DATA_PATH + `/models/${species?.spec_name}-${sid.slice(0, 8)}/final.mtl`)
            const typedArray = new Uint8Array(fileBuffer)
            return new Response(typedArray)
        }

        else if (species && file === 'jpg') {
            const fileBuffer = await readFile(process.env.DATA_PATH + `/models/${species?.spec_name}-${sid.slice(0, 8)}/final.jpg`)
            const typedArray = new Uint8Array(fileBuffer)
            return new Response(typedArray)
        }

        throw Error('No model found')
    }
    catch (e: any) { console.log(e.message); return new Response(e.message, { status: 400 }) }
}