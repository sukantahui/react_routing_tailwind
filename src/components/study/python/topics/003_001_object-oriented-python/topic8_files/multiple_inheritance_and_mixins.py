# topic8_files/multiple_inheritance_and_mixins.py
# Module: 003_001_object-oriented-python
# Topic: Inheritance: Single, Multiple, Multilevel, and Hierarchical
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 2: Multiple Inheritance & The Mixin Pattern
Demonstrates:
  1. Multiple Inheritance: Derived class inheriting from multiple parent classes
  2. The Mixin Pattern: Composable single-responsibility capability classes
  3. Building production-grade composite domain entities using mixins
"""

import json
import datetime as dt
from typing import Dict, Any

# =====================================================================
# MIXIN 1: JSON EXPORT CAPABILITY
# =====================================================================
class JSONExportMixin:
    """Mixin providing automatic JSON serialization for any object."""
    def to_json(self) -> str:
        # Extracts object attributes, excluding private dunder keys
        data = {k: v for k, v in self.__dict__.items() if not k.startswith("_")}
        return json.dumps(data, indent=2, default=str)


# =====================================================================
# MIXIN 2: AUDIT LOGGING CAPABILITY
# =====================================================================
class AuditLoggerMixin:
    """Mixin providing audit timestamp tracking."""
    def log_event(self, action: str):
        timestamp = dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"  [AUDIT LOG] [{timestamp}] Entity '{self.__class__.__name__}': {action}")


# =====================================================================
# MIXIN 3: SMS NOTIFICATION CAPABILITY
# =====================================================================
class SMSNotifierMixin:
    """Mixin providing simulated SMS dispatch capabilities."""
    def dispatch_sms(self, phone: str, message: str):
        print(f"  [SMS DISPATCHED] -> {phone}: '{message}'")


# =====================================================================
# PRIMARY DOMAIN CLASS (Multiple Inheritance with 3 Mixins)
# =====================================================================
class CorporateClientContract(JSONExportMixin, AuditLoggerMixin, SMSNotifierMixin):
    """Business Entity inheriting from 3 independent Mixins."""
    def __init__(self, contract_id: str, client_name: str, contract_value_inr: float, contact_phone: str):
        self.contract_id = contract_id
        self.client_name = client_name
        self.contract_value = float(contract_value_inr)
        self.contact_phone = contact_phone
        self.is_active = True

        # Log creation via AuditLoggerMixin:
        self.log_event(f"Contract #{contract_id} created for {client_name} (INR {self.contract_value:,.2f})")

    def execute_renewal(self, added_value: float):
        self.contract_value += added_value
        self.log_event(f"Contract renewed with +INR {added_value:,.2f}")
        self.dispatch_sms(self.contact_phone, f"Dear {self.client_name}, your contract #{self.contract_id} was successfully renewed!")


def demonstrate_multiple_mixins():
    print("=" * 70)
    print("CODER & ACCOTAX - MULTIPLE INHERITANCE & MIXIN ARCHITECTURE")
    print("=" * 70)

    contract = CorporateClientContract(
        contract_id="CNT-2026-88",
        client_name="Tata Consultancy Services (Kolkata Wing)",
        contract_value_inr=1200000.0,
        contact_phone="+91-9830033333"
    )

    # 1. Execute renewal (Triggers AuditLoggerMixin & SMSNotifierMixin)
    print("\nExecuting Contract Renewal:")
    contract.execute_renewal(300000.0)

    # 2. Export via JSONExportMixin
    print("\nSerialized JSON Output (via JSONExportMixin):")
    print(contract.to_json())

    # 3. MRO Inspection
    print("\nMethod Resolution Order (MRO):")
    for idx, cls in enumerate(CorporateClientContract.__mro__):
        print(f"  [{idx}] {cls.__name__}")

    print("\n[PASSED] Multiple Inheritance & Mixin Suite Completed Successfully.")


if __name__ == "__main__":
    demonstrate_multiple_mixins()
