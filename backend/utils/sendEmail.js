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

    console.log("✅ Resend response:", response);
  } catch (error) {
    console.error("❌ RESEND FAILED FULL ERROR:", error);
    console.error("❌ ERROR MESSAGE:", error?.message);
    console.error("❌ ERROR STACK:", error?.stack);
    throw error;
  }
};

module.exports = sendEmail;
