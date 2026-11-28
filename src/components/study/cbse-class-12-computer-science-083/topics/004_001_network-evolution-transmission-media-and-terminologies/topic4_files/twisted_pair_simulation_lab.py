"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 4: Twisted Pair Cable Transmission & Crosstalk Analysis Simulation
Author: Sukanta Hui, Coder & AccoTax
"""

import math

class TwistedPairChannel:
    def __init__(self, category: str, cable_type: str, length_meters: float):
        self.category = category.upper()
        self.cable_type = cable_type.upper()  # 'UTP' or 'STP'
        self.length_meters = length_meters
        
        # Specification lookup: (max_frequency_mhz, max_data_rate_mbps, attenuation_db_per_100m_at_100mhz)
        self.specs = {
            "CAT3": (16, 10, 13.1),
            "CAT5": (100, 100, 22.0),
            "CAT5E": (100, 1000, 20.4),
            "CAT6": (250, 10000, 17.5),
            "CAT6A": (500, 10000, 16.0)
        }
        
    def calculate_attenuation(self) -> float:
        """Calculates approximate signal loss in decibels (dB) for current cable length."""
        if self.category not in self.specs:
            raise ValueError(f"Unknown category {self.category}")
        atten_per_100m = self.specs[self.category][2]
        return (self.length_meters / 100.0) * atten_per_100m

    def check_length_validity(self) -> dict:
        """CBSE standard max segment length for Ethernet twisted pair is 100 meters."""
        is_valid = self.length_meters <= 100.0
        return {
            "length_m": self.length_meters,
            "within_cbse_standard_100m": is_valid,
            "recommendation": "Signal valid without amplification." if is_valid 
                             else "CRITICAL: Exceeds 100m! Requires a Repeater or Switch."
        }

    def evaluate_crosstalk_noise(self, external_emi_level_db: float) -> float:
        """STP shields attenuate external EMI by ~35dB compared to UTP."""
        shielding_reduction = 35.0 if self.cable_type == "STP" else 0.0
        effective_noise = max(0.0, external_emi_level_db - shielding_reduction)
        return effective_noise

def run_twisted_pair_lab():
    print("=" * 70)
    print("TWISTED PAIR CABLE (UTP / STP) METRIC CALCULATOR - CBSE CS 083")
    print("=" * 70)

    cables = [
        TwistedPairChannel("Cat5e", "UTP", 80),
        TwistedPairChannel("Cat5e", "UTP", 140),
        TwistedPairChannel("Cat6", "STP", 95),
        TwistedPairChannel("Cat6", "UTP", 95)
    ]

    emi_source_noise_db = 45.0  # Factory motor / heavy equipment EMI

    for idx, cable in enumerate(cables, 1):
        loss = cable.calculate_attenuation()
        validity = cable.check_length_validity()
        noise = cable.evaluate_crosstalk_noise(emi_source_noise_db)
        
        print(f"\n[Cable Run #{idx}] {cable.category} ({cable.cable_type}) - Length: {cable.length_meters}m")
        print(f"  - Attenuation Loss: {loss:.2f} dB")
        print(f"  - 100m Standard Check: {validity['recommendation']}")
        print(f"  - Effective EMI Noise: {noise:.1f} dB (Shielding saved: {emi_source_noise_db - noise:.1f} dB)")

if __name__ == "__main__":
    run_twisted_pair_lab()