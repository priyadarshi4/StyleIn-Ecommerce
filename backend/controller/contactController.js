const nodemailer = require("nodemailer");

exports.sendContactMail = async (req, res) => {
  try {
    const { issue, detail, language, email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ success: false });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, // 465
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    /* ================= ADMIN MAIL ================= */
    await transporter.sendMail({
      from: `"StyleIn Support" <${process.env.SMTP_MAIL}>`,
      to: process.env.SMTP_MAIL,
      subject: `📩 New Support Request | ${issue}`,
      html: `
        <h3>New Support Request</h3>
        <p><b>Issue:</b> ${issue}</p>
        <p><b>Detail:</b> ${detail}</p>
        <p><b>Language:</b> ${language}</p>
        <p><b>User Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    /* ================= USER AUTO-REPLY ================= */
    await transporter.sendMail({
      from: `"StyleIn Support" <${process.env.SMTP_MAIL}>`,
      to: email,
      subject: "✅ We received your request | StyleIn",
      html: `
        <h2>Hi 👋</h2>
        <p>Thanks for reaching out to <b>StyleIn</b>!</p>

        <p>We’ve received your request regarding <b>${issue}</b>.
        Our support team will get back to you shortly.</p>

        <hr/>

        <p><b>Your message:</b></p>
        <p>${message}</p>

        <br/>
        <p>💬 Need urgent help? Reply to this email.</p>

        <p>— Team StyleIn</p>
      `,
    });

    /* ================= OFFER / NOTIFICATION MAIL ================= */
    await transporter.sendMail({
      from: `"StyleIn Offers" <${process.env.SMTP_MAIL}>`,
      to: email,
      subject: "🎁 A little gift from StyleIn!",
      html: `
        <h2>🎉 Special Offer Just for You</h2>

        <p>As a thank you for contacting us, here’s a small gift:</p>

        <h3 style="color:#ff6600;">STYLEIN10</h3>
        <p>Get <b>10% OFF</b> on your next purchase.</p>

        <p>⏰ Valid for 48 hours only.</p>

        <a
          href="${process.env.FRONTEND_URL}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#ff6600;
            color:white;
            text-decoration:none;
            border-radius:6px;
            font-weight:bold;
          "
        >
          Shop Now
        </a>

        <p><br/>Happy shopping 🛍️</p>
        <p>— Team StyleIn</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ success: false });
  }
};
