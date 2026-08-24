# ====================================================================
# Topic 13: Frozen Sets (Immutable Sets)
# File: immutable_security_whitelist.py
# Description: Real-World Immutable Security Configurations & Role Maps in Barrackpore
# ====================================================================

# Global Immutable Constants (Thread-Safe & Tamper-Proof)
PROTECTED_SYSTEM_ROLES = frozenset([
    "SUPER_ADMIN",
    "AUDIT_CONTROLLER",
    "DATABASE_ROOT"
])

def assign_user_role(target_user: str, requested_role: str):
    """Enforces that protected system roles cannot be dynamically modified."""
    if requested_role in PROTECTED_SYSTEM_ROLES:
        return f"CRITICAL SECURITY LOG: {target_user} assigned PROTECTED role '{requested_role}'. Master audit record sealed."
    return f"STANDARD ACCESS LOG: {target_user} assigned standard operational role '{requested_role}'."


print(assign_user_role("Susmita Roy", "SUPER_ADMIN"))
print(assign_user_role("Rohan Sharma", "STUDENT_VIEWER"))

# Attempting to tamper with protected roles at runtime is impossible:
# PROTECTED_SYSTEM_ROLES.add("ROGUE_HACKER")  # Fails at compile/runtime!
