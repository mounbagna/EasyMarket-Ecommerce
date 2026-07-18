import transporter  from "../config/mail.js";
import dotenv from "dotenv";

dotenv.config();

const sendPaymentEmail = async(email,firstname,deadline) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "complete your EasyMarket shop registration",
        html:
        `
        <h2>Hello ${firstname}</h2>
        <p>Your EasyMarket shop account has been created successfully.</p>
        <p>Your shop is currently pending activation.</p>
        <h3>Registration payment</h3>

        <p>Payment methods:</p>
        <ul>
        <li>Mobile Money:<b>+237 671 681 830</b></li>
        <li>Orange Money:<b>+237 692 556 857</b></li>
        <li>Bank Transfer:<b>02211241322-37</b></li>
        </ul>

        <p> Payment deadline: <b>${deadline}</b> </p>
        <p> After payment confirmation, your shop will become visible on EasyMarket.</p>
        `
    })
};

export default sendPaymentEmail;