# ====================================================================
# Topic 6: Membership Testing Using 'in' and 'not in'
# File: access_guard_real_world.py
# Description: Real-World Authorization Gateway & Course Fee Audit in ₹
# ====================================================================

# Premium enrolled students in Barrackpore Python Pro Track
premium_students = {
    "SUSMITA-901",
    "DEBANGSHU-902",
    "MAMATA-903",
    "ABHRONILA-904"
}

course_fee = 4500

def check_lab_access(student_id: str):
    """Checks whether a student has paid access to the Advanced Lab Cloud."""
    if student_id in premium_students:
        return f"ACCESS GRANTED: Verified enrollment (Fee Paid: ₹{course_fee}). Welcome {student_id}!"
    else:
        return f"ACCESS DENIED: Student ID '{student_id}' not found in active batch roster."


# Testing portal access requests
print(check_lab_access("SUSMITA-901"))
print(check_lab_access("GUEST-110"))
print(check_lab_access("DEBANGSHU-902"))
