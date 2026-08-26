"""
# Module: 005_001_turtle-foundation
# Topic 6: Rotation control: left(), right(), setheading(), degrees vs angles
# File: absolute_setheading_and_radians_mode.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating setheading() absolute orientation and radians vs degrees mode.
"""

from dataclasses import dataclass
import math

@dataclass
class HeadingController:
    heading_deg: float = 0.0
    is_radians_mode: bool = False

    def setheading(self, angle: float):
        if self.is_radians_mode:
            # Normalize in radians [0, 2*pi)
            full_circle = 2.0 * math.pi
            self.heading_deg = math.degrees(angle % full_circle)
        else:
            # Normalize in degrees [0, 360)
            self.heading_deg = angle % 360.0

    def seth(self, angle: float):
        self.setheading(angle)

    def switch_to_radians(self):
        self.is_radians_mode = True

    def switch_to_degrees(self):
        self.is_radians_mode = False

def test_heading_modes():
    print("   [...] Testing Absolute setheading() & Radians Mode...")
    ctrl = HeadingController()

    # 1. Degrees Mode: Set 180° West
    ctrl.setheading(180.0)
    assert ctrl.heading_deg == 180.0
    print(f"   [PASS] 1. Degrees Mode: setheading(180.0) -> Heading: {ctrl.heading_deg} deg (West)")

    # 2. Degrees Mode: Normalize 450° to 90°
    ctrl.setheading(450.0)
    assert ctrl.heading_deg == 90.0
    print(f"   [PASS] 2. Modulo Normalization: setheading(450.0) -> Heading: {ctrl.heading_deg} deg (North)")

    # 3. Radians Mode: Set pi/2 (90°)
    ctrl.switch_to_radians()
    ctrl.setheading(math.pi / 2.0)
    assert math.isclose(ctrl.heading_deg, 90.0, abs_tol=1e-4)
    print(f"   [PASS] 3. Radians Mode: setheading(pi/2) -> Converted Heading: {ctrl.heading_deg:.1f} deg (North)")

def main():
    print("=" * 75)
    print("[HEADING CONTROL] Absolute setheading() & Radians/Degrees Switching")
    print("=" * 75)

    test_heading_modes()

    print("=" * 75)
    print("[TAKEAWAY] setheading() sets absolute orientation directly, while")
    print("           screen.radians() enables trigonometric calculus angles.")
    print("=" * 75)

if __name__ == "__main__":
    main()
