import { describe, expect, it } from "vitest";
import { calculateMortgage, syncDownPaymentFromPercent, syncDownPaymentPercent } from "./mortgage-calculator";
import { calculateLoan } from "./loan-calculator";
import { calculateRentVsBuy, type RentVsBuyInput } from "./rent-vs-buy";
import { calculateHomeAffordability, type AffordabilityInput } from "./home-affordability-calculator";
import { calculateNetWorth, netWorthBenchmark } from "./net-worth-calculator";
import { calculateRoi } from "./roi-calculator";
import { calculate401k } from "./401k-planner";
import { calculateStudentLoanPlans, studentLoanPayment } from "./student-loan-calculator";
import { simulateCreditCardPayoff, type CreditCard } from "./credit-card-payoff-calculator";
import { calculateIncomeTax, calculateProgressiveTax, incomeTaxBrackets, type FilingStatus } from "./income-tax-calculator";
import { evaluateBasicExpression, parseCalculatorHistory, prependCalculatorHistory } from "./basic-calculator";
import { evaluateScientificExpression } from "./scientific-calculator";
import { calculateCylinder, cylinderUnits } from "./cylinder-volume-calculator";
import { calculatePercentage } from "./percentage-calculator";
import { calculateTripleIntegral } from "./triple-integral-calculator";
import { calculateAgeDifference } from "./age-difference-calculator";
import { calculateMiddleSchoolGpa } from "./middle-school-gpa-calculator";
import { calculateApushScore } from "./apush-score-calculator";
import { calculateWordStats } from "./word-counter-calculator";

describe("mortgage calculator", () => {
  it("preserves the captured ordinary vector and amortization", () => {
    const result = calculateMortgage({ homePrice: 450_000, downPayment: 90_000, interestRate: 6.5, loanTermYears: 30 });
    expect(result.monthlyPrincipalAndInterest).toBeCloseTo(2275.444884574675, 9);
    expect(result.totalMonthly).toBeCloseTo(2920.444884574675, 9);
    expect(result.totalInterest).toBeCloseTo(459160.1584468831, 6);
    expect(result.schedule).toHaveLength(360);
    expect(result.schedule[0]).toMatchObject({ month: 1, year: 1, interest: 1950 });
    expect(result.schedule.at(-1)?.balance).toBeCloseTo(0, 6);
  });
  it("covers zero interest, no financed principal, and synchronized inputs", () => {
    expect(calculateMortgage({ homePrice: 1200, downPayment: 0, interestRate: 0, loanTermYears: 1 }).monthlyPrincipalAndInterest).toBe(100);
    expect(calculateMortgage({ homePrice: 100, downPayment: 100, interestRate: 5, loanTermYears: 1 }).schedule).toEqual([]);
    expect(syncDownPaymentFromPercent(450_000, 20)).toBe(90_000);
    expect(syncDownPaymentPercent(450_000, 90_000)).toBe(20);
  });
});

describe("loan calculator", () => {
  it("preserves the default projection and reconciles totals", () => {
    const result = calculateLoan(25_000, 6.5, 5);
    expect(result.monthlyPayment).toBeCloseTo(489.15370546821663, 10);
    expect(result.totalCost).toBeCloseTo(result.monthlyPayment * 60, 10);
    expect(result.totalInterest + 25_000).toBeCloseTo(result.totalCost, 10);
  });
  it.each([[1200, 0, 1, 100], [0, 6, 5, 0]])("covers zero branches", (principal, rate, years, expected) => {
    expect(calculateLoan(principal, rate, years).monthlyPayment).toBe(expected);
  });
  it("characterizes the current zero-term coercion", () => expect(calculateLoan(1000, 0, 0).monthlyPayment).toBe(Infinity));
});

const rentDefaults: RentVsBuyInput = { homePrice: 450_000, monthlyRent: 2800, downPaymentPercent: 20, interestRate: 6.5, loanTermYears: 30, propertyTaxRate: 1.2, homeInsuranceAnnual: 1200, hoaMonthly: 0, maintenanceRate: 1, closingCostsPercent: 3, sellingCostsPercent: 6, appreciationRate: 3, rentIncreaseRate: 4, investmentReturnRate: 7, ownershipInflationRate: 2, years: 30 };
describe("rent versus buy", () => {
  it("preserves the default comparison", () => expect(calculateRentVsBuy(rentDefaults)).toMatchObject({ breakEvenYear: 6, finalBuyerNetWorth: 2194956, finalRenterNetWorth: 929802 }));
  it("covers zero financing and appreciation/inflation branches", () => {
    const result = calculateRentVsBuy({ ...rentDefaults, interestRate: 0, appreciationRate: 0, ownershipInflationRate: 0, years: 2 });
    expect(result.data).toHaveLength(2);
    expect(result.monthlyMortgage).toBe(1000);
  });
  it("returns an empty result for a coerced zero analysis period", () => expect(calculateRentVsBuy({ ...rentDefaults, years: 0 }).data).toEqual([]));
});

const affordabilityDefaults: AffordabilityInput = { annualIncome: 120_000, monthlyDebt: 450, downPayment: 60_000, interestRate: 6.5, loanTermYears: 30, propertyTaxRate: 1.2, annualInsurance: 1500, hoaMonthly: 0 };
describe("home affordability", () => {
  it("preserves the captured recommendation and PMI branch", () => {
    const result = calculateHomeAffordability(affordabilityDefaults);
    expect(result.recommendedPrice).toBeCloseTo(443206.28992197313, 7);
    expect(result.totalMonthly).toBe(3150);
    expect(result.hasPmi).toBe(true);
  });
  it("covers 20 percent down, zero interest, advanced costs, and high-debt clamp", () => {
    expect(calculateHomeAffordability({ ...affordabilityDefaults, downPayment: 150_000 }).hasPmi).toBe(false);
    expect(calculateHomeAffordability({ ...affordabilityDefaults, interestRate: 0, hoaMonthly: 100 }).recommendedPrice).toBeGreaterThan(0);
    expect(calculateHomeAffordability({ ...affordabilityDefaults, monthlyDebt: 100_000 }).recommendedPrice).toBe(0);
  });
});

describe("net worth", () => {
  it.each([[[10], [4], 6], [[0], [0], 0], [[1], [5], -4]])("covers positive, zero, and negative totals", (assets, debts, expected) => expect(calculateNetWorth(assets, debts).netWorth).toBe(expected));
  it("coerces negative rows to zero and assigns age bands", () => {
    expect(calculateNetWorth([-1, 5], [-2]).totalAssets).toBe(5);
    expect(netWorthBenchmark(35)).toEqual({ label: "35-44", median: 135_000 });
  });
});

describe("ROI", () => {
  const base = { investment: 8000, netReturn: 8800, years: 1, revenue: 500_000, cogs: 200_000, operatingExpenses: 150_000, otherCosts: 50_000 };
  it("preserves the ordinary ROI and business margins", () => {
    const result = calculateRoi(base);
    expect(result).toMatchObject({ roi: 10, grossMargin: 60, operatingMargin: 30, netMargin: 20 });
    expect(result.annualizedRoi).toBeCloseTo(10, 12);
  });
  it.each([[4000, -50], [8000, 0], [0, -100]])("covers loss and break-even", (netReturn, expected) => expect(calculateRoi({ ...base, netReturn }).roi).toBe(expected));
  it("covers zero investment", () => expect(calculateRoi({ ...base, investment: 0 }).roi).toBe(0));
  it("annualizes multi-year returns", () => expect(calculateRoi({ ...base, netReturn: 9680, years: 2 }).annualizedRoi).toBeCloseTo(10, 10));
});

describe("401(k)", () => {
  const base = { balance: 50_000, salary: 75_000, contributionPercent: 10, matchPercent: 4, returnPercent: 7, years: 30 };
  it("preserves the default projection and reconciles contribution/growth totals", () => {
    const result = calculate401k(base);
    expect(result.future).toBeCloseTo(1372451.0085324084, 6);
    expect(result.future).toBeCloseTo(base.balance + result.contributions + result.growth, 6);
    expect(result.employer).toBe(3000);
  });
  it("covers zero years, contributions, match, and return", () => {
    expect(calculate401k({ ...base, years: 0 }).future).toBe(50_000);
    expect(calculate401k({ ...base, contributionPercent: 0, matchPercent: 0, returnPercent: 0, years: 2 }).future).toBe(50_000);
  });
});

describe("student loan", () => {
  it("covers the ordinary fixed and income-derived plans", () => {
    const plans = calculateStudentLoanPlans(45_000, 6.5, 55_000, 1, 0);
    expect(plans).toHaveLength(4);
    expect(plans[0].monthly).toBeCloseTo(510.96589749011986, 8);
    expect(plans[2].monthly).toBeLessThanOrEqual(plans[0].monthly);
  });
  it("covers zero interest, tiny/zero balances, family size and dependents", () => {
    expect(studentLoanPayment(1200, 0, 1)).toBe(100);
    expect(studentLoanPayment(0, 6, 10)).toBe(0);
    expect(calculateStudentLoanPlans(20, 6, 55_000, 4, 2)[1].monthly).toBe(20);
    expect(calculateStudentLoanPlans(45_000, 6.5, 55_000, 1, 2)[3].monthly).toBeLessThan(calculateStudentLoanPlans(45_000, 6.5, 55_000, 1, 0)[3].monthly);
  });
});

describe("credit-card payoff", () => {
  const cards: CreditCard[] = [{ name: "A", balance: 6000, apr: 24 }, { name: "B", balance: 5000, apr: 19 }, { name: "C", balance: 4000, apr: 15 }];
  it("characterizes avalanche and snowball ordering", () => {
    const avalanche = simulateCreditCardPayoff(cards, 500, "avalanche");
    const snowball = simulateCreditCardPayoff(cards, 500, "snowball");
    expect(avalanche.months).toBe(41);
    expect(avalanche.interest).toBeLessThan(snowball.interest);
  });
  it("covers zero APR/balance, invalid input coercion, and insufficient payment", () => {
    expect(simulateCreditCardPayoff([{ name: "A", balance: 100, apr: 0 }], 100, "avalanche").interest).toBe(0);
    expect(simulateCreditCardPayoff([], 500, "snowball").months).toBe(0);
    expect(simulateCreditCardPayoff([{ name: "A", balance: Number.NaN, apr: Number.NaN }], 500, "avalanche").months).toBe(0);
    expect(simulateCreditCardPayoff([{ name: "A", balance: 1000, apr: 30 }], 1, "avalanche").months).toBe(1200);
  });
});

describe("2026 federal income tax", () => {
  it("preserves the ordinary refund vector", () => {
    const result = calculateIncomeTax({ grossIncome: 75_000, status: "single", retirementContribution: 6000, useItemized: false, itemizedDeduction: 0, withholding: 9000, credits: 0 });
    expect(result.taxableIncome).toBe(52_900);
    expect(result.taxAfterCredits).toBe(6350);
    expect(result.refund).toBe(2650);
  });
  it.each(["single", "mfj", "hoh", "mfs"] as FilingStatus[])("covers %s and exact bracket edges", (status) => {
    for (const bracket of incomeTaxBrackets[status].filter(({ limit }) => Number.isFinite(limit))) expect(calculateProgressiveTax(bracket.limit, status).tax).toBeGreaterThan(0);
  });
  it("covers zero taxable income, itemized deductions, credits, and balance due", () => {
    expect(calculateIncomeTax({ grossIncome: 0, status: "single", retirementContribution: 0, useItemized: false, itemizedDeduction: 0, withholding: 0, credits: 0 }).taxAfterCredits).toBe(0);
    const result = calculateIncomeTax({ grossIncome: 100_000, status: "single", retirementContribution: 0, useItemized: true, itemizedDeduction: 20_000, withholding: 0, credits: 1000 });
    expect(result.balanceDue).toBe(result.taxAfterCredits);
    expect(result.taxAfterCredits).toBeLessThan(result.tax);
  });
});

describe("basic calculator", () => {
  it.each([["2 + ", "3", "5"], ["5 − ", "2", "3"], ["4 × ", "3", "12"], ["8 / ", "2", "4"], ["0.1 + ", "0.2", "0.30000000000000004"]])("evaluates the current arithmetic path", (previous, current, expected) => expect(evaluateBasicExpression(previous, current).result).toBe(expected));
  it("characterizes divide-by-zero and invalid expression behavior", () => {
    expect(evaluateBasicExpression("1 / ", "0").result).toBe("Infinity");
    expect(evaluateBasicExpression("1 + ", ")").error).toBe(true);
  });
  it("parses, caps, and rejects malformed stored history", () => {
    expect(parseCalculatorHistory("not-json")).toEqual([]);
    expect(parseCalculatorHistory("{}" )).toEqual([]);
    expect(prependCalculatorHistory(Array.from({ length: 10 }, (_, i) => ({ expression: String(i), result: String(i) })), { expression: "new", result: "1" })).toHaveLength(10);
  });
});

describe("scientific calculator", () => {
  it("covers powers, roots, constants, and degree/radian trigonometry", () => {
    expect(evaluateScientificExpression("2^3", true)).toBe("8");
    expect(evaluateScientificExpression("√(9)", true)).toBe("3");
    expect(evaluateScientificExpression("sin(90)", true)).toBe("1");
    expect(Number(evaluateScientificExpression("sin(1.5707963267948966)", false))).toBeCloseTo(1, 12);
    expect(Number(evaluateScientificExpression("π", true))).toBeCloseTo(Math.PI, 12);
  });
  it("rejects invalid/non-finite expressions", () => expect(evaluateScientificExpression("√(-1)", true)).toBeNull());
});

describe("cylinder volume", () => {
  it("preserves radius 5, height 10", () => expect(calculateCylinder(5, 10).volume).toBeCloseTo(785.3981633974483, 12));
  it.each([[0, 10], [5, 0], [Number.NaN, 10]])("coerces nonpositive/non-finite current inputs", (radius, height) => expect(calculateCylinder(radius, height).volume).toBe(0));
  it("covers decimals and every current unit label", () => {
    expect(calculateCylinder(1.5, 2.5).volume).toBeCloseTo(17.671458676442587, 12);
    expect(Object.keys(cylinderUnits)).toEqual(["inches", "cm", "meters", "feet", "mm"]);
  });
});

describe("percentage calculator", () => {
  it.each([["of", "25", "200", 50], ["percent", "50", "200", 25], ["whole", "50", "25", 200]] as const)("calculates %s mode", (mode, first, second, expected) => expect(calculatePercentage(mode, first, second).result?.value).toBe(expected));
  it("supports decimal and negative values", () => expect(calculatePercentage("of", "-2.5", "40").result?.value).toBe(-1));
  it.each([["percent", "1", "0", "The second number cannot be zero."], ["whole", "1", "0", "The percentage cannot be zero."], ["of", "", "2", undefined], ["of", "Infinity", "2", undefined]] as const)("covers validation", (mode, first, second, secondError) => {
    const output = calculatePercentage(mode, first, second);
    expect(output.result).toBeNull();
    if (secondError) expect(output.errors.second).toBe(secondError); else expect(output.errors.first).toBeTruthy();
  });
});

describe("triple integral", () => {
  it("integrates the captured polynomial within numerical tolerance", () => expect(calculateTripleIntegral("x^2 + y^2 + z^2", 0, 1, 0, 1, 0, 1)).toBeCloseTo(0.999375, 9));
  it("covers constants and reversed/equal bounds", () => {
    expect(calculateTripleIntegral("1", 0, 2, 0, 3, 0, 4)).toBeCloseTo(24, 10);
    expect(calculateTripleIntegral("1", 1, 0, 0, 1, 0, 1)).toBeCloseTo(-1, 10);
    expect(calculateTripleIntegral("1", 0, 0, 0, 1, 0, 1)).toBe(0);
  });
  it("characterizes unsupported expressions as a zero sum", () => expect(calculateTripleIntegral("not valid", 0, 1, 0, 1, 0, 1)).toBe(0));
});

describe("age difference", () => {
  it("preserves the captured vector in UTC", () => expect(calculateAgeDifference("1990-01-01", "1995-06-15")).toMatchObject({ years: 5, months: 5, days: 12, totalDays: 1991, older: "Person 1", isValid: true }));
  it("covers reversed, same, leap-day/month-end, and invalid dates", () => {
    expect(calculateAgeDifference("1995-06-15", "1990-01-01").older).toBe("Person 2");
    expect(calculateAgeDifference("2020-01-01", "2020-01-01").totalDays).toBe(0);
    expect(calculateAgeDifference("2020-02-29", "2020-03-31").totalDays).toBe(31);
    expect(calculateAgeDifference("", "2020-01-01").isValid).toBe(false);
  });
});

describe("middle-school GPA", () => {
  it("preserves the default weighted set", () => expect(calculateMiddleSchoolGpa([{ grade: 4, credits: 1 }, { grade: 3, credits: 1 }, { grade: 3, credits: 1 }]).gpa).toBeCloseTo(10 / 3, 12));
  it.each([[[{ grade: 4, credits: 1 }], 4], [[{ grade: 0, credits: 1 }], 0], [[{ grade: 4, credits: 0 }], 0], [[], 0]] as const)("covers grade/collection boundaries", (courses, expected) => expect(calculateMiddleSchoolGpa([...courses]).gpa).toBe(expected));
  it("characterizes accepted out-of-range grade values", () => expect(calculateMiddleSchoolGpa([{ grade: 5, credits: 1 }]).gpa).toBe(5));
});

describe("APUSH score", () => {
  it("preserves the ordinary version-sensitive score", () => expect(calculateApushScore(40, 2, 2, 2, 5, 4)).toMatchObject({ totalRaw: 55, roundedComposite: 98, finalScore: 4, percent: 70 }));
  it.each([[0, 1], [50, 2], [70, 3], [88, 4], [105, 5]])("covers each displayed composite band", (composite, score) => expect(calculateApushScore(composite, 0, 0, 0, 0, 0).finalScore).toBe(score));
  it("covers minimum, maximum, and current unclamped pure input", () => {
    expect(calculateApushScore(0, 0, 0, 0, 0, 0).finalScore).toBe(1);
    expect(calculateApushScore(55, 3, 3, 3, 7, 6).finalScore).toBe(5);
    expect(calculateApushScore(Number.NaN, 0, 0, 0, 0, 0).finalScore).toBe(1);
  });
});

describe("word counter", () => {
  it("counts the captured two-paragraph vector", () => expect(calculateWordStats("Hello world.\n\nSecond paragraph!")).toMatchObject({ words: 4, sentences: 2, lines: 3, readTimeText: "1 min" }));
  it.each([["", 0], ["   \n", 0], ["hello, world", 2], ["one   two\nthree", 3], ["سلام دنیا", 2]])("covers text boundaries", (text, words) => expect(calculateWordStats(text).words).toBe(words));
  it("reports character counts and sentence punctuation", () => expect(calculateWordStats("Hi!  Ok?")).toMatchObject({ characters: 8, charactersNoSpaces: 6, sentences: 2 }));
});
