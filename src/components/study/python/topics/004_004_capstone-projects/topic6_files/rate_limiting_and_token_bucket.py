"""
# Module: 004_004_capstone-projects
# Topic 6: System design basics for Python backends
# File: rate_limiting_and_token_bucket.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating Token Bucket Rate Limiting algorithm for API gateways.
"""

import time
import threading

class TokenBucketRateLimiter:
    """Thread-safe Token Bucket Rate Limiter accommodating burst traffic."""
    def __init__(self, capacity: int, refill_rate_per_sec: float):
        self.capacity = float(capacity)
        self.refill_rate = float(refill_rate_per_sec)
        self.tokens = float(capacity)
        self.last_refill_time = time.time()
        self._lock = threading.Lock()

    def _refill(self, now: float) -> None:
        elapsed = now - self.last_refill_time
        new_tokens = elapsed * self.refill_rate
        self.tokens = min(self.capacity, self.tokens + new_tokens)
        self.last_refill_time = now

    def allow_request(self, tokens_required: float = 1.0) -> bool:
        with self._lock:
            now = time.time()
            self._refill(now)
            if self.tokens >= tokens_required:
                self.tokens -= tokens_required
                return True
            return False

def test_rate_limiter():
    print("   [...] Testing Token Bucket Rate Limiter...")
    # Capacity 3 tokens, refills 2 tokens per second
    limiter = TokenBucketRateLimiter(capacity=3, refill_rate_per_sec=2.0)

    # 1. Burst of 3 requests -> All Allowed
    assert limiter.allow_request() is True
    assert limiter.allow_request() is True
    assert limiter.allow_request() is True
    print("   [PASS] 1. Initial burst of 3 requests allowed (Bucket emptied)")

    # 2. 4th immediate request -> Throttled (HTTP 429)
    assert limiter.allow_request() is False
    print("   [PASS] 2. 4th immediate request throttled safely (0 tokens remaining)")

    # 3. Wait 0.6 seconds (refills ~1.2 tokens) -> Allowed
    time.sleep(0.6)
    assert limiter.allow_request() is True
    print("   [PASS] 3. Token refill confirmed: Request allowed after waiting 0.6s")

def main():
    print("=" * 75)
    print("[API RATE LIMITING] Token Bucket Algorithm & Throttling (HTTP 429)")
    print("=" * 75)

    test_rate_limiter()

    print("=" * 75)
    print("[TAKEAWAY] Token Bucket algorithms protect Python backends from DoS attacks,")
    print("           brute-force login attempts, and runaway client scripts.")
    print("=" * 75)

if __name__ == "__main__":
    main()
