# emi_engine.py

def adjust_emi(data, life_state):
    emi = data["current_emi"]
    tenure = data["remaining_tenure_months"]

    if life_state in ["Stress", "Critical"]:
        new_emi = emi * 0.75  # max 25% reduction
        new_tenure = int(tenure * 1.2)
        mode = "Protected"
    else:
        new_emi = emi
        new_tenure = tenure
        mode = "Normal"

    return {
        "new_emi": round(new_emi, 2),
        "new_tenure": new_tenure,
        "contract_mode": mode
    }
