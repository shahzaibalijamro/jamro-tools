export type CreditCard = { name: string; balance: number; apr: number };
export type PayoffStrategy = "minimum" | "avalanche" | "snowball";
export type PayoffResult = { months: number; interest: number; payment: number };

export function simulateCreditCardPayoff(cards: CreditCard[], monthlyPayment: number, strategy: PayoffStrategy): PayoffResult {
  let debts = cards.map((card) => ({ ...card, balance: Number.isFinite(card.balance) ? Math.max(0, card.balance) : 0, apr: Number.isFinite(card.apr) ? Math.max(0, card.apr) : 0 }));
  let interest = 0;
  let months = 0;
  const payment = Number.isFinite(monthlyPayment) ? Math.max(0, monthlyPayment) : 0;
  if (!debts.some((card) => card.balance > 0.01) || (strategy !== "minimum" && payment <= 0)) return { months, interest, payment };
  while (debts.some((card) => card.balance > 0.01) && months < 1200) {
    months += 1;
    debts = debts.map((card) => {
      const accrued = card.balance * (card.apr / 100 / 365) * 30;
      interest += accrued;
      return { ...card, balance: card.balance + accrued };
    });
    let remaining = payment;
    debts = debts.map((card) => {
      const minimum = Math.min(Math.max(25, card.balance * 0.02), card.balance);
      const paid = Math.min(minimum, remaining, card.balance);
      remaining -= paid;
      return { ...card, balance: card.balance - paid };
    });
    if (strategy === "minimum") continue;
    const ordered = debts.map((card, index) => ({ card, index })).sort((a, b) => strategy === "avalanche" ? b.card.apr - a.card.apr : a.card.balance - b.card.balance);
    for (const item of ordered) {
      if (remaining <= 0) break;
      const extra = Math.min(remaining, item.card.balance);
      debts[item.index] = { ...item.card, balance: item.card.balance - extra };
      remaining -= extra;
    }
  }
  return { months, interest, payment };
}
