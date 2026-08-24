# ====================================================================
# Module: 002_007_string-processing
# Topic 1: String immutability & memory representation
# File: immutable_audit_log_system.py
# Description: Real-world immutable transaction ledger & audit trail for student fees in Rupees (₹)
# ====================================================================

import hashlib
import time

class ImmutableAuditLog:
    """
    Demonstrates leveraging string immutability to build tamper-evident
    audit logs for student tuition payments at Coder & AccoTax Barrackpore.
    """
    def __init__(self):
        # A tuple of immutable log string entries
        self._ledger = ()

    def add_transaction(self, student_name: str, course: str, fee_in_rupees: int):
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        # Build immutable entry string
        entry = f"[{timestamp}] Student: {student_name} | Course: {course} | Paid: ₹{fee_in_rupees:,d}"
        
        # Calculate cryptographic hash of the string
        entry_hash = hashlib.sha256(entry.encode('utf-8')).hexdigest()[:16]
        signed_entry = f"{entry} | HASH: {entry_hash}"
        
        # Rebind immutable tuple with new string
        self._ledger = self._ledger + (signed_entry,)

    def display_ledger(self):
        print("=== IMMUTABLE STUDENT FEE AUDIT LEDGER (BARRACKPORE CENTER) ===")
        for record in self._ledger:
            print(record)
        print("Total Records:", len(self._ledger))


# Simulation for Kolkata & Barrackpore Students
ledger = ImmutableAuditLog()
ledger.add_transaction("Susmita Roy", "Python Pro", 4500)
ledger.add_transaction("Debangshu Mukherjee", "FastAPI Mastery", 6000)
ledger.add_transaction("Mamata Sharma", "Fullstack Web", 8500)

ledger.display_ledger()
