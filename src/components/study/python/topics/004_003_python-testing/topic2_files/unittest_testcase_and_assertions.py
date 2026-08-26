"""
# Module: 004_003_python-testing
# Topic 2: Built-in unittest framework: TestCase, assertions, setUp and tearDown
# File: unittest_testcase_and_assertions.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating unittest.TestCase assertion methods:
#              assertEqual, assertAlmostEqual, assertIn, assertRaises, and assertDictEqual.
"""

import unittest

def calculate_gpa(marks: list[float]) -> float:
    if not marks:
        raise ValueError("Marks list cannot be empty.")
    return sum(marks) / len(marks)

def get_student_dossier(sid: str, name: str, campus: str) -> dict:
    return {
        "sid": sid,
        "name": name,
        "campus": campus,
        "status": "ENROLLED"
    }

class TestStudentAssertions(unittest.TestCase):
    """Test suite demonstrating standard unittest assertion methods."""

    def test_calculate_gpa_valid(self):
        # assertAlmostEqual handles floating-point rounding precision safely
        result = calculate_gpa([85.5, 92.3, 78.4])
        self.assertAlmostEqual(result, 85.4, places=1)
        print("   [PASS] test_calculate_gpa_valid (Precision verified)")

    def test_calculate_gpa_empty_raises(self):
        # with self.assertRaises verifies exception contract
        with self.assertRaises(ValueError) as ctx:
            calculate_gpa([])
        self.assertIn("cannot be empty", str(ctx.exception))
        print("   [PASS] test_calculate_gpa_empty_raises (ValueError captured)")

    def test_student_dossier_contract(self):
        # assertDictEqual checks all keys and values with rich diffs
        actual = get_student_dossier("STU_BP_01", "Mamata", "Barrackpore")
        expected = {
            "sid": "STU_BP_01",
            "name": "Mamata",
            "campus": "Barrackpore",
            "status": "ENROLLED"
        }
        self.assertDictEqual(actual, expected)
        self.assertIn(actual["campus"], ["Barrackpore", "Kolkata", "Ichapur", "Jadavpur"])
        print("   [PASS] test_student_dossier_contract (Dict equality verified)")

def main():
    print("=" * 75)
    print("[UNITTEST SUITE] Standard TestCase & Assertion Methods")
    print("=" * 75)

    suite = unittest.TestLoader().loadTestsFromTestCase(TestStudentAssertions)
    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite)

if __name__ == "__main__":
    main()
