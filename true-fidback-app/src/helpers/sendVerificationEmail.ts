import resend from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponce } from "@/types/responce.api";


export default async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponce> {
    console.log("sendVerificationEmail", email, username, verifyCode);
    


    try {

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: ' Mystery Message | Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),
        })
        console.log("sendVerificationEmail data", data, 'error' , error);
        
        return { success: true, message: "Verification email sent" };


    } catch (error) {

        console.log("Error sending verification email:", error);

        return { success: false, message: "Error sending verification email" };


    }
}

