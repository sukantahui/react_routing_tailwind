# ====================================================================
# Topic 4: Adding Elements (add vs update)
# File: inventory_batch_addition.py
# Description: Real-World Stock Registry & Course Batch Integration in Barrackpore
# ====================================================================

# Existing set of enrolled student roll numbers
enrolled_students = {"ROLL-101", "ROLL-102", "ROLL-103"}
print("Initial Batch Count:", len(enrolled_students))

# Incoming registration stream from Barrackpore, Ichapur, and Kolkata online portals
barrackpore_new = ["ROLL-104", "ROLL-105", "ROLL-101"]  # Note duplicate 101
ichapur_new = ("ROLL-106", "ROLL-107")
kolkata_online = {"ROLL-108", "ROLL-105"}               # Note duplicate 105

# Single-call bulk update from all three sources
enrolled_students.update(barrackpore_new, ichapur_new, kolkata_online)

print(f"\nFinal Consolidated Enrolled Student Set: {enrolled_students}")
print(f"Total Unique Students Enrolled: {len(enrolled_students)}")

# Financial Tuition Fee Calculation in Indian Rupees (₹)
tuition_per_student = 4500
total_batch_revenue = len(enrolled_students) * tuition_per_student
print(f"Total Batch Revenue Collected: ₹{total_batch_revenue}")
