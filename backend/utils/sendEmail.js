const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTPEmail = async ({ email, otp }) => {
  try {
    await resend.emails.send({
      from: "StyleIn <no-reply@stylein.app>", // use resend.dev until domain verified
      to: email,
      subject: `Your StyleIn OTP: ${otp}`, // 🔥 prevents Gmail threading
      html: `
        <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; padding:24px; border-radius:8px;">
            
            <h2 style="color:#111;">Verify your email</h2>
            
            <p>Hello 👋</p>
            
            <p>
              Thank you for creating an account on <b>StyleIn</b>.
              Use the OTP below to verify your email address.
            </p>

            <div style="
              font-size:28px;
              letter-spacing:4px;
              font-weight:bold;
              color:#ffffff;
              background:#111;
              padding:16px;
              text-align:center;
              border-radius:6px;
              margin:24px 0;
            ">
              ${otp}
            </div>

            <p>
              ⏰ This OTP is valid for <b>5 minutes</b>.
            </p>

            <p>
              If you did not request this, you can safely ignore this email.
            </p>

            <hr style="margin:24px 0;" />

            <p style="font-size:12px; color:#777;">
              © ${new Date().getFullYear()} StyleIn. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    console.log("✅ OTP email sent via Resend to:", email);
  } catch (error) {
    console.error("❌ Resend OTP Error:", error);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = sendOTPEmail;
