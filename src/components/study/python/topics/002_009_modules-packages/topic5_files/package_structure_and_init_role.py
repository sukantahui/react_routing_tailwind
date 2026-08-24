# topic5_files/package_structure_and_init_role.py
# Module: 002_009_modules-packages
# Topic: Concept of packages & __init__.py files
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 1: Package Directory Structure & the 3 Roles of __init__.py
Demonstrates:
  1. What constitutes a Python Package (Directories + __init__.py)
  2. The 3 Primary Roles of __init__.py:
     - Role A: Package Identification (Treats directory as a Python package)
     - Role B: Package-Level Initialization Execution (Runs when package is imported)
     - Role C: API Elevation Facade (Exposes submodule functions at the top-level)
  3. Regular Packages vs PEP 420 Implicit Namespace Packages
"""

import types

# Simulating a multi-file package structure in Python memory
package_init_code = """
# package __init__.py (API Elevation Facade)
__version__ = '3.0.0'
__all__ = ['StudentFeeManager', 'calculate_gst']

# Import symbols from submodules to elevate them to the package root!
from .fee_module import StudentFeeManager
from .tax_module import calculate_gst
"""

fee_module_code = """
class StudentFeeManager:
    def __init__(self, student_name):
        self.student = student_name
    def get_summary(self):
        return f"Student {self.student} Fee Account Active"
"""

tax_module_code = """
def calculate_gst(amount: float) -> float:
    return amount * 0.18
"""

def explain_package_fundamentals():
    print("=" * 65)
    print("1. REGULAR PACKAGES VS NAMESPACE PACKAGES")
    print("=" * 65)
    print(r"""
Directory Layout:
  my_package/
  |-- __init__.py          <- Marks directory as a package & runs setup
  |-- fee_module.py        <- Submodule
  \-- tax_module.py        <- Submodule

Why __init__.py is Crucial:
  1. Package Initialization: Executes initialization logic on `import my_package`.
  2. API Elevation (Facade Pattern): Exposes submodule classes directly at
     `my_package.StudentFeeManager` rather than forcing deep nested imports
     like `my_package.fee_module.StudentFeeManager`.
  3. Export Whitelisting: Defines `__all__` to restrict package-level exports.
""")


def demonstrate_api_elevation():
    print("=" * 65)
    print("2. SIMULATED API ELEVATION VIA __init__.py")
    print("=" * 65)

    # 1. Create submodules
    fee_mod = types.ModuleType("my_package.fee_module")
    exec(fee_module_code, fee_mod.__dict__)

    tax_mod = types.ModuleType("my_package.tax_module")
    exec(tax_module_code, tax_mod.__dict__)

    # 2. Create parent package and elevate symbols
    pkg = types.ModuleType("my_package")
    pkg.__path__ = ["/simulated/my_package"]
    pkg.StudentFeeManager = fee_mod.StudentFeeManager
    pkg.calculate_gst = tax_mod.calculate_gst
    pkg.__version__ = "3.0.0"

    print("Without API Elevation (Ugly & Deep):")
    print("  from my_package.fee_module import StudentFeeManager")
    print("\nWith API Elevation (Clean & Professional):")
    print("  from my_package import StudentFeeManager, calculate_gst\n")

    # Using elevated package API
    manager = pkg.StudentFeeManager("Susmita Mukherjee")
    gst = pkg.calculate_gst(10000.0)

    print(f"Package Version  : {pkg.__version__}")
    print(f"Manager Status   : {manager.get_summary()}")
    print(f"Calculated GST   : INR {gst:,.2f}")


if __name__ == "__main__":
    explain_package_fundamentals()
    demonstrate_api_elevation()
