"""
# Module: 004_003_python-testing
# Topic 2: Built-in unittest framework: TestCase, assertions, setUp and tearDown
# File: unittest_subtests_and_skipping.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating self.subTest() for parameterized iteration diagnostics
#              and conditional test skipping with @unittest.skipIf.
"""

import sys
import unittest

def calculate_grade_letter(score: float) -> str:
    if score >= 90.0:
        return "A+"
    elif score >= 80.0:
        return "A"
    elif score >= 60.0:
        return "B"
    elif score >= 40.0:
        return "C"
    return "F"

class TestAdvancedUnittestFeatures(unittest.TestCase):
    """Demonstrates subTest parametrization and conditional skipping."""

    def test_grade_boundaries_with_subtests(self):
        """self.subTest isolates each iteration so failures don't stop the loop."""
        cases = [
            ("Mamata Top A+", 95.0, "A+"),
            ("Mahima Exact A+ Boundary", 90.0, "A+"),
            ("Abhronila Exact A Boundary", 80.0, "A"),
            ("Susmita Exact B Boundary", 60.0, "B"),
            ("Debangshu Exact C Boundary", 40.0, "C"),
            ("Failing Score", 35.0, "F"),
        ]

        for desc, score, expected in cases:
            with self.subTest(candidate=desc, score=score):
                actual = calculate_grade_letter(score)
                self.assertEqual(actual, expected)
                print(f"   [SUBTEST PASS] {desc:<32} -> {actual}")

    @unittest.skip("Demonstrating unconditional skipping for deprecated legacy features")
    def test_legacy_offline_paper_enrollment(self):
        self.fail("This test should be skipped and never run!")

    @unittest.skipIf(sys.version_info < (3, 10), "Requires Python 3.10+ pattern matching")
    def test_modern_python_features(self):
        self.assertTrue(True)
        print("   [PASS] test_modern_python_features executed on modern Python runtime")

def main():
    print("=" * 75)
    print("[UNITTEST ADVANCED] self.subTest() & Conditional Skipping")
    print("=" * 75)

    suite = unittest.TestLoader().loadTestsFromTestCase(TestAdvancedUnittestFeatures)
    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite)

if __name__ == "__main__":
    main()
