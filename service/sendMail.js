const nodemailer = require("nodemailer");

async function sendVerificationMail(email, token) {

    try{

        const transporter = nodemailer.createTransport({

            service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
        });
        const verifyLink = `http://localhost:8001/verify-email?token=${token}`;
        await transporter.sendMail({
      from: `"URL App" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Verify your email",
      html: `
        <h2>Email Verification</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${verifyLink}">${verifyLink}</a>
        <p>This link will expire in 24 hours.</p>
      `
      
    });
     console.log("Verification email sent");

    }
    catch(err){

        console.error("Email send failed:", err);
    throw err;
    }
    


    
}

module.exports = sendVerificationMail;