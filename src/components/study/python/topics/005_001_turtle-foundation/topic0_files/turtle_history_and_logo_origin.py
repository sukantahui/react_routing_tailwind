"""
# Module: 005_001_turtle-foundation
# Topic 0: Introduction to Turtle Graphics: history, educational purpose, and real-world relevance
# File: turtle_history_and_logo_origin.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating Seymour Papert's Logo Turtle history and
#              body-syntonic coordinate tracing.
"""

from dataclasses import dataclass
import math

@dataclass
class VirtualTurtleState:
    x: float = 0.0
    y: float = 0.0
    angle_degrees: float = 0.0  # 0 deg = East (Right)

    def forward(self, distance: float) -> tuple[float, float]:
        rad = math.radians(self.angle_degrees)
        self.x = round(self.x + distance * math.cos(rad), 4)
        self.y = round(self.y + distance * math.sin(rad), 4)
        return (self.x, self.y)

    def left(self, degrees: float) -> float:
        self.angle_degrees = (self.angle_degrees + degrees) % 360.0
        return self.angle_degrees

    def right(self, degrees: float) -> float:
        self.angle_degrees = (self.angle_degrees - degrees) % 360.0
        return self.angle_degrees

def test_body_syntonic_math():
    print("   [...] Testing Body-Syntonic Coordinate Geometry Model...")
    vt = VirtualTurtleState()

    # Move 100 units East
    vt.forward(100.0)
    assert math.isclose(vt.x, 100.0, abs_tol=1e-3) and math.isclose(vt.y, 0.0, abs_tol=1e-3)
    print(f"   [PASS] 1. Forward 100 units -> Position: ({vt.x}, {vt.y})")

    # Turn 90 degrees Left (North) and move 50 units
    vt.left(90.0)
    vt.forward(50.0)
    assert math.isclose(vt.x, 100.0, abs_tol=1e-3) and math.isclose(vt.y, 50.0, abs_tol=1e-3)
    print(f"   [PASS] 2. Left 90 deg + Forward 50 -> Position: ({vt.x}, {vt.y})")

    # Turn 90 degrees Left (West) and move 100 units
    vt.left(90.0)
    vt.forward(100.0)
    assert math.isclose(vt.x, 0.0, abs_tol=1e-3) and math.isclose(vt.y, 50.0, abs_tol=1e-3)
    print(f"   [PASS] 3. Left 90 deg + Forward 100 -> Position: ({vt.x}, {vt.y})")

def main():
    print("=" * 75)
    print("[TURTLE HISTORY & LOGO PEDAGOGY] Body-Syntonic Mathematical Modeling")
    print("=" * 75)

    test_body_syntonic_math()

    print("=" * 75)
    print("[TAKEAWAY] Seymour Papert's body-syntonic learning connects human spatial")
    print("           intuition directly to trigonometric coordinate vectors.")
    print("=" * 75)

if __name__ == "__main__":
    main()
