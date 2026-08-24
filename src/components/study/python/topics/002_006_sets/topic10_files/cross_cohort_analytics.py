# ====================================================================
# Topic 10: Union, Intersection, Difference Deep Dive
# File: cross_cohort_analytics.py
# Description: Real-World Student Batch Analytics & Tuition Revenue in Barrackpore (₹)
# ====================================================================

# Enrolled student rosters
python_batch = {"Susmita", "Debangshu", "Mamata", "Abhronila"}
react_batch  = {"Mamata", "Abhronila", "Rohan", "Pooja"}

python_fee = 4500
react_fee  = 3500

# 1. Total distinct students across both courses (Union)
total_students = python_batch | react_batch
print(f"Total Unique Students Enrolled (Union): {len(total_students)}")

# 2. Dual course students receiving a ₹1,000 combo discount (Intersection)
combo_students = python_batch & react_batch
print(f"Dual-Enrolled Students (Intersection): {combo_students}")

# 3. Students exclusively in Python (Difference)
only_python_students = python_batch - react_batch
print(f"Exclusive Python Students (Difference): {only_python_students}")

# 4. Students exclusively in React (Difference)
only_react_students = react_batch - python_batch
print(f"Exclusive React Students (Difference): {only_react_students}")

# Financial Revenue Calculations in Indian Rupees (₹)
revenue_only_python = len(only_python_students) * python_fee
revenue_only_react  = len(only_react_students) * react_fee
revenue_combo       = len(combo_students) * (python_fee + react_fee - 1000)  # ₹1000 combo discount

total_revenue = revenue_only_python + revenue_only_react + revenue_combo

print("\n--- Financial Ledger Summary (Barrackpore & Kolkata) ---")
print(f"Revenue from Python Only ({len(only_python_students)} students): ₹{revenue_only_python:,}")
print(f"Revenue from React Only  ({len(only_react_students)} students): ₹{revenue_only_react:,}")
print(f"Revenue from Combo Batch ({len(combo_students)} students): ₹{revenue_combo:,}")
print(f"Total Consolidated Batch Revenue: ₹{total_revenue:,}")
