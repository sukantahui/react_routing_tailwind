"""
=============================================================================
System Bus Architecture & Address Space Calculator (Python 3)
CBSE Class XI Computer Science (Subject Code: 083)
Unit I: Computer Systems and Organisation (CSO)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
=============================================================================
Simulates the functional operation of the System Bus trio:
1. Address Bus (Unidirectional, determines addressable memory = 2^N bytes)
2. Data Bus (Bidirectional, determines word transfer width)
3. Control Bus (Unidirectional/Bidirectional control and timing lines)
"""

def analyze_system_bus(address_lines: int, data_lines: int, clock_mhz: float):
    """Calculates theoretical memory capacity and bus bandwidth."""
    # 1. Total Addressable Memory Space
    total_locations = 2 ** address_lines
    total_bytes = total_locations  # Assuming byte-addressable memory

    kb = total_bytes / 1024
    mb = kb / 1024
    gb = mb / 1024
    tb = gb / 1024

    if tb >= 1.0:
        formatted_capacity = f"{tb:.2f} Terabytes (TB)"
    elif gb >= 1.0:
        formatted_capacity = f"{gb:.2f} Gigabytes (GB)"
    elif mb >= 1.0:
        formatted_capacity = f"{mb:.2f} Megabytes (MB)"
    else:
        formatted_capacity = f"{kb:.2f} Kilobytes (KB)"

    # 2. Data Bus Word Width
    bytes_per_transfer = data_lines / 8

    # 3. Peak Bus Bandwidth (Bytes/sec = Clock Frequency * Bytes per transfer)
    clock_hz = clock_mhz * 1_000_000
    peak_bandwidth_bps = clock_hz * bytes_per_transfer
    bandwidth_mb_s = peak_bandwidth_bps / (1024 * 1024)
    bandwidth_gb_s = bandwidth_mb_s / 1024

    print(f"\n--- SYSTEM BUS ARCHITECTURE REPORT ({address_lines}-bit Address / {data_lines}-bit Data) ---")
    print(f"Address Bus Width         : {address_lines} lines (Unidirectional CPU -> Memory/IO)")
    print(f"Directly Addressable RAM  : {total_locations:,} bytes -> {formatted_capacity}")
    print(f"Data Bus Width            : {data_lines} lines ({bytes_per_transfer:.1f} Bytes/transfer - Bidirectional)")
    print(f"Bus Clock Frequency       : {clock_mhz:.1f} MHz")
    print(f"Peak Data Bandwidth       : {bandwidth_gb_s:.2f} GB/s ({bandwidth_mb_s:,.1f} MB/s)")


def simulate_bus_transaction(operation: str, address: int, data_payload: int):
    """Simulates a single Read or Write cycle across the System Bus."""
    print("\n" + "=" * 60)
    print(f"SIMULATING {operation.upper()} CYCLE OVER SYSTEM BUS")
    print("=" * 60)

    # 1. Address Bus drives the address
    hex_addr = f"0x{address:04X}"
    print(f"[Address Bus] CPU latches address {hex_addr} (Unidirectional line active)")

    # 2. Control Bus issues Read/Write strobes
    if operation.upper() == "READ":
        print(f"[Control Bus] CPU asserts MEM_READ line (Low Active / Strobe pulse)")
        print(f"[Data Bus]    RAM drives data {data_payload} (0x{data_payload:04X}) into CPU via Data Bus (Bidirectional)")
    else:
        print(f"[Data Bus]    CPU places data {data_payload} (0x{data_payload:04X}) onto Data Bus")
        print(f"[Control Bus] CPU asserts MEM_WRITE line (Latches data into RAM[{hex_addr}])")

    print("[Transaction Complete] Bus returns to high-impedance idle state.")


if __name__ == "__main__":
    print("=================================================================")
    print("CBSE CLASS XI CS 083: SYSTEM BUS SPECIFICATION AUDIT")
    print("=================================================================")

    # Historic 16-bit 8086 system (1 MB RAM, 16-bit data, 8 MHz)
    analyze_system_bus(address_lines=20, data_lines=16, clock_mhz=8.0)

    # 32-bit Architecture (4 GB RAM, 32-bit data, 800 MHz DDR)
    analyze_system_bus(address_lines=32, data_lines=32, clock_mhz=800.0)

    # Modern 64-bit Architecture (48-bit physical address lines, 64-bit data, 3200 MHz DDR4)
    analyze_system_bus(address_lines=48, data_lines=64, clock_mhz=3200.0)

    # Transaction Simulation
    simulate_bus_transaction("READ", address=0x10FA, data_payload=450)
    simulate_bus_transaction("WRITE", address=0x205C, data_payload=899)
