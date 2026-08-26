"""
# Module: 005_001_turtle-foundation
# Topic 5: Movement fundamentals: forward(), backward(), distance control and precision
# File: linear_motion_and_step_precision.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating forward/backward linear motion, aliases,
#              and sub-pixel float step precision.
"""

from dataclasses import dataclass
import math

@dataclass
class LinearMotionSimulator:
    x: float = 0.0
    y: float = 0.0
    heading_deg: float = 0.0

    def forward(self, distance: float) -> tuple[float, float]:
        rad = math.radians(self.heading_deg)
        self.x = round(self.x + distance * math.cos(rad), 4)
        self.y = round(self.y + distance * math.sin(rad), 4)
        return (self.x, self.y)

    def backward(self, distance: float) -> tuple[float, float]:
        # Backward is mathematically equivalent to forward(-distance)
        return self.forward(-distance)

    def fd(self, distance: float) -> tuple[float, float]:
        return self.forward(distance)

    def bk(self, distance: float) -> tuple[float, float]:
        return self.backward(distance)

def test_linear_motion():
    print("   [...] Testing Forward/Backward Precision & Aliases...")
    sim = LinearMotionSimulator(heading_deg=0.0) # Facing East

    # 1. Forward 120.5 units
    sim.forward(120.5)
    assert sim.x == 120.5 and sim.y == 0.0
    print(f"   [PASS] 1. forward(120.5) -> Position: ({sim.x}, {sim.y})")

    # 2. Backward 20.5 units (leaves heading unchanged)
    sim.backward(20.5)
    assert sim.x == 100.0 and sim.y == 0.0
    assert sim.heading_deg == 0.0
    print(f"   [PASS] 2. backward(20.5) -> Position: ({sim.x}, {sim.y}) (Heading preserved at {sim.heading_deg} deg)")

    # 3. Test fd() and bk() aliases
    sim.fd(50.0)
    assert sim.x == 150.0
    sim.bk(50.0)
    assert sim.x == 100.0
    print(f"   [PASS] 3. Aliases fd() and bk() verified with float precision")

def main():
    print("=" * 75)
    print("[LINEAR MOTION] forward() & backward() Step Precision & Aliases")
    print("=" * 75)

    test_linear_motion()

    print("=" * 75)
    print("[TAKEAWAY] forward() and backward() compute continuous vector displacements")
    print("           while preserving heading orientation during reverse motion.")
    print("=" * 75)

if __name__ == "__main__":
    main()
