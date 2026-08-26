"""
# Module: 005_001_turtle-foundation
# Topic 5: Movement fundamentals: forward(), backward(), distance control and precision
# File: relative_vs_absolute_displacement.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Comparing relative step advances with absolute coordinate jumps.
"""

from dataclasses import dataclass

@dataclass
class DisplacementComparator:
    current_x: float = 0.0
    current_y: float = 0.0

    def relative_forward_east(self, distance: float):
        """Relative advance along East vector."""
        self.current_x += distance

    def absolute_goto(self, target_x: float, target_y: float):
        """Absolute repositioning."""
        self.current_x = target_x
        self.current_y = target_y

def test_relative_vs_absolute():
    print("   [...] Testing Relative Motion vs Absolute Positioning...")
    comp = DisplacementComparator()

    # 1. Relative Forward Steps
    comp.relative_forward_east(50.0)
    comp.relative_forward_east(50.0)
    assert comp.current_x == 100.0 and comp.current_y == 0.0
    print(f"   [PASS] 1. Two relative forward(50) steps -> Position: ({comp.current_x}, {comp.current_y})")

    # 2. Absolute Jump
    comp.absolute_goto(-150.0, 200.0)
    assert comp.current_x == -150.0 and comp.current_y == 200.0
    print(f"   [PASS] 2. Absolute goto(-150, 200) -> Position: ({comp.current_x}, {comp.current_y})")

def main():
    print("=" * 75)
    print("[DISPLACEMENT COMPARISON] Relative Vector Steps vs Absolute Coordinates")
    print("=" * 75)

    test_relative_vs_absolute()

    print("=" * 75)
    print("[TAKEAWAY] Use relative forward/backward for algorithmic procedural shapes,")
    print("           and absolute goto() for canvas layout waypoint navigation.")
    print("=" * 75)

if __name__ == "__main__":
    main()
