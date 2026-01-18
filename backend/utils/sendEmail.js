const nodeMailer = require("nodemailer");

// Options are passed as args from userController or other files
const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        // Simple Mail Transfer Protocol (SMTP)
        host: process.env.SMTP_HOST, // e.g., "smtp.gmail.com"
        port: process.env.SMTP_PORT, // e.g., 465
        service: process.env.SMTP_SERVICE, // e.g., "gmail"
        auth: {
            // Your email and password for sending mail
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        secure: true, // Added: Use SSL/TLS for secure connection (required for port 465)
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL, // Fixed typo: "SMPT_MAIL" → "SMTP_MAIL"
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; // Re-throw to let caller handle (e.g., userController)
    }
};

module.exports = sendEmail;