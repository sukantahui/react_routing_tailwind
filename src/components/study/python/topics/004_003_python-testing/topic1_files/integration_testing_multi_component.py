"""
# Module: 004_003_python-testing
# Topic 1: Types of testing: Unit testing, Integration testing, Functional testing
# File: integration_testing_multi_component.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Level 2 of Testing Pyramid - Integration testing across multiple
#              collaborating subsystems using in-memory SQLite (:memory:).
"""

import sqlite3

class StudentDatabase:
    """Database component managing SQLite student tables."""
    def __init__(self, db_uri=":memory:"):
        self.conn = sqlite3.connect(db_uri)
        self._init_schema()

    def _init_schema(self):
        with self.conn:
            self.conn.execute("""
                CREATE TABLE students (
                    sid TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    campus TEXT NOT NULL,
                    fee_balance REAL NOT NULL
                )
            """)

    def insert_student(self, sid: str, name: str, campus: str, fee: float):
        with self.conn:
            self.conn.execute(
                "INSERT INTO students (sid, name, campus, fee_balance) VALUES (?, ?, ?, ?)",
                (sid, name, campus, fee)
            )

    def get_student(self, sid: str):
        cursor = self.conn.cursor()
        cursor.execute("SELECT sid, name, campus, fee_balance FROM students WHERE sid = ?", (sid,))
        row = cursor.fetchone()
        if not row:
            return None
        return {"sid": row[0], "name": row[1], "campus": row[2], "balance": row[3]}

    def update_balance(self, sid: str, new_balance: float):
        with self.conn:
            self.conn.execute("UPDATE students SET fee_balance = ? WHERE sid = ?", (new_balance, sid))

class BillingService:
    """Business logic service interacting with Database component."""
    def __init__(self, db: StudentDatabase):
        self.db = db

    def process_payment(self, sid: str, payment_amount: float) -> float:
        if payment_amount <= 0:
            raise ValueError("Payment amount must be positive.")
        student = self.db.get_student(sid)
        if not student:
            raise KeyError(f"Student {sid} not found.")

        updated_balance = student["balance"] - payment_amount
        self.db.update_balance(sid, updated_balance)
        return updated_balance

# ------------------------------------------------------------------------------
# INTEGRATION TEST SUITE (Verifying Component Collaboration)
# ------------------------------------------------------------------------------
def test_billing_service_db_integration():
    print("   [...] Running BillingService + StudentDatabase Integration Test...")
    
    # 1. Arrange
    db = StudentDatabase(":memory:")
    db.insert_student("STU_BP_101", "Mamata", "Barrackpore", 10000.0)
    service = BillingService(db)

    # 2. Act: Process payment through service
    rem_balance = service.process_payment("STU_BP_101", 3500.0)

    # 3. Assert: Verify Service return value AND actual persisted DB state
    assert rem_balance == 6500.0, f"Expected 6500.0, got {rem_balance}"
    
    persisted_student = db.get_student("STU_BP_101")
    assert persisted_student["balance"] == 6500.0, "Database state was not updated!"
    assert persisted_student["name"] == "Mamata"
    
    print("   [PASS] test_billing_service_db_integration (Payment & DB synchronization verified)")

def test_billing_nonexistent_student_integration():
    db = StudentDatabase(":memory:")
    service = BillingService(db)
    
    try:
        service.process_payment("INVALID_ID", 1000.0)
        assert False, "Expected KeyError"
    except KeyError:
        print("   [PASS] test_billing_nonexistent_student_integration (KeyError contract verified)")

def main():
    print("=" * 75)
    print("[INTEGRATION TESTING] Level 2: Component Collaboration & DB Persistence")
    print("=" * 75)

    test_billing_service_db_integration()
    test_billing_nonexistent_student_integration()

    print("=" * 75)
    print("[TAKEAWAY] Integration tests verify that real components communicate,")
    print("           serialize SQL queries, and synchronize state without errors.")
    print("=" * 75)

if __name__ == "__main__":
    main()
