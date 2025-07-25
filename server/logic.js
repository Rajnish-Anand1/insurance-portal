function calculatePremiumAndRisk(productType, formFields) {
  let premium = 1000; // base premium
  let risk = 1;       // base risk score

  switch (productType) {
    case "health":
      if (formFields.age > 45) risk += 1.5;
      if (formFields.bmi > 30) premium += 500;
      break;

    case "motor":
      if (formFields.carYear < 2015) premium += 300;
      if (formFields.mileage > 100000) risk += 1.2;
      break;

    case "life":
      if (formFields.smoker === "yes") risk += 2;
      break;

    case "property":
      if (formFields.buildYear < 2000) premium += 400;
      break;

    case "casualty":
      if (formFields.jobRisk === "high") risk += 2;
      break;

    default:
      break;
  }

  return { premium, risk };
}

module.exports = { calculatePremiumAndRisk };
