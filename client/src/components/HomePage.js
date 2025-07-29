import React, { useState } from "react";
import OtpLogin from "./OtpLogin";
import InsuranceForm from "./InsuranceForm";

export default function HomePage() {
  const [isVerified, setIsVerified] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {!isVerified ? (
        <OtpLogin setIsVerified={setIsVerified} setUserEmail={setUserEmail} />
      ) : (
        <InsuranceForm userEmail={userEmail} />
      )}
    </div>
  );
}
