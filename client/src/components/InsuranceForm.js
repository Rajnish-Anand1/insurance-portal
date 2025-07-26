import React, { useState } from "react";
import axios from "axios";

const fieldsByLOB = {
  health: ["age", "bmi", "preConditions"],
  motor: ["carMake", "carYear", "mileage"],
  life: ["age", "smoker", "existingConditions"],
  property: ["propertyType", "area", "buildYear", "address"],
  casualty: ["jobRisk", "location", "coverage"],
};

const mockAddresses = [
  "221B Baker Street, London",
  "742 Evergreen Terrace, Springfield",
  "1600 Pennsylvania Avenue, Washington DC",
  "10 Downing Street, London",
  "Eiffel Tower, Paris",
  "1 Hacker Way, Menlo Park"
];

export default function InsuranceForm() {
  const [lob, setLob] = useState("health");
  const [form, setForm] = useState({});
  const [premium, setPremium] = useState(null);
  const [risk, setRisk] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddressInput = (e) => {
    const value = e.target.value;
    setForm({ ...form, address: value });

    const filtered = mockAddresses.filter((addr) =>
      addr.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const selectSuggestion = (suggestion) => {
    setForm({ ...form, address: suggestion });
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quoteData = {
      productType: lob,
      formFields: form,
    };

    try {
      const res = await axios.post("http://localhost:5000/save-quote", quoteData);
      setPremium(res.data.premium);
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

      {/* 🔹 Add user email input */}
      <div>
        <input
          type="email"
          name="userEmail"
          placeholder="Enter your email"
          onChange={handleChange}
          value={form.userEmail || ""}
        />
      </div>

      <label>Select Insurance Type:</label>
      <select onChange={(e) => setLob(e.target.value)} value={lob}>
        {Object.keys(fieldsByLOB).map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <form onSubmit={handleSubmit}>
        {fieldsByLOB[lob].map((field) =>
          field === "address" ? (
            <div key={field}>
              <input
                name={field}
                placeholder="Start typing address"
                onChange={handleAddressInput}
                value={form["address"] || ""}
              />
              {suggestions.length > 0 && (
                <ul style={{ background: "#f0f0f0", padding: "5px" }}>
                  {suggestions.map((s, i) => (
                    <li key={i} onClick={() => selectSuggestion(s)} style={{ cursor: "pointer" }}>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div key={field}>
              <input
                name={field}
                placeholder={field}
                onChange={handleChange}
                value={form[field] || ""}
              />
            </div>
          )
        )}
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
