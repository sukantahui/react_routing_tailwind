"""
# Module: 004_004_capstone-projects
# Topic 7: Resume and portfolio presentation strategies
# File: resume_ats_parser_and_keyword_optimizer.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating ATS keyword matching, action verb scoring,
#              and Google X-Y-Z formula evaluation.
"""

import re
from dataclasses import dataclass

@dataclass
class ResumeAuditResult:
    keyword_match_score: float
    action_verbs_found: list[str]
    xyz_bullets_count: int
    missing_keywords: list[str]

class ResumeATSOptimizer:
    """Evaluates software engineering resume bullet points for ATS compliance and high impact."""
    ACTION_VERBS = {"architected", "engineered", "optimized", "implemented", "reduced", "scaled", "designed", "deployed"}

    def __init__(self, target_keywords: list[str]):
        self.target_keywords = [k.lower() for k in target_keywords]

    def audit_resume_bullets(self, bullet_points: list[str]) -> ResumeAuditResult:
        full_text = " ".join(bullet_points).lower()
        
        # 1. Keyword matching
        found_keywords = [k for k in self.target_keywords if re.search(rf"\b{re.escape(k)}\b", full_text)]
        missing_keywords = [k for k in self.target_keywords if k not in found_keywords]
        match_score = (len(found_keywords) / len(self.target_keywords)) * 100.0 if self.target_keywords else 100.0

        # 2. Action verbs
        found_verbs = [v for v in self.ACTION_VERBS if re.search(rf"\b{v}\b", full_text)]

        # 3. Google X-Y-Z formula check (Checks for percentages or numbers + action verb + outcome)
        xyz_count = 0
        for b in bullet_points:
            has_metric = bool(re.search(r"(\d+%)|(\d+x)|(\d+,\d+)|\b\d+\b", b))
            has_verb = any(v in b.lower() for v in self.ACTION_VERBS)
            if has_metric and has_verb:
                xyz_count += 1

        return ResumeAuditResult(
            keyword_match_score=round(match_score, 1),
            action_verbs_found=found_verbs,
            xyz_bullets_count=xyz_count,
            missing_keywords=missing_keywords
        )

def test_resume_optimizer():
    print("   [...] Testing ATS Resume Keyword & X-Y-Z Formula Optimizer...")
    target_skills = ["Python", "SQLite", "Redis", "pytest", "Docker", "CI/CD", "Asyncio"]
    optimizer = ResumeATSOptimizer(target_skills)

    sample_bullets = [
        "Architected a multi-campus student admission ledger using Python and SQLite WAL mode.",
        "Optimized query response latency by 85% for 5,000 active student records by implementing a Redis Cache-Aside layer.",
        "Engineered automated CI/CD matrix testing pipeline using GitHub Actions, achieving 96% branch coverage with pytest."
    ]

    result = optimizer.audit_resume_bullets(sample_bullets)
    assert result.keyword_match_score > 70.0
    assert result.xyz_bullets_count >= 2
    assert "architected" in result.action_verbs_found
    print(f"   [PASS] 1. ATS Match Score: {result.keyword_match_score}% | X-Y-Z Formatted Bullets: {result.xyz_bullets_count}/3")
    print(f"   [PASS] 2. Action verbs identified: {', '.join(result.action_verbs_found)}")

def main():
    print("=" * 75)
    print("[RESUME OPTIMIZER] ATS Keyword Extraction & Google X-Y-Z Formula")
    print("=" * 75)

    test_resume_optimizer()

    print("=" * 75)
    print("[TAKEAWAY] Quantified Google X-Y-Z bullets and high-density ATS keywords")
    print("           ensure your resume passes automated filters and catches recruiter attention.")
    print("=" * 75)

if __name__ == "__main__":
    main()
