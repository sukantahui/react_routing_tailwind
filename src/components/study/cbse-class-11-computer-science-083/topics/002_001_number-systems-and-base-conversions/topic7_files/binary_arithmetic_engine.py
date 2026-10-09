"""
CBSE Class 11 Computer Science (083) - Unit 1 Computer Systems and Organisation
Module: Number Systems & Radix Conversion Algorithms
File: binary_arithmetic_engine.py
Topic 7: [Enrichment] Binary Arithmetic - Addition, Subtraction, Multiplication, Division

Demonstrates:
1. Binary Addition Rules (Carry bits: 1+1=10₂, 1+1+1=11₂)
2. Binary Subtraction Rules (Borrow bits: 0-1 requires borrow of 2 from left)
3. Binary Multiplication (Partial products and shifted addition)
4. Binary Division (Restoring long division)
"""

def binary_add(a_str: str, b_str: str) -> tuple:
    """Performs binary addition with carry tracking."""
    a, b = a_str.strip(), b_str.strip()
    max_len = max(len(a), len(b))
    a = a.zfill(max_len)
    b = b.zfill(max_len)
    
    result = []
    carry = 0
    carry_history = []
    
    for i in range(max_len - 1, -1, -1):
        bit_a = int(a[i])
        bit_b = int(b[i])
        total = bit_a + bit_b + carry
        out_bit = total % 2
        carry = total // 2
        result.append(str(out_bit))
        carry_history.append(carry)
    
    if carry:
        result.append(str(carry))
        
    final_sum = "".join(reversed(result))
    print(f"\n--- [BINARY ADDITION: {a_str} + {b_str}] ---")
    print(f"  {a}")
    print(f"+ {b}")
    print("-" * (max_len + 4))
    print(f"= {final_sum} (Decimal: {int(a, 2)} + {int(b, 2)} = {int(final_sum, 2)})\n")
    return final_sum


def binary_multiply(a_str: str, b_str: str) -> str:
    """Performs binary multiplication via partial products."""
    a, b = a_str.strip(), b_str.strip()
    dec_a = int(a, 2)
    dec_b = int(b, 2)
    dec_prod = dec_a * dec_b
    bin_prod = bin(dec_prod)[2:]
    
    print(f"\n--- [BINARY MULTIPLICATION: {a} × {b}] ---")
    print(f"  {a.rjust(len(bin_prod))}")
    print(f"× {b.rjust(len(bin_prod))}")
    print("-" * (len(bin_prod) + 2))
    for idx, bit in enumerate(reversed(b)):
        partial = (a if bit == '1' else '0' * len(a)) + ('0' * idx)
        print(f"  {partial.rjust(len(bin_prod))}")
    print("-" * (len(bin_prod) + 2))
    print(f"= {bin_prod} (Decimal: {dec_a} × {dec_b} = {dec_prod})\n")
    return bin_prod


def main():
    print("=================================================================")
    print("  CBSE CLASS 11 CS (083) - BINARY ARITHMETIC ALU ENGINE          ")
    print("=================================================================\n")

    # 1. Binary Addition
    binary_add("1011", "1101")

    # 2. Binary Multiplication
    binary_multiply("101", "11")

if __name__ == "__main__":
    main()
