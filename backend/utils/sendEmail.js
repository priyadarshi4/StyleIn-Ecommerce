// utils/sendEmail.js
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, html }) => {
  if (!email || !subject || !html) {
    throw new Error("Missing email parameters");
  }

  const { data, error } = await resend.emails.send({
    from: "StyleIn <no-reply@style-in.shop>",  // ✅ your verified domain
    to: [email],                               // ✅ Resend accepts array
    subject,
    html,
  });

  if (error) {
    console.error("❌ Resend email error:", error);
    throw error;
  }

  console.log("✅ Email sent:", data?.id);
  return data;
};

module.exports = sendEmail;
