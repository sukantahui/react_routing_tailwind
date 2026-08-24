# topic4_files/argparse_positional_and_optional_arguments.py
# Module: 004_001_filesystem-os
# Topic: Command-line arguments parsing: sys.argv & argparse module
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 2: `argparse` Positional, Optional & Typed Flags
Demonstrates:
  1. Setting up `argparse.ArgumentParser` with descriptions and epilogs
  2. Positional arguments vs optional flags (`-c`, `--campus`)
  3. Type coercion (`type=int`), choices validation, defaults, and `action='store_true'`
"""

import argparse
from pathlib import Path
from typing import List

def build_student_ingestion_parser() -> argparse.ArgumentParser:
    """Builds a structured ArgumentParser for student record ingestion."""
    parser = argparse.ArgumentParser(
        prog="student_ingest",
        description="Coder & AccoTax Student Record Ingestion & Validation CLI Utility.",
        epilog="For institutional support, visit https://www.codernaccotax.co.in"
    )

    # 1. Positional Argument (Required target file):
    parser.add_argument(
        "source_file",
        type=Path,
        help="Path to the source CSV or JSON student roster file."
    )

    # 2. Optional Flag with Choices & Default:
    parser.add_argument(
        "-c", "--campus",
        type=str,
        choices=["barrackpore", "kolkata", "all"],
        default="barrackpore",
        help="Target institutional campus node (default: barrackpore)."
    )

    # 3. Typed Integer Flag with Default:
    parser.add_argument(
        "-b", "--batch-size",
        type=int,
        default=50,
        help="Maximum records to process per batch (default: 50)."
    )

    # 4. Boolean Action Flags (store_true):
    parser.add_argument(
        "-d", "--dry-run",
        action="store_true",
        help="Simulate ingestion without writing changes to the database."
    )
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="Enable detailed diagnostic logging."
    )

    return parser


def demonstrate_argparse_features():
    print("=" * 70)
    print("CODER & ACCOTAX - ARGPARSE POSITIONAL & OPTIONAL FLAGS")
    print("=" * 70)

    parser = build_student_ingestion_parser()

    # 1. Parsing Simulated Valid Invocations:
    print("1. Parsing Standard CLI Invocations:")
    sample_cli_1 = ["students_2026.csv", "--campus", "kolkata", "--batch-size", "100", "--dry-run"]
    args1 = parser.parse_args(sample_cli_1)

    print(f"   * Input Command : student_ingest {' '.join(sample_cli_1)}")
    print(f"   * source_file   : {args1.source_file} (Type: {type(args1.source_file).__name__})")
    print(f"   * campus        : {args1.campus}")
    print(f"   * batch_size    : {args1.batch_size} (Type: {type(args1.batch_size).__name__})")
    print(f"   * dry_run       : {args1.dry_run}")
    print(f"   * verbose       : {args1.verbose}\n")

    # 2. Automated Help Text Formatting:
    print("2. Generated Auto-Formatted Help Manual (`parser.format_help()`):")
    help_text = parser.format_help()
    for line in help_text.splitlines()[:12]:
        print(f"   | {line}")

    print(r"""
argparse Invariants:
  1. Positional arguments are required by default; optional flags begin with '-' or '--'.
  2. The `type=` parameter automatically coerces raw string inputs into target types (`int`, `Path`).
  3. `action='store_true'` creates boolean flags that default to `False` and become `True` when specified.
  4. `choices=['a', 'b']` enforces valid enum values and prints user-friendly error messages on invalid input.
""")
    print("[PASSED] argparse Positional & Optional Flags Verified.")


if __name__ == "__main__":
    demonstrate_argparse_features()
