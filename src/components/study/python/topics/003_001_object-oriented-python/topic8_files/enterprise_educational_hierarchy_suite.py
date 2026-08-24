# topic8_files/enterprise_educational_hierarchy_suite.py
# Module: 003_001_object-oriented-python
# Topic: Inheritance: Single, Multiple, Multilevel, and Hierarchical
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 4: Enterprise Educational User Hierarchy & RBAC (Production Case Study)
Demonstrates:
  1. Complete institutional Role-Based Access Control (RBAC) hierarchy
  2. Hierarchical inheritance: BaseUser -> Student, Faculty, Admin
  3. Multiple inheritance: SuperAdminUser inheriting administrative and security mixins
"""

import datetime as dt
from typing import List, Set

# =====================================================================
# CAPABILITY MIXINS
# =====================================================================
class SecurityAuditingCapability:
    """Security capability granting access to forensic audit trails."""
    def audit_security_event(self, event_description: str):
        print(f"  [SECURITY AUDIT] [{dt.datetime.now().strftime('%H:%M:%S')}] {self.user_id}: {event_description}")


class PaymentGatewayCapability:
    """Financial capability granting access to process fee refunds."""
    def disburse_refund(self, student_id: str, amount: float):
        print(f"  [PAYMENT REFUND] {self.user_id} disbursed INR {amount:,.2f} to {student_id}")


# =====================================================================
# ROOT USER CLASS
# =====================================================================
class BaseSystemUser:
    """Root user entity for Coder & AccoTax Portal."""
    organization = "Coder & AccoTax"

    def __init__(self, user_id: str, display_name: str, email: str):
        self.user_id = user_id
        self.display_name = display_name
        self.email = email
        self.permissions: Set[str] = set()

    def get_user_profile(self) -> str:
        return f"{self.__class__.__name__} [{self.user_id}]: {self.display_name} <{self.email}>"


# =====================================================================
# HIERARCHICAL BRANCH 1: STUDENT
# =====================================================================
class StudentUser(BaseSystemUser):
    def __init__(self, user_id: str, display_name: str, email: str, enrolled_course: str):
        super().__init__(user_id, display_name, email)
        self.enrolled_course = enrolled_course
        self.permissions.update(["VIEW_LESSONS", "SUBMIT_ASSIGNMENTS", "JOIN_DISCORD"])


# =====================================================================
# HIERARCHICAL BRANCH 2: FACULTY
# =====================================================================
class FacultyInstructor(BaseSystemUser):
    def __init__(self, user_id: str, display_name: str, email: str, specialization: str):
        super().__init__(user_id, display_name, email)
        self.specialization = specialization
        self.permissions.update(["GRADE_ASSIGNMENTS", "CREATE_QUIZZES", "UPLOAD_VIDEOS"])


# =====================================================================
# MULTIPLE INHERITANCE: SUPER ADMIN
# =====================================================================
class SuperAdminUser(BaseSystemUser, SecurityAuditingCapability, PaymentGatewayCapability):
    """Multiple Inheritance: Inherits BaseSystemUser + 2 Mixin capabilities."""
    def __init__(self, user_id: str, display_name: str, email: str):
        super().__init__(user_id, display_name, email)
        self.permissions.update(["ALL_SYSTEM_PRIVILEGES", "MANAGE_USERS", "EXECUTE_REFUNDS"])


def run_educational_suite():
    print("=" * 70)
    print("CODER & ACCOTAX - ENTERPRISE USER HIERARCHY CASE STUDY")
    print("=" * 70)

    # 1. Instantiate Student
    student = StudentUser("STU-1001", "Priyanka Sen", "priyanka@gmail.com", "Python Pro Full-Stack")
    print(f"1. {student.get_user_profile()}")
    print(f"   Permissions: {sorted(student.permissions)}\n")

    # 2. Instantiate Faculty
    faculty = FacultyInstructor("FAC-201", "Sukanta Hui", "sukanta.hui@codernaccotax.co.in", "Full-Stack Python & Financial Accounting")
    print(f"2. {faculty.get_user_profile()}")
    print(f"   Permissions: {sorted(faculty.permissions)}\n")

    # 3. Instantiate SuperAdmin (Multiple Inheritance)
    admin = SuperAdminUser("ADM-001", "Debolina Mukherjee", "debolina.admin@codernaccotax.co.in")
    print(f"3. {admin.get_user_profile()}")
    print(f"   Permissions: {sorted(admin.permissions)}\n")

    # 4. Invoke Inherited Mixin Capabilities
    print("4. SuperAdmin executing multiple inherited mixin capabilities:")
    admin.audit_security_event("Initiated institutional quarterly database backup.")
    admin.disburse_refund("STU-1001", 1500.0)

    print("\n[PASSED] Educational User Hierarchy Suite Completed Successfully.")


if __name__ == "__main__":
    run_educational_suite()
