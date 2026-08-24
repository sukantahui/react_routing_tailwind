# topic11_files/post_mortem_debugging_pm.py
# Module: 003_002_basic-exception-handling
# Topic: Debugging techniques & pdb breakpoints
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 11 - File 2: Post-Mortem Debugging & Stack Frame Inspection
Demonstrates:
  1. Post-mortem debugging concepts with `pdb.post_mortem()`
  2. Inspecting dead execution frames and local variables after an exception
  3. Programmatic traceback extraction using `sys.exc_info()` and `traceback`
"""

import sys
import traceback

def compute_installment_plan(total_tuition: float, num_installments: int) -> float:
    """Deliberately crashes on zero installments to demonstrate post-mortem inspection."""
    return total_tuition / num_installments


def simulate_post_mortem_inspection():
    print("=" * 70)
    print("CODER & ACCOTAX - POST-MORTEM DEBUGGING & STACK INSPECTION")
    print("=" * 70)

    try:
        print("Executing: compute_installment_plan(36000.0, 0)")
        compute_installment_plan(36000.0, 0)
    except ZeroDivisionError:
        exc_type, exc_value, exc_tb = sys.exc_info()

        print("\n--- FORENSIC POST-MORTEM REPORT ---")
        print(f"Exception Type    : {exc_type.__name__}")
        print(f"Exception Value   : {exc_value}")

        # Extract frames from traceback:
        frames = traceback.extract_tb(exc_tb)
        print(f"\nCall Stack Depth  : {len(frames)} frames")
        for idx, frame in enumerate(frames, 1):
            print(f"  Frame #{idx}: File '{frame.filename}', Line {frame.lineno}, in {frame.name}")
            print(f"            Code -> {frame.line}")

        print(r"""
Post-Mortem Debugger Usage in Terminal:
  When a Python script crashes in interactive shell:
  >>> import pdb; pdb.pm()
  Or from command line:
  $ python -m pdb script.py
  This drops you directly into the dying frame with all local variables preserved!
""")

    print("[PASSED] Post-Mortem Stack Frame Inspection Verified.")


if __name__ == "__main__":
    simulate_post_mortem_inspection()
