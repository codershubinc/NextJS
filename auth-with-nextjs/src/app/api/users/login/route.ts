import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'


connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log('input from user', reqBody);
        const user = await User.findOne({ email })
        console.log('user find', user);

        if (!user) {
            return NextResponse.json({ error: "Invalid email or password"}, { status: 400 })
        }
        console.log('user exists', user);
        const validatePassword = await bcryptjs.compare(password, user.password)
        if (user.isVerified === false) {
            console.log('user is not verified');

            return NextResponse.json({ error: "Please verify your email" }, { status: 401 })

        }
        if (!validatePassword) {
            return NextResponse.json({ error: "Invalid  email or password" }, { status: 400 })
        }
        console.log('validatePassword', validatePassword);
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET! as string)
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response

    } catch (error: any) {
        return NextResponse.json({ error: "Something went wrong : " + error.message }, { status: 500 })
    }
}