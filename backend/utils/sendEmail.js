// utils/sendEmail.js
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, html }) => {
  if (!email || !subject || !html) {
    throw new Error("Missing email parameters");
  }

  const FROM = "StyleIn <no-reply@send.style-in.shop>";

  console.log("========== EMAIL DEBUG ==========");
  console.log("FROM BEING USED:", FROM);
  console.log("API KEY PREFIX:", process.env.RESEND_API_KEY?.slice(0,8));
  console.log("TO:", email);
  console.log("=================================");

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [email],
    subject,
    html,
  });

  if (error) {
    console.error("❌ RESEND FULL ERROR:", JSON.stringify(error, null, 2));
    throw error;
  }

  console.log("✅ Email sent:", data?.id);
  return data;
};

module.exports = sendEmail;
