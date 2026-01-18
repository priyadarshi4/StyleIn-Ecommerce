const sendEmail = require("../utils/sendEmail");

exports.sendContactMail = async (req, res) => {
  try {
    const { issue, detail, language, email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({
        success: false,
        message: "Email and message are required",
      });
    }

    /* ================= ADMIN MAIL ================= */
    await sendEmail({
      email: process.env.ADMIN_EMAIL || "priyadarshiprince5@gmail.com",
      subject: `📩 New Support Request | ${issue || "General"}`,
      message: `
New Support Request

Issue: ${issue}
Detail: ${detail}
Language: ${language}
User Email: ${email}

Message:
${message}
      `,
    });

    /* ================= USER AUTO-REPLY ================= */
    await sendEmail({
      email,
      subject: "✅ We received your request | StyleIn",
      message: `
Hi 👋

Thanks for contacting StyleIn!

We’ve received your request regarding "${issue}".
Our support team will get back to you shortly.

Your message:
${message}

— Team StyleIn
      `,
    });

    /* ================= OFFER MAIL ================= */
    await sendEmail({
      email,
      subject: "🎁 A little gift from StyleIn!",
      message: `
🎉 Special Offer Just for You!

Use coupon code: STYLEIN10
Get 10% OFF on your next purchase.

⏰ Valid for 48 hours only.

Visit:
${process.env.FRONTEND_URL}

— Team StyleIn
      `,
    });

    res.status(200).json({
      success: true,
      message: "Support request sent successfully",
    });
  } catch (error) {
    console.error("Contact Mail Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send support email",
    });
  }
};
