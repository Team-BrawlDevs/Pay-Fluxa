# digital_twin.py

def build_digital_twin(data):
    income = data["monthly_income"]
    essential = data["essential_expenses"]
    emi = data["current_emi"]
    buffer_savings = data["buffer_savings"]
    volatility = data["income_volatility"]

    net_surplus = income - essential - emi
    expense_ratio = essential / income if income else 0
    income_stability = 1 - (volatility / income) if income else 0
    burn_rate = essential + emi
    buffer_months = buffer_savings / burn_rate if burn_rate else 0

    return {
        "net_surplus": net_surplus,
        "expense_ratio": expense_ratio,
        "income_stability": income_stability,
        "buffer_months": buffer_months,
        "burn_rate": burn_rate
    }
