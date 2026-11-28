"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 5: Digital Repeater vs Analog Amplifier Simulation Lab
Author: Sukanta Hui, Coder & AccoTax
"""

class SignalRestorationLab:
    @staticmethod
    def simulate_transmission_loss(original_voltage: float, distance_m: float, noise_level: float = 0.8) -> tuple:
        """Simulates electrical attenuation and environmental noise over copper distance."""
        # 100m causes ~60% voltage attenuation in copper
        attenuation_factor = max(0.1, 1.0 - (distance_m / 200.0))
        attenuated_voltage = original_voltage * attenuation_factor
        corrupted_voltage = attenuated_voltage + noise_level
        return attenuated_voltage, corrupted_voltage

    @staticmethod
    def analog_amplifier(input_voltage: float, gain: float = 2.0) -> float:
        """Analog Amplifier: Multiplies everything (signal AND noise) indiscriminately."""
        return input_voltage * gain

    @staticmethod
    def digital_repeater(input_voltage: float, threshold: float = 2.5, clean_high: float = 5.0, clean_low: float = 0.0) -> float:
        """Digital Repeater: Decodes digital bit against threshold and regenerates a pristine new pulse."""
        if input_voltage >= threshold:
            return clean_high  # Reconstructs clean 5.0V binary 1
        return clean_low       # Reconstructs clean 0.0V binary 0

def run_repeater_lab():
    print("=" * 70)
    print("DIGITAL REPEATER VS ANALOG AMPLIFIER COMPARISON - CBSE CS 083")
    print("=" * 70)

    dist = 140.0  # 140 meters (exceeds 100m copper limit)
    clean_bit_1 = 5.0  # 5.0 Volts binary 1
    noise = 0.9       # Stray environmental EMI

    atten, noisy_signal = SignalRestorationLab.simulate_transmission_loss(clean_bit_1, dist, noise)
    print(f"Transmitted Digital Bit: 1 (Clean: {clean_bit_1:.1f} V)")
    print(f"Distance Traveled:       {dist} meters (Exceeds standard 100m limit!)")
    print(f"Signal after 140m:       {atten:.2f} V + {noise:.2f} V noise = {noisy_signal:.2f} V (Heavily distorted)")

    # Test Analog Amplifier
    amplified = SignalRestorationLab.analog_amplifier(noisy_signal, gain=1.8)
    print(f"\n[1. Analog Amplifier Output (Gain = 1.8x)]")
    print(f"  * Amplified Voltage:   {amplified:.2f} V")
    print(f"  * Result: Flawed! Noise was amplified alongside signal ({noise * 1.8:.2f} V noise remains).")

    # Test Digital Repeater
    regenerated = SignalRestorationLab.digital_repeater(noisy_signal, threshold=2.2)
    print(f"\n[2. Digital Repeater Output (Threshold Detection)]")
    print(f"  * Regenerated Voltage: {regenerated:.1f} V (Pristine clean binary 1 square wave)")
    print(f"  * Result: Success! Noise was 100% eliminated through digital threshold reconstruction.")

if __name__ == "__main__":
    run_repeater_lab()