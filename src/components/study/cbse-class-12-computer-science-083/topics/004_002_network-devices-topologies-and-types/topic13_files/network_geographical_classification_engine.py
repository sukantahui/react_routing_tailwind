"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 13: Geographical Network Classification Engine (PAN, LAN, MAN, WAN)
Author: Sukanta Hui, Coder & AccoTax
"""

class NetworkGeographicalClassifier:
    @staticmethod
    def classify_by_distance_m(distance_meters: float, context: str = "") -> dict:
        """Classifies a network into PAN, LAN, MAN, or WAN based on CBSE standards."""
        if distance_meters <= 10.0:
            return {
                "category": "PAN (Personal Area Network)",
                "range_limit": "< 10 meters",
                "typical_tech": "Bluetooth (802.15), USB, Wi-Fi Direct, Infrared",
                "ownership": "Single individual",
                "cbse_notes": "Centered around a single person's workspace or mobile personal devices."
            }
        elif distance_meters <= 2000.0:
            return {
                "category": "LAN (Local Area Network)",
                "range_limit": "Up to 1 - 2 kilometers",
                "typical_tech": "Ethernet (Cat-6 UTP, Optical Fiber), Wi-Fi (802.11)",
                "ownership": "Privately owned by single organization (school, hospital, office)",
                "cbse_notes": "High speed (100 Mbps - 10 Gbps), lowest error rate, private ownership."
            }
        elif distance_meters <= 50000.0:
            return {
                "category": "MAN (Metropolitan Area Network)",
                "range_limit": "Up to 50 kilometers (Citywide)",
                "typical_tech": "Municipal Optical Fiber Ring, Cable TV (DOCSIS), WiMAX",
                "ownership": "Consortium of enterprises or municipal telecom provider",
                "cbse_notes": "Connects multiple buildings or branches across an entire metropolitan city."
            }
        else:
            return {
                "category": "WAN (Wide Area Network)",
                "range_limit": "Exceeds 50 km (Nationwide / Continental / Global)",
                "typical_tech": "Submarine optical fiber cables, Geostationary Satellites, Leased Lines",
                "ownership": "Multiple international telecom carriers, ISPs, governments",
                "cbse_notes": "Spans entire countries or the globe. Prime example is the Internet."
            }

def run_classifier_lab():
    print("=" * 70)
    print("GEOGRAPHICAL SPREAD NETWORK CLASSIFIER - CBSE CS 083")
    print("=" * 70)

    test_scenarios = [
        ("Connecting wireless headphones to smartphone", 1.5),
        ("School computer laboratory in Room 102", 25.0),
        ("University campus connecting 4 separate buildings", 850.0),
        ("Citywide traffic surveillance camera network in Kolkata", 25000.0),
        ("Connecting head office in New Delhi to branch in London", 6700000.0)
    ]

    for desc, dist in test_scenarios:
        res = NetworkGeographicalClassifier.classify_by_distance_m(dist, desc)
        print(f"\nScenario: {desc} (Span: {dist:,.1f} meters)")
        print(f"  * Classification: {res['category']}")
        print(f"  * Technologies:   {res['typical_tech']}")
        print(f"  * Ownership:      {res['ownership']}")
        print(f"  * CBSE Rationale: {res['cbse_notes']}")

if __name__ == "__main__":
    run_classifier_lab()