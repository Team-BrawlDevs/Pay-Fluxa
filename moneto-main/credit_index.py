# credit_index.py

def compute_credit_index(digital_twin, simulation):
    surplus_score = max(min(digital_twin["net_surplus"] / 20000, 1), 0)
    stability_score = digital_twin["income_stability"]
    buffer_score = max(min(digital_twin["buffer_months"] / 6, 1), 0)
    survivability_score = simulation["survivability_index"]

    weighted_score = (
        surplus_score * 0.3 +
        stability_score * 0.2 +
        buffer_score * 0.2 +
        survivability_score * 0.3
    )

    return int(300 + weighted_score * 600)
