# topic5_files/combining_security_caching_and_logging_pipeline.py
# Module: 003_003_decorators-generators
# Topic: Chaining multiple decorators
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 2: Combining Security, Caching, and Logging Pipelines
Demonstrates:
  1. Stacking orthogonal production decorators into an enterprise middleware pipeline
  2. The Critical Security Hazard: Auth Before Cache vs Cache Before Auth
  3. Proper decorator pipeline layering order
"""

import functools
import time

current_user_context = {"is_authenticated": True, "role": "ADMIN"}

# 1. Authentication Guard Decorator
def require_authentication(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if not current_user_context.get("is_authenticated"):
            raise PermissionError("[SECURITY] Unauthenticated request blocked by @require_authentication!")
        print("  [SEC-1] User authentication verified.")
        return func(*args, **kwargs)
    return wrapper


# 2. In-Memory Caching Decorator
def in_memory_cache(func):
    cache = {}

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        key = (args, tuple(sorted(kwargs.items())))
        if key in cache:
            print(f"  [CACHE-2] Cache HIT for args {args}. Bypassing core computation.")
            return cache[key]
        print(f"  [CACHE-2] Cache MISS for args {args}. Executing inner layer...")
        result = func(*args, **kwargs)
        cache[key] = result
        return result
    return wrapper


# 3. Telemetry Timer Decorator
def telemetry_timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        t0 = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed_us = (time.perf_counter() - t0) * 1_000_000.0
        print(f"  [TIME-3] `{func.__name__}` finished in {elapsed_us:.2f} us")
        return result
    return wrapper


# =====================================================================
# CORRECT PIPELINE ORDER: Auth (Outermost) -> Cache -> Timer (Innermost)
# =====================================================================
@require_authentication
@in_memory_cache
@telemetry_timer
def fetch_sensitive_student_financial_record(student_id: str) -> dict:
    """Core secure database query service."""
    time.sleep(0.003)
    return {"student_id": student_id, "name": "Sourav Mukherjee", "balance_due": 0.0}


def demonstrate_combined_pipeline():
    print("=" * 70)
    print("CODER & ACCOTAX - STACKED PRODUCTION MIDDLEWARE PIPELINE")
    print("=" * 70)

    # 1. First authenticated request (Cache Miss):
    print("1. First Request with Authenticated Session (Cache Miss):")
    rec1 = fetch_sensitive_student_financial_record("STU-101")
    print(f"   Record Retrieved: {rec1}\n")

    # 2. Second request with Authenticated Session (Cache Hit):
    print("2. Second Request with Authenticated Session (Cache Hit):")
    rec2 = fetch_sensitive_student_financial_record("STU-101")
    print(f"   Record Retrieved: {rec2}\n")

    # 3. Third request after logging out (Unauthenticated):
    print("3. Logging Out -> Attempting Access (Simulates Security Hazard Prevention):")
    current_user_context["is_authenticated"] = False
    try:
        fetch_sensitive_student_financial_record("STU-101")
    except PermissionError as err:
        print(f"   [BLOCKED] {err}")
        print("   [SECURITY OK] Because `@require_authentication` is OUTERMOST, cache is NEVER served to unauthenticated users!")

    print("\n[PASSED] Stacked Middleware Pipeline Verified.")


if __name__ == "__main__":
    demonstrate_combined_pipeline()
