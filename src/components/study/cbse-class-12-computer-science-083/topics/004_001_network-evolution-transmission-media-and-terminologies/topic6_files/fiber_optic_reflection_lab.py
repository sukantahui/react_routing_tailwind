"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 6: Optical Fiber Total Internal Reflection & Critical Angle Lab
Author: Sukanta Hui, Coder & AccoTax
"""

import math

class OpticalFiber:
    def __init__(self, n_core: float, n_cladding: float):
        if n_cladding >= n_core:
            raise ValueError(f"Core refractive index ({n_core}) must be strictly GREATER than cladding ({n_cladding}) for TIR!")
        self.n_core = n_core
        self.n_cladding = n_cladding

    def calculate_critical_angle(self) -> float:
        """
        Calculates critical angle theta_c in degrees:
        sin(theta_c) = n_cladding / n_core
        """
        sin_theta_c = self.n_cladding / self.n_core
        theta_c_rad = math.asin(sin_theta_c)
        return math.degrees(theta_c_rad)

    def calculate_numerical_aperture(self) -> float:
        """
        Numerical Aperture (NA) measures light-gathering capability:
        NA = sqrt(n_core^2 - n_cladding^2)
        """
        return math.sqrt(self.n_core**2 - self.n_cladding**2)

    def evaluate_ray(self, angle_of_incidence_deg: float) -> dict:
        """Tests whether an incident light ray undergoes Total Internal Reflection."""
        crit_angle = self.calculate_critical_angle()
        tir_occurred = angle_of_incidence_deg > crit_angle
        return {
            "incident_angle_deg": angle_of_incidence_deg,
            "critical_angle_deg": crit_angle,
            "total_internal_reflection": tir_occurred,
            "result": "PROPAGATED VIA TIR (Light guided through fiber)" if tir_occurred 
                     else "REFRACTED OUT (Light lost through cladding)"
        }

def run_fiber_lab():
    print("=" * 70)
    print("OPTICAL FIBER TOTAL INTERNAL REFLECTION SIMULATOR - CBSE CS 083")
    print("=" * 70)

    # Standard silica telecommunication fiber: n_core = 1.48, n_cladding = 1.46
    fiber = OpticalFiber(n_core=1.48, n_cladding=1.46)
    crit_angle = fiber.calculate_critical_angle()
    na = fiber.calculate_numerical_aperture()

    print(f"Core Refractive Index (n1):     {fiber.n_core}")
    print(f"Cladding Refractive Index (n2): {fiber.n_cladding}")
    print(f"Calculated Critical Angle:      {crit_angle:.2f} degrees")
    print(f"Numerical Aperture (NA):        {na:.3f}")

    print("\n[Ray Tracing Simulation Inside Core-Cladding Boundary]")
    test_angles = [70.0, 75.0, 80.5, 82.0, 85.0]

    for angle in test_angles:
        res = fiber.evaluate_ray(angle)
        print(f"  * Incident Angle {angle:4.1f}° -> {res['result']}")

if __name__ == "__main__":
    run_fiber_lab()