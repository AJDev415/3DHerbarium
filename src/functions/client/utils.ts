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
export const configureNfsUrl = (url: string) => `/api/nfs?path=${process.env.NEXT_PUBLIC_DATA_PATH}${url}`

/**
 * 
 * @returns 
 */
export const configureThumbnailDir = () =>  `${process.env.NEXT_PUBLIC_DATA_PATH}/Herbarium/thumbnails`