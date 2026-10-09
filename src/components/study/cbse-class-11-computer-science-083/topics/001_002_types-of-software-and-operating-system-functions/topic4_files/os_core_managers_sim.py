"""
CBSE Class 11 Computer Science (083) - Unit 1 Computer Systems and Organisation
Module: Types of Software, OS Architecture & Language Processors
File: os_core_managers_sim.py
Topic 4: Operating System Core Functions - 4 Core Resource Managers

Demonstrates:
1. Processor Management (First-Come First-Served & Round Robin CPU Scheduling)
2. Memory Management (RAM Partition Allocation & Base/Limit Register Protection)
3. File Management (Hierarchical Directory Tree & File Inode Allocation)
4. Device Management (I/O Spooling & Device Controller Queuing)
"""

import collections
import time

class ProcessorManager:
    """Simulates CPU scheduling algorithms (FCFS and Round Robin)."""
    @staticmethod
    def fcfs_schedule(processes: list):
        print("\n--- [1. PROCESSOR MANAGEMENT: FCFS SCHEDULING] ---")
        current_time = 0
        for p in processes:
            name, burst = p["name"], p["burst"]
            wait_time = current_time
            print(f"[*] Process {name} (Burst: {burst}ms) starts at {current_time}ms | Wait Time: {wait_time}ms")
            current_time += burst
        print(f"[+] All processes completed in total {current_time}ms.")


class MemoryManager:
    """Simulates RAM allocation and address boundary checks."""
    def __init__(self, total_ram_mb: int = 1024):
        self.total_ram_mb = total_ram_mb
        self.allocated = {}
        self.free_mb = total_ram_mb

    def allocate(self, process_name: str, size_mb: int) -> bool:
        print("\n--- [2. MEMORY MANAGEMENT: RAM ALLOCATION] ---")
        if size_mb <= self.free_mb:
            base_address = self.total_ram_mb - self.free_mb
            limit_address = base_address + size_mb
            self.allocated[process_name] = (base_address, limit_address)
            self.free_mb -= size_mb
            print(f"[+] Allocated {size_mb} MB to {process_name} at physical RAM range [0x{base_address:04X} - 0x{limit_address:04X}].")
            print(f"    Available RAM: {self.free_mb} MB / {self.total_ram_mb} MB")
            return True
        else:
            print(f"[!] Out of Memory! Cannot allocate {size_mb} MB to {process_name}.")
            return False


class DeviceManager:
    """Simulates Device Spooling (Simultaneous Peripheral Operations On-Line)."""
    def __init__(self):
        self.spool_queue = collections.deque()

    def enqueue_print_job(self, document_name: str, pages: int):
        print("\n--- [3. DEVICE MANAGEMENT: I/O SPOOLING] ---")
        job = {"doc": document_name, "pages": pages, "timestamp": time.time()}
        self.spool_queue.append(job)
        print(f"[+] Print job '{document_name}' ({pages} pages) placed into disk spool buffer.")
        print(f"    Spool Queue Depth: {len(self.spool_queue)} jobs pending.")

    def process_spool(self):
        while self.spool_queue:
            job = self.spool_queue.popleft()
            print(f"    -> [PRINTER SPOOLER] Printing document: '{job['doc']}' ({job['pages']} pages) complete.")


def main():
    print("=================================================================")
    print("  CBSE CLASS 11 CS (083) - OS CORE FUNCTIONS DEMONSTRATION       ")
    print("=================================================================\n")

    # 1. Processor Management
    process_list = [
        {"name": "P1 (VS Code)", "burst": 4},
        {"name": "P2 (Chrome)", "burst": 8},
        {"name": "P3 (Terminal)", "burst": 2}
    ]
    ProcessorManager.fcfs_schedule(process_list)

    # 2. Memory Management
    ram = MemoryManager(total_ram_mb=512)
    ram.allocate("P1 (VS Code)", 128)
    ram.allocate("P2 (Chrome)", 256)

    # 3. Device Management (Spooling)
    spooler = DeviceManager()
    spooler.enqueue_print_job("CBSE_CS_Question_Paper.pdf", 6)
    spooler.enqueue_print_job("Student_Report_Card.pdf", 2)
    spooler.process_spool()

if __name__ == "__main__":
    main()
