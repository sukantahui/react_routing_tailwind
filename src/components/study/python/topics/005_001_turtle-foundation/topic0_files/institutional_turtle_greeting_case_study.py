"""
# Module: 005_001_turtle-foundation
# Topic 0: Introduction to Turtle Graphics: history, educational purpose, and real-world relevance
# File: institutional_turtle_greeting_case_study.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Institutional welcome graphics project rendering a visual canvas
#              with coordinate navigation for Mamata, Mahima, and Susmita.
"""

from dataclasses import dataclass
import math

@dataclass
class StudentCoordinateWaypoint:
    name: str
    campus: str
    target_x: float
    target_y: float
    color_hex: str

class InstitutionalTurtleNavigator:
    """Simulates graphical turtle waypoint navigation for multi-campus student welcoming."""
    def __init__(self):
        self.current_x = 0.0
        self.current_y = 0.0
        self.waypoints_visited: list[str] = []

    def navigate_to_student(self, student: StudentCoordinateWaypoint) -> float:
        # Calculate Euclidean displacement distance
        dx = student.target_x - self.current_x
        dy = student.target_y - self.current_y
        distance = math.sqrt(dx**2 + dy**2)

        # Update position
        self.current_x = student.target_x
        self.current_y = student.target_y
        self.waypoints_visited.append(student.name)
        return round(distance, 2)

def test_institutional_navigator():
    print("   [...] Running Institutional Turtle Coordinate Navigation Suite...")
    navigator = InstitutionalTurtleNavigator()

    # 1. Navigate to Mamata at Barrackpore (100, 100)
    d1 = navigator.navigate_to_student(StudentCoordinateWaypoint("Mamata", "Barrackpore", 100.0, 100.0, "#2dd4bf"))
    assert math.isclose(d1, 141.42, rel_tol=1e-2)
    print(f"   [PASS] 1. Traveled {d1} units to greet Mamata at Barrackpore ({navigator.current_x}, {navigator.current_y})")

    # 2. Navigate to Mahima at Kolkata (200, 100)
    d2 = navigator.navigate_to_student(StudentCoordinateWaypoint("Mahima", "Kolkata", 200.0, 100.0, "#38bdf8"))
    assert d2 == 100.0
    print(f"   [PASS] 2. Traveled {d2} units to greet Mahima at Kolkata ({navigator.current_x}, {navigator.current_y})")

    # 3. Navigate to Susmita at Ichapur (200, 250)
    d3 = navigator.navigate_to_student(StudentCoordinateWaypoint("Susmita", "Ichapur", 200.0, 250.0, "#a855f7"))
    assert d3 == 150.0
    print(f"   [PASS] 3. Traveled {d3} units to greet Susmita at Ichapur ({navigator.current_x}, {navigator.current_y})")

def main():
    print("=" * 80)
    print("[CASE STUDY] Complete Institutional Turtle Waypoint Navigation Engine")
    print("=" * 80)

    test_institutional_navigator()

    print("=" * 80)
    print("[TAKEAWAY] Turtle coordinate navigation combines Cartesian trigonometry")
    print("           with vector paths for interactive visual applications.")
    print("=" * 80)

if __name__ == "__main__":
    main()
