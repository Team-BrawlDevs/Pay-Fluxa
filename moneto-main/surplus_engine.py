# surplus_engine.py

def calculate_surplus(data):
    income = data["monthly_income"]
    essential = data["essential_expenses"]
    emi = data["current_emi"]

    repayment_capacity = income - essential
    true_surplus = repayment_capacity - emi

    return {
        "repayment_capacity": repayment_capacity,
        "true_surplus": true_surplus
    }
