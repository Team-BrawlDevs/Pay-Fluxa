export function generateInsights(assessment, derivedProfile) {
  const insights = [];

  const emiRatio =
    derivedProfile.current_emi / derivedProfile.monthly_income;

  const bufferMonths =
    derivedProfile.buffer_savings /
    (derivedProfile.essential_expenses +
      derivedProfile.current_emi);

  if (emiRatio > 0.35) {
    insights.push({
      type: "warning",
      message: "EMI burden exceeds healthy 35% threshold."
    });
  }

  if (bufferMonths < 3) {
    insights.push({
      type: "danger",
      message: "Emergency buffer covers less than 3 months."
    });
  }

  if (assessment.stress_probability > 0.3) {
    insights.push({
      type: "warning",
      message: "High probability of financial stress within 12 months."
    });
  }

  if (assessment.credit_index > 750) {
    insights.push({
      type: "success",
      message: "Strong forward-looking credit stability."
    });
  }

  if (assessment.survivability_index > 0.8) {
    insights.push({
      type: "success",
      message: "Excellent survivability under stress scenarios."
    });
  }

  return insights;
}
