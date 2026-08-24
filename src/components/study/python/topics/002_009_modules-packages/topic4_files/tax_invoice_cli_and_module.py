# topic4_files/tax_invoice_cli_and_module.py
# Module: 002_009_modules-packages
# Topic: The __name__ == '__main__' idiom explained with practical use cases
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 4: Production Enterprise GST Tax Invoice Generator & CLI Tool
Demonstrates:
  1. Complete dual-mode module architecture
  2. Pure importable functions for Web / FastAPI backends
  3. Interactive Command-Line Tool with argument parsing for terminal operators
"""

import sys
import datetime as dt
from typing import Dict, Any

# Module Constants
COMPANY_NAME: str = "Coder & AccoTax"
HEADQUARTERS: str = "Barrackpore, Kolkata"
DEFAULT_GST: float = 0.18

def calculate_invoice_breakdown(
    gross_amount: float,
    discount_pct: float = 0.0,
    gst_rate: float = DEFAULT_GST
) -> Dict[str, float]:
    """Pure business function: Computes taxable subtotal, CGST, SGST, and net payable."""
    discount = gross_amount * (discount_pct / 100.0)
    taxable = gross_amount - discount
    total_gst = taxable * gst_rate
    cgst = total_gst / 2.0
    sgst = total_gst / 2.0
    net_total = taxable + total_gst

    return {
        "gross": gross_amount,
        "discount": discount,
        "taxable": taxable,
        "cgst": cgst,
        "sgst": sgst,
        "gst_total": total_gst,
        "net_payable": net_total
    }


def format_invoice_string(inv_id: int, client: str, breakdown: Dict[str, float]) -> str:
    """Formats calculated numbers into an ASCII invoice table."""
    now = dt.datetime.now()
    return f"""
============================================================
                     {COMPANY_NAME}
                  {HEADQUARTERS}
               TAX INVOICE #{inv_id:06d}
============================================================
Date & Time    : {now:%d-%b-%Y %I:%M %p}
Client/Student : {client}
------------------------------------------------------------
Gross Subtotal : INR {breakdown['gross']:>12.2f}
Discount       : -INR {breakdown['discount']:>11.2f}
Taxable Amount : INR {breakdown['taxable']:>12.2f}
CGST (9%)      : +INR {breakdown['cgst']:>11.2f}
SGST (9%)      : +INR {breakdown['sgst']:>11.2f}
------------------------------------------------------------
NET TOTAL DUE  : INR {breakdown['net_payable']:>12.2f}
============================================================
"""


def main_cli_handler():
    """Terminal Command-Line Interface."""
    print("=" * 60)
    print("CODER & ACCOTAX - TAX INVOICE CLI GENERATOR")
    print("=" * 60)

    # If arguments provided: python tax_invoice_cli_and_module.py <INV_ID> <CLIENT> <AMOUNT>
    if len(sys.argv) >= 4:
        try:
            inv_id = int(sys.argv[1])
            client = sys.argv[2]
            gross = float(sys.argv[3])
            disc = float(sys.argv[4]) if len(sys.argv) > 4 else 0.0
            data = calculate_invoice_breakdown(gross, discount_pct=disc)
            print(format_invoice_string(inv_id, client, data))
        except Exception as e:
            print(f"Error parsing CLI arguments: {e}")
    else:
        print("Usage: python tax_invoice_cli_and_module.py <ID> <CLIENT> <AMOUNT> [DISCOUNT_PCT]")
        print("\nExecuting Default Diagnostic Invoice:")
        demo_data = calculate_invoice_breakdown(14500.0, discount_pct=10.0)
        print(format_invoice_string(9402, "Susmita Mukherjee", demo_data))


if __name__ == "__main__":
    main_cli_handler()
