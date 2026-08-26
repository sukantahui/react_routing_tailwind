"""
# Module: 004_004_capstone-projects
# Topic 4: Publishing projects to GitHub with Git commits, issues, and releases
# File: issue_and_pr_templates_scaffolding.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating GitHub Issue Templates and PR review checklists.
"""

def generate_pull_request_template() -> str:
    """Generates standardized Pull Request review checklist manifest."""
    return """## 📌 Description of Changes

Please provide a brief summary of the changes made and the business requirement satisfied.

Fixes #(issue_number)

---

## 🛠️ Type of Change

- [ ] 🐛 Bug fix (non-breaking change fixing an existing defect)
- [ ] ✨ New feature (non-breaking addition to functionality)
- [ ] 💥 Breaking change (fix or feature modifying existing API contract)
- [ ] 📝 Documentation update only
- [ ] 🧪 Test suite enhancement / coverage improvement

---

## ✅ Quality Assurance Checklist

- [ ] My code follows the repository's PEP 8 and clean architecture style guidelines.
- [ ] I have added docstrings (Google format) and PEP 484 type annotations to new public functions.
- [ ] I have written automated unit/integration tests with 100% pass rate.
- [ ] Branch coverage meets or exceeds the required threshold (--cov-fail-under=85).
- [ ] Mypy static type verification passes with zero errors (`mypy --strict`).
- [ ] All new and existing automated tests pass locally.
"""

def generate_bug_report_template() -> str:
    """Generates standardized Bug Report markdown template."""
    return """---
name: 🐛 Bug Report
about: Create a report to help us improve and fix defects
title: "[BUG]: "
labels: ["bug", "triage"]
assignees: ""
---

### 📝 Problem Description
A clear and concise description of what the bug is.

### 🔄 Steps to Reproduce
1. Run command '...'
2. Pass argument '...'
3. See error traceback: '...'

### 🎯 Expected Behavior
A clear description of what should have occurred.

### 💻 Environment Details
- **OS**: [e.g. Windows 11, Ubuntu 24.04]
- **Python Version**: [e.g. 3.12.2]
- **Package Version**: [e.g. v1.0.0]
"""

def test_templates():
    print("   [...] Generating GitHub Issue & PR Templates...")
    pr_template = generate_pull_request_template()
    bug_template = generate_bug_report_template()
    assert "Quality Assurance Checklist" in pr_template
    assert "Steps to Reproduce" in bug_template
    print("   [PASS] 1. PR Checklist & Bug Report templates generated cleanly")

def main():
    print("=" * 75)
    print("[COMMUNITY TEMPLATES] Structured GitHub PR & Issue Scaffolding")
    print("=" * 75)

    test_templates()

    print("=" * 75)
    print("[TAKEAWAY] Structured PR checklists and issue templates prevent vague bug")
    print("           reports and maintain high code quality across team contributions.")
    print("=" * 75)

if __name__ == "__main__":
    main()
