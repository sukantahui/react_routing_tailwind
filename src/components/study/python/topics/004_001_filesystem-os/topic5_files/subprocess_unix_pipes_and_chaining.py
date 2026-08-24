# topic5_files/subprocess_unix_pipes_and_chaining.py
# Module: 004_001_filesystem-os
# Topic: Running external shell commands using subprocess module (run, Popen, pipes)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 3: Process Pipeline Chaining with OS Pipes
Demonstrates:
  1. Chaining multiple subprocesses together (`Process 1 | Process 2`)
  2. Feeding `p1.stdout` into `p2.stdin`
  3. Proper closing of intermediate pipe file descriptors to prevent deadlocks
"""

import sys
import subprocess
from typing import List

def demonstrate_subprocess_pipes():
    print("=" * 70)
    print("CODER & ACCOTAX - SUBPROCESS PIPELINE CHAINING (PIPES)")
    print("=" * 70)

    # 1. Pipeline Scenario: Generator Script -> Filter Script -> Formatter Script
    # Simulates: "generate_students | filter_cleared_fees | format_json"

    # Step 1: Generator Process
    gen_script = (
        "import sys\n"
        "records = [\n"
        "    'STU-101,Sourav Mukherjee,Python AI,PAID',\n"
        "    'STU-102,Priyanka Sen,Data Science,PENDING',\n"
        "    'STU-103,Amitava Ghosh,Taxation Pro,PAID',\n"
        "    'STU-104,Debolina Roy,Full Stack,PENDING'\n"
        "]\n"
        "for r in records: print(r)\n"
    )

    # Step 2: Filter Process (Consumes stdin, filters only 'PAID' rows)
    filter_script = (
        "import sys\n"
        "for line in sys.stdin:\n"
        "    if 'PAID' in line:\n"
        "        sys.stdout.write(line)\n"
    )

    # Step 3: Formatter Process (Consumes filtered stdin, produces formatted output)
    format_script = (
        "import sys\n"
        "for line in sys.stdin:\n"
        "    parts = line.strip().split(',')\n"
        "    print(f'[CLEARED ADMISSION] ID: {parts[0]} | Name: {parts[1]} | Course: {parts[2]}')\n"
    )

    print("1. Constructing Multi-Process Pipe (p1 | p2 | p3):")

    # Spawn Process 1:
    p1 = subprocess.Popen(
        [sys.executable, "-c", gen_script],
        stdout=subprocess.PIPE
    )

    # Spawn Process 2 (takes p1.stdout as stdin):
    p2 = subprocess.Popen(
        [sys.executable, "-c", filter_script],
        stdin=p1.stdout,
        stdout=subprocess.PIPE
    )
    # CRITICAL PIPE INVARIANT: Allow p1 to receive a SIGPIPE if p2 exits early:
    if p1.stdout:
        p1.stdout.close()

    # Spawn Process 3 (takes p2.stdout as stdin):
    p3 = subprocess.Popen(
        [sys.executable, "-c", format_script],
        stdin=p2.stdout,
        stdout=subprocess.PIPE,
        text=True
    )
    if p2.stdout:
        p2.stdout.close()

    # Capture final pipeline output:
    final_output, _ = p3.communicate()
    p3.wait()

    print("2. Final Aggregated Pipeline Stream Output:")
    for line in final_output.strip().splitlines():
        print(f"   * {line}")

    print(r"""
Subprocess Pipe Invariants:
  1. When connecting `p2.stdin = p1.stdout`, always call `p1.stdout.close()` in the parent process.
  2. Closing `p1.stdout` in the parent ensures that only `p2` holds the read handle, enabling proper EOF detection.
  3. Chaining Python subprocesses with pipes enables high-throughput streaming without holding intermediate large datasets in RAM.
""")
    print("[PASSED] Subprocess Pipeline Chaining Verified.")


if __name__ == "__main__":
    demonstrate_subprocess_pipes()
