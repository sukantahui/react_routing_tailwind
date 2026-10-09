"""
CBSE Class 11 Computer Science (083) - Unit 1 Computer Systems and Organisation
Module: Number Systems & Radix Conversion Algorithms
File: binary_octal_grouper.py
Topic 3: Binary to Octal (3-Bit Grouping) and Octal to Binary Conversion

Demonstrates:
1. Binary to Octal: Grouping bits into triplets (3-bit chunks) from right to left (padding with leading zeros if needed)
2. Octal to Binary: Expanding each octal digit (0-7) into its exact 3-bit binary equivalent
3. 2^3 = 8 bit-equivalence relationship
"""

OCTAL_TO_BIN_MAP = {
    '0': '000', '1': '001', '2': '010', '3': '011',
    '4': '100', '5': '101', '6': '110', '7': '111'
}

BIN_TO_OCTAL_MAP = {v: k for k, v in OCTAL_TO_BIN_MAP.items()}

def binary_to_octal_grouping(bin_str: str) -> tuple:
    """Converts a binary integer string to octal using 3-bit grouping."""
    clean_bin = bin_str.replace(" ", "").strip()
    
    # Pad with leading zeros so length is a multiple of 3
    remainder = len(clean_bin) % 3
    padded_bin = ("0" * (3 - remainder) + clean_bin) if remainder != 0 else clean_bin
    
    # Split into 3-bit chunks
    chunks = [padded_bin[i:i+3] for i in range(0, len(padded_bin), 3)]
    octal_digits = [BIN_TO_OCTAL_MAP[c] for c in chunks]
    octal_result = "".join(octal_digits)
    
    print(f"\n--- [BINARY TO OCTAL (3-BIT GROUPING)] ---")
    print(f"Original Binary: {clean_bin}")
    print(f"Padded (x3):     {padded_bin}")
    print(f"Triplets:        {' | '.join(chunks)}")
    print(f"Octal Digits:    {' | '.join(octal_digits)}")
    print(f"[+] ({clean_bin})₂ = ({octal_result})₈\n")
    return octal_result, chunks, octal_digits


def octal_to_binary_expansion(oct_str: str) -> tuple:
    """Converts an octal string to binary by expanding each digit into 3 bits."""
    clean_oct = oct_str.strip()
    triplets = []
    
    for digit in clean_oct:
        if digit not in OCTAL_TO_BIN_MAP:
            raise ValueError(f"Invalid octal digit: {digit}")
        triplets.append(OCTAL_TO_BIN_MAP[digit])
    
    full_binary = "".join(triplets).lstrip("0") or "0"
    print(f"\n--- [OCTAL TO BINARY (3-BIT EXPANSION)] ---")
    print(f"Octal Input:     {' | '.join(list(clean_oct))}")
    print(f"3-Bit Expansions:{' | '.join(triplets)}")
    print(f"[+] ({clean_oct})₈ = ({full_binary})₂\n")
    return full_binary, triplets


def main():
    print("=================================================================")
    print("  CBSE CLASS 11 CS (083) - BINARY <-> OCTAL CONVERSION SUITE     ")
    print("=================================================================\n")

    # 1. Binary to Octal
    binary_to_octal_grouping("101110010")
    binary_to_octal_grouping("1101011")  # Needs padding

    # 2. Octal to Binary
    octal_to_binary_expansion("562")

if __name__ == "__main__":
    main()
