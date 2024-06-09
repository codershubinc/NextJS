
// import { ApiError } from "@/api-responce/error.api"
import { ApiResponse } from "../../../backend/util/api-responce/responce.api"



export async function POST(request: Request) {
    const { email, password, name } = await request.json()

    try {
        if (!name) {
            // return Response.json(new ApiResponse(400, "Bad Request", false, "Name is required")  )

            // throw new ApiError(400, "Name is required")
            // return new  Response Error("Name is required", { cause: 400 })

        }

        return Response.json(

            new ApiResponse(
                200,
                "Success",
                true,
                {
                    name: name,
                    email: email,
                    password: password
                }
            )
            ,
            { status: 200 }

        )


    } catch (error: any) {
        console.log('error', error);
        return new ApiResponse(400, "Bad Request", false, error)

    }

}