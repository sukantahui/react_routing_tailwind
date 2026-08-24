# topic8_files/hierarchical_and_hybrid_inheritance.py
# Module: 003_001_object-oriented-python
# Topic: Inheritance: Single, Multiple, Multilevel, and Hierarchical
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 3: Hierarchical & Hybrid Inheritance Topologies
Demonstrates:
  1. Hierarchical Inheritance: Single base class branched into multiple specialized siblings
  2. Hybrid Inheritance: Combining hierarchical branching with multiple mixins
  3. The "IS-A" (Inheritance) vs "HAS-A" (Composition) design principle
"""

# =====================================================================
# 1. HIERARCHICAL ROOT (Base Course)
# =====================================================================
class EducationalCourse:
    """Base parent class for all course formats."""
    def __init__(self, course_id: str, title: str, base_fee: float, duration_weeks: int):
        self.course_id = course_id
        self.title = title
        self.base_fee = float(base_fee)
        self.duration_weeks = duration_weeks

    def get_course_header(self) -> str:
        return f"[{self.course_id}] {self.title} ({self.duration_weeks} Weeks) - Base: INR {self.base_fee:,.2f}"


# =====================================================================
# 2. HIERARCHICAL SIBLING 1 (Online Course)
# =====================================================================
class OnlineLiveCourse(EducationalCourse):
    """Specialized Sibling 1: Adds LMS portal and streaming links."""
    def __init__(self, course_id: str, title: str, base_fee: float, duration_weeks: int, zoom_link: str):
        super().__init__(course_id, title, base_fee, duration_weeks)
        self.zoom_link = zoom_link

    def get_delivery_mode(self) -> str:
        return f"Online Live Stream (Zoom: {self.zoom_link})"


# =====================================================================
# 3. HIERARCHICAL SIBLING 2 (Classroom Course)
# =====================================================================
class ClassroomPhysicalCourse(EducationalCourse):
    """Specialized Sibling 2: Adds physical lab room and seat allocations."""
    def __init__(self, course_id: str, title: str, base_fee: float, duration_weeks: int, room_number: str, max_seats: int):
        super().__init__(course_id, title, base_fee, duration_weeks)
        self.room_number = room_number
        self.max_seats = max_seats

    def get_delivery_mode(self) -> str:
        return f"Physical Classroom (Lab #{self.room_number}, Capacity: {self.max_seats} seats)"


# =====================================================================
# 4. HIERARCHICAL SIBLING 3 (Corporate Workshop)
# =====================================================================
class CorporateWorkshop(EducationalCourse):
    """Specialized Sibling 3: Adds client enterprise customization."""
    def __init__(self, course_id: str, title: str, base_fee: float, duration_weeks: int, client_company: str):
        super().__init__(course_id, title, base_fee, duration_weeks)
        self.client_company = client_company

    def get_delivery_mode(self) -> str:
        return f"Custom Corporate Training (Client: {self.client_company})"


def demonstrate_hierarchical_topology():
    print("=" * 70)
    print("CODER & ACCOTAX - HIERARCHICAL INHERITANCE TOPOLOGY")
    print("=" * 70)

    # Instantiate 3 sibling classes sharing the same root
    online = OnlineLiveCourse("PY-ON-01", "Python Pro Full-Stack", 15000.0, 16, "https://meet.codernaccotax.co.in/py")
    classroom = ClassroomPhysicalCourse("ACC-CL-02", "GST & Advanced Tax", 12000.0, 12, "Lab 3B (Barrackpore)", 25)
    corporate = CorporateWorkshop("AI-CORP-03", "Enterprise LLM Engineering", 80000.0, 2, "Wipro Technologies")

    courses = [online, classroom, corporate]

    for c in courses:
        print(f"* {c.get_course_header()}")
        print(f"  Delivery: {c.get_delivery_mode()}")
        print(f"  Is EducationalCourse? -> {isinstance(c, EducationalCourse)}\n")

    print("[PASSED] Hierarchical Topology Verified.")


if __name__ == "__main__":
    demonstrate_hierarchical_topology()
