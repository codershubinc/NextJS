import 'dotenv/config';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
    apiKey: process.env.MAILER_SEND_API_KEY || '',
    
});

async function sendMail() {
    console.log("sendMail");


    const sentFrom = new Sender("trial-0r83ql3odp0lzw1j.mlsender.net", "Your name");
    console.log("sentFrom", sentFrom);


    const recipients = [
        new Recipient("swap29122004@gmail.com", "Your Client")
    ];
    console.log("recipients", recipients);


    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject("This is a Subject")
        .setHtml("<strong>This is the HTML content</strong>")
        .setText("This is the text content");

    console.log("emailParams", emailParams);

    const result = await mailerSend.email.send(emailParams);
    console.log("result", result);



}

export async function POST(request: Request) {

    try {
        const result = await sendMail();
        console.log("result", result);
        return Response.json({ success: true, message: "Email sent" }, { status: 200 });

    } catch (error) {
        console.log("error at post requst ", error);
        return Response.json({ success: false, message: "Error sending email" }, { status: 500 });

    }
}











