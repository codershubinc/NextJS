import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
import { sendEmail } from "@/helpers/mailer";


connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email } = reqBody
        console.log('input from user for verification', reqBody);
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 })
        }
        console.log('user find for verification', user);
        if (user.isVerified === true) {
            console.log('user is already verified')
            return NextResponse.json({ error: "User already verified" }, { status: 400 })

        }

        await sendEmail({ email, emailType: "VERIFY", userId: user._id })

        const response = NextResponse.json({
            message: "Verification email sent",
            success: true,
        })
        return response

    } catch (error: any) {
        return NextResponse.json({ error: "Something went wrong : " + error.message }, { status: 500 })
    }
}


