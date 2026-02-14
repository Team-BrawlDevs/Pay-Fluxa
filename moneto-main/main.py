# main.py

from fastapi import FastAPI
from digital_twin import build_digital_twin
from surplus_engine import calculate_surplus
from simulation_engine import run_simulation
from life_state_engine import determine_life_state
from emi_engine import adjust_emi
from credit_index import compute_credit_index
from investment_engine import investment_advice
from explainability_engine import generate_explanations

app = FastAPI()

@app.post("/evaluate")
def evaluate(data: dict):

    twin = build_digital_twin(data)
    surplus = calculate_surplus(data)
    simulation = run_simulation(data)
    life_state = determine_life_state(simulation["stress_probability"])
    emi_result = adjust_emi(data, life_state)
    credit_index = compute_credit_index(twin, simulation)
    investment = investment_advice(data, life_state, surplus)

    explanations = generate_explanations(
        life_state,
        simulation,
        credit_index,
        investment["status"]
    )

    return {
        "life_state": life_state,
        "stress_probability": simulation["stress_probability"],
        "expected_stress_month": simulation["expected_stress_month"],
        "new_emi": emi_result["new_emi"],
        "new_tenure": emi_result["new_tenure"],
        "contract_mode": emi_result["contract_mode"],
        "credit_index": credit_index,
        "survivability_index": simulation["survivability_index"],
        "investment_status": investment["status"],
        "investment_suggestion": investment["allocation"],
        "explanation": explanations
    }
