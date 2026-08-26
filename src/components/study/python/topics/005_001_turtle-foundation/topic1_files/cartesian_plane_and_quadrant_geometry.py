"""
# Module: 005_001_turtle-foundation
# Topic 1: Understanding the Turtle screen: canvas, coordinate system (Cartesian plane), origin (0,0), and quadrants
# File: cartesian_plane_and_quadrant_geometry.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Programmatically drawing Cartesian axes and navigating all 4 quadrants.
"""

from dataclasses import dataclass

@dataclass
class QuadrantPoint:
    quadrant_name: str
    x: float
    y: float

    @property
    def detected_quadrant(self) -> str:
        if self.x > 0 and self.y > 0:
            return "Quadrant I (+X, +Y) [Top-Right]"
        elif self.x < 0 and self.y > 0:
            return "Quadrant II (-X, +Y) [Top-Left]"
        elif self.x < 0 and self.y < 0:
            return "Quadrant III (-X, -Y) [Bottom-Left]"
        elif self.x > 0 and self.y < 0:
            return "Quadrant IV (+X, -Y) [Bottom-Right]"
        elif self.x == 0 and self.y == 0:
            return "Origin (0, 0)"
        else:
            return "On Coordinate Axis"

def test_quadrant_classification():
    print("   [...] Testing 4-Quadrant Cartesian Classification...")
    points = [
        QuadrantPoint("Barrackpore Campus", 150.0, 100.0),
        QuadrantPoint("Ichapur Center", -150.0, 100.0),
        QuadrantPoint("Jadavpur Lab", -150.0, -100.0),
        QuadrantPoint("Kolkata Headquarters", 150.0, -100.0),
        QuadrantPoint("Central Hub", 0.0, 0.0)
    ]

    for p in points:
        print(f"   [PASS] Point '{p.quadrant_name}' at ({p.x}, {p.y}) -> {p.detected_quadrant}")

    assert "Quadrant I" in points[0].detected_quadrant
    assert "Quadrant II" in points[1].detected_quadrant
    assert "Quadrant III" in points[2].detected_quadrant
    assert "Quadrant IV" in points[3].detected_quadrant
    assert "Origin" in points[4].detected_quadrant

def main():
    print("=" * 75)
    print("[CARTESIAN PLANE] 4-Quadrant Geometric Classification")
    print("=" * 75)

    test_quadrant_classification()

    print("=" * 75)
    print("[TAKEAWAY] The center origin (0, 0) splits the canvas into 4 distinct")
    print("           quadrants, matching standard Euclidean geometry.")
    print("=" * 75)

if __name__ == "__main__":
    main()
