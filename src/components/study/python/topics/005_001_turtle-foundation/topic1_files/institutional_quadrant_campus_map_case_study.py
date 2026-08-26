"""
# Module: 005_001_turtle-foundation
# Topic 1: Understanding the Turtle screen: canvas, coordinate system (Cartesian plane), origin (0,0), and quadrants
# File: institutional_quadrant_campus_map_case_study.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Multi-campus quadrant map project placing student waypoints
#              for Mamata, Mahima, Abhronila, and Susmita across 4 quadrants.
"""

from dataclasses import dataclass

@dataclass
class CampusStudentLocation:
    student_name: str
    campus_name: str
    target_x: float
    target_y: float

    @property
    def quadrant_name(self) -> str:
        if self.target_x > 0 and self.target_y > 0:
            return "Quadrant I (North-East / Top-Right)"
        elif self.target_x < 0 and self.target_y > 0:
            return "Quadrant II (North-West / Top-Left)"
        elif self.target_x < 0 and self.target_y < 0:
            return "Quadrant III (South-West / Bottom-Left)"
        elif self.target_x > 0 and self.target_y < 0:
            return "Quadrant IV (South-East / Bottom-Right)"
        return "Center Origin (0, 0)"

class InstitutionalCampusQuadrantRegistry:
    """Manages student campus assignments across Cartesian quadrants."""
    def __init__(self):
        self.students: list[CampusStudentLocation] = []

    def register(self, student: CampusStudentLocation):
        self.students.append(student)

    def generate_quadrant_summary(self) -> list[str]:
        return [
            f"[QUADRANT MAP] {s.student_name} -> {s.campus_name} at ({s.target_x}, {s.target_y}) -> {s.quadrant_name}"
            for s in self.students
        ]

def test_quadrant_map():
    print("   [...] Running Institutional Campus Quadrant Registry Test...")
    registry = InstitutionalCampusQuadrantRegistry()

    # 1. Mamata in Barrackpore (Q1: +X, +Y)
    registry.register(CampusStudentLocation("Mamata", "Barrackpore Campus", 150.0, 100.0))
    # 2. Abhronila in Ichapur (Q2: -X, +Y)
    registry.register(CampusStudentLocation("Abhronila", "Ichapur Learning Center", -150.0, 100.0))
    # 3. Susmita in Jadavpur (Q3: -X, -Y)
    registry.register(CampusStudentLocation("Susmita", "Jadavpur Tech Lab", -150.0, -100.0))
    # 4. Mahima in Kolkata (Q4: +X, -Y)
    registry.register(CampusStudentLocation("Mahima", "Kolkata City Headquarters", 150.0, -100.0))

    summary = registry.generate_quadrant_summary()
    assert len(summary) == 4
    for line in summary:
        print(f"   [PASS] {line}")

    assert "Quadrant I" in summary[0]
    assert "Quadrant II" in summary[1]
    assert "Quadrant III" in summary[2]
    assert "Quadrant IV" in summary[3]

def main():
    print("=" * 80)
    print("[CASE STUDY] Multi-Campus Student Quadrant Mapping Architecture")
    print("=" * 80)

    test_quadrant_map()

    print("=" * 80)
    print("[TAKEAWAY] Mapping real-world institutions onto Cartesian quadrants")
    print("           clarifies coordinate sign conventions for learners.")
    print("=" * 80)

if __name__ == "__main__":
    main()
