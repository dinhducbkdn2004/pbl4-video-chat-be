"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OtpForm = (otp) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #007bff;
                padding: 10px;
                text-align: center;
                border-radius: 8px 8px 0 0;
                color: #ffffff;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .content p {
                font-size: 16px;
                color: #333333;
                line-height: 1.5;
            }
            .otp {
                font-size: 32px;
                font-weight: bold;
                color: #007bff;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777777;
                padding: 10px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Your Verification Code</h1>
            </div>
            <div class="content">
                <p>Hello,</p>
                <p>Thank you for registering with our service. Please use the following One-Time Password (OTP) to verify your account:</p>
                <div class="otp">${otp}</div>
                <p>This OTP is valid for 5 minutes. Please do not share this code with anyone.</p>
                <p>If you did not request this OTP, please ignore this email.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
        </div>
    </body>
</html>
`;
exports.default = OtpForm;
//# sourceMappingURL=OtpForm.js.map