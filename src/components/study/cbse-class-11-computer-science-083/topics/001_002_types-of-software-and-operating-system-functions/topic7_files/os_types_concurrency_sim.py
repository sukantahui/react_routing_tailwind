"""
CBSE Class 11 Computer Science (083) - Unit 1 Computer Systems and Organisation
Module: Types of Software, OS Architecture & Language Processors
File: os_types_concurrency_sim.py
Topic 7: Types of Operating Systems - Single-User, Multi-User, Multiprogramming, Time-Sharing, RTOS, Distributed

Demonstrates:
1. Multiprogramming (Overlapping CPU burst with I/O wait)
2. Time-Sharing (Round Robin time slicing across multiple concurrent users)
3. Real-Time OS (Hard deadline deterministic scheduling)
4. Distributed OS (Network node load sharing)
"""

import collections
import time

class OperatingSystemTypeSimulator:
    """Simulates concurrency models across major OS paradigms."""
    
    @staticmethod
    def simulate_multiprogramming():
        print("\n--- [1. MULTIPROGRAMMING OS SIMULATION] ---")
        print("[*] Goal: Maximize CPU utilization by running Process B whenever Process A waits for I/O.")
        print("    Time 0ms: P1 starts CPU burst (Duration: 10ms)")
        print("    Time 10ms: P1 issues Disk Read -> CPU switches immediately to P2 (Duration: 15ms)")
        print("    Time 25ms: P1 Disk Read completes -> P1 resumes on CPU.")
        print("[+] CPU was 100% busy; 0ms wasted on idle waiting.")

    @staticmethod
    def simulate_timesharing(users: list, quantum_ms: int = 10):
        print(f"\n--- [2. TIME-SHARING MULTI-USER OS (Quantum: {quantum_ms}ms)] ---")
        queue = collections.deque(users)
        while queue:
            user = queue.popleft()
            print(f"[*] Allocating {quantum_ms}ms slice to {user['name']} on Terminal {user['tty']}...")
            user['remaining'] -= quantum_ms
            if user['remaining'] > 0:
                print(f"    -> Slice expired. Preempting {user['name']} (Remaining: {user['remaining']}ms) -> Appended to back of Ready Queue.")
                queue.append(user)
            else:
                print(f"    [+] {user['name']} task finished execution.")

    @staticmethod
    def simulate_rtos_deadline(task_name: str, deadline_ms: float, execution_ms: float):
        print(f"\n--- [3. REAL-TIME OS (RTOS) HARD DEADLINE CHECK] ---")
        print(f"[*] Critical Task: '{task_name}' | Max Permissible Deadline: {deadline_ms} ms")
        if execution_ms <= deadline_ms:
            print(f"[+] SUCCESS: Task completed in {execution_ms} ms <= {deadline_ms} ms deadline. Actuator fired safely.")
        else:
            print(f"[!] DEADLINE MISSED: Task took {execution_ms} ms > {deadline_ms} ms. SYSTEM SAFETY FAULT!")


def main():
    print("=================================================================")
    print("  CBSE CLASS 11 CS (083) - OS TAXONOMY CONCURRENCY SUITE         ")
    print("=================================================================\n")

    # 1. Multiprogramming
    OperatingSystemTypeSimulator.simulate_multiprogramming()

    # 2. Time-Sharing Multi-User
    users = [
        {"name": "Sukanta (Teacher)", "tty": "pts/0", "remaining": 20},
        {"name": "Mamata (Student)", "tty": "pts/1", "remaining": 15},
        {"name": "Ananya (Admin)", "tty": "pts/2", "remaining": 10}
    ]
    OperatingSystemTypeSimulator.simulate_timesharing(users, quantum_ms=10)

    # 3. Real-Time OS
    OperatingSystemTypeSimulator.simulate_rtos_deadline("Airbag Deployment Sensor", deadline_ms=5.0, execution_ms=1.8)

if __name__ == "__main__":
    main()
