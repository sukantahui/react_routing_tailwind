# topic3_files/multi_module_import_demo.py
# Module: 002_009_modules-packages
# Topic: Creating and structuring custom user-defined modules
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 3: Multi-Module Architecture & Layered Separation of Concerns
Demonstrates:
  1. Designing decoupled, single-responsibility custom modules:
     - Configuration Layer (Constants, settings)
     - Business Logic Layer (Pure functions, algorithms)
     - Presentation / Formatter Layer (String formatting, reports)
  2. Clean inter-module imports and orchestration
"""

import types
from typing import Dict, Any

# 1. Simulated Config Module (settings.py)
config_source = """
INSTITUTE_NAME = 'Coder & AccoTax'
DEFAULT_CURRENCY = 'INR'
GST_RATE = 0.18
SCHOLARSHIP_TIERS = {
    'GOLD': 0.25,   # 25%
    'SILVER': 0.15, # 15%
    'BRONZE': 0.10  # 10%
}
"""

# 2. Simulated Logic Module (calculations.py)
logic_source = """
def compute_net_tuition(base_fee: float, tier: str = 'BRONZE', gst_rate: float = 0.18) -> dict:
    discount_pct = 0.10
    if tier == 'GOLD': discount_pct = 0.25
    elif tier == 'SILVER': discount_pct = 0.15

    discount = base_fee * discount_pct
    taxable = base_fee - discount
    tax = taxable * gst_rate
    return {
        'base': base_fee,
        'discount': discount,
        'taxable': taxable,
        'tax': tax,
        'total': taxable + tax
    }
"""

def demonstrate_layered_multi_module_pipeline():
    print("=" * 65)
    print("1. LAYERED MULTI-MODULE WORKFLOW ORCHESTRATION")
    print("=" * 65)

    # Instantiate simulated custom modules
    settings_mod = types.ModuleType("settings")
    exec(config_source, settings_mod.__dict__)

    calc_mod = types.ModuleType("calculations")
    exec(logic_source, calc_mod.__dict__)

    print("Discovered Modules:")
    print(f"  * Config Module : '{settings_mod.__name__}' -> {settings_mod.INSTITUTE_NAME}")
    print(f"  * Logic Module  : '{calc_mod.__name__}' -> functions: {list(calc_mod.__dict__.keys())[-1]}\n")

    # Orchestrator calls logic module using settings constants
    student_record = {"name": "Susmita Mukherjee", "course": "Python Pro", "base_fee": 15000.0, "tier": "GOLD"}
    
    result = calc_mod.compute_net_tuition(
        base_fee=student_record["base_fee"],
        tier=student_record["tier"],
        gst_rate=settings_mod.GST_RATE
    )

    print(f"Student Name    : {student_record['name']}")
    print(f"Enrolled Course : {student_record['course']} (Scholarship: {student_record['tier']})")
    print(f"Gross Tuition   : {settings_mod.DEFAULT_CURRENCY} {result['base']:,.2f}")
    print(f"Tier Discount   : -{settings_mod.DEFAULT_CURRENCY} {result['discount']:,.2f} (25% Gold)")
    print(f"18% GST Tax     : +{settings_mod.DEFAULT_CURRENCY} {result['tax']:,.2f}")
    print(f"Net Total Due   : {settings_mod.DEFAULT_CURRENCY} {result['total']:,.2f}")


if __name__ == "__main__":
    demonstrate_layered_multi_module_pipeline()
