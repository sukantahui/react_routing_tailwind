"""
# Module: 004_004_capstone-projects
# Topic 2: Configuring logging, error handling, and modular CLI / GUI interfaces
# File: modular_cli_interface_argparse_click.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating modular CLI architecture with argparse subcommands,
#              formatted tables, and POSIX exit codes.
"""

import argparse
import sys
from typing import Optional

def build_cli_parser() -> argparse.ArgumentParser:
    """Builds an enterprise CLI parser with subcommands and detailed help menus."""
    parser = argparse.ArgumentParser(
        prog="campus-cli",
        description="Institutional Student & Fee Management Administrative CLI Hub",
        epilog="Coder & Accotax • Educational Tutorial Series (Barrackpore, Kolkata)"
    )
    parser.add_argument("-v", "--verbose", action="store_true", help="Enable verbose debug logging")

    subparsers = parser.add_subparsers(dest="command", required=True, help="Administrative subcommands")

    # 1. 'enroll' subcommand
    enroll_p = subparsers.add_parser("enroll", help="Enroll a new student dossier")
    enroll_p.add_argument("--sid", required=True, help="Unique Student Registration ID (e.g. STU_BP_01)")
    enroll_p.add_argument("--name", required=True, help="Full Student Name")
    enroll_p.add_argument("--campus", default="Barrackpore", choices=["Barrackpore", "Kolkata", "Ichapur", "Jadavpur"], help="Campus location")
    enroll_p.add_argument("--fee", type=float, required=True, help="Base tuition fee (INR)")

    # 2. 'pay' subcommand
    pay_p = subparsers.add_parser("pay", help="Record tuition installment payment")
    pay_p.add_argument("--sid", required=True, help="Student Registration ID")
    pay_p.add_argument("--amount", type=float, required=True, help="Payment amount (INR)")
    pay_p.add_argument("--memo", default="Tuition Installment", help="Payment memo / transaction reference")

    # 3. 'report' subcommand
    report_p = subparsers.add_parser("report", help="Generate formatted ledger balance report")
    report_p.add_argument("--campus", default=None, help="Optional campus filter")

    return parser

def execute_cli_command(args: argparse.Namespace) -> int:
    """Executes the parsed command and returns standard POSIX exit codes."""
    if args.command == "enroll":
        print(f"   [CLI SUCCESS] Enrolled student '{args.name}' (ID: {args.sid}) at {args.campus} Campus.")
        print(f"                 Tuition Fee: Rs. {args.fee:,.2f}")
        return 0
    elif args.command == "pay":
        if args.amount <= 0:
            print(f"   [CLI ERROR] Payment amount must be positive. Got: {args.amount}", file=sys.stderr)
            return 1
        print(f"   [CLI SUCCESS] Payment of Rs. {args.amount:,.2f} recorded for {args.sid} ({args.memo}).")
        return 0
    elif args.command == "report":
        print("   +------------+------------+---------------+----------------+")
        print("   | Student ID | Name       | Campus        | Net Balance    |")
        print("   +------------+------------+---------------+----------------+")
        print("   | STU_BP_01  | Mamata     | Barrackpore   | Rs.   8,000.00 |")
        print("   | STU_CC_01  | Mahima     | Kolkata       | Rs.  12,500.00 |")
        print("   | STU_IC_01  | Abhronila  | Ichapur       | Rs.       0.00 |")
        print("   +------------+------------+---------------+----------------+")
        return 0
    return 1

def main():
    print("=" * 75)
    print("[MODULAR CLI] Subcommand Dispatcher & Formatted Output")
    print("=" * 75)

    parser = build_cli_parser()

    # Simulate: campus-cli enroll --sid STU_BP_01 --name Mamata --fee 20000
    args_enroll = parser.parse_args(["enroll", "--sid", "STU_BP_01", "--name", "Mamata", "--fee", "20000"])
    exit_code_1 = execute_cli_command(args_enroll)
    assert exit_code_1 == 0

    # Simulate: campus-cli report
    args_report = parser.parse_args(["report"])
    exit_code_2 = execute_cli_command(args_report)
    assert exit_code_2 == 0

    print("=" * 75)
    print("[TAKEAWAY] Standard subcommands, input choices, and POSIX exit codes")
    print("           turn internal Python scripts into powerful terminal tools.")
    print("=" * 75)

if __name__ == "__main__":
    main()
