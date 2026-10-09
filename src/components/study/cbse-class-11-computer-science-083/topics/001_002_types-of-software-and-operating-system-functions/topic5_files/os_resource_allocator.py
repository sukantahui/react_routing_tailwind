"""
CBSE Class 11 Computer Science (083) - Unit 1 Computer Systems and Organisation
Module: Types of Software, OS Architecture & Language Processors
File: os_resource_allocator.py
Topic 5: Operating System as a Resource Manager and Virtual Machine (Extended Machine)

Demonstrates:
1. Dual Views of an Operating System:
   - Resource Manager View (Allocator of CPU, RAM, Disk, I/O)
   - Virtual Machine / Extended Machine View (Hardware Abstraction Layer via System Calls)
2. System Call Trap & Privilege Level Transition (User Mode vs Kernel Mode)
"""

import time

class OperatingSystemVirtualMachine:
    """Simulates the OS as an Extended Machine providing an abstract, friendly virtual interface."""
    
    PRIVILEGE_USER = "Ring 3 (User Mode - Unprivileged)"
    PRIVILEGE_KERNEL = "Ring 0 (Kernel Mode - Privileged Direct Hardware Access)"

    def __init__(self):
        self.current_mode = self.PRIVILEGE_USER

    def issue_system_call(self, sys_call_name: str, args: dict) -> dict:
        print(f"\n[*] [APP] Executing in {self.current_mode}...")
        print(f"[*] [APP] Calling high-level system API: '{sys_call_name}' with args {args}")
        
        # Hardware Software Interrupt (Trap)
        print("    [!] TRAP (Software Interrupt INT 0x80) Triggered!")
        print(f"    [!] CPU Mode Switched: {self.PRIVILEGE_USER} -> {self.PRIVILEGE_KERNEL}")
        self.current_mode = self.PRIVILEGE_KERNEL
        time.sleep(0.05)

        # Kernel performs raw hardware interaction
        print(f"    [+] [KERNEL] Executing privileged driver instructions on physical hardware...")
        result = {"status": "SUCCESS", "message": f"System call '{sys_call_name}' completed safely."}

        # Return to User Mode
        self.current_mode = self.PRIVILEGE_USER
        print(f"    [+] CPU Mode Restored: -> {self.PRIVILEGE_USER}")
        print(f"[+] [APP] Received result from OS Extended Machine: {result['message']}")
        return result


def main():
    print("=================================================================")
    print("  CBSE CLASS 11 CS (083) - OS AS RESOURCE MGR & VIRTUAL MACHINE ")
    print("=================================================================\n")

    os_vm = OperatingSystemVirtualMachine()

    # 1. System call for file writing
    os_vm.issue_system_call("sys_write", {"file": "report.txt", "data": "CBSE CS 083 High Marks"})

    # 2. System call for network packet transmission
    os_vm.issue_system_call("sys_socket_send", {"ip": "192.168.1.100", "port": 8080})

if __name__ == "__main__":
    main()
