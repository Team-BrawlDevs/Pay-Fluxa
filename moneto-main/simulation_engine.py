# simulation_engine.py

import numpy as np

def run_simulation(data, months=12, runs=1000):
    np.random.seed(42)

    income = data["monthly_income"]
    volatility = data["income_volatility"]
    essential = data["essential_expenses"]
    emi = data["current_emi"]
    buffer = data["buffer_savings"]

    stress_events = []
    stress_months = []

    for _ in range(runs):
        temp_buffer = buffer
        stressed = False

        for m in range(1, months + 1):
            simulated_income = np.random.normal(income, volatility)
            simulated_expense = np.random.normal(essential, essential * 0.05)

            monthly_balance = simulated_income - simulated_expense - emi
            temp_buffer += monthly_balance

            if temp_buffer < 0:
                stress_events.append(1)
                stress_months.append(m)
                stressed = True
                break

        if not stressed:
            stress_events.append(0)

    stress_probability = sum(stress_events) / runs
    survivability_index = 1 - stress_probability
    expected_stress_month = int(np.mean(stress_months)) if stress_months else None

    return {
        "stress_probability": stress_probability,
        "survivability_index": survivability_index,
        "expected_stress_month": expected_stress_month
    }
