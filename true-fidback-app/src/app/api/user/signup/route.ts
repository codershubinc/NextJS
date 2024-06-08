import dbConnect from "@/lib/connect.db";
import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";


export async function POST(request: Request) {
    const { username, email, password } = await request.json()
    console.log("request", 'username', username, 'email', email, 'password', password);

    if (!username || !email || !password) {

        return Response.json(
            {
                success: false,
                message: "username, email and password are required"
            },
            {
                status: 400
            }
        )
    }


    await dbConnect()
    try {

         
        console.log("request", 'username', username, 'email', email, 'password', password); 
        const existingUserVerifiedByUsername = await UserModel.findOne({ username, isVerified: true })
        console.log("existingUserVerifiedByUsername", existingUserVerifiedByUsername);
        
        if (existingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "Username already exists"
                },
                {
                    status: 400
                }
            )
        }

        const existingUserVerifiedByEmail = await UserModel.findOne({ email })
        console.log("existingUserVerifiedByEmail", existingUserVerifiedByEmail);
        
        const verifyCode = Math.floor(100000 + Math.random() * 900000)
        if (existingUserVerifiedByEmail) {
            if (existingUserVerifiedByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: "user already exists with this email"
                    },
                    {
                        status: 400
                    }
                )

            } else {

                const encryptedPassword = await bcrypt.hash(password, 10)
                existingUserVerifiedByEmail.password = encryptedPassword
                existingUserVerifiedByEmail.verifyCode = String(verifyCode)
                existingUserVerifiedByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);


                await existingUserVerifiedByEmail.save()


            }
        } else {
            const encryptedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 1);
            const newUser = await new UserModel({
                username,
                email,
                password: encryptedPassword,
                verifyCode, // use it in variable not here
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: []
            }).save()

            console.log('New user created', newUser);

        }

        // send verification email
        const sendEmail = await sendVerificationEmail(
            email,
            username,
            String(verifyCode)
        )
        if (!sendEmail.success) {

            return Response.json(
                {
                    success: false,
                    message: email.message
                },
                {
                    status: 500
                }
            )



        }

        return Response.json(
            {
                success: true,
                message: "User created successfully and verification email sent"
            },
            {
                status: 201
            }
        )




    } catch (error) {

        console.log(' Error Registering user', error);
        return Response.json(
            {
                success: false,
                message: "Error Registering user"

            },
            {
                status: 500
            }
        )


    }

}