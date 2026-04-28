const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to any other service like sendgrid, mailgun, etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOTP = async (email, otp) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log(`[DEV MODE] Simulated email to ${email}. OTP is: ${otp}`);
            return true;
        }

        const mailOptions = {
            from:`Job Linker ${process.env.EMAIL_USER}`,
            to: email,
            subject: 'Password Reset OTP - Job Linker',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Password Reset Request</h2>
                    <p>You requested to reset your password. Use the OTP below to proceed.</p>
                    <h1 style="color: #4CAF50; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
                    <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
                    <p>If you did not request this, please ignore this email.</p>
                </div>
            `
        };


        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = { sendOTP };
