"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 5: Coaxial Cable Characteristic Impedance & Signal Reflection Simulation
Author: Sukanta Hui, Coder & AccoTax
"""

import math

def calculate_coaxial_impedance(d_inner_mm: float, D_outer_mm: float, dielectric_constant: float = 2.25) -> float:
    """
    Computes characteristic impedance Z0 of a coaxial cable:
    Z0 = (138 / sqrt(epsilon_r)) * log10(D / d)
    where:
      D = inner diameter of outer shield
      d = diameter of inner central conductor
      epsilon_r = relative dielectric permittivity (e.g. Polyethylene ~ 2.25)
    """
    if d_inner_mm >= D_outer_mm:
        raise ValueError("Inner conductor diameter must be smaller than shield diameter.")
    
    velocity_factor = 1.0 / math.sqrt(dielectric_constant)
    z0 = (138.0 / math.sqrt(dielectric_constant)) * math.log10(D_outer_mm / d_inner_mm)
    return z0

def simulate_bus_reflection(load_impedance: float, line_impedance: float = 50.0):
    """
    Simulates signal reflection coefficient (Gamma) at the end of a 10BASE2/10BASE5 bus:
    Gamma = (ZL - Z0) / (ZL + Z0)
    A 50-Ohm terminator results in Gamma = 0 (No reflection / Zero ghosts).
    """
    gamma = (load_impedance - line_impedance) / (load_impedance + line_impedance)
    reflected_power_percent = (gamma ** 2) * 100.0
    return gamma, reflected_power_percent

def run_coaxial_lab():
    print("=" * 70)
    print("COAXIAL CABLE IMPEDANCE & BUS TERMINATION SIMULATOR - CBSE CS 083")
    print("=" * 70)

    # 1. Baseband RG-58 (Target: 50 Ohms)
    rg58_z0 = calculate_coaxial_impedance(0.9, 2.95, dielectric_constant=2.25)
    print(f"RG-58 Thinnet Calculated Impedance: {rg58_z0:.1f} Ohms (Nominal: 50 Ohms)")

    # 2. Broadband RG-6 (Target: 75 Ohms)
    rg6_z0 = calculate_coaxial_impedance(1.02, 4.57, dielectric_constant=2.25)
    print(f"RG-6 Broadband CATV Calculated Impedance: {rg6_z0:.1f} Ohms (Nominal: 75 Ohms)")

    # 3. Simulate Termination Scenarios on a 50-Ohm 10BASE2 Bus
    print("\n[Bus Reflection Analysis - 50 Ohm Baseband Line]")
    test_terminations = [
        ("Proper 50 Ohm BNC Terminator", 50.0),
        ("Missing Terminator (Open Circuit)", 1e6),
        ("Short Circuit Termination (0 Ohm)", 0.0),
        ("Mismatched 75 Ohm Terminator", 75.0)
    ]

    for label, z_load in test_terminations:
        gamma, ref_pct = simulate_bus_reflection(z_load, 50.0)
        status = "PASSED: Zero signal reflection" if abs(gamma) < 0.05 else "FAILED: Severe signal reflection / Packet corruption"
        print(f"  * {label}:")
        print(f"      Reflection Coefficient (Gamma): {gamma:+.3f}")
        print(f"      Reflected Signal Power: {ref_pct:.1f}% -> Status: {status}")

if __name__ == "__main__":
    run_coaxial_lab()