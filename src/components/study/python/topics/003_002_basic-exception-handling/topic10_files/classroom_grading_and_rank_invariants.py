# topic10_files/classroom_grading_and_rank_invariants.py
# Module: 003_002_basic-exception-handling
# Topic: Using assertions with assert for internal invariant checks
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 10 - File 4: Institutional Exam Ranking & Invariant Suite (Case Study)
Demonstrates:
  1. Production separation of public `raise` input validation vs internal `assert` invariants
  2. Multi-point invariant verification: Rank Monotonicity, Percentile Limits, Vector Dimension
  3. Generating certified academic grading audit reports
"""

from typing import List, Dict, Any

class StudentExamRecord:
    def __init__(self, student_id: str, name: str, score: float):
        if not isinstance(name, str) or not name.strip():
            raise TypeError("Student name must be a non-empty string")
        if not isinstance(score, (int, float)) or not (0.0 <= score <= 100.0):
            raise ValueError(f"Exam score must be between 0.0 and 100.0, got {score}")

        self.student_id = student_id
        self.name = name
        self.score = float(score)


class InstitutionalRankingEngine:
    """Academic Ranking Engine with Invariant Assertions."""

    def compute_ranked_leaderboard(self, records: List[StudentExamRecord]) -> List[Dict[str, Any]]:
        # 1. Public Input Validation using `raise`
        if not records:
            raise ValueError("Cannot generate ranking leaderboard for an empty student list!")

        # Sort descending by score:
        sorted_records = sorted(records, key=lambda s: s.score, reverse=True)
        total_students = len(sorted_records)

        leaderboard = []
        for rank_idx, student in enumerate(sorted_records, 1):
            # Calculate percentile:
            percentile = ((total_students - rank_idx) / total_students) * 100.0

            # 2. INTERNAL ALGORITHMIC INVARIANTS VIA `assert`:
            assert 0.0 <= percentile <= 100.0, f"Percentile invariant violated: {percentile}%"
            assert rank_idx <= total_students, "Rank index invariant violated!"

            leaderboard.append({
                "rank": rank_idx,
                "student_id": student.student_id,
                "name": student.name,
                "score": student.score,
                "percentile": percentile
            })

        # 3. GLOBAL POSTCONDITION INVARIANT: Rank Monotonicity Check
        # Asserts that Rank N score is ALWAYS >= Rank N+1 score:
        for i in range(len(leaderboard) - 1):
            assert leaderboard[i]["score"] >= leaderboard[i + 1]["score"], (
                f"Rank Monotonicity Invariant Broken! Rank {leaderboard[i]['rank']} "
                f"({leaderboard[i]['score']}) < Rank {leaderboard[i+1]['rank']} ({leaderboard[i+1]['score']})"
            )

        assert len(leaderboard) == total_students, "Dimensionality Invariant: Output size mismatch!"

        return leaderboard


def run_ranking_case_study():
    print("=" * 70)
    print("CODER & ACCOTAX - EXAM RANKING & INVARIANT ENGINE")
    print("=" * 70)

    students = [
        StudentExamRecord("STU-101", "Sourav Mukherjee", 94.5),
        StudentExamRecord("STU-102", "Priyanka Sen", 98.0),
        StudentExamRecord("STU-103", "Rahul Verma", 88.0),
        StudentExamRecord("STU-104", "Debolina Roy", 91.5)
    ]

    engine = InstitutionalRankingEngine()
    leaderboard = engine.compute_ranked_leaderboard(students)

    print("CERTIFIED LEADERBOARD (All Internal Invariants Passed):")
    for row in leaderboard:
        print(f"  Rank #{row['rank']} | {row['name']:<18} ({row['student_id']}) | Score: {row['score']:>5.1f} | Percentile: {row['percentile']:>5.1f}%")

    print("\n[PASSED] Exam Ranking Invariant Suite Completed Successfully.")


if __name__ == "__main__":
    run_ranking_case_study()
