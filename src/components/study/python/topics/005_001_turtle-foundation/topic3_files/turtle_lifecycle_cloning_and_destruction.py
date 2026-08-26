"""
# Module: 005_001_turtle-foundation
# Topic 3: Turtle object creation and lifecycle
# File: turtle_lifecycle_cloning_and_destruction.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating turtle cloning, stamp id tracking, and state reset.
"""

from dataclasses import dataclass

@dataclass
class CloneableTurtle:
    agent_name: str
    x: float
    y: float
    heading: float
    color_hex: str
    stamps: list[int]

    def clone(self, new_name: str) -> "CloneableTurtle":
        """Performs deep state duplication identical to t.clone()."""
        return CloneableTurtle(
            agent_name=new_name,
            x=self.x,
            y=self.y,
            heading=self.heading,
            color_hex=self.color_hex,
            stamps=list(self.stamps)
        )

    def stamp(self, stamp_id: int) -> int:
        self.stamps.append(stamp_id)
        return stamp_id

    def clear_stamp(self, stamp_id: int):
        if stamp_id in self.stamps:
            self.stamps.remove(stamp_id)

def test_turtle_cloning_and_stamping():
    print("   [...] Testing Turtle Clone & Stamp Lifecycle...")
    t1 = CloneableTurtle("Parent Agent", 150.0, 75.0, 45.0, "#2dd4bf", [])
    
    # Stamp canvas
    s_id = t1.stamp(101)
    assert s_id in t1.stamps
    print(f"   [PASS] 1. Parent stamped cursor imprint ID: {s_id}")

    # Clone t1 to create branch t2
    t2 = t1.clone("Branch Agent 1")
    assert t2.x == 150.0 and t2.y == 75.0 and t2.heading == 45.0
    assert t2.color_hex == "#2dd4bf"
    print(f"   [PASS] 2. Successfully cloned agent -> '{t2.agent_name}' with inherited state ({t2.x}, {t2.y})")

    # Mutate clone without affecting parent
    t2.x += 50.0
    assert t1.x == 150.0 and t2.x == 200.0
    print("   [PASS] 3. Verified state isolation between parent and cloned turtle instance")

def main():
    print("=" * 75)
    print("[TURTLE LIFECYCLE] Cloning, Stamping & Independent State Mutation")
    print("=" * 75)

    test_turtle_cloning_and_stamping()

    print("=" * 75)
    print("[TAKEAWAY] t.clone() creates independent child turtles that inherit")
    print("           state, ideal for recursive fractal trees and branch art.")
    print("=" * 75)

if __name__ == "__main__":
    main()
