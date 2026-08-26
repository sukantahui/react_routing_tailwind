"""
# Module: 004_004_capstone-projects
# Topic 7: Resume and portfolio presentation strategies
# File: institutional_career_portfolio_audit_suite.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: End-to-end career portfolio audit engine evaluating student portfolios
#              and mock interview scores for Mamata, Mahima, and Susmita.
"""

from dataclasses import dataclass

@dataclass
class CandidatePortfolio:
    candidate_name: str
    campus_location: str
    github_url: str
    capstone_coverage_pct: float
    ats_score: float
    star_story_rating: int  # 1 to 10

    @property
    def is_hire_ready(self) -> bool:
        return (
            self.capstone_coverage_pct >= 85.0 and
            self.ats_score >= 80.0 and
            self.star_story_rating >= 8
        )

class InstitutionalCareerPortal:
    """Evaluates student portfolios and generates hiring readiness certificates."""
    def __init__(self):
        self.candidates: list[CandidatePortfolio] = []

    def enroll_candidate(self, candidate: CandidatePortfolio):
        self.candidates.append(candidate)

    def generate_batch_audit_report(self) -> list[str]:
        results = []
        for c in self.candidates:
            status = "HIRE-READY (PRO LEVEL) [APPROVED]" if c.is_hire_ready else "NEEDS REFINEMENT [PENDING]"
            results.append(
                f"[{status}] Candidate: {c.candidate_name} ({c.campus_location}) | "
                f"Coverage: {c.capstone_coverage_pct}% | ATS: {c.ats_score}% | STAR: {c.star_story_rating}/10"
            )
        return results

def test_career_audit():
    print("   [...] Running Institutional Career & Portfolio Audit...")
    portal = InstitutionalCareerPortal()

    # Enroll Mamata, Mahima, and Susmita
    portal.enroll_candidate(CandidatePortfolio("Mamata", "Barrackpore", "https://github.com/mamata/student-manager", 96.0, 92.5, 9))
    portal.enroll_candidate(CandidatePortfolio("Mahima", "Kolkata", "https://github.com/mahima/ledger-engine", 94.0, 88.0, 8))
    portal.enroll_candidate(CandidatePortfolio("Susmita", "Ichapur", "https://github.com/susmita/capstone-portal", 91.5, 85.0, 8))

    reports = portal.generate_batch_audit_report()
    assert len(reports) == 3
    for r in reports:
        assert "HIRE-READY" in r
        print(f"   [PASS] {r}")

def main():
    print("=" * 80)
    print("[CASE STUDY] Institutional Student Portfolio Audit & Hiring Readiness")
    print("=" * 80)

    test_career_audit()

    print("=" * 80)
    print("[TAKEAWAY] Combining deep technical mastery, 85%+ test coverage, and")
    print("           STAR interview storytelling transforms learners into senior hires.")
    print("=" * 80)

if __name__ == "__main__":
    main()
