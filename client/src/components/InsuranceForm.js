import React, { useState } from "react";
import axios from "axios";
import { FaPaperPlane, FaFileInvoiceDollar } from "react-icons/fa";

const fieldsByLOB = {
  health: ["age", "bmi", "preConditions"],
  motor: ["carMake", "carYear", "mileage"],
  life: ["age", "smoker", "existingConditions"],
  property: ["propertyType", "area", "buildYear"],
  casualty: ["jobRisk", "location", "coverage"],
};

const mockAddresses = [
  "123 Main Street, Delhi",
  "456 Park Avenue, Mumbai",
  "789 Lakeview Road, Bangalore",
  "22 Rajpath Marg, Jaipur",
  "10 MG Road, Pune",
];

export default function InsuranceForm() {
  const [lob, setLob] = useState("health");
  const [form, setForm] = useState({});
  const [premium, setPremium] = useState(null);
  const [risk, setRisk] = useState(null);
  const [addressInput, setAddressInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddressChange = (e) => {
    const input = e.target.value;
    setAddressInput(input);
    setForm({ ...form, address: input });

    if (input.length > 1) {
      const filtered = mockAddresses.filter((addr) =>
        addr.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleAddressSelect = (selected) => {
    setAddressInput(selected);
    setForm({ ...form, address: selected });
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex flex-col items-center justify-center p-4 space-y-8">

      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <h2 className="text-xl font-bold text-center text-blue-800 mb-6">Insurance Product Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <input
            type="email"
            name="userEmail"
            placeholder="Enter your email"
            onChange={handleChange}
            value={form.userEmail || ""}
            className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <select
            onChange={(e) => setLob(e.target.value)}
            value={lob}
            className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {Object.keys(fieldsByLOB).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {fieldsByLOB[lob].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              onChange={handleChange}
              value={form[field] || ""}
              className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          ))}

          {/* Address Autocomplete Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Address"
              value={addressInput}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-xl mt-1 shadow-md max-h-48 overflow-y-auto">
                {suggestions.map((addr, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleAddressSelect(addr)}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {addr}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-200"
          >
            <FaPaperPlane />
            Submit
          </button>
        </form>

        {premium !== null && risk !== null && (
          <div className="mt-6 bg-gray-100 p-4 rounded-xl shadow-sm text-blue-900">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <FaFileInvoiceDollar /> Quote Summary
            </h3>
            <p><strong>Premium:</strong> ₹{premium}</p>
            <p><strong>Risk Score:</strong> {risk}</p>
          </div>
        )}
      </div>

    </div>
  );
}
