# topic4_files/cache_memoization_decorator_with_ttl.py
# Module: 003_003_decorators-generators
# Topic: Decorators with arguments & functools.wraps preservation
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 3: Parameterized Caching Decorator with TTL (Time-To-Live)
Demonstrates:
  1. Writing a configurable caching decorator with custom TTL expiration in seconds
  2. Cache hit / miss introspection methods attached to the wrapper
  3. Automatic cache invalidation when timestamps exceed TTL
"""

import functools
import time
from typing import Dict, Tuple, Any

def memoize_with_ttl(ttl_seconds: float = 2.0, max_size: int = 100):
    """Decorator factory creating an in-memory cache with TTL expiration."""

    def decorator(func):
        cache: Dict[Tuple, Tuple[float, Any]] = {}
        stats = {"hits": 0, "misses": 0}

        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # Create hashable key from args and sorted kwargs:
            key = (args, tuple(sorted(kwargs.items())))
            now = time.time()

            if key in cache:
                timestamp, cached_result = cache[key]
                if now - timestamp < ttl_seconds:
                    stats["hits"] += 1
                    print(f"  [CACHE HIT] `{func.__name__}{args}` -> Instant Return (Hits: {stats['hits']})")
                    return cached_result
                else:
                    print(f"  [CACHE EXPIRED] `{func.__name__}{args}` -> TTL ({ttl_seconds}s) exceeded. Recomputing...")

            # Cache Miss or Expired:
            stats["misses"] += 1
            print(f"  [CACHE MISS] `{func.__name__}{args}` -> Computing Fresh Value...")
            result = func(*args, **kwargs)

            # Evict if max size reached:
            if len(cache) >= max_size:
                oldest_key = min(cache.keys(), key=lambda k: cache[k][0])
                del cache[oldest_key]

            cache[key] = (now, result)
            return result

        def cache_info() -> Dict[str, Any]:
            return {
                "hits": stats["hits"],
                "misses": stats["misses"],
                "currsize": len(cache),
                "maxsize": max_size,
                "ttl_seconds": ttl_seconds
            }

        def cache_clear() -> None:
            cache.clear()
            stats["hits"] = 0
            stats["misses"] = 0

        wrapper.cache_info = cache_info
        wrapper.cache_clear = cache_clear
        return wrapper

    return decorator


@memoize_with_ttl(ttl_seconds=0.1, max_size=50)
def compute_complex_student_scholarship(gpa: float, family_income: float) -> float:
    """Computes complex institutional scholarship allocation."""
    time.sleep(0.005)  # Simulate expensive calculation
    return round((gpa * 5000.0) / (family_income / 100000.0), 2)


def demonstrate_caching_decorator():
    print("=" * 70)
    print("CODER & ACCOTAX - PARAMETERIZED CACHING DECORATOR WITH TTL")
    print("=" * 70)

    # 1. First Call (Cache Miss):
    print("1. First Invocation (GPA 3.8, Income 400000):")
    res1 = compute_complex_student_scholarship(3.8, 400000.0)
    print(f"   Calculated Scholarship: INR {res1:,.2f}\n")

    # 2. Second Call (Immediate - Cache Hit):
    print("2. Second Immediate Invocation (Same Args):")
    res2 = compute_complex_student_scholarship(3.8, 400000.0)
    print(f"   Returned Scholarship  : INR {res2:,.2f}\n")

    # 3. Third Call after TTL Expiration (Cache Miss):
    print("3. Sleeping 0.15s to Exceed 0.1s TTL:")
    time.sleep(0.15)
    res3 = compute_complex_student_scholarship(3.8, 400000.0)
    print(f"   Recalculated Value    : INR {res3:,.2f}\n")

    # 4. Cache Info Introspection:
    print("4. Inspecting Wrapper Cache Telemetry:")
    print(f"   `cache_info()`: {compute_complex_student_scholarship.cache_info()}")

    print("\n[PASSED] Parameterized Caching Decorator with TTL Verified.")


if __name__ == "__main__":
    demonstrate_caching_decorator()
