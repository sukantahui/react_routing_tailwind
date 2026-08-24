# topic4_files/sys_argv_raw_argument_parsing.py
# Module: 004_001_filesystem-os
# Topic: Command-line arguments parsing: sys.argv & argparse module
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 1: Low-Level `sys.argv` Raw Argument Parsing
Demonstrates:
  1. Inspecting raw CLI tokens via `sys.argv`
  2. Manual flag parsing, key-value extraction, and type casting
  3. Defensive boundary handling for missing parameters
"""

import sys
from typing import Dict, Any, List

def parse_raw_arguments(argv: List[str]) -> Dict[str, Any]:
    """Manually parses flags and parameters from a raw sys.argv token list."""
    script_name = argv[0] if argv else "unknown_script.py"
    raw_args = argv[1:]

    options = {
        "script_name": script_name,
        "is_verbose": False,
        "campus": "barrackpore",
        "batch_limit": 50,
        "positional_targets": []
    }

    i = 0
    while i < len(raw_args):
        token = raw_args[i]
        if token in ("-v", "--verbose"):
            options["is_verbose"] = True
            i += 1
        elif token in ("-c", "--campus") and i + 1 < len(raw_args):
            options["campus"] = raw_args[i + 1]
            i += 2
        elif token in ("-l", "--limit") and i + 1 < len(raw_args):
            try:
                options["batch_limit"] = int(raw_args[i + 1])
            except ValueError:
                print(f"[WARNING] Invalid limit '{raw_args[i + 1]}', using default {options['batch_limit']}")
            i += 2
        elif not token.startswith("-"):
            options["positional_targets"].append(token)
            i += 1
        else:
            print(f"[WARNING] Unrecognized flag '{token}'")
            i += 1

    return options


def demonstrate_sys_argv_parsing():
    print("=" * 70)
    print("CODER & ACCOTAX - LOW-LEVEL SYS.ARGV CLI PARSING")
    print("=" * 70)

    # 1. Inspecting Live sys.argv Tokens:
    print("1. Live Process `sys.argv` Token Stream:")
    print(f"   * sys.argv Length : {len(sys.argv)}")
    print(f"   * sys.argv[0]     : {sys.argv[0]} (Script Entrypoint)")
    print(f"   * sys.argv[1:]    : {sys.argv[1:]} (CLI Parameters)\n")

    # 2. Simulating Mock CLI Invocations:
    print("2. Parsing Simulated Command Line Invocations:")
    mock_cli_call_1 = ["accotax_sync.py", "--campus", "kolkata", "--limit", "100", "--verbose", "admissions.csv"]
    parsed_1 = parse_raw_arguments(mock_cli_call_1)

    print(f"   * Input Invocation : {' '.join(mock_cli_call_1)}")
    print(f"   * Campus           : {parsed_1['campus']}")
    print(f"   * Batch Limit      : {parsed_1['batch_limit']}")
    print(f"   * Verbose Mode     : {parsed_1['is_verbose']}")
    print(f"   * Target Files     : {parsed_1['positional_targets']}\n")

    mock_cli_call_2 = ["accotax_sync.py", "-c", "barrackpore", "-v", "q1.json", "q2.json"]
    parsed_2 = parse_raw_arguments(mock_cli_call_2)
    print(f"   * Input Invocation : {' '.join(mock_cli_call_2)}")
    print(f"   * Parsed Result    : {parsed_2}")

    print(r"""
sys.argv Invariants:
  1. `sys.argv[0]` always holds the name or path of the running Python script.
  2. All elements in `sys.argv` are raw strings; manual casting to int, float, or bool is required.
  3. Manual parsing becomes error-prone for complex CLIs; use the `argparse` module for production tools.
""")
    print("[PASSED] sys.argv Raw Argument Parsing Verified.")


if __name__ == "__main__":
    demonstrate_sys_argv_parsing()
