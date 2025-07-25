const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const { sendOTP, verifyOTP } = require("./otp");
const { calculatePremiumAndRisk } = require("./logic"); // ✅ Import logic

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Backend working"));

// ✅ OTP Routes
app.post("/send-otp", sendOTP);
app.post("/verify-otp", verifyOTP);

// ✅ New: Save Quote Route with Premium & Risk Logic
app.post("/save-quote", (req, res) => {
  const quote = req.body;

  // Calculate premium and risk before saving
  const { premium, risk } = calculatePremiumAndRisk(
    quote.productType,
    quote.formFields
  );
  quote.premium = premium;
  quote.risk = risk;

  const filePath = path.join(__dirname, "data", "quotes.json");
  let data = [];

  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath);
    data = JSON.parse(raw);
  }

  data.push(quote);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.send({ success: true, message: "Quote saved", premium, risk });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
