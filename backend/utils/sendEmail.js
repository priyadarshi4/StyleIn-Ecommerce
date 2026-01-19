const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, html }) => {
  try {
    await resend.emails.send({
      from: "StyleIn <onboarding@resend.dev>",
      to: email,
      subject,
      html,
    });

    console.log("✅ Email sent via Resend to:", email);
  } catch (error) {
    console.error("❌ Resend email error:", error);
    throw error;
  }
};

module.exports = sendEmail;
