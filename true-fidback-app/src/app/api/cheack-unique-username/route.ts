import dbConnect from "@/lib/connect.db";
import UserModel from "@/model/user.model";
import { z } from "zod"
import { usernameValidation } from "@/schemas/signup.schema";
import { use } from "react";


const UsernameQuerySchema = z.object({
    username: usernameValidation
})


export async function GET(request: Request) {

    await dbConnect()
    try {

        const { searchParams } = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }

        //validate with zod 
        const result = UsernameQuerySchema.safeParse(queryParam)

        console.log('result', result);

        if (!result.success) {

            const usernameError = result.error.format().username?._errors || []
            return Response.json(
                {
                    success: false,
                    message: usernameError?.length > 0 ? usernameError.join(',') : 'Invalid query param'
                },
                {
                    status: 400
                }
            )
        }

        const { username } = result.data

        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true })

        if (existingVerifiedUser) {
            return Response.json(
                {
                    success: false,
                    message: 'IUsername is already taken'
                },
                {
                    status: 400
                }
            )

        }

        return Response.json(
            {
                success: true,
                message: 'Username is unique'
            },
            {
                status: 200
            }
        )


    } catch (error: any) {

        console.log('Error checking username', error); // TODO: remove it

        return Response.json(
            {
                success: false,
                message: 'Error checking username'
            },
            {
                status: 500
            }
        )



    }
}

