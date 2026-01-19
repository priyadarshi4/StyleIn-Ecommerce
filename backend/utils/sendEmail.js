const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, html }) => {
  if (!email || !subject || !html) {
    throw new Error("Missing email parameters");
  }

  try {
    const response = await resend.emails.send({
      from: "StyleIn <onboarding@resend.dev>",
      to: email,
      subject,
      html,
    });

    console.log("✅ Email sent:", response.id);
    return response;
  } catch (error) {
    console.error("❌ Resend email error:", error);
    throw error;
  }
};

module.exports = sendEmail;
