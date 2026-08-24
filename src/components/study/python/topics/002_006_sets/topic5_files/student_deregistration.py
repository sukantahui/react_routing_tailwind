# ====================================================================
# Topic 5: Removing Elements (remove, discard, pop, clear)
# File: student_deregistration.py
# Description: Real-World Student Batch Cleanup & Fee Refund in Barrackpore
# ====================================================================

# Active enrolled students in Barrackpore Python Pro batch
enrolled_roster = {"STU-101", "STU-102", "STU-103", "STU-104", "STU-105"}
course_fee = 4500

print(f"Initial Batch Size: {len(enrolled_roster)} students")
print(f"Initial Total Batch Revenue: ₹{len(enrolled_roster) * course_fee}")

# 1. Voluntary student withdrawal (using .discard() for safety)
withdrawing_student = "STU-103"
if withdrawing_student in enrolled_roster:
    enrolled_roster.discard(withdrawing_student)
    print(f"\nStudent {withdrawing_student} successfully deregistered.")
    print(f"Processed Refund: ₹{course_fee}")

# 2. Defensive deregistration of another student ID that may or may not exist
mystery_id = "STU-999"
enrolled_roster.discard(mystery_id)  # Safe, no crash!
print(f"Deregistration attempted for {mystery_id} (No crash occurred).")

# 3. Final Batch State and Net Revenue in Indian Rupees (₹)
print(f"\nFinal Active Batch Roster: {enrolled_roster}")
print(f"Final Active Count: {len(enrolled_roster)}")
print(f"Final Net Revenue: ₹{len(enrolled_roster) * course_fee}")
