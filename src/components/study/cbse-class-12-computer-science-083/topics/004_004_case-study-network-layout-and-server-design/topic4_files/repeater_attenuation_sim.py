"""
CBSE Class 12 CS - Topic 4 Simulation: Signal Attenuation & Repeater Regeneration
Simulates electrical voltage degradation over distance and signal regeneration by a repeater.
"""

def simulate_signal_propagation(distance_meters, use_repeater=False):
    initial_voltage = 5.0  # 5V digital TTL square wave
    attenuation_rate = 0.035  # loss per meter
    print(f"\n--- Simulating UTP Cable Run: {distance_meters} meters (Repeater: {use_repeater}) ---")

    if not use_repeater:
        final_voltage = max(0.0, initial_voltage - (attenuation_rate * distance_meters))
        print(f"  Signal travels entire {distance_meters}m without regeneration.")
        print(f"  Received Voltage: {final_voltage:.2f} V (Threshold needed: 2.0 V)")
        if final_voltage >= 2.0:
            print("  STATUS: HEALTHY - Signal readable by receiving NIC.")
        else:
            print("  STATUS: CRITICAL FAILURE! Signal attenuated below threshold. Packets dropped!")
    else:
        midway = distance_meters // 2
        midway_voltage = initial_voltage - (attenuation_rate * midway)
        print(f"  1. Signal travels {midway}m to Repeater. Voltage: {midway_voltage:.2f} V")
        print(f"  2. [REPEATER] Cleaned noise and REGENERATED fresh 5.00 V square pulse!")
        final_voltage = initial_voltage - (attenuation_rate * (distance_meters - midway))
        print(f"  3. Regenerated signal travels remaining {distance_meters - midway}m. Final Voltage: {final_voltage:.2f} V")
        print("  STATUS: HEALTHY - 100% Packet Delivery Success!")

if __name__ == "__main__":
    print("=== SIGNAL ATTENUATION & REPEATER SIMULATION ===")
    simulate_signal_propagation(60, use_repeater=False)   # Under 100m
    simulate_signal_propagation(140, use_repeater=False)  # Over 100m without repeater
    simulate_signal_propagation(140, use_repeater=True)   # Over 100m WITH repeater
