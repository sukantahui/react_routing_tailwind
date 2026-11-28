"""
CBSE Class 12 CS - Topic 6 Simulation: Transmission Media Selection Decision Engine
Recommends the optimal medium based on distance, budget, speed, and terrain constraints.
"""

def evaluate_medium(distance_m, priority, terrain="normal"):
    print(f"\n[MEDIA EVALUATION QUERY]: Distance={distance_m}m | Priority={priority} | Terrain={terrain}")

    if terrain in ["hilly", "mountainous", "across_river"]:
        recommendation = "MICROWAVE / SATELLITE (Unguided Wireless)"
        reason = f"Rough/Hilly terrain makes physical trenching prohibitively expensive and prone to cable breaks."
    elif distance_m > 50000:  # > 50 km
        recommendation = "SATELLITE LINK / LEASED WAN LINES"
        reason = "Inter-city / inter-state distances require public carrier leased infrastructure or satellite."
    elif priority == "speed" or distance_m > 100:
        recommendation = "FIBER OPTIC CABLE"
        reason = f"Distance ({distance_m}m) exceeds 100m UTP threshold. Fiber provides gigabit speeds, zero EMI, and needs no repeaters."
    elif priority == "cost" and distance_m <= 100:
        recommendation = "TWISTED PAIR CABLE (Cat6 UTP)"
        reason = f"Distance ({distance_m}m) is within 100m. Cat6 UTP delivers high speed at minimal cost."
    else:
        recommendation = "FIBER OPTIC CABLE"
        reason = "Provides future-proof scalability and interference immunity."

    print(f"  -> RECOMMENDED MEDIUM: *** {recommendation} ***")
    print(f"  -> TECHNICAL JUSTIFICATION: {reason}")
    return recommendation

if __name__ == "__main__":
    print("=== TRANSMISSION MEDIA SELECTION SIMULATOR ===")
    evaluate_medium(distance_m=60, priority="cost", terrain="normal")
    evaluate_medium(distance_m=150, priority="speed", terrain="normal")
    evaluate_medium(distance_m=2000, priority="speed", terrain="hilly")
    evaluate_medium(distance_m=1200000, priority="connectivity", terrain="inter-state")
