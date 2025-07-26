
# 🛡️ Insurance Portal - Week 1 & 2 (Accenture PIP Task)

## 🔍 Overview
A full-stack web application for dynamically estimating insurance premiums and risks across various lines of business (LOBs). Built as part of Accenture PIP assignment.

---

## 🏗 Tech Stack
- **Frontend:** React (with Axios)
- **Backend:** Node.js + Express
- **Database:** Local JSON (mock backend)
- **Auth:** Custom email + OTP login using Nodemailer

---

## 📦 Week 1 Deliverables

### ✅ 1. Full Stack Web App Setup
- React app in `/client`
- Node/Express server in `/server`
- Local mock DB using `users.json`, `quotes.json`

### ✅ 2. Dynamic Insurance Form
- UI auto-adjusts fields based on selected LOB:
  - Health
  - Motor
  - Life
  - Property
  - Casualty

### ✅ 3. Email + OTP Authentication
- Custom backend logic (no 3rd-party login)
- OTP email sent via Gmail + Nodemailer
- OTP expires in 5 minutes
- JWT returned on successful verification

### ✅ 4. Initial Premium & Risk Logic
- Created `logic.js` with logic for each LOB
- Connected to backend `/save-quote` route

### ✅ 5. Data Storage
- `quotes.json` and `users.json` store user data and quotes securely

---

## 🔄 Week 2 Enhancements

### ✅ 1. Completed Premium & Risk Engine
- Finalized risk/premium logic per LOB in `logic.js`
- Dynamically calculated and shown in frontend after submission

### ✅ 2. Quote Submission + User Tracking
- Added `userEmail` field to all quotes
- Quote stored with LOB, form data, premium, and risk values

### ✅ 3. Address Suggestion System
- Auto-suggest enabled for "Property" LOB
- Typing in address field shows predefined suggestions
- Selection updates address value in real-time

---

## 📤 Quote Submission Flow

1. User enters email
2. Selects insurance type
3. Fills in LOB-specific form
4. Submits → Premium & risk calculated
5. Quote saved to backend and result displayed

---

## 🔍 Sample Logic (`logic.js`)

```js
if (productType === "health") {
  if (formFields.age > 45) risk += 1.5;
  if (formFields.bmi > 30) premium += 500;
}
```

---

## 🚀 How to Run

```bash
# Backend
cd server
npm install
node index.js

# Frontend
cd client
npm install
npm start
```

---

## 📁 File Structure

```
insurance-portal/
├── client/           # React frontend
│   └── src/components/InsuranceForm.js
├── server/           # Node backend
│   ├── index.js
│   ├── otp.js
│   ├── logic.js
│   └── data/
│       ├── users.json
│       └── quotes.json
```

---

## ✅ Status
- [x] Week 1 Complete
- [x] Week 2 Complete
- [ ] Week 3 (Coming Up: Charts + Dashboard)
