"""
# Module: 004_004_capstone-projects
# Topic 3: Writing complete documentation (README.md, docstrings, typing hints)
# File: readme_generation_and_badges.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating automated generation of a professional open-source README.md.
"""

def generate_production_readme(project_name: str, author: str) -> str:
    """Generates an enterprise-ready Markdown README with badges, quickstarts, and architecture."""
    readme_content = f"""# {project_name}

[![CI Build](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/coder-accotax)
[![Code Coverage](https://img.shields.io/badge/coverage-96%25-brightgreen.svg)](https://github.com/coder-accotax)
[![Python Version](https://img.shields.io/badge/python-3.10%20%7C%203.11%20%7C%203.12-blue.svg)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Enterprise multi-campus student admission, ledger tracking, and fee settlement engine.**

---

## Key Features

- **Relational Integrity**: SQLite backend with strict PRAGMA foreign_keys = ON and indexes.
- **Layered Architecture**: Decoupled domain models, SQLite repositories, and business services.
- **Defensive Observability**: Multi-destination logging with RotatingFileHandler and custom domain exceptions.
- **Modular CLI Hub**: Subcommand-driven administrative terminal powered by argparse.

---

## Quickstart & Installation

```bash
# 1. Clone the repository
git clone https://github.com/coder-accotax/institutional-manager.git
cd institutional-manager

# 2. Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\\Scripts\\activate

# 3. Install in editable development mode with dev dependencies
pip install -e ".[dev]"
```

---

## CLI Usage Examples

```bash
# Enroll a student
campus-cli enroll --sid STU_BP_01 --name "Mamata" --campus "Barrackpore" --fee 25000

# Record an installment payment
campus-cli pay --sid STU_BP_01 --amount 15000 --memo "Installment 1 - NetBanking"

# Generate multi-campus ledger summary report
campus-cli report
```

---

## Running Automated Tests & Coverage

```bash
# Run pytest with branch coverage quality gates
pytest --cov=src --cov-branch --cov-report=term-missing --cov-fail-under=85
```

---

## Author & License

Maintained by **{author}** ([Coder & Accotax](https://www.codernaccotax.co.in)).  
Released under the [MIT License](LICENSE).
"""
    return readme_content

def test_readme_generator():
    print("   [...] Generating Professional README Manifest...")
    doc = generate_production_readme("Institutional Student Manager", "Sukanta Hui")
    assert "Key Features" in doc
    assert "Quickstart & Installation" in doc
    assert "Running Automated Tests" in doc
    print("   [PASS] 1. Production README.md generated with Shields.io badges & quickstarts")

def main():
    print("=" * 75)
    print("[README GENERATION] Standout Open-Source Documentation Standards")
    print("=" * 75)

    test_readme_generator()

    print("=" * 75)
    print("[TAKEAWAY] A clean, badge-decorated README with quickstart copy-paste")
    print("           commands establishes immediate project credibility for recruiters.")
    print("=" * 75)

if __name__ == "__main__":
    main()
