"""
# Module: 004_002_performance-optimization
# Topic 7: Best practices for high-throughput Python applications
# File: zero_copy_memoryview_and_bytearray.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: High-speed zero-copy binary buffer processing using memoryview
#              and mutable bytearray vs standard bytes copying.
"""

import time

# Create a 20 MB binary buffer representing raw campus network payload / student data
BUFFER_SIZE = 20 * 1024 * 1024  # 20 Megabytes
RAW_BINARY_DATA = bytearray(b"HEADER_STU_" + b"A" * (BUFFER_SIZE - 11))

def benchmark_standard_bytes_slicing(data):
    """Approach 1: Standard slicing on bytes (Allocates new copies in RAM)."""
    start = time.perf_counter()
    chunks = []
    chunk_size = 1024 * 64  # 64 KB per chunk
    
    # Slicing raw bytes copies the entire chunk into a newly allocated bytes object
    for offset in range(0, len(data), chunk_size):
        chunk = data[offset : offset + chunk_size]  # Allocates & copies 64KB!
        chunks.append(len(chunk))
        
    elapsed = time.perf_counter() - start
    return len(chunks), elapsed

def benchmark_zero_copy_memoryview(data):
    """Approach 2: Zero-copy slicing using memoryview."""
    start = time.perf_counter()
    chunks = []
    chunk_size = 1024 * 64  # 64 KB per chunk
    
    # memoryview exposes C pointers directly over the existing byte buffer (Zero copies!)
    mv = memoryview(data)
    for offset in range(0, len(data), chunk_size):
        chunk = mv[offset : offset + chunk_size]  # O(1) pointer slice, zero RAM allocation!
        chunks.append(len(chunk))
        
    elapsed = time.perf_counter() - start
    return len(chunks), elapsed

def demonstrate_in_place_mutation():
    """Approach 3: In-place buffer mutation without reallocating strings."""
    print("\n[IN-PLACE MUTATION] Modifying binary packet headers in-place with bytearray & memoryview:")
    
    packet = bytearray(b"CAMPUS_UNKNOWN_SCORE_000")
    print(f"   * Original Packet   : {bytes(packet).decode('ascii')}")
    
    # Zero-copy memoryview slice pointing to 'UNKNOWN'
    view = memoryview(packet)
    # Mutate in place!
    view[7:14] = b"KOLKATA"
    view[21:24] = b"100"
    
    print(f"   * Mutated in-place  : {bytes(packet).decode('ascii')} (Zero string copies!)")

def main():
    print("=" * 75)
    print(f"[BENCHMARK] Binary Buffer Slicing: Standard Copy vs memoryview ({BUFFER_SIZE / (1024*1024):.0f} MB Buffer)")
    print("=" * 75)

    count1, t_copy = benchmark_standard_bytes_slicing(RAW_BINARY_DATA)
    print(f"[1] Standard Bytes Slicing (Copies memory): {t_copy:.4f} sec (1.00x Baseline)")

    count2, t_mv = benchmark_zero_copy_memoryview(RAW_BINARY_DATA)
    speedup = t_copy / t_mv if t_mv > 0 else 1.0
    print(f"[2] Zero-Copy memoryview (Pointer window) : {t_mv:.4f} sec ({speedup:.2f}x Faster)")

    demonstrate_in_place_mutation()

    print("=" * 75)
    print("[TAKEAWAY] Use 'memoryview' for zero-copy slicing in network/file streaming.")
    print("           Use 'bytearray' for in-place buffer mutation without reallocations.")
    print("=" * 75)

if __name__ == "__main__":
    main()
