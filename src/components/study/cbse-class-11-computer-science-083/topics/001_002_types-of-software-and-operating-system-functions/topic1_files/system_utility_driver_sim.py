"""
CBSE Class 11 Computer Science (083) - Unit 1 Computer Systems and Organisation
Module: Types of Software, OS Architecture & Language Processors
File: system_utility_driver_sim.py
Topic 1: System Software - Operating Systems, Device Drivers & System Utilities

Demonstrates:
1. Hardware Abstraction Layer & Device Driver communication via I/O Control (IOCTL)
2. System Utilities: Disk Defragmentation & Compression simulation
3. Antivirus signature hash checking simulation
"""

import hashlib
import time

class DeviceDriver:
    """Simulates an OS Device Driver translating high-level read/write commands into hardware packets."""
    def __init__(self, device_name: str, device_type: str):
        self.device_name = device_name
        self.device_type = device_type
        self.is_initialized = False
        self.buffer = []

    def initialize_hardware(self):
        print(f"[*] [DRIVER] Initializing {self.device_name} ({self.device_type})...")
        time.sleep(0.1)
        self.is_initialized = True
        print(f"[+] [DRIVER] {self.device_name} handshaking complete. Interrupt Vector IRQ registered.")

    def send_command(self, high_level_cmd: str, data: str = "") -> dict:
        if not self.is_initialized:
            return {"status": "ERROR", "msg": "Hardware not initialized."}
        
        # Translate generic OS command into hardware control signals
        hardware_opcode = f"0x{len(high_level_cmd):02X}"
        packet = {
            "device": self.device_name,
            "opcode": hardware_opcode,
            "raw_payload": data.encode("utf-8").hex().upper(),
            "status": "SUCCESS"
        }
        print(f"    -> [OS API] -> [DRIVER: {self.device_name}] -> [HW BUS]: Translated '{high_level_cmd}' to Opcode {hardware_opcode}")
        return packet


class SystemUtilities:
    """Simulates essential OS Maintenance Utilities."""
    
    @staticmethod
    def disk_defragmenter_simulation(fragmented_clusters: list) -> list:
        print("\n--- [UTILITY 1: DISK DEFRAGMENTER] ---")
        print(f"Original Cluster Map: {fragmented_clusters}")
        # Compact and group contiguous file blocks
        defragged = sorted(fragmented_clusters, key=lambda x: (x != 'EMPTY', x))
        print(f"Defragmented Layout:  {defragged}")
        print("[+] Head movement reduced from 14ms seek time to 2.1ms sequential read time.")
        return defragged

    @staticmethod
    def antivirus_scanner(file_data: str, known_signatures: list) -> bool:
        print("\n--- [UTILITY 2: ANTIVIRUS SIGNATURE ENGINE] ---")
        file_hash = hashlib.sha256(file_data.encode()).hexdigest()
        print(f"File SHA-256 Hash: {file_hash}")
        for sig in known_signatures:
            if sig.lower() in file_hash.lower():
                print(f"[!] MALWARE DETECTED matching signature: {sig}")
                return True
        print("[+] File scanned: Clean. No heuristic signatures found.")
        return False


def main():
    print("=================================================================")
    print("  CBSE CLASS 11 CS (083) - SYSTEM SOFTWARE & UTILITIES SIMULATOR ")
    print("=================================================================\n")

    # 1. Device Driver Demonstration
    printer_driver = DeviceDriver("LaserJet Pro 400", "Output Peripheral")
    printer_driver.initialize_hardware()
    printer_driver.send_command("PRINT_DOCUMENT", "CBSE Class 11 CS 083 Notes")

    # 2. Disk Defragmenter Simulation
    disk_clusters = ['FILE_A', 'EMPTY', 'FILE_B', 'FILE_A', 'FILE_C', 'EMPTY', 'FILE_B']
    SystemUtilities.disk_defragmenter_simulation(disk_clusters)

    # 3. Antivirus Scanner Simulation
    signatures = ["a1b2c3d4", "deadbeef", "e3b0c442"]
    sample_payload = "Clean student python script for CBSE practical lab."
    SystemUtilities.antivirus_scanner(sample_payload, signatures)

if __name__ == "__main__":
    main()
