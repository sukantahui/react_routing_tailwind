"""
=============================================================================
Secondary Storage Benchmark & Architecture Comparison (Python 3)
CBSE Class XI Computer Science (Subject Code: 083)
Unit I: Computer Systems and Organisation (CSO)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
=============================================================================
Compares the physical storage mechanisms, read/write speeds, and architectures of:
1. Magnetic Media: Hard Disk Drives (HDD) - Cylinders, Tracks, Sectors, Seek Time
2. Solid-State Media: SATA SSDs & NVMe PCIe Gen4/Gen5 (NAND Flash Floating Gates)
3. Optical Media: CD-ROM (700 MB), DVD (4.7 GB), Blu-ray (25-50 GB)
4. Flash Drives & Memory Cards (USB 3.2, SD Express)
"""

def storage_media_comparison():
    """Outputs a comprehensive technical benchmark comparing secondary storage media."""
    media_data = [
        {
            "Storage Media": "Mechanical HDD (7200 RPM)",
            "Technology": "Magnetic Platters + Actuator Arm Read/Write Head",
            "Sequential Read Speed": "120 – 200 MB/s",
            "Random Access Latency": "10 – 15 Milliseconds (Seek + Rotational delay)",
            "Durability / Shock": "Vulnerable to physical drops & vibration",
            "Typical Capacities": "1 TB – 22 TB (High capacity at lowest cost/GB)"
        },
        {
            "Storage Media": "SATA III SSD (2.5\")",
            "Technology": "3D TLC/QLC NAND Flash (Electrical Tunneling)",
            "Sequential Read Speed": "500 – 550 MB/s",
            "Random Access Latency": "0.05 – 0.1 Milliseconds (50-100 microseconds)",
            "Durability / Shock": "Immune to shock, zero moving parts, silent",
            "Typical Capacities": "250 GB – 4 TB"
        },
        {
            "Storage Media": "NVMe M.2 SSD (PCIe 4.0)",
            "Technology": "3D NAND Flash + Direct PCIe 4-Lane Bus",
            "Sequential Read Speed": "5,000 – 7,500 MB/s",
            "Random Access Latency": "0.01 – 0.03 Milliseconds (10-30 microseconds)",
            "Durability / Shock": "Immune to shock, compact M.2 2280 stick",
            "Typical Capacities": "500 GB – 8 TB (High-end workstations)"
        },
        {
            "Storage Media": "Blu-ray Disc (BD-ROM)",
            "Technology": "Optical Laser Pits & Lands (405nm Blue-Violet Laser)",
            "Sequential Read Speed": "36 – 54 MB/s (12x drive speed)",
            "Random Access Latency": "100 – 150 Milliseconds",
            "Durability / Shock": "Scratch-prone, immune to magnetic fields",
            "Typical Capacities": "25 GB (Single Layer) / 50 GB (Dual Layer)"
        },
        {
            "Storage Media": "USB 3.2 Flash Drive",
            "Technology": "NAND Flash Memory + USB Interface Controller",
            "Sequential Read Speed": "100 – 400 MB/s",
            "Random Access Latency": "0.1 – 0.5 Milliseconds",
            "Durability / Shock": "Highly portable, solid-state, water resistant",
            "Typical Capacities": "32 GB – 1 TB (Portable transfer media)"
        }
    ]

    print("\n" + "=" * 90)
    print("SECONDARY STORAGE BENCHMARK AUDIT (CBSE CLASS XI CS 083)")
    print("=" * 90)
    for row in media_data:
        print(f"\n[{row['Storage Media']}]")
        print(f"  Physical Principle     : {row['Technology']}")
        print(f"  Sequential Throughput  : {row['Sequential Read Speed']}")
        print(f"  Access Latency Delay   : {row['Random Access Latency']}")
        print(f"  Physical Durability    : {row['Durability / Shock']}")
        print(f"  Standard Capacities    : {row['Typical Capacities']}")


def calculate_hdd_access_time(seek_time_ms: float, rpm: float, transfer_rate_mb_s: float, block_size_kb: float):
    """Calculates total magnetic disk access time."""
    # Rotational Latency = Half of one full revolution time
    time_per_rev_sec = 60.0 / rpm
    avg_rotational_latency_ms = (time_per_rev_sec / 2.0) * 1000.0

    # Transfer Time (ms) = (Block Size in MB) / (Transfer Rate in MB/s) * 1000
    block_size_mb = block_size_kb / 1024.0
    transfer_time_ms = (block_size_mb / transfer_rate_mb_s) * 1000.0

    total_access_time_ms = seek_time_ms + avg_rotational_latency_ms + transfer_time_ms

    print("\n" + "=" * 70)
    print(f"MAGNETIC HDD ACCESS TIME CALCULATION ({rpm:.0f} RPM, Seek={seek_time_ms}ms)")
    print("=" * 70)
    print(f"1. Average Seek Time         : {seek_time_ms:.2f} ms (Mechanical arm movement)")
    print(f"2. Average Rotational Delay  : {avg_rotational_latency_ms:.2f} ms (Platter spin to sector)")
    print(f"3. Data Transfer Time        : {transfer_time_ms:.4f} ms ({block_size_kb} KB payload)")
    print(f"--> Total Disk Access Time   : {total_access_time_ms:.2f} milliseconds")
    print(f"Comparison: An NVMe SSD is ~{total_access_time_ms / 0.02:.0f}x faster with ZERO seek/rotational delay!")


if __name__ == "__main__":
    storage_media_comparison()
    calculate_hdd_access_time(seek_time_ms=8.5, rpm=7200.0, transfer_rate_mb_s=150.0, block_size_kb=64.0)
