import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

export default async function sendMail(
    to: string[],
    subject: string,
    text: string
) {
    await transporter.sendMail({
        from: "Hệ thống chat video",
        to: to.join(", "),
        subject: subject,
        text: text,
    });
}
