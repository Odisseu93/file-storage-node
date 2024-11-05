export type GetFileByIdSeviceInputType = {
  fileId: string
}

export type GetFileByIdSeviceOutputType = { statusCode: number, data: { url: string } }
  | { statusCode: number, error: unknown }


export interface GetFileByIdServiceInterface {
  execute(input: GetFileByIdSeviceInputType): Promise<GetFileByIdSeviceOutputType>
}