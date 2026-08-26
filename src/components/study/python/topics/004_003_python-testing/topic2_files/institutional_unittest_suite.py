"""
# Module: 004_003_python-testing
# Topic 2: Built-in unittest framework: TestCase, assertions, setUp and tearDown
# File: institutional_unittest_suite.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: End-to-end multi-campus student management test suite using
#              unittest.TestCase with fixtures, assertions, and reporting.
"""

import unittest

class StudentProfile:
    def __init__(self, sid: str, name: str, campus: str, initial_fee: float):
        if initial_fee < 0:
            raise ValueError("Fee cannot be negative.")
        self.sid = sid
        self.name = name
        self.campus = campus
        self.fee_balance = float(initial_fee)
        self.enrolled_courses = []

    def enroll(self, course_name: str, course_fee: float):
        self.enrolled_courses.append(course_name)
        self.fee_balance += course_fee

    def pay_tuition(self, amount: float):
        if amount <= 0:
            raise ValueError("Payment must be positive.")
        if amount > self.fee_balance:
            raise ValueError("Payment cannot exceed total due balance.")
        self.fee_balance -= amount
        return self.fee_balance

class TestInstitutionalStudentManagement(unittest.TestCase):
    """Production test suite for StudentProfile domain model."""

    def setUp(self):
        """Prepare fresh student fixture before each test method."""
        self.student = StudentProfile("STU_BP_01", "Mamata", "Barrackpore", 5000.0)

    def test_initial_state_fixture(self):
        self.assertEqual(self.student.sid, "STU_BP_01")
        self.assertEqual(self.student.name, "Mamata")
        self.assertEqual(self.student.campus, "Barrackpore")
        self.assertEqual(self.student.fee_balance, 5000.0)
        self.assertListEqual(self.student.enrolled_courses, [])
        print("   [PASS] test_initial_state_fixture")

    def test_course_enrollment_updates_balance(self):
        self.student.enroll("Python Pro", 15000.0)
        self.assertIn("Python Pro", self.student.enrolled_courses)
        self.assertEqual(self.student.fee_balance, 20000.0)
        print("   [PASS] test_course_enrollment_updates_balance")

    def test_tuition_payment_lifecycle(self):
        self.student.enroll("Data Science", 10000.0) # Balance = 15,000
        rem = self.student.pay_tuition(6000.0)
        self.assertEqual(rem, 9000.0)
        self.assertEqual(self.student.fee_balance, 9000.0)
        print("   [PASS] test_tuition_payment_lifecycle")

    def test_overpayment_raises_value_error(self):
        with self.assertRaises(ValueError) as ctx:
            self.student.pay_tuition(10000.0) # Balance is only 5000
        self.assertIn("cannot exceed total due balance", str(ctx.exception))
        print("   [PASS] test_overpayment_raises_value_error")

    def test_negative_fee_initialization_fails(self):
        with self.assertRaises(ValueError):
            StudentProfile("STU_ERR", "Invalid", "Kolkata", -1000.0)
        print("   [PASS] test_negative_fee_initialization_fails")

def main():
    print("=" * 80)
    print("[CASE STUDY] Institutional Student Management TestCase Suite")
    print("=" * 80)

    suite = unittest.TestLoader().loadTestsFromTestCase(TestInstitutionalStudentManagement)
    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite)

if __name__ == "__main__":
    main()
