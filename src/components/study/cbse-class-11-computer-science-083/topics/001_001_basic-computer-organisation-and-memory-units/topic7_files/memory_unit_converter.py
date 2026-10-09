"""
=============================================================================
Units of Memory Measurement & Conversion Engine (Python 3)
CBSE Class XI Computer Science (Subject Code: 083)
Unit I: Computer Systems and Organisation (CSO)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
=============================================================================
Calculates exact digital storage conversions across all standard units:
Bit -> Nibble (4 bits) -> Byte (8 bits) -> KB -> MB -> GB -> TB -> PB -> EB -> ZB -> YB
Contrasts Binary (2^10 = 1024) vs Decimal SI (10^3 = 1000) prefixes.
"""

UNITS_BINARY = [
    ("Bit", 1 / 8),
    ("Nibble", 4 / 8),
    ("Byte", 1),
    ("Kilobyte (KB)", 1024),
    ("Megabyte (MB)", 1024**2),
    ("Gigabyte (GB)", 1024**3),
    ("Terabyte (TB)", 1024**4),
    ("Petabyte (PB)", 1024**5),
    ("Exabyte (EB)", 1024**6),
    ("Zettabyte (ZB)", 1024**7),
    ("Yottabyte (YB)", 1024**8),
]


def convert_memory(value: float, from_unit: str):
    """Converts a given memory value into all standard units."""
    # Find base byte value
    from_unit_lower = from_unit.lower()
    base_bytes = 0.0
    matched = False

    for name, factor in UNITS_BINARY:
        if from_unit_lower in name.lower() or name.lower().startswith(from_unit_lower):
            base_bytes = value * factor
            matched = True
            selected_name = name
            break

    if not matched:
        print(f"Error: Unit '{from_unit}' not recognized.")
        return

    print("\n" + "=" * 75)
    print(f"CONVERTING {value:,.4f} {selected_name.upper()} ACROSS MEMORY HIERARCHY")
    print("=" * 75)
    print(f"Base Total Bits  : {base_bytes * 8:,.0f} bits")
    print(f"Base Total Bytes : {base_bytes:,.4f} bytes\n")

    for name, factor in UNITS_BINARY:
        converted = base_bytes / factor
        power_2_exp = 0
        if factor >= 1:
            import math
            power_2_exp = int(math.log2(factor)) if factor > 1 else 0
            power_str = f"2^{power_2_exp} Bytes" if factor > 1 else "1 Byte"
        else:
            power_str = "0.5 Byte" if factor == 0.5 else "0.125 Byte"

        print(f"{name:<20} | {converted:>22,.6f} | Factor: {power_str}")


def solve_cbse_word_problems():
    """Demonstrates standard numerical problems from CBSE examination papers."""
    print("\n" + "=" * 75)
    print("CBSE CLASS XI CS 083: SOLVED NUMERICAL PROBLEMS")
    print("=" * 75)

    # Problem 1: How many 5 MB photos can fit on a 16 GB pendrive?
    pendrive_mb = 16 * 1024
    photo_mb = 5
    total_photos = pendrive_mb // photo_mb
    print(f"Problem 1: Photos (5 MB each) fitting on 16 GB Pendrive:")
    print(f"  16 GB = 16 * 1024 MB = {pendrive_mb:,} MB")
    print(f"  Total Photos = {pendrive_mb} / {photo_mb} = {total_photos:,} Photos\n")

    # Problem 2: Convert 4 Terabytes into Kilobytes
    tb_val = 4
    kb_val = tb_val * (1024 ** 3)
    print(f"Problem 2: Convert 4 TB into Kilobytes (KB):")
    print(f"  4 TB = 4 * 1024 GB = 4 * 1024 * 1024 MB = 4 * (1024^3) KB")
    print(f"  4 TB = {kb_val:,} Kilobytes (KB) = 2^32 KB\n")

    # Problem 3: How many bits in 2.5 Megabytes?
    mb_val = 2.5
    bits_val = mb_val * 1024 * 1024 * 8
    print(f"Problem 3: Total Bits in 2.5 Megabytes:")
    print(f"  2.5 MB = 2.5 * 1,048,576 Bytes * 8 bits/byte")
    print(f"  Total Bits = {bits_val:,} bits")


if __name__ == "__main__":
    convert_memory(1.0, "GB")
    solve_cbse_word_problems()
