# Insurance Portal - Week 1 (Accenture PIP Task)

## Overview
A full-stack web application for dynamic insurance quoting. Built as part of Accenture PIP, this portal calculates custom insurance premiums and risk scores for 5 lines of business (LOBs):

- Health
- Motor
- Term Life
- Property
- Casualty

---

##  Tech Stack
- **Frontend:** React (with Axios)
- **Backend:** Node.js + Express
- **Database:** Local JSON (mock backend)
- **Auth:** Custom email + OTP login using Nodemailer

---

##  Week 1 Deliverables

### 1. Full Stack Web App Setup
- React app in `/client`
- Node/Express server in `/server`
- Local JSON files for data persistence

### 2. Dynamic Insurance Form
- UI updates fields dynamically based on selected insurance type (LOB)
- Supports 3+ input fields per LOB

### 3. Email + OTP Authentication
- Custom OTP system (no 3rd-party libraries)
- Email sent using Gmail App Password
- OTP expires in 5 minutes
- JWT token returned on success

### 4. Premium & Risk Calculation
- `logic.js` module created in backend
- Custom logic applied per LOB using user inputs
- Risk and premium values added to each quote

### 5. Data Storage
- Quotes saved in `server/data/quotes.json`
- User login data stored in `server/data/users.json` (if extended)

---

##  Quote Submission Workflow
1. User selects insurance type
2. Dynamic form appears
3. On submit:
   - Quote is sent to `/save-quote`
   - Backend calculates premium & risk
   - Saves quote to JSON file
   - Frontend displays result to user

---

##  Sample Logic (From `logic.js`)
```js
if (productType === "health") {
  if (formFields.age > 45) risk += 1.5;
  if (formFields.bmi > 30) premium += 500;
}
1. Clone the Repository
git clone https://github.com/Rajnish-Anand1/insurance-portal.git
cd insurance-portal

2. Start the Backend (Node.js)
cd server
npm install
node index.js
Server runs on: http://localhost:5000
3. Start the Frontend (React)
cd client
npm install
npm start
App runs on: http://localhost:3000
4. Test Flow
Open the app in browser
Fill insurance form
Submit to generate quote
Quotes are stored in server/data/quotes.json
5. (Optional) Test OTP Login
Enter email in login form
Receive OTP via Gmail
Verify OTP → receive JWT token
 Contact
Author: Rajnish Anand
Email: rajnisha975@gmail.com

