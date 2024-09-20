import nodemailer from 'nodemailer'
import envServer from '../configs/env'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: envServer.EMAIL_USER,
        pass: envServer.EMAIL_PASS
    }
})

export default async function sendMail(
    to: string[],
    subject: string,

    html: string
) {
    await transporter.sendMail({
        from: 'Hệ thống chat video',
        to: to.join(', '),
        subject: subject,
        html: html
    })
}
