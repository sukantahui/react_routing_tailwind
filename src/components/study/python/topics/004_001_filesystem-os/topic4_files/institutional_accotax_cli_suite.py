# topic4_files/institutional_accotax_cli_suite.py
# Module: 004_001_filesystem-os
# Topic: Command-line arguments parsing: sys.argv & argparse module
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 4: Institutional Multi-Command CLI Management Suite (Case Study)
Demonstrates:
  1. Complete production-grade multi-command CLI tool using `argparse`
  2. Command routing to dedicated service handlers (`enroll`, `audit`, `backup`)
  3. Formatted ASCII table outputs, exit codes, and comprehensive CLI UX
"""

import sys
import json
import argparse
from typing import List, Dict, Any

class InstitutionalCliSuite:
    """Production CLI operations suite for Coder & AccoTax administrative workflows."""

    def __init__(self):
        self.parser = self._construct_parser()

    def _construct_parser(self) -> argparse.ArgumentParser:
        root_parser = argparse.ArgumentParser(
            prog="accotax-admin",
            description="Institutional Management CLI for Coder & AccoTax Operations.",
            formatter_class=argparse.RawDescriptionHelpFormatter,
            epilog="""
Examples:
  accotax-admin enroll --id STU-101 --name "Sourav Mukherjee" --campus barrackpore
  accotax-admin audit --year 2026 --format table
  accotax-admin backup --campus all --dry-run
"""
        )
        root_parser.add_argument("-v", "--verbose", action="store_true", help="Enable verbose diagnostics.")

        subparsers = root_parser.add_subparsers(dest="command", required=True, help="Operational command")

        # 1. 'enroll' Command
        enroll_p = subparsers.add_parser("enroll", help="Enroll a new student candidate.")
        enroll_p.add_argument("--id", required=True, help="Unique student ID (e.g. STU-101)")
        enroll_p.add_argument("--name", required=True, help="Full candidate name")
        enroll_p.add_argument("--campus", choices=["barrackpore", "kolkata"], default="barrackpore", help="Campus node")
        enroll_p.add_argument("--fee", type=float, default=30000.0, help="Tuition fee amount")

        # 2. 'audit' Command
        audit_p = subparsers.add_parser("audit", help="Generate institutional financial/compliance audit.")
        audit_p.add_argument("--year", type=int, default=2026, help="Financial audit fiscal year")
        audit_p.add_argument("--format", choices=["table", "json", "csv"], default="table", help="Output format")

        # 3. 'backup' Command
        backup_p = subparsers.add_parser("backup", help="Trigger snapshot backup archive creation.")
        backup_p.add_argument("--campus", choices=["barrackpore", "kolkata", "all"], default="all", help="Target campus")
        backup_p.add_argument("--dry-run", action="store_true", help="Simulate backup without writing archives.")

        return root_parser

    def handle_enroll(self, args: argparse.Namespace) -> int:
        print(f"\n[ENROLL SERVICE] Registering candidate in database:")
        print(f"   * Student ID   : {args.id}")
        print(f"   * Legal Name   : {args.name}")
        print(f"   * Campus Node  : {args.campus.title()} Main Center")
        print(f"   * Tuition Fee  : INR {args.fee:,.2f}")
        print("   -> Candidate enrolled and KYC record initiated. [STATUS: OK]")
        return 0

    def handle_audit(self, args: argparse.Namespace) -> int:
        records = [
            {"id": "STU-101", "name": "Sourav Mukherjee", "course": "Python AI", "fee_status": "CLEARED"},
            {"id": "STU-102", "name": "Priyanka Sen", "course": "DS & ML", "fee_status": "CLEARED"},
            {"id": "STU-103", "name": "Amitava Ghosh", "course": "Tax Pro", "fee_status": "PENDING"}
        ]

        if args.format == "json":
            print(json.dumps({"fiscal_year": args.year, "audit_records": records}, indent=2))
        elif args.format == "csv":
            print("id,name,course,fee_status")
            for r in records:
                print(f"{r['id']},{r['name']},{r['course']},{r['fee_status']}")
        else:
            print(f"\n[AUDIT SERVICE - FISCAL YEAR {args.year}]")
            print(f"{'ID':<10} {'STUDENT NAME':<22} {'COURSE':<16} {'FEE STATUS':<10}")
            print("-" * 60)
            for r in records:
                print(f"{r['id']:<10} {r['name']:<22} {r['course']:<16} {r['fee_status']:<10}")
        return 0

    def handle_backup(self, args: argparse.Namespace) -> int:
        print(f"\n[BACKUP SERVICE] Initiating snapshot for target: '{args.campus}'")
        if args.dry_run:
            print("   * [DRY-RUN MODE] Simulated backup successfully. 0 bytes written to disk.")
        else:
            print("   * Snapshot created and compressed archive stored in vault.")
        return 0

    def execute_cli(self, argv: List[str]) -> int:
        try:
            args = self.parser.parse_args(argv)
            if args.command == "enroll":
                return self.handle_enroll(args)
            elif args.command == "audit":
                return self.handle_audit(args)
            elif args.command == "backup":
                return self.handle_backup(args)
            return 1
        except SystemExit as e:
            return e.code if isinstance(e.code, int) else 1


def demonstrate_cli_suite():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL CLI MANAGEMENT SUITE")
    print("=" * 70)

    cli_app = InstitutionalCliSuite()

    # 1. Execute 'enroll'
    print("1. Executing CLI Ingestion ('enroll'):")
    enroll_args = ["enroll", "--id", "STU-101", "--name", "Sourav Mukherjee", "--campus", "barrackpore", "--fee", "35000"]
    print(f"Command: accotax-admin {' '.join(enroll_args)}")
    cli_app.execute_cli(enroll_args)

    # 2. Execute 'audit' (Table output)
    print("\n2. Executing CLI Compliance ('audit --format table'):")
    audit_args = ["audit", "--year", "2026", "--format", "table"]
    print(f"Command: accotax-admin {' '.join(audit_args)}")
    cli_app.execute_cli(audit_args)

    # 3. Execute 'backup' (Dry run)
    print("\n3. Executing CLI Infrastructure ('backup --dry-run'):")
    backup_args = ["backup", "--campus", "all", "--dry-run"]
    print(f"Command: accotax-admin {' '.join(backup_args)}")
    cli_app.execute_cli(backup_args)

    print("\n[PASSED] Institutional CLI Suite Verified.")


if __name__ == "__main__":
    demonstrate_cli_suite()
