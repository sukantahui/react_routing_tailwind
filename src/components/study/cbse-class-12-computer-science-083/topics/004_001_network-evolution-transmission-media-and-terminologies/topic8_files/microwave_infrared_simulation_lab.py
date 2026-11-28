"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 8: Microwave Line-of-Sight Tower Distance & Infrared Attenuation Lab
Author: Sukanta Hui, Coder & AccoTax
"""

import math

def calculate_los_distance(h1_meters: float, h2_meters: float) -> float:
    """
    Computes maximum theoretical Line-of-Sight (LoS) optical horizon distance (km)
    between two microwave towers considering Earth's curvature (effective radius ~8500 km):
    d_km = 3.57 * (sqrt(h1) + sqrt(h2))
    """
    if h1_meters <= 0 or h2_meters <= 0:
        raise ValueError("Tower heights must be greater than zero.")
    return 3.57 * (math.sqrt(h1_meters) + math.sqrt(h2_meters))

def simulate_infrared_path_loss(distance_meters: float, obstacle_present: bool = False) -> dict:
    """
    Simulates Infrared signal reception inside a room.
    Infrared is completely blocked by opaque solid obstacles (walls, doors, people).
    """
    if obstacle_present:
        return {
            "distance_m": distance_meters,
            "status": "BLOCKED (Opaque obstacle in Line of Sight)",
            "signal_power_pct": 0.0
        }
    
    # Inverse square optical dissipation
    if distance_meters <= 0:
        power_pct = 100.0
    elif distance_meters > 10.0:
        power_pct = 0.0  # Infrared range limit ~ 10m
    else:
        power_pct = max(0.0, 100.0 / (distance_meters ** 1.8))
        
    return {
        "distance_m": distance_meters,
        "status": "RECEIVED" if power_pct > 5.0 else "TOO WEAK",
        "signal_power_pct": round(power_pct, 2)
    }

def run_lab():
    print("=" * 70)
    print("MICROWAVE & INFRARED WIRELESS METRIC SIMULATOR - CBSE CS 083")
    print("=" * 70)

    # 1. Microwave Tower LoS Calculation
    print("\n[1. Microwave Tower Line-of-Sight Distance]")
    tower_pairs = [
        ("Campus Roof Towers (30m & 30m)", 30, 30),
        ("High Hilltop Towers (100m & 100m)", 100, 100),
        ("Relay Tower to Ground Station (50m & 10m)", 50, 10)
    ]
    for desc, h1, h2 in tower_pairs:
        d = calculate_los_distance(h1, h2)
        print(f"  * {desc}: Max LoS Distance = {d:.2f} km")

    # 2. Infrared Short-Range Simulation
    print("\n[2. Infrared Indoor Line-of-Sight Simulation]")
    ir_tests = [
        (2.0, False),  # 2m clear
        (5.0, False),  # 5m clear
        (8.5, False),  # 8.5m clear
        (3.0, True),   # 3m with obstacle (wall/book)
        (15.0, False)  # 15m out of range
    ]
    for dist, obst in ir_tests:
        res = simulate_infrared_path_loss(dist, obst)
        print(f"  * Distance: {dist:4.1f}m | Obstacle: {str(obst):5} -> {res['status']} ({res['signal_power_pct']}%)")

if __name__ == "__main__":
    run_lab()