class ApiResponse {
    status: number
    data: any
    message?: string
    success?: boolean

    constructor(status: number, message: string, data: any, success?: boolean,) {
        this.status = status
        this.data = data
        this.message = message
        this.success = success
    }
}

export { ApiResponse }
