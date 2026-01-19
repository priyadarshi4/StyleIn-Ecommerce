const sendEmail = require("../utils/sendEmail");

// helper: delay
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
      html: `
        <h2>New Support Request</h2>
        <p><b>Issue:</b> ${issue}</p>
        <p><b>Detail:</b> ${detail}</p>
        <p><b>Language:</b> ${language}</p>
        <p><b>User Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <blockquote>${message}</blockquote>
      `,
    });

    await sleep(600); // ⏱️ IMPORTANT (rate limit safe)

    /* ================= USER AUTO-REPLY ================= */
    await sendEmail({
      email,
      subject: "✅ We received your request | StyleIn",
      html: `
        <h2>Hi 👋</h2>
        <p>Thanks for contacting <b>StyleIn</b>!</p>
        <p>We’ve received your request regarding <b>${issue}</b>.</p>

        <p><b>Your message:</b></p>
        <blockquote>${message}</blockquote>

        <br/>
        <p>— Team <b>StyleIn</b></p>
      `,
    });

    await sleep(600); // ⏱️ IMPORTANT

    /* ================= OFFER MAIL ================= */
    await sendEmail({
      email,
      subject: "🎁 A little gift from StyleIn!",
      html: `
        <h2>🎉 Special Offer Just for You!</h2>

        <p>Use coupon code:</p>
        <h1 style="color:#e65100;">STYLEIN10</h1>

        <p>Get <b>10% OFF</b> on your next purchase.</p>
        <p>⏰ Valid for <b>48 hours</b> only.</p>

        <a href="${process.env.FRONTEND_URL}"
           style="
             display:inline-block;
             padding:12px 20px;
             background:#000;
             color:#fff;
             text-decoration:none;
             border-radius:6px;
           ">
          Shop Now
        </a>

        <br/><br/>
        <p>— Team <b>StyleIn</b></p>
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
