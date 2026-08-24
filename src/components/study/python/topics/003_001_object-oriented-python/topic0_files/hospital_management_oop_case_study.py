# topic0_files/hospital_management_oop_case_study.py
# Module: 003_001_object-oriented-python
# Topic: OOP Paradigm: Procedural vs Object-Oriented thinking
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 4: Enterprise Clinic Consultation Management Suite (OOP Architecture)
Demonstrates:
  1. Real-world enterprise domain modeling with classes (Doctor, Patient, Appointment)
  2. Interaction between multiple distinct domain objects
  3. Clean invariant protection and dynamic billing calculations
"""

import datetime as dt
from typing import List, Optional

class Doctor:
    """Represents a medical specialist with schedule and consultation fees."""

    def __init__(self, doctor_id: str, name: str, specialization: str, consultation_fee: float):
        self.doctor_id = doctor_id
        self.name = name
        self.specialization = specialization
        self.consultation_fee = consultation_fee

    def __str__(self) -> str:
        return f"Dr. {self.name} ({self.specialization}) - Fee: INR {self.consultation_fee:,.2f}"


class Patient:
    """Represents a registered patient with medical records."""

    def __init__(self, patient_id: str, name: str, age: int, contact_number: str):
        self.patient_id = patient_id
        self.name = name
        self.age = age
        self.contact_number = contact_number
        self.prescription_history: List[str] = []

    def add_prescription(self, diagnosis: str) -> None:
        self.prescription_history.append(f"{dt.date.today()}: {diagnosis}")


class Appointment:
    """Binds Doctor, Patient, and Billing logic into a unified transaction."""

    def __init__(self, appointment_id: str, doctor: Doctor, patient: Patient, scheduled_time: dt.datetime):
        self.appointment_id = appointment_id
        self.doctor = doctor
        self.patient = patient
        self.scheduled_time = scheduled_time
        self.is_completed = False
        self.is_paid = False

    def complete_consultation(self, diagnosis: str) -> None:
        self.is_completed = True
        self.patient.add_prescription(diagnosis)
        print(f"  [CONSULTATION COMPLETED] {self.doctor.name} examined {self.patient.name}.")

    def process_payment(self) -> float:
        self.is_paid = True
        print(f"  [PAYMENT RECEIVED] INR {self.doctor.consultation_fee:,.2f} recorded for Appt #{self.appointment_id}")
        return self.doctor.consultation_fee


def run_clinic_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - BARRACKPORE CLINIC OOP CASE STUDY")
    print("=" * 70)

    # 1. Instantiate Domain Entities
    doc = Doctor("DOC-01", "Anirban Bhattacharya", "Cardiology", 1200.0)
    patient = Patient("PAT-101", "Tanushree Das", 34, "+91-9830012345")

    # 2. Schedule and Execute Appointment
    appt = Appointment("APPT-202601", doc, patient, dt.datetime.now())
    print(f"Appointment Scheduled: {appt.patient.name} with {appt.doctor.name}\n")

    appt.complete_consultation("Mild Hypertension - Prescribed Lifestyle Modifications")
    appt.process_payment()

    print(f"\nPatient Medical History: {patient.prescription_history}")
    print("\n[PASSED] Hospital OOP Management Case Study Completed.")


if __name__ == "__main__":
    run_clinic_demo()
