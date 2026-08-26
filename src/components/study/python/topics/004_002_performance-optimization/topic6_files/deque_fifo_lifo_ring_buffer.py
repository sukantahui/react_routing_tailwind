"""
# Module: 004_002_performance-optimization
# Topic 6: collections module: deque, Counter, defaultdict, OrderedDict, namedtuple
# File: deque_fifo_lifo_ring_buffer.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Benchmarking O(N) list.pop(0) vs O(1) deque.popleft(),
#              and building high-throughput bounded ring buffers with maxlen.
"""

import time
from collections import deque

# Generate 35,000 student admission token requests
TOKEN_REQUESTS = [
    {"token_id": f"TKN_{i:05d}", "student": ["Mamata", "Mahima", "Abhronila", "Susmita", "Debangshu"][i % 5], "campus": ["Barrackpore", "Kolkata", "Ichapur", "Jadavpur"][i % 4]}
    for i in range(35000)
]

def benchmark_list_fifo_queue(requests):
    """Approach 1: Using standard Python list as a FIFO queue (pop(0))."""
    start = time.perf_counter()
    queue = list(requests)
    processed = []
    
    # DANGER: pop(0) shifts all remaining elements in memory on every call -> O(N^2) total!
    while queue:
        item = queue.pop(0) # O(N) memory shift!
        processed.append(item["token_id"])
        
    elapsed = time.perf_counter() - start
    return len(processed), elapsed

def benchmark_deque_fifo_queue(requests):
    """Approach 2: Using collections.deque as a FIFO queue (popleft())."""
    start = time.perf_counter()
    queue = deque(requests)
    processed = []
    
    # OPTIMIZED: popleft() unlinks the head node in constant O(1) time!
    while queue:
        item = queue.popleft() # Instant O(1)
        processed.append(item["token_id"])
        
    elapsed = time.perf_counter() - start
    return len(processed), elapsed

def demonstrate_bounded_ring_buffer():
    """Approach 3: Bounded Ring Buffer with deque(maxlen=K) for live system logs."""
    print("\n[RING BUFFER] Demonstrating Bounded Sliding-Window Log Stream:")
    
    # Capacity: Keep only the 5 most recent campus audit events
    audit_stream = deque(maxlen=5)
    
    events = [
        "10:00 - Mamata registered at Barrackpore",
        "10:01 - Mahima verified documents at Kolkata",
        "10:02 - Abhronila enrolled in Python Pro at Ichapur",
        "10:03 - Susmita paid tuition fee at Jadavpur",
        "10:04 - Debangshu generated certificate at Barrackpore",
        "10:05 - System backup completed successfully",
        "10:06 - New semester roster initialized"
    ]
    
    for event in events:
        audit_stream.append(event)
        print(f"   -> Appended: {event}")
        print(f"      Current Buffer (Size={len(audit_stream)}): {list(audit_stream)}")

def main():
    print("=" * 75)
    print(f"[BENCHMARK] FIFO Queue Performance: List vs Deque (N = {len(TOKEN_REQUESTS):,})")
    print("=" * 75)

    # Use smaller slice for list pop(0) to avoid long blocking
    test_slice = TOKEN_REQUESTS[:20000]
    print(f"Testing FIFO Queue Operations on N = {len(test_slice):,} tokens...\n")

    print("[...] Running List FIFO Queue (list.pop(0) - O(N) shifts)...")
    _, t_list = benchmark_list_fifo_queue(test_slice)
    print(f"   [-] Standard List Queue Time: {t_list:.4f} seconds (1.00x Baseline)")

    print("\n[...] Running Deque FIFO Queue (deque.popleft() - O(1) unlinks)...")
    _, t_deque = benchmark_deque_fifo_queue(test_slice)
    speedup = t_list / t_deque if t_deque > 0 else 1.0
    print(f"   [+] Collections Deque Time  : {t_deque:.4f} seconds")
    print(f"   [>] Speedup Factor          : {speedup:.1f}x FASTER!")

    demonstrate_bounded_ring_buffer()

    print("=" * 75)
    print("[TAKEAWAY] NEVER use 'list.pop(0)' for queues! Always use 'deque.popleft()'.")
    print("           Use 'deque(maxlen=K)' for fixed-size sliding window ring buffers.")
    print("=" * 75)

if __name__ == "__main__":
    main()
