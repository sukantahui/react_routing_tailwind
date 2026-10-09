"""
=============================================================================
Primary Memory (RAM vs ROM) Architecture & Audit (Python 3)
CBSE Class XI Computer Science (Subject Code: 083)
Unit I: Computer Systems and Organisation (CSO)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
=============================================================================
Compares Primary Memory technologies:
1. Volatile RAM (SRAM: Flip-flops vs DRAM: Capacitors + Refresh Cycles)
2. Non-Volatile ROM (Masked ROM, PROM, EPROM - UV light, EEPROM - Flash)
"""

def compare_ram_technologies():
    """Generates a technical audit comparing SRAM and DRAM."""
    ram_data = [
        {
            "Parameter": "Basic Storage Element",
            "SRAM (Static RAM)": "6 Transistors (Flip-Flop latch)",
            "DRAM (Dynamic RAM)": "1 Transistor + 1 Micro-Capacitor"
        },
        {
            "Parameter": "Need for Periodic Refreshing",
            "SRAM (Static RAM)": "NO refreshing required",
            "DRAM (Dynamic RAM)": "YES (Capacitor leaks charge; refreshed every ~64ms)"
        },
        {
            "Parameter": "Access Latency",
            "SRAM (Static RAM)": "Ultra-fast (0.5 to 5 nanoseconds)",
            "DRAM (Dynamic RAM)": "Moderate (10 to 50 nanoseconds)"
        },
        {
            "Parameter": "Silicon Packing Density",
            "SRAM (Static RAM)": "Low density (requires 6x silicon area)",
            "DRAM (Dynamic RAM)": "High density (billions of cells per chip)"
        },
        {
            "Parameter": "Cost per Gigabyte",
            "SRAM (Static RAM)": "Very Expensive",
            "DRAM (Dynamic RAM)": "Inexpensive / Economical"
        },
        {
            "Parameter": "Primary Use in Computers",
            "SRAM (Static RAM)": "CPU L1, L2, L3 Cache Memory",
            "DRAM (Dynamic RAM)": "Main System RAM (DDR4 / DDR5 sticks)"
        }
    ]

    print("\n" + "=" * 75)
    print("PRIMARY MEMORY: SRAM (STATIC RAM) vs DRAM (DYNAMIC RAM)")
    print("=" * 75)
    for row in ram_data:
        print(f"{row['Parameter']:<32} | {row['SRAM (Static RAM)']:<25} | {row['DRAM (Dynamic RAM)']}")


def compare_rom_technologies():
    """Generates a technical audit comparing ROM variations."""
    rom_data = [
        {
            "Type": "Masked ROM",
            "Full Name": "Read-Only Memory",
            "Programming Method": "Hardwired during factory silicon lithography",
            "Erasure Method": "Cannot be erased or rewritten (Permanent)"
        },
        {
            "Type": "PROM",
            "Full Name": "Programmable ROM",
            "Programming Method": "Programmed once using electrical fuse burner",
            "Erasure Method": "OTP (One-Time Programmable, irreversible)"
        },
        {
            "Type": "EPROM",
            "Full Name": "Erasable Programmable ROM",
            "Programming Method": "High voltage pulse programmer",
            "Erasure Method": "Exposing quartz window to intense Ultraviolet (UV) light for 20 mins"
        },
        {
            "Type": "EEPROM",
            "Full Name": "Electrically Erasable PROM",
            "Programming Method": "In-circuit electrical voltage pulses",
            "Erasure Method": "Electrically byte-erasable in system (Flash BIOS firmware)"
        }
    ]

    print("\n" + "=" * 85)
    print("NON-VOLATILE MEMORY: ROM EVOLUTION (PROM, EPROM, EEPROM)")
    print("=" * 85)
    for row in rom_data:
        print(f"[{row['Type']}] - {row['Full Name']}")
        print(f"  Programming : {row['Programming Method']}")
        print(f"  Erasure     : {row['Erasure Method']}\n")


if __name__ == "__main__":
    compare_ram_technologies()
    compare_rom_technologies()
