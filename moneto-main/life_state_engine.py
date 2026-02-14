# life_state_engine.py

def determine_life_state(stress_probability):
    if stress_probability < 0.15:
        return "Stable"
    elif stress_probability < 0.30:
        return "Watch"
    elif stress_probability < 0.60:
        return "Stress"
    else:
        return "Critical"
