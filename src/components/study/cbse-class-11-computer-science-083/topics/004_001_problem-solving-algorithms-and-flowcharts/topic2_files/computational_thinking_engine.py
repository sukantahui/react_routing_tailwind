"""
Module 004: Problem Solving Methodology & Flowchart Design
Topic 2: The 4 Pillars of Computational Thinking Simulation
Pure Python Demonstration of:
  1. Decomposition (Breaking complex problems into modular sub-problems)
  2. Pattern Recognition (Identifying similarities and recurring sequences)
  3. Abstraction (Filtering out irrelevant details to focus on core essentials)
  4. Algorithm Design (Formulating step-by-step executable recipes)
"""

from typing import Dict, List, Any

class ComputationalThinkingPillarsEngine:
    """Solves a complex problem: Building a Student Report Card & Grade Analytics System."""

    def pillar1_decomposition(self) -> Dict[str, List[str]]:
        """Decomposition: Breaking report card processing into modular sub-tasks."""
        return {
            "monolithic_task": "Generate Class 11 Student Term Report Card",
            "sub_tasks": [
                "Sub-task 1: Collect & Validate Marks (0 to 100 range check)",
                "Sub-task 2: Calculate Aggregate Total & Percentage",
                "Sub-task 3: Determine Letter Grade (A1, A2, B1, B2, C1, C2, D, E)",
                "Sub-task 4: Check Passing Criteria (Minimum 33% in each subject)",
                "Sub-task 5: Format and Print Output Report Card"
            ]
        }

    def pillar2_pattern_recognition(self, marks_history: List[List[float]]) -> Dict[str, Any]:
        """Pattern Recognition: Detecting trends across multiple student score records."""
        total_students = len(marks_history)
        avg_percentages = []

        for marks in marks_history:
            avg_percentages.append(sum(marks) / len(marks))

        class_avg = sum(avg_percentages) / total_students
        distinction_count = sum(1 for p in avg_percentages if p >= 75.0)

        return {
            "total_records_processed": total_students,
            "detected_pattern": f"Consistent passing trend with {distinction_count}/{total_students} scoring distinction (>75%)",
            "class_average_percentage": f"{class_avg:.2f}%"
        }

    def pillar3_abstraction(self, student_raw_profile: Dict[str, Any]) -> Dict[str, Any]:
        """Abstraction: Filtering out non-essential data (hair color, shoe size, favorite game) to retain only core academic attributes."""
        # Unfiltered raw object contains noise
        core_academic_model = {
            "roll_number": student_raw_profile.get("roll_no"),
            "student_name": student_raw_profile.get("name"),
            "marks": student_raw_profile.get("marks"),
            "attendance_pct": student_raw_profile.get("attendance_pct")
        }
        filtered_out_noise = [k for k in student_raw_profile.keys() if k not in core_academic_model]
        return {
            "abstracted_model": core_academic_model,
            "ignored_irrelevant_details": filtered_out_noise
        }

    def pillar4_algorithm_design(self, marks: List[float]) -> Dict[str, Any]:
        """Algorithm Design: Step-by-step recipe to calculate final result."""
        # Step 1: Validate
        if any(m < 0 or m > 100 for m in marks):
            return {"status": "ERROR", "message": "Marks out of range [0, 100]"}

        # Step 2: Aggregate
        total = sum(marks)
        pct = total / len(marks)

        # Step 3: Pass/Fail Evaluation
        has_passed = all(m >= 33.0 for m in marks)

        # Step 4: Grade assignment
        if not has_passed:
            grade = "Essential Repeat (E)"
        elif pct >= 91:
            grade = "A1"
        elif pct >= 81:
            grade = "A2"
        elif pct >= 71:
            grade = "B1"
        elif pct >= 61:
            grade = "B2"
        elif pct >= 51:
            grade = "C1"
        elif pct >= 41:
            grade = "C2"
        else:
            grade = "D"

        return {
            "total_marks": total,
            "percentage": f"{pct:.2f}%",
            "result": "PASSED" if has_passed else "FAILED",
            "assigned_grade": grade
        }

if __name__ == "__main__":
    ct = ComputationalThinkingPillarsEngine()
    print("=" * 65)
    print("THE 4 PILLARS OF COMPUTATIONAL THINKING IN ACTION")
    print("=" * 65)

    print("\n1. DECOMPOSITION:")
    decomp = ct.pillar1_decomposition()
    for st in decomp["sub_tasks"]:
        print("  -", st)

    print("\n2. PATTERN RECOGNITION:")
    pat = ct.pillar2_pattern_recognition([[85, 90, 92], [70, 75, 80], [95, 98, 92], [60, 65, 70]])
    print("  Class Pattern:", pat)

    print("\n3. ABSTRACTION:")
    raw_student = {
        "roll_no": 101, "name": "Rahul Verma", "marks": [92, 88, 95], "attendance_pct": 94.5,
        "favorite_food": "Pizza", "shoe_size": 9, "bus_route_no": 14
    }
    abs_res = ct.pillar3_abstraction(raw_student)
    print("  Abstracted Core Data:", abs_res["abstracted_model"])
    print("  Filtered Irrelevant Noise:", abs_res["ignored_irrelevant_details"])

    print("\n4. ALGORITHM DESIGN:")
    print("  Final Report Card Calculation:", ct.pillar4_algorithm_design([92, 88, 95]))
