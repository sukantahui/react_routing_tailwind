# topic7_files/popular_ecosystem_packages_demo.py
# Module: 002_009_modules-packages
# Topic: Third-party packages and pip package manager
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 3: The Python Third-Party Ecosystem Across Core Domains
Demonstrates:
  1. Overview of essential community packages (requests, pandas, pydantic, pytest)
  2. Graceful ImportError handling when optional packages are not installed
  3. Selecting the right third-party tool for production workflows
"""

def explain_ecosystem_domains():
    print("=" * 65)
    print("1. ESSENTIAL THIRD-PARTY ECOSYSTEM PACKAGES BY DOMAIN")
    print("=" * 65)

    domains = [
        ("HTTP & APIs", "requests, httpx, fastapi", "Making REST API requests & building microservices"),
        ("Data & Analytics", "numpy, pandas, polars", "Matrix calculations, DataFrames & statistical analysis"),
        ("Data Validation", "pydantic, marshmallow", "Strict runtime data parsing, schemas, and typing"),
        ("Testing & QA", "pytest, coverage, flake8", "Unit testing frameworks, code coverage, and linting"),
        ("Terminal UX", "rich, colorama, typer", "Beautiful terminal styling, progress bars, & CLI menus"),
        ("Database ORMs", "sqlalchemy, psycopg, pymongo", "Relational SQL querying and document databases"),
    ]

    for category, packages, purpose in domains:
        print(f"Domain   : {category}")
        print(f"Packages : {packages}")
        print(f"Purpose  : {purpose}\n")


def demonstrate_safe_import_fallback():
    print("=" * 65)
    print("2. GRACEFUL OPTIONAL PACKAGE IMPORT PATTERN")
    print("=" * 65)

    # Standard industry pattern for optional dependencies:
    try:
        import requests
        print(f"  [SUCCESS] 'requests' is installed (Version {requests.__version__})")
    except ImportError:
        print("  [FALLBACK] 'requests' is not installed in current environment.")
        print("             Using standard library urllib.request as fallback.")


if __name__ == "__main__":
    explain_ecosystem_domains()
    demonstrate_safe_import_fallback()
