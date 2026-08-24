# topic11_files/polymorphism_and_duck_typing_fundamentals.py
# Module: 003_001_object-oriented-python
# Topic: Polymorphism & Duck Typing in Python
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 11 - File 1: Polymorphism & Duck Typing Fundamentals
Demonstrates:
  1. What is Polymorphism: "Many forms" - uniform interface for heterogeneous types
  2. Duck Typing: "If it walks like a duck and quacks like a duck, it's a duck"
  3. Dynamic method dispatch without requiring explicit base class inheritance
  4. Polymorphic collections and unified caller loops
"""

from typing import List, Any

# =====================================================================
# 3 COMPLETELY UNRELATED CLASSES (Zero Shared Base Class!)
# =====================================================================
class PDFReportGenerator:
    """Unrelated class 1."""
    def generate(self, title: str) -> str:
        return f"[PDF RENDERER] Compiling vector document: '{title}.pdf' (Binary Stream)"


class ExcelSpreadsheetGenerator:
    """Unrelated class 2."""
    def generate(self, title: str) -> str:
        return f"[EXCEL RENDERER] Generating multi-tab workbook: '{title}.xlsx' (XML/ZIP)"


class HTMLWebReportGenerator:
    """Unrelated class 3."""
    def generate(self, title: str) -> str:
        return f"[HTML RENDERER] Rendering responsive web page: '<h1>{title}</h1>'"


# =====================================================================
# POLYMORPHIC CALLER (Relies on Duck Typing)
# =====================================================================
def publish_institutional_report(generators: List[Any], document_title: str):
    """Polymorphic function that accepts ANY object implementing `.generate()`."""
    print(f"Publishing Document: '{document_title}' across polymorphic engines:\n")
    for engine in generators:
        # Duck Typing in action: Python simply calls `.generate()` without checking type!
        output = engine.generate(document_title)
        print(f"  * Engine [{engine.__class__.__name__}]:\n    --> {output}")


def demonstrate_polymorphic_duck_typing():
    print("=" * 70)
    print("CODER & ACCOTAX - POLYMORPHISM & DUCK TYPING FUNDAMENTALS")
    print("=" * 70)

    # Heterogeneous collection of generators
    engines = [
        PDFReportGenerator(),
        ExcelSpreadsheetGenerator(),
        HTMLWebReportGenerator()
    ]

    publish_institutional_report(engines, "Annual GST & Corporate Tax Audit 2026")

    print(r"""
Core Takeaway:
  In Python, polymorphism does NOT require rigid abstract base classes or
  shared inheritance trees. As long as an object satisfies the expected interface
  (i.e., provides the required `.generate()` method), Python executes it cleanly!
""")
    print("[PASSED] Polymorphism & Duck Typing Demonstrated Successfully.")


if __name__ == "__main__":
    demonstrate_polymorphic_duck_typing()
