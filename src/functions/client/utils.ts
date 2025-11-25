/**
 * 
 * @returns 
 */
export const isLocalEnv = () => process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? true : false

/**
 * 
 * @param url 
 * @returns 
 */
export const configureNfsUrl = (url: string) => isLocalEnv() ? `/api/nfs?path=X:/data${url.slice(5)}` : `/api/nfs?path=public${url}`

/**
 * 
 * @returns 
 */
export const configureThumbnailDir = () =>  `${process.env.DATA_PATH}/Herbarium/thumbnails`