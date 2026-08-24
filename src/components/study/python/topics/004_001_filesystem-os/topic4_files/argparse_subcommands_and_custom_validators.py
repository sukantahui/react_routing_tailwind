# topic4_files/argparse_subcommands_and_custom_validators.py
# Module: 004_001_filesystem-os
# Topic: Command-line arguments parsing: sys.argv & argparse module
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 3: `argparse` Subcommands & Mutually Exclusive Groups
Demonstrates:
  1. Multi-command routing with `add_subparsers()`
  2. Enforcing exclusivity with `add_mutually_exclusive_group()`
  3. Custom argument type validation functions (e.g., positive integer, date format)
"""

import argparse
import re
from typing import List

def valid_student_id(val: str) -> str:
    """Custom validator: Enforces format STU-XXXX (e.g. STU-1001)."""
    pattern = r"^STU-\d{3,5}$"
    if not re.match(pattern, val):
        raise argparse.ArgumentTypeError(f"Invalid Student ID '{val}'. Must match format 'STU-XXXX' (e.g., STU-101).")
    return val

def build_advanced_cli() -> argparse.ArgumentParser:
    """Constructs a multi-command CLI with subparsers and mutually exclusive groups."""
    root_parser = argparse.ArgumentParser(
        prog="accotax",
        description="Institutional Multi-Command Operational CLI Suite."
    )

    subparsers = root_parser.add_subparsers(
        dest="subcommand",
        required=True,
        help="Subcommand to execute"
    )

    # 1. Subcommand: 'enroll'
    enroll_parser = subparsers.add_parser("enroll", help="Enroll a new candidate.")
    enroll_parser.add_argument("student_id", type=valid_student_id, help="Student ID (Format: STU-101)")
    enroll_parser.add_argument("student_name", type=str, help="Full student legal name")
    enroll_parser.add_argument("--course", default="Python Pro", help="Course track")

    # 2. Subcommand: 'audit' (with mutually exclusive format group)
    audit_parser = subparsers.add_parser("audit", help="Run financial or compliance audit.")
    audit_parser.add_argument("--year", type=int, default=2026, help="Audit financial year")

    # Mutually exclusive output format:
    fmt_group = audit_parser.add_mutually_exclusive_group()
    fmt_group.add_argument("--json", action="store_true", help="Output results in JSON format.")
    fmt_group.add_argument("--csv", action="store_true", help="Output results in CSV format.")
    fmt_group.add_argument("--table", action="store_true", help="Output results in ASCII Table format.")

    return root_parser


def demonstrate_subcommands_and_validation():
    print("=" * 70)
    print("CODER & ACCOTAX - ARGPARSE SUBCOMMANDS & VALIDATORS")
    print("=" * 70)

    cli = build_advanced_cli()

    # 1. Parsing 'enroll' Subcommand:
    print("1. Parsing 'enroll' Subcommand with Custom ID Validator:")
    enroll_cmd = ["enroll", "STU-101", "Sourav Mukherjee", "--course", "Python AI & Cloud"]
    args_enroll = cli.parse_args(enroll_cmd)

    print(f"   * Executed Command : accotax {' '.join(enroll_cmd)}")
    print(f"   * Subcommand Route : {args_enroll.subcommand}")
    print(f"   * Validated ID     : {args_enroll.student_id}")
    print(f"   * Student Name     : {args_enroll.student_name}")
    print(f"   * Course Track     : {args_enroll.course}\n")

    # 2. Parsing 'audit' Subcommand with Mutually Exclusive Flags:
    print("2. Parsing 'audit' Subcommand with Mutually Exclusive Format:")
    audit_cmd = ["audit", "--year", "2026", "--json"]
    args_audit = cli.parse_args(audit_cmd)

    print(f"   * Executed Command : accotax {' '.join(audit_cmd)}")
    print(f"   * Subcommand Route : {args_audit.subcommand}")
    print(f"   * Audit Year       : {args_audit.year}")
    print(f"   * Output JSON      : {args_audit.json}")
    print(f"   * Output CSV       : {args_audit.csv}\n")

    # 3. Handling Validation Errors Defensively:
    print("3. Defensive Custom Validation Rejection:")
    try:
        invalid_cmd = ["enroll", "INVALID_ID_999", "Priyanka Sen"]
        cli.parse_args(invalid_cmd)
    except SystemExit:
        print("   * [DEFENSIVE ERROR CAUGHT] `argparse` rejected invalid student ID correctly.")

    print(r"""
Subcommand Invariants:
  1. `add_subparsers(dest='command')` enables building Git-like or Docker-like multi-command CLI interfaces.
  2. `add_mutually_exclusive_group()` ensures conflicting flags (e.g. `--json` vs `--csv`) cannot be passed simultaneously.
  3. Custom validation functions raise `argparse.ArgumentTypeError` to trigger standard CLI error reporting.
""")
    print("[PASSED] argparse Subcommands & Custom Validators Verified.")


if __name__ == "__main__":
    demonstrate_subcommands_and_validation()
