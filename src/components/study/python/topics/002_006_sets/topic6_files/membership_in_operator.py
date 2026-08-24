# ====================================================================
# Topic 6: Membership Testing Using 'in' and 'not in'
# File: membership_in_operator.py
# Description: Demonstrating O(1) membership testing with 'in' and 'not in'
# ====================================================================

# Master set of certified Python developers in Barrackpore & Kolkata
certified_developers = {
    "Susmita Roy",
    "Debangshu Mukherjee",
    "Mamata Banerjee",
    "Abhronila Das"
}

# 1. Testing positive membership with 'in'
candidate_1 = "Susmita Roy"
if candidate_1 in certified_developers:
    print(f"✓ Verification Passed: '{candidate_1}' is a verified certified developer!")

# 2. Testing non-membership with 'not in'
candidate_2 = "Rohan Sharma"
if candidate_2 not in certified_developers:
    print(f"✗ Access Restricted: '{candidate_2}' is NOT in the certified registry.")

# 3. Numeric & Boolean membership quirks
flags_set = {1, 0, "Active"}
print(f"\nIs True in flags_set? -> {True in flags_set} (Because True == 1)")
print(f"Is False in flags_set? -> {False in flags_set} (Because False == 0)")
print(f"Is 2 in flags_set? -> {2 in flags_set}")

# 4. In-line conditional expressions
status = "Authorized" if "Debangshu Mukherjee" in certified_developers else "Guest"
print(f"\nAuthorization Status for Debangshu: {status}")
