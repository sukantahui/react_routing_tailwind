"""
# Module: 004_004_capstone-projects
# Topic 4: Publishing projects to GitHub with Git commits, issues, and releases
# File: github_actions_ci_cd_workflow_generator.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating automated generation of multi-platform GitHub Actions CI workflows.
"""

def generate_github_actions_ci_workflow() -> str:
    """Generates an enterprise-grade GitHub Actions CI workflow YAML manifest."""
    workflow_yaml = """name: CI Test Suite & Quality Gates

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint-and-typecheck:
    name: Lint & Static Type Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code Repository
        uses: actions/checkout@v4

      - name: Set up Python 3.12
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: "pip"

      - name: Install Development Dependencies
        run: pip install -e ".[dev]"

      - name: Run Ruff Linter & Formatter Check
        run: ruff check .

      - name: Run Mypy Static Type Verification
        run: mypy src/

  matrix-testing:
    name: PyTest Matrix (${{ matrix.os }} - Py${{ matrix.python-version }})
    needs: lint-and-typecheck
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        python-version: ["3.10", "3.11", "3.12"]

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}

      - name: Install Project & Test Harness
        run: pip install -e ".[dev]"

      - name: Run Automated PyTest with Branch Coverage
        run: pytest --cov=src --cov-branch --cov-report=term-missing --cov-fail-under=85
"""
    return workflow_yaml

def test_workflow_generator():
    print("   [...] Generating GitHub Actions CI/CD Pipeline Manifest...")
    yaml_content = generate_github_actions_ci_workflow()
    assert "concurrency:" in yaml_content
    assert "matrix:" in yaml_content
    assert "--cov-fail-under=85" in yaml_content
    print("   [PASS] 1. GitHub Actions multi-OS and multi-Python matrix workflow generated")

def main():
    print("=" * 75)
    print("[CI/CD WORKFLOWS] Enterprise Multi-Platform Matrix Testing (.github)")
    print("=" * 75)

    test_workflow_generator()

    print("=" * 75)
    print("[TAKEAWAY] Multi-platform matrix CI pipelines catch OS-specific path and")
    print("           encoding bugs automatically before code is merged into production.")
    print("=" * 75)

if __name__ == "__main__":
    main()
