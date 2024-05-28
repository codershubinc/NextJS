import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB()
export async function POST(request: NextRequest) {
    try {
        console.log("verifying email");

        const requestBody = await request.json()
        const { token } = requestBody
        console.log(token);

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        
        if (!user) {
            return NextResponse.json({ error: "Something went wrong" }, { status: 400 })

        }
        console.log('user is =>', user);
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        console.log('user is verified ');

        await user.save()
        return NextResponse.json({ success: "Email verified successfully" }, { status: 200 })



    } catch (error: any) {
        return NextResponse.json({ error: "Something went wrong" + error.message }, { status: 500 })
    }

}