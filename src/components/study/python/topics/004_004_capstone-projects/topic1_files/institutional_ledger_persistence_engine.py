"""
# Module: 004_004_capstone-projects
# Topic 1: Integrating SQLite / JSON persistence, OOP models, and business logic
# File: institutional_ledger_persistence_engine.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: End-to-end multi-campus fee ledger, student persistence,
#              and atomic settlement engine for Barrackpore, Kolkata, and Ichapur.
"""

from dataclasses import dataclass
from typing import Optional
import sqlite3

# ------------------------------------------------------------------------------
# 1. DOMAIN MODELS
# ------------------------------------------------------------------------------
@dataclass
class Campus:
    campus_id: str
    name: str
    city: str

@dataclass
class StudentProfile:
    sid: str
    name: str
    campus_id: str
    total_fee: float

@dataclass
class LedgerSummary:
    sid: str
    name: str
    campus_name: str
    total_charges: float
    total_payments: float
    outstanding_balance: float

# ------------------------------------------------------------------------------
# 2. PERSISTENCE LAYER
# ------------------------------------------------------------------------------
class InstitutionalLedgerRepository:
    def __init__(self, conn: sqlite3.Connection):
        self.conn = conn
        self.conn.execute("PRAGMA foreign_keys = ON;")
        self._init_tables()

    def _init_tables(self):
        with self.conn:
            self.conn.execute("""
                CREATE TABLE IF NOT EXISTS campuses (
                    campus_id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    city TEXT NOT NULL
                );
            """)
            self.conn.execute("""
                CREATE TABLE IF NOT EXISTS students (
                    sid TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    campus_id TEXT NOT NULL,
                    total_fee REAL NOT NULL,
                    FOREIGN KEY (campus_id) REFERENCES campuses(campus_id)
                );
            """)
            self.conn.execute("""
                CREATE TABLE IF NOT EXISTS ledger (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    sid TEXT NOT NULL,
                    entry_type TEXT NOT NULL CHECK(entry_type IN ('CHARGE', 'PAYMENT')),
                    amount REAL NOT NULL CHECK(amount > 0),
                    description TEXT NOT NULL,
                    FOREIGN KEY (sid) REFERENCES students(sid)
                );
            """)

    def add_campus(self, campus: Campus):
        with self.conn:
            self.conn.execute("INSERT OR REPLACE INTO campuses VALUES (?, ?, ?);",
                             (campus.campus_id, campus.name, campus.city))

    def enroll_student(self, student: StudentProfile):
        with self.conn:
            self.conn.execute("INSERT INTO students VALUES (?, ?, ?, ?);",
                             (student.sid, student.name, student.campus_id, student.total_fee))
            # Initial tuition charge
            self.conn.execute("INSERT INTO ledger (sid, entry_type, amount, description) VALUES (?, 'CHARGE', ?, 'Initial Course Tuition');",
                             (student.sid, student.total_fee))

    def record_payment(self, sid: str, amount: float, description: str):
        with self.conn:
            self.conn.execute("INSERT INTO ledger (sid, entry_type, amount, description) VALUES (?, 'PAYMENT', ?, ?);",
                             (sid, amount, description))

    def get_ledger_summary(self, sid: str) -> Optional[LedgerSummary]:
        cursor = self.conn.cursor()
        cursor.execute("""
            SELECT s.sid, s.name, c.name,
                   COALESCE(SUM(CASE WHEN l.entry_type = 'CHARGE' THEN l.amount ELSE 0 END), 0) AS charges,
                   COALESCE(SUM(CASE WHEN l.entry_type = 'PAYMENT' THEN l.amount ELSE 0 END), 0) AS payments
            FROM students s
            JOIN campuses c ON s.campus_id = c.campus_id
            LEFT JOIN ledger l ON s.sid = l.sid
            WHERE s.sid = ?
            GROUP BY s.sid;
        """, (sid,))
        row = cursor.fetchone()
        if not row:
            return None
        sid, name, campus_name, charges, payments = row
        return LedgerSummary(
            sid=sid,
            name=name,
            campus_name=campus_name,
            total_charges=charges,
            total_payments=payments,
            outstanding_balance=charges - payments
        )

# ------------------------------------------------------------------------------
# VERIFICATION SUITE
# ------------------------------------------------------------------------------
def test_institutional_ledger_engine():
    print("   [...] Running Institutional Ledger Persistence Suite...")
    conn = sqlite3.connect(":memory:")
    repo = InstitutionalLedgerRepository(conn)

    # 1. Seed Campuses
    repo.add_campus(Campus("BP", "Barrackpore Campus", "Barrackpore"))
    repo.add_campus(Campus("CC", "Kolkata Hub", "Kolkata"))
    print("   [PASS] 1. Campuses seeded (Barrackpore, Kolkata)")

    # 2. Enroll Mamata at Barrackpore
    repo.enroll_student(StudentProfile("STU_BP_01", "Mamata", "BP", 25000.0))
    s_initial = repo.get_ledger_summary("STU_BP_01")
    assert s_initial.outstanding_balance == 25000.0
    print("   [PASS] 2. Mamata enrolled: Initial Balance = Rs. 25,000")

    # 3. Record Installment Payment 1: Rs. 15,000
    repo.record_payment("STU_BP_01", 15000.0, "Installment 1 - UPI")
    s_p1 = repo.get_ledger_summary("STU_BP_01")
    assert s_p1.outstanding_balance == 10000.0
    assert s_p1.total_payments == 15000.0
    print("   [PASS] 3. Payment 1 recorded: Outstanding Balance = Rs. 10,000")

    # 4. Record Installment Payment 2: Rs. 10,000 (Full Settlement)
    repo.record_payment("STU_BP_01", 10000.0, "Installment 2 - NetBanking")
    s_final = repo.get_ledger_summary("STU_BP_01")
    assert s_final.outstanding_balance == 0.0
    assert s_final.total_payments == 25000.0
    print("   [PASS] 4. Payment 2 recorded: Full Account Settlement (Balance: Rs. 0.00)")

def main():
    print("=" * 80)
    print("[CASE STUDY] Complete Institutional Multi-Campus Ledger Engine")
    print("=" * 80)

    test_institutional_ledger_engine()

    print("=" * 80)
    print("[TAKEAWAY] Combining SQLite referential constraints, atomic transactions,")
    print("           and repository abstractions ensures 100% data integrity in production.")
    print("=" * 80)

if __name__ == "__main__":
    main()
