export function deriveFinancialProfile({
  accounts,
  transactions,
  loans,
  risk_profile = "moderate"
}) {
  // 1️⃣ Income calculation
  const salaryTransactions = transactions.filter(
    (t) => t.type === "credit" && t.category === "salary"
  );

  const monthly_income =
    salaryTransactions.reduce((sum, t) => sum + t.amount, 0) /
    Math.max(salaryTransactions.length, 1);

  // 2️⃣ Expense split
  const debitTransactions = transactions.filter(
    (t) => t.type === "debit"
  );

  const essentialCategories = ["rent", "groceries", "utilities"];

  let essential_expenses = 0;
  let non_essential_expenses = 0;

  debitTransactions.forEach((t) => {
    if (essentialCategories.includes(t.category)) {
      essential_expenses += t.amount;
    } else {
      non_essential_expenses += t.amount;
    }
  });

  // 3️⃣ EMI from loans
  const loanList = Object.values(loans || {});
  const current_emi = loanList.reduce((sum, l) => sum + l.emi, 0);

  const interest_rate =
    loanList.length > 0 ? loanList[0].interest_rate : 0.12;

  const remaining_tenure_months =
    loanList.length > 0 ? loanList[0].remaining_tenure_months : 24;

  // 4️⃣ Buffer savings
  const buffer_savings =
    (accounts.checking?.balance || 0) +
    (accounts.savings?.balance || 0);

  // 5️⃣ Income volatility (simple estimation)
  const incomeAmounts = salaryTransactions.map((t) => t.amount);

  const avgIncome = monthly_income;
  const variance =
    incomeAmounts.reduce((sum, val) => sum + Math.pow(val - avgIncome, 2), 0) /
    Math.max(incomeAmounts.length, 1);

  const income_volatility = Math.sqrt(variance);

  return {
    monthly_income,
    income_volatility,
    essential_expenses,
    non_essential_expenses,
    current_emi,
    interest_rate,
    remaining_tenure_months,
    buffer_savings,
    risk_profile
  };
}
