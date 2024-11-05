export type GetFileByRefIdSeviceInputType = {
  refId: string
}

export type GetFileByRefIdSeviceOutputType = {
  statusCode: number, data: {
    fileName: string
    fileId: string
    mimeType: string
    url: string
  }[]
}
  | { statusCode: number, error: unknown }


export interface GetFileByRefIdServiceInterface {
  execute(input: GetFileByRefIdSeviceInputType): Promise<GetFileByRefIdSeviceOutputType>
}