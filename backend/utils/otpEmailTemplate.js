function otpEmailTemplate(name, otp) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:20px">
      <h2 style="color:#111">Verify your email</h2>

      <p>Hello <b>${name}</b>,</p>

      <p>Your One-Time Password (OTP) is:</p>

      <div style="
        font-size:32px;
        font-weight:bold;
        letter-spacing:6px;
        margin:20px 0;
        color:#000;
      ">
        ${otp}
      </div>

      <p>This OTP is valid for <b>5 minutes</b>.</p>

      <p>If you didn’t request this, please ignore this email.</p>

      <hr style="margin:24px 0"/>

      <p style="font-size:14px;color:#666">
        — Team <b>StyleIn</b>
      </p>
    </div>
  `;
}

module.exports = otpEmailTemplate;
