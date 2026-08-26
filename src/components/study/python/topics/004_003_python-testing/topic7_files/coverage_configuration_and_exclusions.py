"""
# Module: 004_003_python-testing
# Topic 7: Measuring Code Coverage with coverage.py / pytest-cov
# File: coverage_configuration_and_exclusions.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating .coveragerc / pyproject.toml configuration and # pragma: no cover.
"""

# Example Production Class with Pragmas and Untestable Boilerplate
class CampusLocation:
    def __init__(self, name: str, code: str, max_capacity: int):
        self.name = name
        self.code = code
        self.max_capacity = max_capacity

    def get_regional_tax_rate(self) -> float:
        """Tested business logic."""
        if self.code.upper() in ("BP", "IC", "CC"):
            return 0.18  # 18% GST West Bengal
        return 0.12

    def __repr__(self) -> str:  # pragma: no cover
        # Excluded from coverage calculations via pragma
        return f"<CampusLocation: {self.name} ({self.code})>"

    def emergency_failover_dump(self):  # pragma: no cover
        # Diagnostic debug code never triggered in unit tests
        import sys
        print(f"Dumping state to {sys.stderr}")

# ------------------------------------------------------------------------------
# TESTS
# ------------------------------------------------------------------------------
def test_campus_tax_rate():
    print("   [...] Testing business logic for regional tax rates...")
    
    bp = CampusLocation("Barrackpore", "BP", 100)
    assert bp.get_regional_tax_rate() == 0.18
    
    other = CampusLocation("Outstation", "OTHER", 50)
    assert other.get_regional_tax_rate() == 0.12
    
    print("   [PASS] test_campus_tax_rate (100% covered, __repr__ cleanly excluded)")

def print_coverage_toml_sample():
    print("\n   [CONFIG] Recommended pyproject.toml Coverage Table:")
    toml_content = """
[tool.coverage.run]
branch = true
source = ["src"]
omit = ["*/migrations/*", "*/tests/*"]

[tool.coverage.report]
fail_under = 85.0
show_missing = true
exclude_lines = [
    "pragma: no cover",
    "def __repr__",
    "raise NotImplementedError",
    "if __name__ == .__main__.:",
    "if TYPE_CHECKING:"
]
    """
    print(toml_content.strip())

def main():
    print("=" * 75)
    print("[COVERAGE CONFIG] Exclusion Pragmas & pyproject.toml Standards")
    print("=" * 75)

    test_campus_tax_rate()
    print_coverage_toml_sample()

    print("=" * 75)
    print("[TAKEAWAY] Using exclusion pragmas and pyproject.toml coverage tables")
    print("           keeps reports clean and focuses auditing on real business logic.")
    print("=" * 75)

if __name__ == "__main__":
    main()
