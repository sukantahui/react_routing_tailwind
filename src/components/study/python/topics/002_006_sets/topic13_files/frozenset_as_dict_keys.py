# ====================================================================
# Topic 13: Frozen Sets (Immutable Sets)
# File: frozenset_as_dict_keys.py
# Description: Using frozenset as Dictionary Keys for multi-tag mapping
# ====================================================================

# Mapping bundled course combinations to discounted tuition fees in Indian Rupees (₹)
course_fee_packages = {
    frozenset(["Python", "FastAPI"]): 7500,
    frozenset(["Python", "React", "PostgreSQL"]): 11000,
    frozenset(["Python", "Machine Learning", "Data Science"]): 14500,
}

print("--- Course Combination Package Registry ---")
for package, package_fee in course_fee_packages.items():
    package_names = ", ".join(sorted(package))
    print(f"Bundle: [{package_names:40}] -> Fee: ₹{package_fee:,}")

# Lookups work regardless of the order items were provided!
user_cart = frozenset(["PostgreSQL", "React", "Python"])  # Different order!
matching_fee = course_fee_packages.get(user_cart)

print(f"\nUser Cart Combo Looked Up: {user_cart}")
print(f"Calculated Package Tuition Fee: ₹{matching_fee:,}")
