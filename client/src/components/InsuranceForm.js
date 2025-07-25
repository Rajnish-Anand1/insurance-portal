import React, { useState } from "react";
import axios from "axios";

const fieldsByLOB = {
  health: ["age", "bmi", "preConditions"],
  motor: ["carMake", "carYear", "mileage"],
  life: ["age", "smoker", "existingConditions"],
  property: ["propertyType", "area", "buildYear"],
  casualty: ["jobRisk", "location", "coverage"],
};

export default function InsuranceForm() {
  const [lob, setLob] = useState("health");
  const [form, setForm] = useState({});
  const [premium, setPremium] = useState(null);  // ✅ New
  const [risk, setRisk] = useState(null);        // ✅ New

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quoteData = {
      productType: lob,
      formFields: form,
    };

    try {
      const res = await axios.post("http://localhost:5000/save-quote", quoteData);

      setPremium(res.data.premium);   // ✅ Capture response
      setRisk(res.data.risk);

      alert("✅ Quote saved!");
    } catch (error) {
      console.error("Error saving quote:", error.message);
      alert("❌ Failed to save quote");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Insurance Quote Generator</h2>

      <label>Select Insurance Type:</label>
      <select onChange={(e) => setLob(e.target.value)} value={lob}>
        {Object.keys(fieldsByLOB).map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <form onSubmit={handleSubmit}>
        {fieldsByLOB[lob].map((field) => (
          <div key={field}>
            <input
              name={field}
              placeholder={field}
              onChange={handleChange}
              value={form[field] || ""}
            />
          </div>
        ))}
        <button type="submit">Submit Quote</button>
      </form>

      <pre>{JSON.stringify(form, null, 2)}</pre>

      {premium !== null && risk !== null && (
        <div style={{ marginTop: "20px" }}>
          <h3>📊 Quote Summary:</h3>
          <p><strong>Premium:</strong> ₹{premium}</p>
          <p><strong>Risk Score:</strong> {risk}</p>
        </div>
      )}
    </div>
  );
}
