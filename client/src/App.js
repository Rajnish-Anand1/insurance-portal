import React from "react";
import InsuranceForm from "./components/InsuranceForm";
import OtpLogin from "./components/OtpLogin";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Insurance Portal</h1>
      <OtpLogin />
      <hr />
      <InsuranceForm />
    </div>
  );
}

export default App;
