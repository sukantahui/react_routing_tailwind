"""
CBSE Class 11 Computer Science (083) - Unit 1 Computer Systems and Organisation
Module: Number Systems & Radix Conversion Algorithms
File: octal_to_hex_bridge.py
Topic 5: Octal to Hexadecimal and Hexadecimal to Octal via Binary Intermediary

Demonstrates:
1. Two-step base conversion without going through Decimal:
   - Octal -> Binary (3-bit expansion) -> Hexadecimal (4-bit re-grouping)
   - Hexadecimal -> Binary (4-bit expansion) -> Octal (3-bit re-grouping)
2. Significant speed advantages over decimal conversion in CBSE examinations
"""

OCT_TO_BIN = {
    '0': '000', '1': '001', '2': '010', '3': '011',
    '4': '100', '5': '101', '6': '110', '7': '111'
}

HEX_TO_BIN = {
    '0': '0000', '1': '0001', '2': '0010', '3': '0011',
    '4': '0100', '5': '0101', '6': '0110', '7': '0111',
    '8': '1000', '9': '1001', 'A': '1010', 'B': '1011',
    'C': '1100', 'D': '1101', 'E': '1110', 'F': '1111'
}

BIN_TO_HEX = {v: k for k, v in HEX_TO_BIN.items()}
BIN_TO_OCT = {v: k for k, v in OCT_TO_BIN.items()}

def octal_to_hexadecimal_bridge(oct_str: str) -> str:
    print(f"\n--- [OCTAL TO HEXADECIMAL VIA BINARY BRIDGE] ---")
    print(f"Step 1: Expand each Octal digit into 3 binary bits:")
    clean_oct = oct_str.strip()
    triplets = [OCT_TO_BIN[d] for d in clean_oct]
    print(f"    Octal:  {' | '.join(clean_oct)}")
    print(f"    Binary: {' | '.join(triplets)}")
    
    raw_binary = "".join(triplets)
    print(f"Step 2: Re-group binary bitstream into 4-bit nibbles from right:")
    rem = len(raw_binary) % 4
    padded_binary = ("0" * (4 - rem) + raw_binary) if rem != 0 else raw_binary
    nibbles = [padded_binary[i:i+4] for i in range(0, len(padded_binary), 4)]
    hex_digits = [BIN_TO_HEX[n] for n in nibbles]
    hex_result = "".join(hex_digits)
    
    print(f"    Nibbles: {' | '.join(nibbles)}")
    print(f"    Hex:     {' | '.join(hex_digits)}")
    print(f"[+] ({clean_oct})₈ = ({hex_result})₁₆\n")
    return hex_result


def hex_to_octal_bridge(hex_str: str) -> str:
    print(f"\n--- [HEXADECIMAL TO OCTAL VIA BINARY BRIDGE] ---")
    print(f"Step 1: Expand each Hex digit into 4 binary bits:")
    clean_hex = hex_str.upper().strip()
    nibbles = [HEX_TO_BIN[d] for d in clean_hex]
    print(f"    Hex:    {' | '.join(clean_hex)}")
    print(f"    Binary: {' | '.join(nibbles)}")
    
    raw_binary = "".join(nibbles)
    print(f"Step 2: Re-group binary bitstream into 3-bit triplets from right:")
    rem = len(raw_binary) % 3
    padded_binary = ("0" * (3 - rem) + raw_binary) if rem != 0 else raw_binary
    triplets = [padded_binary[i:i+3] for i in range(0, len(padded_binary), 3)]
    oct_digits = [BIN_TO_OCT[t] for t in triplets]
    oct_result = "".join(oct_digits).lstrip("0") or "0"
    
    print(f"    Triplets: {' | '.join(triplets)}")
    print(f"    Octal:    {' | '.join(oct_digits)}")
    print(f"[+] ({clean_hex})₁₆ = ({oct_result})₈\n")
    return oct_result


def main():
    print("=================================================================")
    print("  CBSE CLASS 11 CS (083) - OCTAL <-> HEXADECIMAL BINARY BRIDGE   ")
    print("=================================================================\n")

    # 1. Octal to Hexadecimal
    octal_to_hexadecimal_bridge("756")

    # 2. Hexadecimal to Octal
    hex_to_octal_bridge("1EE")

if __name__ == "__main__":
    main()
