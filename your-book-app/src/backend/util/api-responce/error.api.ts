export class ApiError extends Error {

    data: any
    success: boolean
    errors: any
    statusCode: number
    constructor(
        status: number,
        message: string,
        stack?: string,
        errors?: [],


    ) {
        super(message)
        this.statusCode = status
        this.data = null
        this.success = false
        this.errors = errors

        if (stack) {

            this.stack = stack

        } else {

            Error.captureStackTrace(this, this.constructor)
        }


    }
}
