import React, { useState } from "react";
import axios from "axios";

export default function OtpLogin({ setIsVerified, setUserEmail }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("send"); // Step: "send" or "verify"

  // Send OTP to email
  const sendOtp = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/send-otp", { email });
      setMessage("✅ OTP sent to your email.");
      setStep("verify");
      setOtp(""); // clear old OTP
    } catch (error) {
      setMessage("❌ Error sending OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/verify-otp", { email, otp });
      if (res.data.success) {
        setMessage("✅ OTP verified successfully!");
        setUserEmail(email);      // Pass user email to parent
        setIsVerified(true);      // Switch to Insurance form
      } else {
        setMessage("❌ Invalid OTP. Please try again.");
      }
    } catch (error) {
      setMessage("❌ Something went wrong during OTP verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          🔐 Login with Email & OTP
        </h2>

        {/* Email input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        {/* OTP input (only visible in verify step) */}
        {step === "verify" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 6-digit OTP"
            />
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-2">
          {step === "send" ? (
            <button
              onClick={sendOtp}
              disabled={loading || !email}
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          ) : (
            <>
              <button
                onClick={verifyOtp}
                disabled={loading || !otp}
                className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              <button
                onClick={sendOtp}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-xl hover:bg-gray-300 transition"
              >
                Resend OTP
              </button>
            </>
          )}
        </div>

        {/* Message output */}
        {message && (
          <div
            className={`text-center text-sm font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
