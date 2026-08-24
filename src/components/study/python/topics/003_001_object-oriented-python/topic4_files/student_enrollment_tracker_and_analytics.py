# topic4_files/student_enrollment_tracker_and_analytics.py
# Module: 003_001_object-oriented-python
# Topic: Class attributes vs Instance attributes
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 4: Student Enrollment Tracker & Institute Analytics Suite
Demonstrates:
  1. Class attributes tracking aggregated metrics across an entire enterprise
  2. Instance attributes capturing individual student financial records
  3. Real-time dynamic business intelligence and dashboard generation
"""

from typing import List, ClassVar

class InstituteStudentAdmission:
    """Enterprise Student Admission modeling individual records and global analytics."""
    
    # =================================================================
    # CLASS ATTRIBUTES (Aggregated Institute Analytics)
    # =================================================================
    institute_name: ClassVar[str] = "Coder & AccoTax Barrackpore"
    total_students_enrolled: ClassVar[int] = 0
    total_gross_revenue: ClassVar[float] = 0.0
    total_scholarships_awarded: ClassVar[float] = 0.0
    total_cash_collected: ClassVar[float] = 0.0

    def __init__(self, student_name: str, course_name: str, gross_fee: float, scholarship_inr: float, downpayment: float):
        # Instance Attributes
        self.student_name = student_name
        self.course_name = course_name
        self.gross_fee = float(gross_fee)
        self.scholarship_inr = float(scholarship_inr)
        self.net_fee = self.gross_fee - self.scholarship_inr
        self.paid_amount = float(downpayment)
        self.due_amount = self.net_fee - self.paid_amount

        # Update Institute Aggregated Metrics (Class Level State)
        InstituteStudentAdmission.total_students_enrolled += 1
        InstituteStudentAdmission.total_gross_revenue += self.gross_fee
        InstituteStudentAdmission.total_scholarships_awarded += self.scholarship_inr
        InstituteStudentAdmission.total_cash_collected += self.paid_amount

    @classmethod
    def generate_executive_analytics_report(cls) -> str:
        """Generates comprehensive financial summary from class attributes."""
        net_expected = cls.total_gross_revenue - cls.total_scholarships_awarded
        outstanding = net_expected - cls.total_cash_collected

        return (
            f"======================================================================\n"
            f"CODER & ACCOTAX - EXECUTIVE ANALYTICS DASHBOARD\n"
            f"Institute             : {cls.institute_name}\n"
            f"----------------------------------------------------------------------\n"
            f"Total Students Active : {cls.total_students_enrolled}\n"
            f"Total Gross Pipeline  : INR {cls.total_gross_revenue:,.2f}\n"
            f"Scholarships Granted  : -INR {cls.total_scholarships_awarded:,.2f}\n"
            f"Net Expected Revenue  : INR {net_expected:,.2f}\n"
            f"Total Cash Collected  : INR {cls.total_cash_collected:,.2f}\n"
            f"Outstanding Receivables: INR {outstanding:,.2f}\n"
            f"======================================================================"
        )


def run_analytics_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - STUDENT ENROLLMENT & ANALYTICS CASE STUDY")
    print("=" * 70)

    # Enroll 3 students
    s1 = InstituteStudentAdmission("Priyanka Sen", "Python Pro Full-Stack", 18000.0, 2000.0, 8000.0)
    s2 = InstituteStudentAdmission("Sourav Mukherjee", "Data Analytics with Python", 15000.0, 1500.0, 7000.0)
    s3 = InstituteStudentAdmission("Tanushree Das", "Financial Accounting & GST", 12000.0, 0.0, 6000.0)

    print(f"Enrolled {s1.student_name}, {s2.student_name}, and {s3.student_name}.\n")

    # Generate Global Analytics Report from Class State
    print(InstituteStudentAdmission.generate_executive_analytics_report())
    print("\n[PASSED] Institute Enrollment Analytics Suite Completed.")


if __name__ == "__main__":
    run_analytics_demo()
