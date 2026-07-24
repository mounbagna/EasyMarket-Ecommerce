import {Resend} from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendFeedbackEmail = async (message) => {
    console.log("api key",process.env.RESEND_API_KEY?.slice(0,5))
    try {
        const response = await resend.emails.send({
            from: "Easymarket <onboarding@resend.dev>",
            to:[process.env.ADMIN_EMAIL],
            subject: "New Customer Feedback",
            html:
            `
        <h2>New Feedback</h2>
        <p>${message} </p> 
        `,
        });
        console.log(response)
    } catch(error) {
        console.error("resend error",error)
    }
        
};