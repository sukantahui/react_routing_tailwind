"""
# Module: 005_001_turtle-foundation
# Topic 6: Rotation control: left(), right(), setheading(), degrees vs angles
# File: relative_rotations_left_and_right.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating relative rotation methods, aliases, and
#              exterior angle calculation for polygons.
"""

from dataclasses import dataclass

@dataclass
class TurtleRotationState:
    heading_deg: float = 0.0

    def left(self, angle: float):
        """Turn counter-clockwise."""
        self.heading_deg = (self.heading_deg + angle) % 360.0

    def right(self, angle: float):
        """Turn clockwise."""
        self.heading_deg = (self.heading_deg - angle) % 360.0

    def lt(self, angle: float):
        self.left(angle)

    def rt(self, angle: float):
        self.right(angle)

def calculate_polygon_exterior_angle(sides: int) -> float:
    """Computes turn angle required for regular polygon: 360 / N."""
    if sides < 3:
        raise ValueError("A polygon must have at least 3 sides.")
    return 360.0 / sides

def test_relative_rotations():
    print("   [...] Testing Relative Rotations & Polygon Turning Angles...")
    t = TurtleRotationState()

    # 1. Turn left 90° (from East to North)
    t.left(90.0)
    assert t.heading_deg == 90.0
    print(f"   [PASS] 1. left(90.0) -> New Heading: {t.heading_deg} deg (North)")

    # 2. Turn right 45°
    t.right(45.0)
    assert t.heading_deg == 45.0
    print(f"   [PASS] 2. right(45.0) -> New Heading: {t.heading_deg} deg (North-East)")

    # 3. Polygon exterior angles
    triangle_angle = calculate_polygon_exterior_angle(3)
    square_angle = calculate_polygon_exterior_angle(4)
    hexagon_angle = calculate_polygon_exterior_angle(6)

    assert triangle_angle == 120.0
    assert square_angle == 90.0
    assert hexagon_angle == 60.0
    print(f"   [PASS] 3. Exterior Angles: Triangle={triangle_angle} deg, Square={square_angle} deg, Hexagon={hexagon_angle} deg")

def main():
    print("=" * 75)
    print("[ROTATION] Relative Turning & Regular Polygon Exterior Angles")
    print("=" * 75)

    test_relative_rotations()

    print("=" * 75)
    print("[TAKEAWAY] The exterior turn angle for any regular N-sided polygon is")
    print("           always exactly 360 / N degrees.")
    print("=" * 75)

if __name__ == "__main__":
    main()
