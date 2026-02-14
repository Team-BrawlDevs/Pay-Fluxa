# explainability_engine.py

def generate_explanations(life_state, simulation, credit_index, investment_status):
    emi_reason = (
        f"EMI adjusted due to {round(simulation['stress_probability']*100,2)}% projected stress probability."
        if life_state in ["Stress", "Critical"]
        else "EMI remains unchanged due to stable projected cash flow."
    )

    credit_reason = (
        f"Credit index reflects survivability of {round(simulation['survivability_index']*100,2)}%."
    )

    investment_reason = (
        "Investments paused due to projected financial stress."
        if investment_status == "Paused"
        else "Investments active due to surplus stability."
    )

    return {
        "emi_reason": emi_reason,
        "credit_reason": credit_reason,
        "investment_reason": investment_reason
    }
