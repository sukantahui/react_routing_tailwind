"""
# Module: 004_003_python-testing
# Topic 2: Built-in unittest framework: TestCase, assertions, setUp and tearDown
# File: unittest_setup_teardown_lifecycle.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating the full test fixture lifecycle:
#              setUpClass / tearDownClass (Class-level) and setUp / tearDown (Test-level).
"""

import unittest
import sqlite3

class TestDatabaseLifecycle(unittest.TestCase):
    """Demonstrates initialization and cleanup hooks in unittest."""

    @classmethod
    def setUpClass(cls):
        """Runs ONCE before all tests in this class: Initialize in-memory SQLite DB."""
        print("\n[HOOK] setUpClass: Establishing in-memory SQLite database connection...")
        cls.conn = sqlite3.connect(":memory:")
        cls.conn.execute("""
            CREATE TABLE student_ledger (
                sid TEXT PRIMARY KEY,
                name TEXT,
                campus TEXT,
                balance REAL
            )
        """)

    @classmethod
    def tearDownClass(cls):
        """Runs ONCE after all tests in this class have finished: Close database."""
        print("[HOOK] tearDownClass: Closing in-memory SQLite database connection.\n")
        cls.conn.close()

    def setUp(self):
        """Runs BEFORE EACH individual test method: Insert fresh test fixtures."""
        print("  -> [setUp] Inserting fresh student fixtures...")
        with self.conn:
            self.conn.execute("DELETE FROM student_ledger")
            self.conn.execute("INSERT INTO student_ledger VALUES ('STU_101', 'Mamata', 'Barrackpore', 10000.0)")
            self.conn.execute("INSERT INTO student_ledger VALUES ('STU_102', 'Mahima', 'Kolkata', 8000.0)")

    def tearDown(self):
        """Runs AFTER EACH individual test method: Verify cleanup state."""
        print("  <- [tearDown] Test finished. State cleaned.")

    def test_fetch_student_record(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT name, balance FROM student_ledger WHERE sid = 'STU_101'")
        row = cursor.fetchone()
        self.assertEqual(row[0], "Mamata")
        self.assertEqual(row[1], 10000.0)
        print("     [PASS] test_fetch_student_record")

    def test_update_student_balance(self):
        with self.conn:
            self.conn.execute("UPDATE student_ledger SET balance = balance - 3000.0 WHERE sid = 'STU_101'")

        cursor = self.conn.cursor()
        cursor.execute("SELECT balance FROM student_ledger WHERE sid = 'STU_101'")
        updated_balance = cursor.fetchone()[0]
        self.assertEqual(updated_balance, 7000.0)
        print("     [PASS] test_update_student_balance")

def main():
    print("=" * 75)
    print("[UNITTEST LIFECYCLE] Testing setUpClass, setUp, tearDown, tearDownClass")
    print("=" * 75)

    suite = unittest.TestLoader().loadTestsFromTestCase(TestDatabaseLifecycle)
    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite)

if __name__ == "__main__":
    main()
