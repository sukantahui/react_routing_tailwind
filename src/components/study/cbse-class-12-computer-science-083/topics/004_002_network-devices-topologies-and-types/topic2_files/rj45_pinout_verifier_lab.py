"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 2: RJ45 Pinout Verifier & Cable Type Detector Simulation
Author: Sukanta Hui, Coder & AccoTax
"""

class RJ45WiringStandard:
    T568A = [
        "White/Green", "Green", "White/Orange", "Blue",
        "White/Blue", "Orange", "White/Brown", "Brown"
    ]
    T568B = [
        "White/Orange", "Orange", "White/Green", "Blue",
        "White/Blue", "Green", "White/Brown", "Brown"
    ]

    @staticmethod
    def identify_standard(pinout: list) -> str:
        if pinout == RJ45WiringStandard.T568A:
            return "T568A"
        elif pinout == RJ45WiringStandard.T568B:
            return "T568B"
        return "Custom / Miswired"

    @staticmethod
    def analyze_cable(end_a_pinout: list, end_b_pinout: list) -> dict:
        std_a = RJ45WiringStandard.identify_standard(end_a_pinout)
        std_b = RJ45WiringStandard.identify_standard(end_b_pinout)

        if "Custom" in std_a or "Custom" in std_b:
            return {
                "cable_type": "FAULTY / MISWIRED",
                "recommended_use": "Do not use! Wiring does not conform to T568 standard."
            }

        if std_a == std_b:
            return {
                "cable_type": f"Straight-Through Cable ({std_a} <-> {std_b})",
                "purpose": "Connects DISSIMILAR network devices",
                "examples": ["Computer to Switch", "Computer to Hub", "Router to Switch"]
            }
        else:
            return {
                "cable_type": f"Crossover Cable ({std_a} <-> {std_b})",
                "purpose": "Connects SIMILAR network devices directly",
                "examples": ["Computer to Computer directly", "Switch to Switch", "Router to Computer"]
            }

def run_rj45_lab():
    print("=" * 70)
    print("RJ45 MODULAR WIRING & CABLE ANALYZER - CBSE CS 083")
    print("=" * 70)

    # Test 1: Standard Straight-Through
    cable1 = RJ45WiringStandard.analyze_cable(RJ45WiringStandard.T568B, RJ45WiringStandard.T568B)
    print("\n[Test 1: Straight-Through Analysis]")
    print(f"  - Cable Type: {cable1['cable_type']}")
    print(f"  - Purpose:    {cable1['purpose']}")
    print(f"  - Devices:    {', '.join(cable1['examples'])}")

    # Test 2: Standard Crossover
    cable2 = RJ45WiringStandard.analyze_cable(RJ45WiringStandard.T568A, RJ45WiringStandard.T568B)
    print("\n[Test 2: Crossover Analysis]")
    print(f"  - Cable Type: {cable2['cable_type']}")
    print(f"  - Purpose:    {cable2['purpose']}")
    print(f"  - Devices:    {', '.join(cable2['examples'])}")

if __name__ == "__main__":
    run_rj45_lab()