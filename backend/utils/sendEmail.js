const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: "StyleIn <onboarding@resend.dev>",
      to: email,
      subject,
      html,
    });

    console.log("✅ RESEND RESPONSE:", response);
  } catch (error) {
    console.error("❌ RESEND FULL ERROR:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
      response: error.response,
    });
    throw error;
  }
};

module.exports = sendEmail;
