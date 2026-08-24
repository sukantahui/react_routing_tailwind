# topic1_files/institutional_multicampus_scheduler_comprehension_suite.py
# Module: 003_005_advance-comprehensions
# Topic: Nested and Multi-variable Comprehensions with filtering
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 4: Multi-Campus Examination Scheduler & Clash Matrix Suite (Case Study)
Demonstrates:
  1. Multi-clause nested comprehensions for institutional exam timetable generation
  2. Cartesian product pairing to detect cross-course student exam slot collisions
  3. Generating transposed time-slot and room allocation matrices
"""

from typing import Dict, Any, List, Tuple

def run_scheduler_comprehension_suite():
    print("=" * 70)
    print("CODER & ACCOTAX - MULTI-CAMPUS EXAMINATION SCHEDULER SUITE")
    print("=" * 70)

    campuses = ["Barrackpore Main", "Kolkata Hub"]
    exam_slots = ["SLOT-09:00", "SLOT-12:00", "SLOT-15:00"]
    courses = [
        {"code": "PY-AI", "title": "Python Full-Stack & AI", "students": ["STU-101", "STU-103", "STU-105"]},
        {"code": "DS-ML", "title": "Data Science & ML", "students": ["STU-102", "STU-105"]},  # STU-105 is double enrolled!
        {"code": "WEB-DEV", "title": "Web Development", "students": ["STU-104"]}
    ]

    # 1. Generate All Permissible Campus-Slot-Course Combinations:
    # 3-Way Nested Comprehension:
    exam_schedule_grid: List[Dict[str, str]] = [
        {"campus": camp, "slot": slot, "course": c["code"]}
        for camp in campuses
        for slot in exam_slots
        for c in courses
        if not (camp == "Kolkata Hub" and slot == "SLOT-15:00" and c["code"] == "WEB-DEV") # Filter guard
    ]

    print(f"1. Generated Timetable Grid ({len(exam_schedule_grid)} allocated slots across 2 campuses):")
    for s in exam_schedule_grid[:6]:
        print(f"   * [{s['campus']:<16}] {s['slot']} -> Course: {s['course']}")

    # 2. Cross-Course Student Clash Detection via Cartesian Product Comprehension:
    # Rule: Find any pair of distinct courses (c1 != c2) that share overlapping students
    course_clashes: List[Dict[str, Any]] = [
        {
            "course_a": c1["code"],
            "course_b": c2["code"],
            "clashing_students": list(set(c1["students"]) & set(c2["students"]))
        }
        for i, c1 in enumerate(courses)
        for j, c2 in enumerate(courses)
        if i < j and (set(c1["students"]) & set(c2["students"]))  # Filter distinct pairs with overlap
    ]

    print("\n2. Automated Examination Clash Detection Matrix:")
    if course_clashes:
        for clash in course_clashes:
            print(f"   * [SCHEDULE CLASH DETECTED] {clash['course_a']} <-> {clash['course_b']}: Students {clash['clashing_students']}")
            print("     -> Rule: These two courses MUST NOT be scheduled in the same time slot!")
    else:
        print("   * Zero course clashes detected.")

    # 3. Transposing Course-Student Enrolment Matrix:
    # Build {student_id -> list of enrolled courses} using nested dict & list comprehension:
    all_student_ids = sorted(list({sid for c in courses for sid in c["students"]}))
    student_course_map: Dict[str, List[str]] = {
        sid: [c["code"] for c in courses if sid in c["students"]]
        for sid in all_student_ids
    }

    print("\n3. Inverted Student Enrolment Matrix (Multi-Variable Lookup):")
    for sid, crs_list in student_course_map.items():
        print(f"   * [{sid}] -> Enrolled Courses: {crs_list} {'(DOUBLE ENROLLED!)' if len(crs_list) > 1 else ''}")

    print("\n[PASSED] Multi-Campus Examination Scheduler Suite Verified.")


if __name__ == "__main__":
    run_scheduler_comprehension_suite()
