"""
================================================================================
CBSE CLASS XI COMPUTER SCIENCE (083) - UNIT I
MODULE 001_002: OPERATING SYSTEM SIMULATION LABORATORY
Topic: CPU Process Scheduling & Memory Allocation Simulator
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================
"""

from typing import List, Dict


class Process:
    """Represents a process managed by the Operating System Kernel."""
    def __init__(self, pid: str, name: str, burst_time: int, ram_required_mb: int, priority: int = 1):
        self.pid = pid
        self.name = name
        self.burst_time = burst_time          # Total CPU milliseconds required
        self.remaining_time = burst_time
        self.ram_required_mb = ram_required_mb
        self.priority = priority              # 1 (High) to 5 (Low)
        self.waiting_time = 0
        self.turnaround_time = 0
        self.state = "READY"                  # READY, RUNNING, TERMINATED

    def __repr__(self):
        return f"[{self.pid}] {self.name} (Burst: {self.burst_time}ms, RAM: {self.ram_required_mb}MB)"


class OperatingSystemKernel:
    """Simulates core OS functions: Memory Management & CPU Scheduling."""
    def __init__(self, total_ram_mb: int = 8192):
        self.total_ram_mb = total_ram_mb
        self.available_ram_mb = total_ram_mb
        self.ready_queue: List[Process] = []
        self.terminated_processes: List[Process] = []

    def allocate_memory(self, process: Process) -> bool:
        """Memory Management: Verifies and allocates RAM."""
        if process.ram_required_mb <= self.available_ram_mb:
            self.available_ram_mb -= process.ram_required_mb
            self.ready_queue.append(process)
            print(f"[OS Memory Manager] Allocated {process.ram_required_mb}MB to {process.pid} ({process.name}). Free RAM: {self.available_ram_mb}MB")
            return True
        else:
            print(f"[OS Memory Manager - ALERT] Out of Memory! Cannot allocate {process.ram_required_mb}MB to {process.pid}. Free RAM: {self.available_ram_mb}MB")
            return False

    def simulate_round_robin(self, time_quantum_ms: int = 4):
        """CPU Management: Simulates Round-Robin Multitasking Time-Sharing."""
        print("\n" + "=" * 65)
        print(f"STARTING CPU ROUND-ROBIN SCHEDULING (Time Quantum: {time_quantum_ms}ms)")
        print("=" * 65)

        current_time = 0
        queue = list(self.ready_queue)

        while queue:
            proc = queue.pop(0)
            proc.state = "RUNNING"
            execution_slice = min(proc.remaining_time, time_quantum_ms)
            proc.remaining_time -= execution_slice
            current_time += execution_slice

            print(f"Time {current_time:03d}ms: Process {proc.pid} ({proc.name}) ran for {execution_slice}ms | Remaining: {proc.remaining_time}ms")

            if proc.remaining_time == 0:
                proc.state = "TERMINATED"
                proc.turnaround_time = current_time
                proc.waiting_time = proc.turnaround_time - proc.burst_time
                self.available_ram_mb += proc.ram_required_mb
                self.terminated_processes.append(proc)
                print(f"  >>> Process {proc.pid} TERMINATED. Reclaimed {proc.ram_required_mb}MB RAM.")
            else:
                proc.state = "READY"
                queue.append(proc)  # Put back at end of round-robin queue

        print("\n" + "=" * 65)
        print("SCHEDULING PERFORMANCE AUDIT METRICS")
        print("=" * 65)
        total_waiting = sum(p.waiting_time for p in self.terminated_processes)
        total_turnaround = sum(p.turnaround_time for p in self.terminated_processes)
        n = len(self.terminated_processes)

        for p in self.terminated_processes:
            print(f"PID: {p.pid} | {p.name:<24} | Burst: {p.burst_time}ms | Waiting: {p.waiting_time}ms | Turnaround: {p.turnaround_time}ms")

        print("-" * 65)
        print(f"Average Waiting Time: {total_waiting / n:.2f} ms")
        print(f"Average Turnaround Time: {total_turnaround / n:.2f} ms")
        print(f"Final Available RAM: {self.available_ram_mb} MB (100% Deallocated)")


if __name__ == "__main__":
    # Initialize simulated OS with 4096 MB RAM
    os_kernel = OperatingSystemKernel(total_ram_mb=4096)

    # Create processes representing student workstations in Barrackpore
    p1 = Process("P101", "Python IDLE Compiler", burst_time=12, ram_required_mb=512)
    p2 = Process("P102", "VS Code Editor", burst_time=8, ram_required_mb=1024)
    p3 = Process("P103", "CBSE Marksheet Database", burst_time=16, ram_required_mb=1536)
    p4 = Process("P104", "Antivirus Background Scan", burst_time=6, ram_required_mb=512)

    # Load processes into OS memory
    for proc in [p1, p2, p3, p4]:
        os_kernel.allocate_memory(proc)

    # Execute CPU scheduling simulation
    os_kernel.simulate_round_robin(time_quantum_ms=4)
