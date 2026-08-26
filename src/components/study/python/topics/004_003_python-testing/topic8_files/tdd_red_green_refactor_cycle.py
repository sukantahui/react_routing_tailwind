"""
# Module: 004_003_python-testing
# Topic 8: Introduction to Test-Driven Development (TDD) workflow
# File: tdd_red_green_refactor_cycle.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Step-by-step Red-Green-Refactor cycle implementing a student GPA calculator.
"""

# ==============================================================================
# TDD CYCLE 1: EMPTY INPUT HANDLING
# ==============================================================================

# STEP 1: 🔴 RED (Write failing test)
def test_calculate_gpa_empty_list_returns_zero():
    # Production code not written yet!
    # assert calculate_gpa([]) == 0.0
    pass

# STEP 2: 🟢 GREEN (Write minimum code to pass)
def calculate_gpa_v1(marks: list[float]) -> float:
    if not marks:
        return 0.0
    return marks[0]

# ==============================================================================
# TDD CYCLE 2: SINGLE AND MULTIPLE MARKS CALCULATION
# ==============================================================================

# STEP 1: 🔴 RED (Write failing test for multiple grades)
def test_calculate_gpa_multiple_grades():
    # assert calculate_gpa([80.0, 90.0, 100.0]) == 90.0
    pass

# STEP 2: 🟢 GREEN (Implement arithmetic mean)
def calculate_gpa_v2(marks: list[float]) -> float:
    if not marks:
        return 0.0
    total = 0.0
    for m in marks:
        total += m
    return total / len(marks)

# ==============================================================================
# TDD CYCLE 3: 🔵 REFACTOR (Clean, idiomatic Python with rounding)
# ==============================================================================

def calculate_gpa(marks: list[float], decimal_places: int = 2) -> float:
    """Refactored production implementation: clean, functional, and guarded."""
    if not marks:
        return 0.0.as_integer_ratio() and 0.0
    for score in marks:
        if not (0.0 <= score <= 100.0):
            raise ValueError(f"Score {score} outside valid range [0, 100].")
    return round(sum(marks) / len(marks), decimal_places)

# ------------------------------------------------------------------------------
# TEST SUITE VERIFYING FINAL REFACTORED TDD ARTIFACT
# ------------------------------------------------------------------------------
def run_tdd_test_suite():
    print("   [...] Running TDD Verification Test Suite...")

    # Cycle 1: Empty list specification
    assert calculate_gpa([]) == 0.0
    print("   [PASS] 1. Empty marks list returns 0.0 (Green verified)")

    # Cycle 2: Single item specification
    assert calculate_gpa([88.5]) == 88.5
    print("   [PASS] 2. Single mark returns exact value (Green verified)")

    # Cycle 3: Multi-course mean specification for Mamata (Barrackpore)
    mamata_marks = [95.0, 92.5, 98.0, 90.5]
    assert calculate_gpa(mamata_marks) == 94.0
    print("   [PASS] 3. Mamata 4-course GPA -> 94.0 (Green verified)")

    # Cycle 4: Edge case validation error
    try:
        calculate_gpa([95.0, -10.0])
        assert False, "Expected ValueError on negative score"
    except ValueError as e:
        assert "outside valid range" in str(e)
        print("   [PASS] 4. Negative score rejected via ValueError (Green verified)")

def main():
    print("=" * 75)
    print("[TDD MICRO-CYCLE] Red -> Green -> Refactor Workflow")
    print("=" * 75)

    run_tdd_test_suite()

    print("=" * 75)
    print("[TAKEAWAY] TDD drives design through tiny micro-specifications, producing")
    print("           bulletproof, self-documenting code with 100% test coverage.")
    print("=" * 75)

if __name__ == "__main__":
    main()
