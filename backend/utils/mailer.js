const nodemailer = require("nodemailer");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000, 
  greetingTimeout: 10000,
  socketTimeout: 10000,
});


const verifySMTP = async () => {
  try {
    await transporter.verify();
    console.log("✅ SMTP server is ready");
  } catch (err) {
    console.error("❌ SMTP connection failed:", err.message);
  }
};


verifySMTP();

const sendOTP = async (email, otp) => {
  try {
 
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log(`[DEV MODE] OTP for ${email}: ${otp}`);
      return true;
    }

    const mailOptions = {
      from: `"Job Linker" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP - Job Linker",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>Use the OTP below:</p>
          <h1 style="color:#4CAF50; letter-spacing:5px;">${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
        </div>
      `,
    };

   
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", info.response);
    return true;

  } catch (error) {
    console.error("❌ Email error FULL:", error);

    
    console.log(`⚠️ OTP for ${email}: ${otp}`);

    return false;
  }
};

module.exports = { sendOTP };