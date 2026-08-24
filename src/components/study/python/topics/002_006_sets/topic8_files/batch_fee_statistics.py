# ====================================================================
# Topic 8: Set Length and Basic Operations
# File: batch_fee_statistics.py
# Description: Real-World Student Batch Revenue Statistics in Barrackpore & Kolkata
# ====================================================================

# Unique enrolled student IDs across Barrackpore and Kolkata
enrolled_students = {
    "STU-BP-101",
    "STU-BP-102",
    "STU-BP-103",
    "STU-CAL-201",
    "STU-CAL-202",
    "STU-CAL-203"
}

fee_per_student = 4500  # Course fee in Indian Rupees (₹)

total_enrolled = len(enrolled_students)
total_batch_revenue = total_enrolled * fee_per_student

print("--- Barrackpore & Kolkata Batch Summary ---")
print(f"Total Unique Students Enrolled: {total_enrolled}")
print(f"Fee per Student: ₹{fee_per_student}")
print(f"Total Consolidated Batch Revenue: ₹{total_batch_revenue:,}")

# Safe clone creation for auditing without risking live data mutation
audit_copy = enrolled_students.copy()
audit_copy.add("TEMP-AUDITOR-TEST")

print(f"\nAudit Set Size: {len(audit_copy)} (Simulated addition)")
print(f"Production Set Size: {len(enrolled_students)} (Safely preserved at 6)")
