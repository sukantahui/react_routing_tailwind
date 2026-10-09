"""
CBSE Class 11 Computer Science (083)
Topic 8: Fast Base Conversion Shortcuts & Speed Calculation Tricks
Author: Sukanta Hui

This script demonstrates algorithmic speed shortcuts:
1. Powers of Two table lookup & fast decomposition.
2. Bit masking for instant binary to Octal / Hex.
3. Fast mental arithmetic for CBSE examination speed.
"""

def powers_of_two_table(n=12):
    """Generates powers of two up to 2^n."""
    return {f"2^{i}": (1 << i) for i in range(n + 1)}

def rapid_decimal_to_binary_subtraction(decimal_val):
    """
    Rapid conversion via highest power of 2 subtraction:
    e.g., 156 -> 156 - 128 = 28 -> 28 - 16 = 12 -> 12 - 8 = 4 -> 4 - 4 = 0
    Bits at [128, 16, 8, 4] -> 10011100
    """
    powers = [128, 64, 32, 16, 8, 4, 2, 1]
    bits = []
    rem = decimal_val
    steps = []
    
    for p in powers:
        if rem >= p:
            bits.append("1")
            steps.append(f"{rem} >= {p} -> Bit 1, remaining = {rem - p}")
            rem -= p
        else:
            bits.append("0")
            steps.append(f"{rem} < {p} -> Bit 0")
            
    binary_str = "".join(bits).lstrip("0") or "0"
    return binary_str, steps

def rapid_hex_octal_direct_bridge(hex_str):
    """
    Direct bridge: Hex -> 4-bit Binary -> 3-bit Octal groups
    """
    hex_clean = hex_str.strip().upper()
    # 1. Expand to 4-bit nibbles
    bin_str = "".join(bin(int(c, 16))[2:].zfill(4) for c in hex_clean)
    
    # 2. Pad to multiple of 3 for octal
    octal_pad = (3 - len(bin_str) % 3) % 3
    padded_bin = ("0" * octal_pad) + bin_str
    
    # 3. Group by 3 bits
    octal_digits = []
    for i in range(0, len(padded_bin), 3):
        group = padded_bin[i:i+3]
        octal_digits.append(str(int(group, 2)))
        
    octal_str = "".join(octal_digits).lstrip("0") or "0"
    return bin_str, octal_str

if __name__ == "__main__":
    print("=== CBSE Class 11 CS: Speed Base Conversion Tricks ===")
    test_val = 156
    bin_res, steps = rapid_decimal_to_binary_subtraction(test_val)
    print(f"\n1. Subtraction Trick for Decimal {test_val}:")
    for s in steps:
        print("  *", s)
    print(f"Result: ({test_val})10 = ({bin_res})2")
    
    hex_val = "2E"
    raw_bin, oct_res = rapid_hex_octal_direct_bridge(hex_val)
    print(f"\n2. Direct Bridge Trick for Hex '{hex_val}':")
    print(f"  * 4-bit binary expansion: {raw_bin}")
    print(f"  * Octal conversion: ({oct_res})8")
