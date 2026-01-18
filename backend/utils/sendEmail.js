const { Resend } = require("resend");
const fetch = require("node-fetch");

global.fetch = fetch;

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, message }) => {
  try {
    await resend.emails.send({
      from: "Style In <onboarding@resend.dev>",
      to: email,
      subject,
      html: `
        <div style="font-family:Arial">
          <h2>${subject}</h2>
          <p>${message}</p>
          <p><b>Valid for 5 minutes</b></p>
        </div>
      `,
    });

    console.log("✅ OTP email sent via Resend to:", email);
  } catch (error) {
    console.error("❌ Resend email failed:", error);
    throw new Error("Failed to send OTP");
  }
};

module.exports = sendEmail;
