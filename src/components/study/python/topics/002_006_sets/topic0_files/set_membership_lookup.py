# ====================================================================
# Topic 0: Introduction to Sets in Python
# File: set_membership_lookup.py
# Description: High-speed O(1) membership testing vs O(N) list search
# ====================================================================

# Authorized server access credentials / roles in an educational portal
authorized_users = {"admin_sukanta", "moderator_deb", "editor_susmita", "teacher_mamata"}

# Checking login attempt
current_login = "student_abhronila"

if current_login in authorized_users:
    print(f"Access Granted! Welcome, {current_login}.")
else:
    print(f"Access Denied: '{current_login}' does not have administrative privileges.")

# High-velocity membership testing across batches
enrolled_courses = {"Python-Pro", "Data-Structures", "Web-Development", "Accounting-Tally"}
inquiry_course = "Python-Pro"

print(f"\nIs '{inquiry_course}' currently active? -> {inquiry_course in enrolled_courses}")
print(f"Is 'Cloud-Computing' currently active? -> {'Cloud-Computing' in enrolled_courses}")
