export interface RentVsBuyInput {
  homePrice: number; monthlyRent: number; downPaymentPercent: number; interestRate: number; loanTermYears: number;
  propertyTaxRate: number; homeInsuranceAnnual: number; hoaMonthly: number; maintenanceRate: number;
  closingCostsPercent: number; sellingCostsPercent: number; appreciationRate: number; rentIncreaseRate: number;
  investmentReturnRate: number; ownershipInflationRate: number; years: number;
}

export function calculateRentVsBuy(input: RentVsBuyInput) {
  const data: Array<{ year: number; buyerNetWorth: number; renterNetWorth: number; homeValue: number; rentCost: number }> = [];
  const monthlyMortgageRate = input.interestRate / 100 / 12;
  const numberOfPayments = input.loanTermYears * 12;
  const downPayment = input.homePrice * input.downPaymentPercent / 100;
  const loanAmount = input.homePrice - downPayment;
  const initialCapital = downPayment + input.homePrice * input.closingCostsPercent / 100;
  let monthlyMortgage = 0;
  if (loanAmount > 0 && monthlyMortgageRate > 0) monthlyMortgage = loanAmount * monthlyMortgageRate * (1 + monthlyMortgageRate) ** numberOfPayments / ((1 + monthlyMortgageRate) ** numberOfPayments - 1);
  else if (loanAmount > 0 && monthlyMortgageRate === 0) monthlyMortgage = loanAmount / numberOfPayments;
  let renterInvestment = initialCapital;
  let buyerInvestment = 0;
  let loanBalance = loanAmount;
  let currentHomeValue = input.homePrice;
  let currentRent = input.monthlyRent;
  let annualTax = input.homePrice * input.propertyTaxRate / 100;
  let annualMaintenance = input.homePrice * input.maintenanceRate / 100;
  let annualInsurance = input.homeInsuranceAnnual;
  let monthlyHoa = input.hoaMonthly;
  let breakEvenYear: number | null = null;
  for (let year = 1; year <= input.years; year += 1) {
    const monthlyBuyCost = monthlyMortgage + annualTax / 12 + annualMaintenance / 12 + annualInsurance / 12 + monthlyHoa;
    for (let month = 1; month <= 12; month += 1) {
      const budget = Math.max(monthlyBuyCost, currentRent);
      renterInvestment *= 1 + input.investmentReturnRate / 100 / 12;
      buyerInvestment *= 1 + input.investmentReturnRate / 100 / 12;
      renterInvestment += budget - currentRent;
      buyerInvestment += budget - monthlyBuyCost;
      if (loanBalance > 0) {
        loanBalance -= monthlyMortgage - loanBalance * monthlyMortgageRate;
        if (loanBalance < 0) loanBalance = 0;
      }
    }
    currentHomeValue *= 1 + input.appreciationRate / 100;
    currentRent *= 1 + input.rentIncreaseRate / 100;
    annualTax *= 1 + input.ownershipInflationRate / 100;
    annualMaintenance *= 1 + input.ownershipInflationRate / 100;
    annualInsurance *= 1 + input.ownershipInflationRate / 100;
    monthlyHoa *= 1 + input.ownershipInflationRate / 100;
    const buyerNetWorth = currentHomeValue - loanBalance + buyerInvestment - currentHomeValue * input.sellingCostsPercent / 100;
    data.push({ year, buyerNetWorth: Math.round(buyerNetWorth), renterNetWorth: Math.round(renterInvestment), homeValue: Math.round(currentHomeValue), rentCost: Math.round(currentRent) });
    if (breakEvenYear === null && buyerNetWorth >= renterInvestment) breakEvenYear = year;
  }
  return { data, breakEvenYear, finalBuyerNetWorth: data.at(-1)?.buyerNetWorth ?? 0, finalRenterNetWorth: data.at(-1)?.renterNetWorth ?? 0, monthlyMortgage };
}
