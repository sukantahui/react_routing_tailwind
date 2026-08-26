"""
# Module: 004_004_capstone-projects
# Topic 7: Resume and portfolio presentation strategies
# File: portfolio_project_curation_and_readme_evaluator.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Automated GitHub repository auditor grading README completeness,
#              badges, quickstart guides, and test coverage %.
"""

from dataclasses import dataclass

@dataclass
class PortfolioProjectScore:
    project_name: str
    total_score: int
    has_ci_badge: bool
    has_coverage_badge: bool
    has_quickstart: bool
    has_architecture_diagram: bool
    feedback: list[str]

class GitHubPortfolioEvaluator:
    """Audits and grades open-source repository manifests for technical hiring managers."""

    @classmethod
    def evaluate_readme(cls, project_name: str, readme_text: str, coverage_pct: float) -> PortfolioProjectScore:
        score = 0
        feedback = []

        # 1. CI & Coverage Badges
        has_ci = "shields.io" in readme_text and "build" in readme_text
        has_cov = "coverage" in readme_text or coverage_pct >= 85.0

        if has_ci:
            score += 25
        else:
            feedback.append("Missing CI status badge in README.")

        if has_cov:
            score += 25
        else:
            feedback.append("Test coverage below 85% or missing coverage badge.")

        # 2. Quickstart & Installation
        has_quickstart = "pip install" in readme_text or "Quickstart" in readme_text
        if has_quickstart:
            score += 25
        else:
            feedback.append("Missing copy-paste quickstart installation commands.")

        # 3. Architecture Overview / Diagram
        has_arch = "Features" in readme_text or "Architecture" in readme_text or "mermaid" in readme_text
        if has_arch:
            score += 25
        else:
            feedback.append("Missing architecture overview or system diagram.")

        return PortfolioProjectScore(
            project_name=project_name,
            total_score=score,
            has_ci_badge=has_ci,
            has_coverage_badge=has_cov,
            has_quickstart=has_quickstart,
            has_architecture_diagram=has_arch,
            feedback=feedback
        )

def test_portfolio_evaluator():
    print("   [...] Testing Portfolio README & Quality Auditor...")
    sample_readme = """
    # Institutional Student Manager
    [![CI Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]
    [![Coverage](https://img.shields.io/badge/coverage-96%25-brightgreen.svg)]
    
    ## Key Features & Architecture
    - SQLite persistence with strict foreign keys
    - Layered decoupled domain architecture
    
    ## Quickstart & Installation
    ```bash
    pip install -e .
    ```
    """

    audit = GitHubPortfolioEvaluator.evaluate_readme("Institutional Manager", sample_readme, 96.0)
    assert audit.total_score == 100
    assert audit.has_ci_badge and audit.has_coverage_badge and audit.has_quickstart
    print(f"   [PASS] 1. Portfolio project audited: Score {audit.total_score}/100 (Full 4-Quadrant Grade)")

def main():
    print("=" * 75)
    print("[PORTFOLIO AUDIT] GitHub README & Engineering Standards Evaluator")
    print("=" * 75)

    test_portfolio_evaluator()

    print("=" * 75)
    print("[TAKEAWAY] Pinned repositories that score 100/100 on documentation, badges,")
    print("           and test coverage immediately signal senior engineering competence.")
    print("=" * 75)

if __name__ == "__main__":
    main()
