import React, { useState } from "react";
import InsuranceForm from "./components/InsuranceForm";
import OtpLogin from "./components/OtpLogin";

export default function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-gray-100 p-6">
      {!isVerified ? (
        <OtpLogin setIsVerified={setIsVerified} setUserEmail={setUserEmail} />
      ) : (
        <InsuranceForm email={userEmail} />
      )}
    </div>
  );
}
