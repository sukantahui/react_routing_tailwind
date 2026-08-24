# topic5_files/institutional_multicampus_roundrobin_scheduler.py
# Module: 003_005_advance-comprehensions
# Topic: zip() and itertools module essentials (count, cycle, repeat, chain)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 4: Institutional Round-Robin Examination Scheduler (Case Study)
Demonstrates:
  1. Production exam scheduling suite leveraging `zip()`, `count()`, `cycle()`, and `chain.from_iterable()`
  2. Round-robin faculty proctor duty allocation
  3. Multi-campus room batch flattening, pagination with `islice()`, and boolean mask filtering with `compress()`
"""

import itertools
from typing import Dict, Any, List, Tuple

class InstitutionalRoundRobinScheduler:
    """Production examination logistics engine powered by itertools."""

    def __init__(self, faculty_pool: List[str], campuses: List[str]):
        self.faculty_pool = faculty_pool
        self.campuses = campuses
        self._roll_counter = itertools.count(start=1001, step=1)
        self._proctor_cycler = itertools.cycle(faculty_pool)

    def allocate_exam_cohort(self, campus_batches: Dict[str, List[Dict[str, Any]]]) -> Dict[str, Any]:
        """Allocates roll numbers, proctors, and flattened timetable."""
        # 1. Flatten all campus student lists into a single continuous stream
        all_campus_students_flat = list(itertools.chain.from_iterable(campus_batches.values()))

        # 2. Assign unique sequential roll numbers via itertools.count()
        # and round-robin faculty proctors via itertools.cycle()
        allocated_roster = []
        for student in all_campus_students_flat:
            allocated_roster.append({
                "roll_no": f"EXAM-{next(self._roll_counter)}",
                "name": student["name"],
                "course": student["course"],
                "campus": student["campus"],
                "assigned_proctor": next(self._proctor_cycler),
                "is_cleared": student.get("is_cleared", False)
            })

        # 3. Filter cleared candidates using itertools.compress()
        cleared_mask = [s["is_cleared"] for s in allocated_roster]
        cleared_roster = list(itertools.compress(allocated_roster, cleared_mask))

        # 4. Generate Paginated Exam Room Allocation (Room Capacity = 2 students per room)
        # Using itertools.islice() for batch chunks:
        room_allocations = []
        it = iter(cleared_roster)
        room_num = 1
        while True:
            room_batch = list(itertools.islice(it, 2))
            if not room_batch:
                break
            room_allocations.append({
                "room_name": f"HALL-{room_num:02d}",
                "students": [s["name"] for s in room_batch],
                "proctor": room_batch[0]["assigned_proctor"]
            })
            room_num += 1

        return {
            "total_registered_students": len(all_campus_students_flat),
            "total_cleared_students": len(cleared_roster),
            "total_rooms_allocated": len(room_allocations),
            "cleared_roster": cleared_roster,
            "room_chart": room_allocations
        }


def demonstrate_scheduler_engine():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL ROUND-ROBIN SCHEDULER SUITE")
    print("=" * 70)

    faculty = ["Sukanta Hui", "Prabhat Sen", "Ananya Mukherjee"]
    campuses = ["Barrackpore Main", "Kolkata Hub"]

    cohort_data = {
        "Barrackpore": [
            {"name": "Sourav Mukherjee", "course": "PY-AI", "campus": "Barrackpore", "is_cleared": True},
            {"name": "Debolina Roy", "course": "PY-AI", "campus": "Barrackpore", "is_cleared": True},
            {"name": "Amit Das", "course": "PY-AI", "campus": "Barrackpore", "is_cleared": False} # Not cleared
        ],
        "Kolkata": [
            {"name": "Priyanka Sen", "course": "DS-ML", "campus": "Kolkata", "is_cleared": True},
            {"name": "Sneha Gupta", "course": "DS-ML", "campus": "Kolkata", "is_cleared": True},
            {"name": "Rahul Verma", "course": "WEB-DEV", "campus": "Kolkata", "is_cleared": True}
        ]
    }

    scheduler = InstitutionalRoundRobinScheduler(faculty, campuses)
    schedule = scheduler.allocate_exam_cohort(cohort_data)

    print("1. Examination Logistics Audit Summary:")
    print(f"   * Total Registered Candidates : {schedule['total_registered_students']}")
    print(f"   * Total Cleared Candidates    : {schedule['total_cleared_students']}")
    print(f"   * Total Exam Rooms Allocated  : {schedule['total_rooms_allocated']}\n")

    print("2. Cleared Candidate Proctor & Roll Allocation (`count` + `cycle`):")
    for s in schedule["cleared_roster"]:
        print(f"   * [{s['roll_no']}] {s['name']:<18} | {s['campus']:<12} | Proctor: {s['assigned_proctor']}")

    print("\n3. Paginated Exam Room Allocation Chart (`islice` chunks):")
    for r in schedule["room_chart"]:
        print(f"   * [{r['room_name']}] -> Students: {r['students']} | Duty Proctor: {r['proctor']}")

    print("\n[PASSED] Institutional Round-Robin Scheduler Suite Verified.")


if __name__ == "__main__":
    demonstrate_scheduler_engine()
