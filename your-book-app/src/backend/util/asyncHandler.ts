const asyncHandler = (requestHandler: any) => {

    return (req: any, res: any, next: any) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export { asyncHandler }