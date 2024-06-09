import { ApiResponse } from "../../../../backend/util/api-responce/responce.api";
import userConfig from "../../../../backend/util/appwrite-config/userConfig";
import { asyncHandler } from "../../../../backend/util/asyncHandler";


const userConfigApi = asyncHandler(async (req: any, res: any) => {
    const { email } =   req.body
    console.log(email)

    try {
        const userConfigGet = await userConfig.getUserConfigByEmail(email)
        // console.log('userConfigGet', userConfigGet);


        return Response.json(
            new ApiResponse(
                200,
                "Success",
                userConfigGet?.documents[0],
                true,
            )
        )

    } catch (error: any) {

        console.log('appwrite getUserConfigByEmail error', error)
        throw error;


    }
})

export default  userConfigApi