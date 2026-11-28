"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 7: Radio Wave Free-Space Path Loss & Propagation Simulation
Author: Sukanta Hui, Coder & AccoTax
"""

import math

def calculate_wavelength(frequency_hz: float) -> float:
    """
    Computes wavelength (lambda) from frequency using the speed of light:
    lambda = c / f  (where c = 3.0 * 10^8 m/s)
    """
    speed_of_light = 3.0e8
    return speed_of_light / frequency_hz

def calculate_free_space_path_loss(frequency_mhz: float, distance_km: float) -> float:
    """
    Computes Free-Space Path Loss (FSPL) in decibels using the Friis Transmission Formula:
    FSPL (dB) = 32.44 + 20*log10(f_MHz) + 20*log10(d_km)
    """
    if frequency_mhz <= 0 or distance_km <= 0:
        raise ValueError("Frequency and distance must be positive numbers.")
    fspl_db = 32.44 + (20.0 * math.log10(frequency_mhz)) + (20.0 * math.log10(distance_km))
    return fspl_db

def run_radio_wave_lab():
    print("=" * 70)
    print("RADIO WAVE PROPAGATION & PATH LOSS SIMULATOR - CBSE CS 083")
    print("=" * 70)

    # Common radio frequencies:
    # 1. AM Radio: 1.0 MHz (Ground/Sky wave)
    # 2. FM Radio: 100 MHz (VHF Space wave)
    # 3. Wi-Fi: 2400 MHz (UHF/Microwave band)
    scenarios = [
        ("AM Broadcast Station", 1.0, 50.0),     # 1 MHz at 50 km
        ("FM Radio Tower", 100.0, 25.0),         # 100 MHz at 25 km
        ("Campus Wi-Fi Transmitter", 2400.0, 0.1) # 2.4 GHz at 100 meters (0.1 km)
    ]

    for name, freq_mhz, dist_km in scenarios:
        freq_hz = freq_mhz * 1e6
        wavelength_m = calculate_wavelength(freq_hz)
        loss_db = calculate_free_space_path_loss(freq_mhz, dist_km)

        print(f"\n[{name}]")
        print(f"  - Operating Frequency: {freq_mhz:.1f} MHz")
        print(f"  - Free-Space Wavelength (lambda): {wavelength_m:.2f} meters")
        print(f"  - Distance: {dist_km} km")
        print(f"  - Free Space Path Loss: {loss_db:.2f} dB")

if __name__ == "__main__":
    run_radio_wave_lab()