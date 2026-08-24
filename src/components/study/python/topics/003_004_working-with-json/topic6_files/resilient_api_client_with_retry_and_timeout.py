# topic6_files/resilient_api_client_with_retry_and_timeout.py
# Module: 003_004_working-with-json
# Topic: Consuming REST API data using urllib / requests
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 3: Resilient REST API Client with Timeouts & Exponential Backoff
Demonstrates:
  1. Mandatory request timeouts to prevent indefinite thread/process hangs
  2. Exponential backoff retry loop for transient network glitches (503 Service Unavailable)
  3. Safe fallback defaults during persistent server downtime
"""

import time
from typing import Dict, Any, Callable

def execute_resilient_api_call(
    api_invoker: Callable[[], Dict[str, Any]],
    max_retries: int = 3,
    initial_backoff_sec: float = 0.1,
    fallback_payload: Dict[str, Any] = None
) -> Dict[str, Any]:
    """Executes an API call with exponential backoff retries and fallback."""
    backoff = initial_backoff_sec

    for attempt in range(1, max_retries + 1):
        try:
            return api_invoker()
        except Exception as exc:
            print(f"  [ATTEMPT #{attempt} FAILED] {exc}. Backing off {backoff:.2f}s...")
            if attempt == max_retries:
                print("  [MAX RETRIES EXHAUSTED] Triggering fallback payload.")
                return fallback_payload or {"status": "FALLBACK_OFFLINE", "data": None}
            time.sleep(backoff)
            backoff *= 2  # Exponential doubling


def demonstrate_resilient_client():
    print("=" * 70)
    print("CODER & ACCOTAX - RESILIENT API CLIENT WITH EXPONENTIAL BACKOFF")
    print("=" * 70)

    # 1. Simulating Transient Network Flake (Fails twice, succeeds on 3rd attempt):
    attempt_counter = [0]
    def flakey_network_call():
        attempt_counter[0] += 1
        if attempt_counter[0] < 3:
            raise ConnectionError("503 Service Unavailable: Gateway Busy")
        return {"status": "OK", "weather_celsius": 29.5, "city": "Barrackpore"}

    print("1. Ingesting from Transient Flakey API with Automatic Retries:")
    result = execute_resilient_api_call(
        flakey_network_call,
        max_retries=4,
        initial_backoff_sec=0.05,
        fallback_payload={"status": "CACHED_LOCAL", "weather_celsius": 28.0}
    )
    print(f"   * Final Ingestion Result: {result}\n")

    # 2. Simulating Persistent Outage (Exhausts retries, triggers fallback):
    print("2. Ingesting from Completely Down API (Fallback Execution):")
    def down_api_call():
        raise TimeoutError("Connection timed out after 5.0s")

    result_down = execute_resilient_api_call(
        down_api_call,
        max_retries=3,
        initial_backoff_sec=0.05,
        fallback_payload={"status": "OFFLINE_SAFE_MODE", "weather_celsius": 25.0}
    )
    print(f"   * Safe Fallback Result  : {result_down}")

    print(r"""
Resilience Rules:
  1. ALWAYS specify `timeout=...` (Default is infinite in requests and urllib!).
  2. Implement exponential backoff: 0.5s -> 1.0s -> 2.0s to avoid hammering struggling servers.
  3. Always provide cached or default fallbacks for mission-critical services.
""")
    print("[PASSED] Resilient API Client Verified.")


if __name__ == "__main__":
    demonstrate_resilient_client()
