const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const otpStore = {}; // Temporary memory store

exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = {
    otp,
    expires: Date.now() + 5 * 60 * 1000  // 5 minutes
  };

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rajnisha975@gmail.com",           // ✅ replace with your Gmail
        pass: "frwjaozdstwbiajj"   // ✅ replace with your Gmail App Password
      }
    });

    await transporter.sendMail({
      from: "Insurance Portal <your_email@gmail.com>",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`
    });

    console.log(`✅ OTP sent to ${email}: ${otp}`);
    res.send({ success: true, message: "OTP sent" });

  } catch (error) {
    console.error("❌ Error sending OTP:", error.message);
    res.status(500).send({ success: false, message: "Failed to send OTP", error: error.message });
  }
};

exports.verifyOTP = (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record || record.otp != otp || Date.now() > record.expires) {
    return res.status(400).send({ error: "Invalid or expired OTP" });
  }

  delete otpStore[email]; // Optional: clean up

  const token = jwt.sign({ email }, "SECRET_KEY", { expiresIn: "1h" });
  res.send({ success: true, token });
};
