"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 8: Wireless Access Point Channel Allocation & RSSI Path Loss Lab
Author: Sukanta Hui, Coder & AccoTax
"""

import math

class WirelessAPSimulator:
    def __init__(self, ssid: str, channel: int, frequency_band: str = "2.4GHz", tx_power_dbm: float = 20.0):
        self.ssid = ssid
        self.channel = channel
        self.band = frequency_band
        self.tx_power = tx_power_dbm  # Transmit power (typically 20 dBm = 100 mW)

    def calculate_rssi(self, distance_meters: float, walls_passed: int = 0) -> float:
        """
        Calculates Received Signal Strength Indicator (RSSI) in dBm using log-distance path loss.
        Each solid wall introduces ~5 dBm attenuation.
        """
        if distance_meters <= 0:
            return self.tx_power

        freq_mhz = 2400.0 if self.band == "2.4GHz" else 5000.0
        # Free-space loss at 1 meter ~ 40 dB for 2.4 GHz, 47 dB for 5 GHz
        pl_1m = 40.0 if self.band == "2.4GHz" else 47.0
        n_path_loss_exponent = 2.8  # Indoor office environment
        wall_loss = walls_passed * 5.0

        loss = pl_1m + 10 * n_path_loss_exponent * math.log10(distance_meters) + wall_loss
        rssi = self.tx_power - loss
        return round(rssi, 1)

    def evaluate_connection_quality(self, rssi_dbm: float) -> str:
        if rssi_dbm >= -60.0:
            return "EXCELLENT (Max data rates, 4K streaming)"
        elif rssi_dbm >= -70.0:
            return "GOOD (Stable browsing, VoIP, video conferencing)"
        elif rssi_dbm >= -80.0:
            return "FAIR (Occasional packet drop, lower data rates)"
        else:
            return "POOR / DISCONNECTED (Signal too weak, disconnects)"

def run_ap_lab():
    print("=" * 70)
    print("WIRELESS ACCESS POINT (WAP) RSSI & COVERAGE LAB - CBSE CS 083")
    print("=" * 70)

    ap = WirelessAPSimulator(ssid="School_Library_WiFi", channel=6, frequency_band="2.4GHz", tx_power_dbm=20.0)
    print(f"Configured AP: SSID='{ap.ssid}' | Band={ap.band} | Channel={ap.channel}")

    test_distances = [
        (2.0, 0, "Right beside Access Point"),
        (10.0, 0, "Same room across the hall"),
        (15.0, 1, "Adjacent classroom through 1 concrete wall"),
        (25.0, 2, "Outdoor corridor through 2 solid walls"),
        (50.0, 3, "Far parking lot through 3 walls")
    ]

    for dist, walls, desc in test_distances:
        rssi = ap.calculate_rssi(dist, walls)
        quality = ap.evaluate_connection_quality(rssi)
        print(f"\nScenario: {desc} (Dist: {dist}m, Walls: {walls})")
        print(f"  * Received Signal (RSSI): {rssi} dBm")
        print(f"  * Quality Rating:         {quality}")

if __name__ == "__main__":
    run_ap_lab()