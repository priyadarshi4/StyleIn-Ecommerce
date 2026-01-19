const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: "StyleIn <onboarding@resend.dev>", // keep this
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", response.id);
    return response;
  } catch (error) {
    console.error("❌ Email send failed:", error);
    throw error;
  }
};

module.exports = sendEmail;
