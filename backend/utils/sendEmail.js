const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, html }) => {
  if (!email || !subject || !html) {
    throw new Error("Missing email parameters");
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "StyleIn <onboarding@resend.dkim>", // for testing only
      to: email,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Resend email error:", error);
      throw error;
    }

    console.log("✅ Email sent:", data?.id);
    return data;
  } catch (error) {
    console.error("❌ Resend email error:", error);
    throw error;
  }
};

module.exports = sendEmail;



