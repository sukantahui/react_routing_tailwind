"""
# Module: 004_003_python-testing
# Topic 3: Modern testing with PyTest: test discovery, assert statements, fixtures
# File: pytest_fixtures_and_dependency_injection.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating @pytest.fixture dependency injection, yield teardown,
#              and modular fixture composition.
"""

import sqlite3

# ------------------------------------------------------------------------------
# SIMULATED PYTEST FIXTURES (Yield Setup & Teardown Architecture)
# ------------------------------------------------------------------------------
def mock_db_connection_fixture():
    """Simulates @pytest.fixture(scope='module') with yield teardown."""
    print("\n   [FIXTURE SETUP] Opening in-memory SQLite database...")
    conn = sqlite3.connect(":memory:")
    conn.execute("CREATE TABLE student_records (sid TEXT PRIMARY KEY, name TEXT, balance REAL)")
    
    # In PyTest: yield passes the initialized object to the test
    yield conn
    
    # In PyTest: Code after yield executes as teardown
    print("   [FIXTURE TEARDOWN] Closing in-memory SQLite database connection.\n")
    conn.close()

def mock_fresh_student_fixture(db_conn):
    """Simulates @pytest.fixture requesting another fixture (Composition)."""
    with db_conn:
        db_conn.execute("INSERT INTO student_records VALUES ('STU_BP_01', 'Mamata', 12000.0)")
    return {"sid": "STU_BP_01", "name": "Mamata", "balance": 12000.0}

# ------------------------------------------------------------------------------
# TESTS CONSUMING FIXTURES VIA DEPENDENCY INJECTION
# ------------------------------------------------------------------------------
def test_student_initial_fixture_balance(db_conn, fresh_student):
    """Test receives db_conn and fresh_student automatically injected."""
    cursor = db_conn.cursor()
    cursor.execute("SELECT name, balance FROM student_records WHERE sid = ?", (fresh_student["sid"],))
    row = cursor.fetchone()
    
    assert row[0] == "Mamata"
    assert row[1] == 12000.0
    print("   [PASS] test_student_initial_fixture_balance (Fixture injection verified)")

def test_student_payment_mutation(db_conn, fresh_student):
    with db_conn:
        db_conn.execute("UPDATE student_records SET balance = balance - 4000.0 WHERE sid = ?", (fresh_student["sid"],))
        
    cursor = db_conn.cursor()
    cursor.execute("SELECT balance FROM student_records WHERE sid = ?", (fresh_student["sid"],))
    new_bal = cursor.fetchone()[0]
    
    assert new_bal == 8000.0
    print("   [PASS] test_student_payment_mutation (Payment verified)")

def main():
    print("=" * 75)
    print("[PYTEST FIXTURES] Dependency Injection & Yield Teardown")
    print("=" * 75)

    # Simulate PyTest Fixture Runner Lifecycle
    fixture_gen = mock_db_connection_fixture()
    db_conn = next(fixture_gen) # Run setup phase

    try:
        student = mock_fresh_student_fixture(db_conn)
        test_student_initial_fixture_balance(db_conn, student)
        test_student_payment_mutation(db_conn, student)
    finally:
        # Run teardown phase
        try:
            next(fixture_gen)
        except StopIteration:
            pass

    print("=" * 75)
    print("[TAKEAWAY] @pytest.fixture provides modular dependency injection, yield-based")
    print("           teardown, and composable fixtures that request other fixtures.")
    print("=" * 75)

if __name__ == "__main__":
    main()
