// utils/sendEmail.js (Resend version)

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, otp }) => {
  try {
    await resend.emails.send({
      from: "StyleIn <onboarding@resend.dev>",
      to: email,
      subject,
      html: `
        <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;
                    background:#ffffff;padding:30px;border-radius:8px;
                    border:1px solid #eaeaea">

          <h2 style="color:#111;text-align:center;">Verify your email</h2>

          <p style="font-size:15px;color:#333;">
            Thanks for signing up with <b>StyleIn</b>.
          </p>

          <p style="font-size:15px;color:#333;">
            Use the OTP below to complete your registration:
          </p>

          <div style="text-align:center;margin:30px 0;">
            <span style="
              display:inline-block;
              font-size:32px;
              letter-spacing:6px;
              font-weight:bold;
              color:#000;
              background:#f4f4f4;
              padding:12px 24px;
              border-radius:6px;
            ">
              ${otp}
            </span>
          </div>

          <p style="font-size:14px;color:#555;">
            ⏱ This OTP is valid for <b>5 minutes</b>.
          </p>

          <p style="font-size:14px;color:#999;margin-top:30px;">
            If you didn’t request this, you can safely ignore this email.
          </p>

          <hr style="margin:30px 0;border:none;border-top:1px solid #eee" />

          <p style="font-size:13px;color:#aaa;text-align:center;">
            © ${new Date().getFullYear()} StyleIn
          </p>
        </div>
      `,
    });

    console.log("✅ OTP email sent to:", email);
  } catch (error) {
    console.error("❌ Resend email error:", error);
    throw error;
  }
};

module.exports = sendEmail;
