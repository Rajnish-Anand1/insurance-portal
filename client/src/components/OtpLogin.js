import React, { useState } from "react";
import axios from "axios";

export default function OtpLogin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [step, setStep] = useState("email");

  const sendOtp = async () => {
    try {
      await axios.post("http://localhost:5000/send-otp", { email });
      alert("OTP sent to your email");
      setStep("otp");
    } catch (err) {
      alert("Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/verify-otp", { email, otp });
      setToken(res.data.token);
      alert("Login successful!");
    } catch (err) {
      alert("Invalid or expired OTP");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Email OTP Login</h2>
      {step === "email" && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === "otp" && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      {token && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>JWT Token:</strong></p>
          <code>{token}</code>
        </div>
      )}
    </div>
  );
}
