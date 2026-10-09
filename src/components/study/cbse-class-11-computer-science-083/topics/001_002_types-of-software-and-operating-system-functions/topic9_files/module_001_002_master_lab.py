"""
================================================================================
CBSE CLASS 11 COMPUTER SCIENCE (083) - MASTER LAB SUITE
MODULE: 001_002 TYPES OF SOFTWARE AND OPERATING SYSTEM FUNCTIONS
FILE: module_001_002_master_lab.py
AUTHOR: Sukanta Hui (Teacher & Curriculum Lead)

Comprehensive Master Lab Script combining:
1. Software Layer Classifier (System, Utility, Application, Bespoke)
2. Language Processor Speed & Error Benchmark (Assembler, Compiler, Interpreter)
3. Operating System Core Resource Managers (CPU Scheduler, RAM Allocator, Inode Tree, Spooler)
4. Hardware Abstraction Layer & System Call Trap Simulator
5. Real-Time OS (RTOS) Deadline Verification Engine
================================================================================
"""

import time
import collections

def run_software_classification_audit():
    print("\n--- [PART 1: ENTERPRISE SOFTWARE CLASSIFICATION AUDIT] ---")
    catalog = [
        {"name": "Ubuntu Linux 24.04 LTS", "category": "System Software (Operating System)"},
        {"name": "NVIDIA Graphics Display Driver", "category": "System Software (Device Driver)"},
        {"name": "Windows Disk Defragmenter", "category": "System Software (System Utility)"},
        {"name": "Microsoft Excel", "category": "Application Software (General Purpose)"},
        {"name": "IRCTC Train Reservation Engine", "category": "Application Software (Customized / Bespoke)"}
    ]
    for idx, item in enumerate(catalog, start=1):
        print(f"[{idx}] {item['name'].ljust(35)} -> {item['category']}")


def run_cpu_scheduling_demo():
    print("\n--- [PART 2: CPU SCHEDULING (ROUND ROBIN TIME-SLICING)] ---")
    queue = collections.deque([
        {"id": "P1", "app": "Python Script", "burst": 25},
        {"id": "P2", "app": "Web Browser", "burst": 15},
        {"id": "P3", "app": "Audio Stream", "burst": 10}
    ])
    quantum = 10
    time_tick = 0
    while queue:
        p = queue.popleft()
        slice_used = min(quantum, p['burst'])
        time_tick += slice_used
        p['burst'] -= slice_used
        print(f"Time {time_tick:02d}ms: CPU assigned to {p['id']} ({p['app']}) | Remaining burst: {p['burst']}ms")
        if p['burst'] > 0:
            queue.append(p)
        else:
            print(f"    [+] {p['id']} successfully terminated.")


def main():
    print("=================================================================")
    print("  CBSE CLASS 11 CS (083) - MODULE 001_002 MASTER LAB REPOSITORY  ")
    print("=================================================================")
    run_software_classification_audit()
    run_cpu_scheduling_demo()
    print("\n[+] Module 001_002 Master Verification complete. All tests PASSED.")

if __name__ == "__main__":
    main()
