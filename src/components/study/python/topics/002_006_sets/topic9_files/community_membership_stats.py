# ====================================================================
# Topic 9: Mathematical Set Operations Overview
# File: community_membership_stats.py
# Description: Real-World Student Community Overlap & Revenue in Barrackpore (₹)
# ====================================================================

# Cohort A: Python Mastery (Course Fee: ₹4,500)
python_cohort = {"Susmita", "Debangshu", "Mamata", "Abhronila"}

# Cohort B: Cloud Architecture (Course Fee: ₹6,500)
cloud_cohort = {"Mamata", "Abhronila", "Debangshu", "Rohan"}

fee_python = 4500
fee_cloud = 6500

# Overlap analysis
dual_enrolled = python_cohort & cloud_cohort
only_python = python_cohort - cloud_cohort
only_cloud = cloud_cohort - python_cohort

print("--- Community Enrollment Breakdown ---")
print(f"Dual Enrolled Students ({len(dual_enrolled)}): {dual_enrolled}")
print(f"Only Python Students  ({len(only_python)}): {only_python}")
print(f"Only Cloud Students   ({len(only_cloud)}): {only_cloud}")

# Revenue calculation in Indian Rupees (₹)
total_revenue = (
    len(only_python) * fee_python +
    len(only_cloud) * fee_cloud +
    len(dual_enrolled) * (fee_python + fee_cloud)
)

print(f"\nTotal Consolidated Revenue in Indian Rupees: ₹{total_revenue:,}")
