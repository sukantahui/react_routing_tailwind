# ====================================================================
# Topic 12: Set Comparison: Subset, Superset, Disjoint Sets
# File: rbac_security_audit.py
# Description: Real-World RBAC Security Access Verification in Kolkata Tech Hub
# ====================================================================

# Required privilege clearance sets
FINANCE_ADMIN_PERMISSIONS = {"VIEW_LEDGER", "APPROVE_INVOICE", "ISSUE_REFUND", "EXPORT_TAX"}
RESTRICTED_BANNED_ACTIONS = {"DELETE_DATABASE", "OVERWRITE_LOGS", "FORCE_SHUTDOWN"}

# User role profiles in Barrackpore & Kolkata accounts department
user_susmita_perms = {"VIEW_LEDGER", "APPROVE_INVOICE", "ISSUE_REFUND", "EXPORT_TAX", "READ_AUDIT"}
user_intern_perms  = {"VIEW_LEDGER", "DELETE_DATABASE"}

def audit_user_access(user_name: str, user_perms: set):
    print(f"\n--- Security Audit for {user_name} ---")

    # 1. Superset check: Does the user possess ALL required admin permissions?
    has_full_admin = user_perms >= FINANCE_ADMIN_PERMISSIONS
    print(f"Has Full Finance Admin Clearance? -> {has_full_admin}")

    # 2. Disjoint check: Does the user possess ZERO restricted/dangerous actions?
    is_safe = user_perms.isdisjoint(RESTRICTED_BANNED_ACTIONS)
    print(f"Zero Restricted Actions (Disjoint Test)? -> {is_safe}")

    if has_full_admin and is_safe:
        return f"STATUS: APPROVED for Financial Operations (Full Clearance in ₹)."
    elif not is_safe:
        return f"STATUS: CRITICAL ALERT: User has unauthorized destructive permissions!"
    else:
        missing = FINANCE_ADMIN_PERMISSIONS - user_perms
        return f"STATUS: INSUFFICIENT PERMISSIONS. Missing: {missing}"


print(audit_user_access("Susmita Roy", user_susmita_perms))
print(audit_user_access("Intern John", user_intern_perms))
