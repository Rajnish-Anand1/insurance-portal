function calculatePremiumAndRisk(productType, formFields) {
  let premium = 1000;
  let risk = 1.0;

  switch (productType) {
    case "health":
      if (formFields.age > 45) risk += 1.5;
      if (formFields.bmi > 30) premium += 500;
      if (formFields.preConditions?.toLowerCase().includes("diabetes")) risk += 2;
      break;

    case "motor":
      if (parseInt(formFields.carYear) < 2015) risk += 1.2;
      if (formFields.mileage > 100000) premium += 400;
      break;

    case "life":
      if (formFields.age > 50) premium += 800;
      if (formFields.smoker === "yes") risk += 2;
      break;

    case "property":
      if (formFields.buildYear < 2000) premium += 700;
      if (formFields.area > 2000) premium += 600;
      break;

    case "casualty":
      if (formFields.jobRisk === "high") risk += 1.5;
      if (formFields.location === "flood zone") premium += 1000;
      break;

    default:
      break;
  }

  return { premium, risk };
}

module.exports = { calculatePremiumAndRisk };
