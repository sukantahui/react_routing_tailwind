"""
# Module: 004_004_capstone-projects
# Topic 3: Writing complete documentation (README.md, docstrings, typing hints)
# File: pep257_docstrings_and_sphinx_formatting.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating PEP 257 Google-Style docstrings and executable doctests.
"""

import doctest

def calculate_merit_scholarship(base_fee: float, academic_score: float, is_ews: bool = False) -> float:
    """Calculates final discounted tuition fee after applying institutional scholarship rules.

    Applies a 20% merit discount for scores >= 90.0% and an additional 10%
    Economically Weaker Section (EWS) grant, capped at a maximum 30% reduction.

    Args:
        base_fee (float): The total unadjusted course tuition in INR (must be > 0).
        academic_score (float): Academic admission test score between 0.0 and 100.0.
        is_ews (bool, optional): Whether the candidate qualifies for EWS aid. Defaults to False.

    Returns:
        float: Net tuition amount payable after applying verified deductions.

    Raises:
        ValueError: If base_fee is non-positive or academic_score is outside [0.0, 100.0].

    Examples:
        >>> calculate_merit_scholarship(20000.0, 95.0, is_ews=False)
        16000.0
        >>> calculate_merit_scholarship(20000.0, 92.0, is_ews=True)
        14000.0
        >>> calculate_merit_scholarship(10000.0, 75.0, is_ews=False)
        10000.0
    """
    if base_fee <= 0:
        raise ValueError("Base tuition fee must be strictly positive.")
    if not (0.0 <= academic_score <= 100.0):
        raise ValueError(f"Score {academic_score} is outside the valid range [0.0, 100.0].")

    merit_rate = 0.20 if academic_score >= 90.0 else (0.10 if academic_score >= 80.0 else 0.0)
    ews_rate = 0.10 if is_ews else 0.0
    
    total_rate = min(0.30, merit_rate + ews_rate)
    return round(base_fee * (1.0 - total_rate), 2)

def run_doctest_verification():
    print("   [...] Executing Embedded Docstring Doctests...")
    results = doctest.testmod(verbose=False)
    assert results.failed == 0, f"Doctests failed: {results.failed} errors"
    print(f"   [PASS] 1. All {results.attempted} embedded docstring doctests executed & passed!")

def main():
    print("=" * 75)
    print("[PEP 257 DOCSTRINGS] Google-Style Formatting & Executable Doctests")
    print("=" * 75)

    run_doctest_verification()

    print("=" * 75)
    print("[TAKEAWAY] Writing executable doctests in PEP 257 docstrings guarantees")
    print("           that documentation examples never go out of sync with code behavior.")
    print("=" * 75)

if __name__ == "__main__":
    main()
