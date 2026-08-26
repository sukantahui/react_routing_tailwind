"""
# Module: 004_004_capstone-projects
# Topic 0: End-to-End project architecture & clean directory layout
# File: src_layout_vs_flat_layout.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating the architectural advantages of the src/ layout vs flat layout.
"""

def get_recommended_project_tree() -> str:
    """Returns the gold-standard enterprise Python project directory tree in clean ASCII."""
    tree = """
institutional_capstone/
|-- .env.example                  <- Template for environment secrets
|-- .gitignore                    <- Git exclusion list (.venv, __pycache__, .coverage)
|-- pyproject.toml                <- Modern build & tool manifest (PEP 621)
|-- README.md                     <- Comprehensive project documentation
|-- LICENSE                       <- MIT / Apache 2.0 open-source license
|-- src/                          <- SOURCE ROOT (Prevents import parity bugs!)
|   +-- institutional_manager/    <- Core Python Package
|       |-- __init__.py           <- Package version & public API (__all__)
|       |-- __main__.py           <- Enables: python -m institutional_manager
|       |-- config.py             <- Strongly-typed AppConfig dataclass
|       |-- models/               <- Domain Entities & Enums
|       |   |-- __init__.py
|       |   |-- student.py        <- StudentProfile domain class
|       |   +-- campus.py         <- CampusLocation enum
|       |-- repositories/         <- Database persistence & I/O
|       |   |-- __init__.py
|       |   +-- student_repo.py   <- SQLite / JSON student persistence
|       |-- services/             <- Pure business logic & calculation
|       |   |-- __init__.py
|       |   +-- admission_svc.py  <- Fee waiver & enrollment calculations
|       +-- cli/                  <- Terminal user interface
|           |-- __init__.py
|           +-- main.py           <- Click / Argparse CLI commands
+-- tests/                        <- TEST ROOT
    |-- conftest.py               <- Shared PyTest fixtures & mocks
    |-- unit/                     <- Fast, isolated unit tests
    |   |-- test_models.py
    |   +-- test_services.py
    +-- integration/              <- End-to-end database & CLI tests
        +-- test_sqlite_persistence.py
"""
    return tree

def explain_src_layout_benefits():
    print("=" * 75)
    print("[ARCHITECTURAL PATTERN] Why the 'src/' Layout Dominates Flat Layouts")
    print("=" * 75)
    print(get_recommended_project_tree())
    print("-" * 75)
    print("KEY BENEFITS OF THE 'src/' LAYOUT:")
    print("  1. Import Parity: Prevents pytest from testing uninstalled local code.")
    print("  2. Packaging Cleanliness: Guarantees only files inside src/ are packaged in wheels.")
    print("  3. Forced Editable Mode: Enforces clean 'pip install -e .' workflow.")
    print("  4. Eliminates Root Clutter: Keeps test runners and linters isolated from source code.")
    print("=" * 75)

def main():
    explain_src_layout_benefits()

if __name__ == "__main__":
    main()
