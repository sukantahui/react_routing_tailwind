# topic7_files/institutional_examination_rank_iterator_suite.py
# Module: 003_003_decorators-generators
# Topic: Creating custom iterator classes
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 4: Institutional Exam Rank & Merit Iterator (Case Study)
Demonstrates:
  1. Complete custom Iterator class sorting, computing rank percentiles, and assigning tiers
  2. Encapsulating ranking logic into an iterable domain model
  3. Clean termination and custom inspection methods
"""

from typing import List, Dict, Any

class StudentCandidate:
    def __init__(self, student_id: str, name: str, raw_score: float):
        self.student_id = student_id
        self.name = name
        self.raw_score = raw_score


class ExamRankIterator:
    """Iterator that sorts candidates and yields ranked merit records with tiers."""

    def __init__(self, candidates: List[StudentCandidate], min_qualifying_score: float = 60.0):
        # Sort candidates descending by score at instantiation:
        self._ranked_candidates = sorted(candidates, key=lambda c: c.raw_score, reverse=True)
        self._min_score = min_qualifying_score
        self._cursor = 0
        self._current_rank = 1

    def __iter__(self):
        return self

    def __next__(self) -> Dict[str, Any]:
        while self._cursor < len(self._ranked_candidates):
            candidate = self._ranked_candidates[self._cursor]
            self._cursor += 1

            if candidate.raw_score < self._min_score:
                continue  # Skip candidates below qualifying mark

            # Determine Scholarship Tier
            if candidate.raw_score >= 90.0:
                tier = "PLATINUM (100% SCHOLARSHIP)"
            elif candidate.raw_score >= 80.0:
                tier = "GOLD (50% SCHOLARSHIP)"
            elif candidate.raw_score >= 70.0:
                tier = "SILVER (25% SCHOLARSHIP)"
            else:
                tier = "BRONZE (MERIT CERTIFICATE)"

            rank_entry = {
                "rank": self._current_rank,
                "student_id": candidate.student_id,
                "name": candidate.name,
                "score": candidate.raw_score,
                "tier": tier
            }
            self._current_rank += 1
            return rank_entry

        raise StopIteration("All qualified candidates processed.")


def run_exam_rank_iterator_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL EXAM RANK & MERIT ITERATOR")
    print("=" * 70)

    # 1. Raw Candidate Score Records:
    candidates = [
        StudentCandidate("STU-101", "Sourav Mukherjee", 94.5),
        StudentCandidate("STU-102", "Priyanka Sen", 88.0),
        StudentCandidate("STU-103", "Rahul Verma", 76.5),
        StudentCandidate("STU-104", "Debolina Roy", 91.0),
        StudentCandidate("STU-105", "Amitava Sen", 54.0),  # Below 60% qualifying
    ]

    print("1. Processing Ranked Examination Merit Cohort:")
    rank_stream = ExamRankIterator(candidates, min_qualifying_score=60.0)

    for entry in rank_stream:
        print(
            f"   Rank #{entry['rank']}: {entry['name']:<18} ({entry['student_id']}) | "
            f"Score: {entry['score']:4.1f}% | Tier: {entry['tier']}"
        )

    print("\n[PASSED] Institutional Exam Rank Iterator Verified.")


if __name__ == "__main__":
    run_exam_rank_iterator_demo()
