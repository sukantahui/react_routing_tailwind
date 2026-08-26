"""
# Module: 005_001_turtle-foundation
# Topic 1: Understanding the Turtle screen: canvas, coordinate system (Cartesian plane), origin (0,0), and quadrants
# File: origin_and_coordinate_mapping.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating origin mechanics, coordinate inspection,
#              and Euclidean distance calculations.
"""

from dataclasses import dataclass
import math

@dataclass
class TurtleCoordinateInspector:
    current_x: float = 0.0
    current_y: float = 0.0

    def goto(self, x: float, y: float) -> tuple[float, float]:
        self.current_x = float(x)
        self.current_y = float(y)
        return (self.current_x, self.current_y)

    def xcor(self) -> float:
        return self.current_x

    def ycor(self) -> float:
        return self.current_y

    def pos(self) -> tuple[float, float]:
        return (self.current_x, self.current_y)

    def distance(self, target_x: float, target_y: float) -> float:
        dx = target_x - self.current_x
        dy = target_y - self.current_y
        return round(math.sqrt(dx**2 + dy**2), 2)

def test_coordinate_mapping():
    print("   [...] Testing Turtle Position Inspection & Distance Calculations...")
    inspector = TurtleCoordinateInspector()

    # Start at origin (0, 0)
    assert inspector.pos() == (0.0, 0.0)
    print(f"   [PASS] 1. Initial position at Origin: {inspector.pos()}")

    # Move to (120, 160) - 3-4-5 right triangle scaled by 40
    inspector.goto(120.0, 160.0)
    assert inspector.xcor() == 120.0
    assert inspector.ycor() == 160.0
    print(f"   [PASS] 2. Moved to position: ({inspector.xcor()}, {inspector.ycor()})")

    # Distance back to origin should be 200.0 (sqrt(120^2 + 160^2) = 200)
    dist_to_origin = inspector.distance(0.0, 0.0)
    assert dist_to_origin == 200.0
    print(f"   [PASS] 3. Euclidean distance back to Origin: {dist_to_origin} units (3-4-5 Triangle Verified)")

def main():
    print("=" * 75)
    print("[COORDINATE MAPPING] Position Inspection & Euclidean Distance Formula")
    print("=" * 75)

    test_coordinate_mapping()

    print("=" * 75)
    print("[TAKEAWAY] Methods pos(), xcor(), ycor(), and distance() allow precise")
    print("           mathematical control over spatial relationships.")
    print("=" * 75)

if __name__ == "__main__":
    main()
