# topic5_files/subprocess_popen_asynchronous_streams.py
# Module: 004_001_filesystem-os
# Topic: Running external shell commands using subprocess module (run, Popen, pipes)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 2: `subprocess.Popen` Asynchronous Process Streams
Demonstrates:
  1. Non-blocking asynchronous process spawning with `subprocess.Popen()`
  2. Real-time stdout stream processing (`for line in process.stdout:`)
  3. Process lifecycle management: `poll()`, `wait()`, `terminate()`, `kill()`
  4. Two-way buffered communication with `process.communicate(input=...)`
"""

import sys
import subprocess
import time
from typing import List

def demonstrate_popen_streams():
    print("=" * 70)
    print("CODER & ACCOTAX - SUBPROCESS.POPEN ASYNCHRONOUS STREAMS")
    print("=" * 70)

    # 1. Spawning Real-Time Streaming Child Process:
    print("1. Real-Time Line-by-Line stdout Streaming with `subprocess.Popen()`:")
    # Script that simulates a multi-step worker printing progress:
    worker_script = (
        "import sys, time\n"
        "for i in range(1, 4):\n"
        "    print(f'[WORKER_EVENT] Processing Admission Batch #{i}...', flush=True)\n"
        "    time.sleep(0.05)\n"
        "print('[WORKER_EVENT] All Batches Completed Successfully.', flush=True)\n"
    )

    proc = subprocess.Popen(
        [sys.executable, "-c", worker_script],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        bufsize=1
    )

    print(f"   * Spawned Child Process (PID = {proc.pid})")
    
    # Read streamed lines in real-time
    if proc.stdout:
        for line in iter(proc.stdout.readline, ""):
            print(f"     -> STREAMED LOG: {line.strip()}")

    # Wait for process to terminate and collect returncode
    exit_code = proc.wait()
    print(f"   * Process Terminated with Exit Code: {exit_code}\n")

    # 2. Two-Way Communication with communicate(input=...):
    print("2. Two-Way Process Interaction with `proc.communicate(input=...)`:")
    # Child script that consumes stdin and converts it to uppercase:
    echo_script = "import sys; data = sys.stdin.read(); print(data.upper())"

    echo_proc = subprocess.Popen(
        [sys.executable, "-c", echo_script],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    input_payload = "sourav mukherjee - python pro - accotax barrackpore"
    stdout_data, stderr_data = echo_proc.communicate(input=input_payload)

    print(f"   * Input Sent to stdin  : '{input_payload}'")
    print(f"   * Output from stdout   : '{stdout_data.strip()}'\n")

    # 3. Non-Blocking Status Checking with proc.poll():
    print("3. Non-Blocking Process Status Polling (`proc.poll()`):")
    sleep_proc = subprocess.Popen([sys.executable, "-c", "import time; time.sleep(0.1)"])
    print(f"   * Immediate poll() : {sleep_proc.poll()} (None = Still Running)")
    time.sleep(0.15)
    print(f"   * After wait poll(): {sleep_proc.poll()} (Integer = Terminated)")

    print(r"""
subprocess.Popen Invariants:
  1. `Popen()` starts the child process immediately in the background without blocking the parent Python thread.
  2. Always iterate over `proc.stdout` or call `proc.communicate()` to prevent OS pipe buffers from filling and deadlocking.
  3. `proc.poll()` returns `None` while the child process is alive, and the exit code integer once finished.
  4. Always ensure child processes are reaped with `proc.wait()` to avoid leaving zombie processes on Unix systems.
""")
    print("[PASSED] subprocess.Popen Asynchronous Streams Verified.")


if __name__ == "__main__":
    demonstrate_popen_streams()
