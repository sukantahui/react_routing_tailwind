"""
# Module: 004_004_capstone-projects
# Topic 1: Integrating SQLite / JSON persistence, OOP models, and business logic
# File: sqlite_schema_migrations_and_ddl.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating SQLite schema DDL, Foreign Keys PRAGMA, indexes, and migrations.
"""

import sqlite3

def create_institutional_database(conn: sqlite3.Connection):
    """Initializes normalized tables with strict referential constraints and indexes."""
    # MANDATORY: Enable Foreign Key constraint checking in SQLite
    conn.execute("PRAGMA foreign_keys = ON;")
    
    with conn:
        # 1. Campuses Table
        conn.execute("""
            CREATE TABLE IF NOT EXISTS campuses (
                campus_id TEXT PRIMARY KEY,
                name TEXT NOT NULL UNIQUE,
                city TEXT NOT NULL,
                regional_grant_pct REAL DEFAULT 0.0
            );
        """)

        # 2. Students Table (with Foreign Key to campuses)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS students (
                sid TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                campus_id TEXT NOT NULL,
                base_fee REAL NOT NULL CHECK(base_fee > 0),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (campus_id) REFERENCES campuses(campus_id) ON DELETE RESTRICT
            );
        """)

        # 3. Ledger Transactions Table (Child records)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS ledger_entries (
                entry_id INTEGER PRIMARY KEY AUTOINCREMENT,
                sid TEXT NOT NULL,
                entry_type TEXT NOT NULL CHECK(entry_type IN ('CHARGE', 'PAYMENT', 'SCHOLARSHIP')),
                amount REAL NOT NULL CHECK(amount > 0),
                description TEXT NOT NULL,
                FOREIGN KEY (sid) REFERENCES students(sid) ON DELETE CASCADE
            );
        """)

        # 4. Indexes for high-speed queries
        conn.execute("CREATE INDEX IF NOT EXISTS idx_student_campus ON students(campus_id);")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_ledger_student ON ledger_entries(sid);")

def seed_campuses(conn: sqlite3.Connection):
    with conn:
        conn.executemany("""
            INSERT OR IGNORE INTO campuses (campus_id, name, city, regional_grant_pct)
            VALUES (?, ?, ?, ?)
        """, [
            ("BP", "Barrackpore Campus", "Barrackpore", 0.15),
            ("CC", "Kolkata City Hub", "Kolkata", 0.05),
            ("IC", "Ichapur Tech Campus", "Ichapur", 0.10),
            ("JU", "Jadavpur Center", "Kolkata", 0.00)
        ])

def test_database_integrity():
    print("   [...] Testing SQLite Schema, Foreign Keys & Integrity...")
    conn = sqlite3.connect(":memory:")
    conn.row_factory = sqlite3.Row
    create_institutional_database(conn)
    seed_campuses(conn)

    # 1. Insert valid student linked to Barrackpore campus
    with conn:
        conn.execute("INSERT INTO students (sid, name, campus_id, base_fee) VALUES (?, ?, ?, ?);",
                     ("STU_BP_01", "Mamata", "BP", 20000.0))
    print("   [PASS] 1. Mamata registered under valid Barrackpore Campus (BP)")

    # 2. Verify Foreign Key violation on invalid campus
    try:
        with conn:
            conn.execute("INSERT INTO students (sid, name, campus_id, base_fee) VALUES (?, ?, ?, ?);",
                         ("STU_XX_99", "Invalid Student", "INVALID_CAMPUS", 10000.0))
        assert False, "Expected IntegrityError on invalid foreign key"
    except sqlite3.IntegrityError:
        print("   [PASS] 2. Referential integrity: Invalid campus foreign key blocked")

    # 3. Add ledger transactions
    with conn:
        conn.execute("INSERT INTO ledger_entries (sid, entry_type, amount, description) VALUES (?, ?, ?, ?);",
                     ("STU_BP_01", "CHARGE", 20000.0, "Admission Tuition Fee"))
        conn.execute("INSERT INTO ledger_entries (sid, entry_type, amount, description) VALUES (?, ?, ?, ?);",
                     ("STU_BP_01", "PAYMENT", 12000.0, "Online NetBanking Settlement"))

    cursor = conn.cursor()
    cursor.execute("""
        SELECT s.name, c.name AS campus_name,
               SUM(CASE WHEN l.entry_type = 'CHARGE' THEN l.amount ELSE 0 END) -
               SUM(CASE WHEN l.entry_type = 'PAYMENT' THEN l.amount ELSE 0 END) AS net_balance
        FROM students s
        JOIN campuses c ON s.campus_id = c.campus_id
        JOIN ledger_entries l ON s.sid = l.sid
        WHERE s.sid = ?
        GROUP BY s.sid;
    """, ("STU_BP_01",))
    
    row = cursor.fetchone()
    assert row["name"] == "Mamata"
    assert row["net_balance"] == 8000.0
    print(f"   [PASS] 3. Relational JOIN Query: {row['name']} at {row['campus_name']} -> Balance: Rs. {row['net_balance']:,.2f}")

def main():
    print("=" * 75)
    print("[SQLITE DDL & PRAGMAS] Strict Foreign Keys, Schemas & Indexes")
    print("=" * 75)

    test_database_integrity()

    print("=" * 75)
    print("[TAKEAWAY] Enabling 'PRAGMA foreign_keys = ON' and indexes guarantees")
    print("           bulletproof referential integrity and ultra-fast query performance.")
    print("=" * 75)

if __name__ == "__main__":
    main()
