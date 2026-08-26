"""
# Module: 004_002_performance-optimization
# Topic 7: Best practices for high-throughput Python applications
# File: batching_and_chunked_stream_pipeline.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Chunked batching pipelines with itertools.islice to stream massive
#              student datasets without memory exhaustion or database thrashing.
"""

import time
from itertools import islice

# Generator simulating 60,000 incoming student records from an API stream
def student_stream_generator(total_count=60000):
    for i in range(total_count):
        yield {
            "id": f"STU_{i:05d}",
            "name": ["Mamata", "Mahima", "Abhronila", "Susmita", "Debangshu"][i % 5],
            "campus": ["Barrackpore", "Kolkata", "Ichapur", "Jadavpur"][i % 4],
            "score": 50 + (i * 19) % 50
        }

def chunked_iterable(iterable, chunk_size=2000):
    """Memory-safe chunking generator using itertools.islice."""
    it = iter(iterable)
    while True:
        chunk = list(islice(it, chunk_size))
        if not chunk:
            break
        yield chunk

def simulate_unbatched_processing(stream):
    """Approach 1: Processing individual records (High per-item overhead)."""
    start = time.perf_counter()
    processed_count = 0
    # Simulates single-record processing / insertion overhead
    for record in stream:
        processed_count += 1
    elapsed = time.perf_counter() - start
    return processed_count, elapsed

def simulate_batched_processing(stream, batch_size=2000):
    """Approach 2: Processing in memory-safe chunks of 2,000 records."""
    start = time.perf_counter()
    total_processed = 0
    batch_count = 0
    
    for batch in chunked_iterable(stream, chunk_size=batch_size):
        # High-throughput vector / bulk operation on batch of 2,000 records
        total_processed += len(batch)
        batch_count += 1
        
    elapsed = time.perf_counter() - start
    return total_processed, batch_count, elapsed

def main():
    total_records = 60000
    print("=" * 75)
    print(f"[BENCHMARK] Stream Ingestion Pipeline: Unbatched vs Chunked Batches (N = {total_records:,})")
    print("=" * 75)

    # 1. Unbatched
    stream1 = student_stream_generator(total_records)
    count1, t_single = simulate_unbatched_processing(stream1)
    print(f"[1] Unbatched Single-Item Iteration: {t_single:.4f} sec ({total_records / t_single:,.0f} records/sec)")

    # 2. Batched (2,000 per batch)
    stream2 = student_stream_generator(total_records)
    count2, num_batches, t_batch = simulate_batched_processing(stream2, batch_size=2000)
    speedup = t_single / t_batch if t_batch > 0 else 1.0
    print(f"[2] Chunked Batching (2k / batch)  : {t_batch:.4f} sec ({total_records / t_batch:,.0f} records/sec)")
    print(f"[>] Processed {num_batches} batches in {t_batch:.4f}s ({speedup:.2f}x Faster)")

    print("=" * 75)
    print("[TAKEAWAY] Batch streaming amortizes database transactions, network I/O,")
    print("           and Python loop overhead while maintaining a small O(1) RAM footprint.")
    print("=" * 75)

if __name__ == "__main__":
    main()
