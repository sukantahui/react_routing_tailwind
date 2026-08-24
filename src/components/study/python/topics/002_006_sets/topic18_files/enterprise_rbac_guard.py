# ====================================================================
# Topic 18: Real-World Use Cases (Unique Users, Tags, Permissions)
# File: enterprise_rbac_guard.py
# Description: Enterprise Role-Based Access Control (RBAC) Security System
# ====================================================================

# Role-to-Permissions Mapping (Immutable Frozensets)
ROLE_PERMISSIONS = {
    "STUDENT": frozenset({"VIEW_COURSE", "SUBMIT_ASSIGNMENT", "ASK_QUESTION"}),
    "MENTOR": frozenset({"VIEW_COURSE", "SUBMIT_ASSIGNMENT", "GRADE_ASSIGNMENT", "CREATE_LESSON"}),
    "ADMIN": frozenset({
        "VIEW_COURSE", "SUBMIT_ASSIGNMENT", "GRADE_ASSIGNMENT", "CREATE_LESSON",
        "MANAGE_USERS", "REFUND_FEE", "VIEW_FINANCIALS"
    })
}

# User profiles in Kolkata tech center
user_roles_db = {
    "Susmita": ["STUDENT"],
    "Mamata": ["MENTOR"],
    "Debangshu": ["STUDENT", "MENTOR"],
    "Sukanta Hui": ["ADMIN"]
}

def get_effective_permissions(username: str) -> set:
    """Aggregates all permissions across all roles assigned to a user via Set Union."""
    roles = user_roles_db.get(username, [])
    effective_perms = set()
    for role in roles:
        effective_perms |= ROLE_PERMISSIONS.get(role, frozenset())
    return effective_perms

def check_permission(username: str, required_permission: str) -> bool:
    """O(1) permission check."""
    return required_permission in get_effective_permissions(username)


print("--- Enterprise Security Clearance Report ---")
for user in user_roles_db:
    perms = get_effective_permissions(user)
    can_refund = check_permission(user, "REFUND_FEE")
    can_grade = check_permission(user, "GRADE_ASSIGNMENT")
    print(f"User: {user:15} | Roles: {str(user_roles_db[user]):25} | Can Grade? {can_grade!s:5} | Can Refund ₹? {can_refund}")
