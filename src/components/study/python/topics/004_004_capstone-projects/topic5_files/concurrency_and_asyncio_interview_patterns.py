"""
# Module: 004_004_capstone-projects
# Topic 5: Top Python Technical Interview Questions & Coding Challenges
# File: concurrency_and_asyncio_interview_patterns.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating Threading vs Multiprocessing vs Asyncio paradigms.
"""

import asyncio
import time
from typing import Any

# 1. ASYNCIO CONCURRENT TASK RUNNER
async def fetch_campus_ledger_async(campus: str, delay: float) -> dict[str, Any]:
    """Simulates asynchronous non-blocking I/O network call."""
    await asyncio.sleep(delay)
    return {"campus": campus, "status": "SYNCED", "latency": delay}

async def run_concurrent_campus_sync():
    """Runs multiple asynchronous I/O operations concurrently with asyncio.gather."""
    start_time = time.perf_counter()
    results = await asyncio.gather(
        fetch_campus_ledger_async("Barrackpore", 0.05),
        fetch_campus_ledger_async("Kolkata", 0.05),
        fetch_campus_ledger_async("Ichapur", 0.05)
    )
    elapsed = time.perf_counter() - start_time
    return results, elapsed

def test_asyncio_concurrency():
    print("   [...] Testing Asyncio Event Loop Concurrency...")
    results, elapsed = asyncio.run(run_concurrent_campus_sync())
    assert len(results) == 3
    # Total runtime should be ~0.05s instead of sequential 0.15s
    assert elapsed < 0.12, f"Asyncio concurrency was slower than expected: {elapsed:.3f}s"
    print(f"   [PASS] 1. 3 Async tasks completed concurrently in {elapsed*1000:.1f}ms (vs 150ms sequential)")

def main():
    print("=" * 75)
    print("[CONCURRENCY PATTERNS] Asyncio Event Loop vs Threads vs Processes")
    print("=" * 75)

    test_asyncio_concurrency()

    print("=" * 75)
    print("[TAKEAWAY] Use Asyncio for thousands of concurrent network I/O sockets,")
    print("           Threading for legacy I/O, and Multiprocessing for CPU bound loads.")
    print("=" * 75)

if __name__ == "__main__":
    main()
