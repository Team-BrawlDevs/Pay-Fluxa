# investment_engine.py

def investment_advice(data, life_state, surplus):
    if life_state in ["Stress", "Critical"] or surplus["true_surplus"] <= 0:
        return {
            "status": "Paused",
            "allocation": {"debt": 0, "equity": 0, "liquid": 1}
        }

    risk = data["risk_profile"]

    if risk == "conservative":
        allocation = {"debt": 0.7, "equity": 0.1, "liquid": 0.2}
    elif risk == "moderate":
        allocation = {"debt": 0.5, "equity": 0.3, "liquid": 0.2}
    else:
        allocation = {"debt": 0.3, "equity": 0.5, "liquid": 0.2}

    return {
        "status": "Active",
        "allocation": allocation
    }
