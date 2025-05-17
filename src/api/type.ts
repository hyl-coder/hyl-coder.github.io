export interface IResponseData<T = any> {
    code: number,
    message: string,
    data: (T extends any ? T : T & any)
}

export interface IResponse<T = any> {
    status: number
    data: IResponseData<T>
}