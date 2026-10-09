"""
CBSE Class 11 Computer Science (083) - Unit 1 Computer Systems and Organisation
Module: Number Systems & Radix Conversion Algorithms
File: binary_hex_grouper.py
Topic 4: Binary to Hexadecimal (4-Bit Grouping) and Hexadecimal to Binary Conversion

Demonstrates:
1. Binary to Hexadecimal: Grouping bits into nibbles (4-bit chunks) from right to left (padding with leading zeros if needed)
2. Hexadecimal to Binary: Expanding each hex character (0-9, A-F) into its exact 4-bit binary equivalent
3. 2^4 = 16 bit-equivalence relationship
"""

HEX_TO_BIN_MAP = {
    '0': '0000', '1': '0001', '2': '0010', '3': '0011',
    '4': '0100', '5': '0101', '6': '0110', '7': '0111',
    '8': '1000', '9': '1001', 'A': '1010', 'B': '1011',
    'C': '1100', 'D': '1101', 'E': '1110', 'F': '1111'
}

BIN_TO_HEX_MAP = {v: k for k, v in HEX_TO_BIN_MAP.items()}

def binary_to_hex_grouping(bin_str: str) -> tuple:
    """Converts a binary integer string to hexadecimal using 4-bit nibble grouping."""
    clean_bin = bin_str.replace(" ", "").strip()
    
    # Pad with leading zeros so length is a multiple of 4
    remainder = len(clean_bin) % 4
    padded_bin = ("0" * (4 - remainder) + clean_bin) if remainder != 0 else clean_bin
    
    # Split into 4-bit chunks (nibbles)
    nibbles = [padded_bin[i:i+4] for i in range(0, len(padded_bin), 4)]
    hex_digits = [BIN_TO_HEX_MAP[n] for n in nibbles]
    hex_result = "".join(hex_digits)
    
    print(f"\n--- [BINARY TO HEXADECIMAL (4-BIT NIBBLE GROUPING)] ---")
    print(f"Original Binary: {clean_bin}")
    print(f"Padded (x4):     {padded_bin}")
    print(f"Nibbles:         {' | '.join(nibbles)}")
    print(f"Hex Digits:      {' | '.join(hex_digits)}")
    print(f"[+] ({clean_bin})₂ = ({hex_result})₁₆\n")
    return hex_result, nibbles, hex_digits


def hex_to_binary_expansion(hex_str: str) -> tuple:
    """Converts a hexadecimal string to binary by expanding each character into 4 bits."""
    clean_hex = hex_str.upper().strip()
    nibbles = []
    
    for digit in clean_hex:
        if digit not in HEX_TO_BIN_MAP:
            raise ValueError(f"Invalid hexadecimal digit: {digit}")
        nibbles.append(HEX_TO_BIN_MAP[digit])
    
    full_binary = "".join(nibbles).lstrip("0") or "0"
    print(f"\n--- [HEXADECIMAL TO BINARY (4-BIT EXPANSION)] ---")
    print(f"Hex Input:       {' | '.join(list(clean_hex))}")
    print(f"4-Bit Expansions:{' | '.join(nibbles)}")
    print(f"[+] ({clean_hex})₁₆ = ({full_binary})₂\n")
    return full_binary, nibbles


def main():
    print("=================================================================")
    print("  CBSE CLASS 11 CS (083) - BINARY <-> HEXADECIMAL CONVERTER      ")
    print("=================================================================\n")

    # 1. Binary to Hexadecimal
    binary_to_hex_grouping("10011100")
    binary_to_hex_grouping("1101111101")  # Needs padding

    # 2. Hexadecimal to Binary
    hex_to_binary_expansion("2AF")

if __name__ == "__main__":
    main()
