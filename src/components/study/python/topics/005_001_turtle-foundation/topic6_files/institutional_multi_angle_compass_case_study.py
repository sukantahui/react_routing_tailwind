"""
# Module: 005_001_turtle-foundation
# Topic 6: Rotation control: left(), right(), setheading(), degrees vs angles
# File: institutional_multi_angle_compass_case_study.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Multi-directional campus compass navigator orienting students
#              along radial bearings between Barrackpore, Kolkata, and Ichapur.
"""

from dataclasses import dataclass

@dataclass
class CampusRadialBearing:
    origin_station: str
    target_student: str
    target_location: str
    bearing_deg: float
    distance_km: float

    def get_compass_quadrant_label(self) -> str:
        deg = self.bearing_deg % 360.0
        if deg == 0.0:
            return "East (+X)"
        elif deg == 90.0:
            return "North (+Y)"
        elif deg == 180.0:
            return "West (-X)"
        elif deg == 270.0:
            return "South (-Y)"
        elif 0.0 < deg < 90.0:
            return "North-East (Q1)"
        elif 90.0 < deg < 180.0:
            return "North-West (Q2)"
        elif 180.0 < deg < 270.0:
            return "South-West (Q3)"
        else:
            return "South-East (Q4)"

def test_compass_navigator():
    print("   [...] Running Institutional Campus Radial Compass Navigator Test...")
    
    # 1. Mamata at Barrackpore -> Kolkata (Bearing: 45.0 deg)
    b1 = CampusRadialBearing("Barrackpore Hub", "Mahima", "Kolkata Tech Center", 45.0, 22.5)
    assert b1.get_compass_quadrant_label() == "North-East (Q1)"
    print(f"   [PASS] 1. Dispatch to {b1.target_student} ({b1.target_location}) at bearing {b1.bearing_deg} deg -> Quadrant: {b1.get_compass_quadrant_label()}")

    # 2. Mamata at Barrackpore -> Ichapur (Bearing: 180.0 deg)
    b2 = CampusRadialBearing("Barrackpore Hub", "Susmita", "Ichapur Lab", 180.0, 8.0)
    assert b2.get_compass_quadrant_label() == "West (-X)"
    print(f"   [PASS] 2. Dispatch to {b2.target_student} ({b2.target_location}) at bearing {b2.bearing_deg} deg -> Quadrant: {b2.get_compass_quadrant_label()}")

    # 3. Mamata at Barrackpore -> Jadavpur (Bearing: 270.0 deg)
    b3 = CampusRadialBearing("Barrackpore Hub", "Debangshu", "Jadavpur Center", 270.0, 32.0)
    assert b3.get_compass_quadrant_label() == "South (-Y)"
    print(f"   [PASS] 3. Dispatch to {b3.target_student} ({b3.target_location}) at bearing {b3.bearing_deg} deg -> Quadrant: {b3.get_compass_quadrant_label()}")

def main():
    print("=" * 80)
    print("[CASE STUDY] Institutional Campus Radial Compass Navigator")
    print("=" * 80)

    test_compass_navigator()

    print("=" * 80)
    print("[TAKEAWAY] Mapping radial bearings with setheading() allows precise")
    print("           multi-agent navigation across institutional campus networks.")
    print("=" * 80)

if __name__ == "__main__":
    main()
