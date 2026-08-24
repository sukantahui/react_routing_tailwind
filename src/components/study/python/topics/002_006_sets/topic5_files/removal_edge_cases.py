# ====================================================================
# Topic 5: Removing Elements (remove, discard, pop, clear)
# File: removal_edge_cases.py
# Description: Removing multiple elements via -= and difference_update()
# ====================================================================

# Master set of server permission privileges
user_permissions = {
    "READ_REPORTS",
    "WRITE_DATA",
    "DELETE_USERS",
    "EXPORT_FINANCIALS",
    "MANAGE_KEYS"
}

print("Original User Permissions:", user_permissions)

# 1. Removing multiple specific items with difference_update() / -=
revoked_permissions = ["DELETE_USERS", "MANAGE_KEYS", "NON_EXISTENT_PERMISSION"]

# difference_update() removes all specified items without raising KeyError for missing ones
user_permissions.difference_update(revoked_permissions)
print("\nAfter difference_update(revoked_permissions):", user_permissions)

# 2. In-place set subtraction with -= operator (requires set operand)
user_permissions -= {"EXPORT_FINANCIALS"}
print("After user_permissions -= {'EXPORT_FINANCIALS'}:", user_permissions)
