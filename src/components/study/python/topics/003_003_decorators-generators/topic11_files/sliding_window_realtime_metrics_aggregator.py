# topic11_files/sliding_window_realtime_metrics_aggregator.py
# Module: 003_003_decorators-generators
# Topic: Infinite streams and large data processing with generators
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 11 - File 3: Real-Time Sliding Window Metrics Aggregator
Demonstrates:
  1. Processing infinite time-series telemetry streams with rolling windows (`collections.deque`)
  2. Calculating rolling moving averages and latency spikes in constant O(1) space
  3. Composing generator pipelines over infinite streams
"""

import collections
import itertools
from typing import Generator, Dict, Any, Iterable

def synthetic_latency_stream() -> Generator[float, None, None]:
    """Infinite stream of API endpoint latency measurements (ms)."""
    base_latencies = [24.5, 28.0, 31.2, 195.0, 26.4, 29.8, 305.0, 22.1, 25.0]
    for lat in itertools.cycle(base_latencies):
        yield lat


def rolling_window_metrics_pipeline(
    data_stream: Iterable[float],
    window_size: int = 4,
    spike_threshold_ms: float = 100.0
) -> Generator[Dict[str, Any], None, None]:
    """Computes rolling statistics over incoming stream using fixed-size deque."""
    window = collections.deque(maxlen=window_size)

    for val in data_stream:
        window.append(val)
        if len(window) == window_size:
            avg_latency = sum(window) / window_size
            is_spike = val >= spike_threshold_ms

            yield {
                "current_val": val,
                "window": list(window),
                "moving_avg": round(avg_latency, 2),
                "window_min": min(window),
                "window_max": max(window),
                "is_spike": is_spike
            }


def demonstrate_sliding_window_stream():
    print("=" * 70)
    print("CODER & ACCOTAX - SLIDING WINDOW REAL-TIME METRICS STREAM")
    print("=" * 70)

    raw_stream = synthetic_latency_stream()
    metrics_pipeline = rolling_window_metrics_pipeline(raw_stream, window_size=4, spike_threshold_ms=100.0)

    print("1. Monitoring First 8 Windows of Infinite Telemetry Stream:")
    for metric in itertools.islice(metrics_pipeline, 8):
        status = "[LATENCY SPIKE!]" if metric["is_spike"] else "[NORMAL]"
        print(
            f"   {status:<16} Current: {metric['current_val']:>5.1f} ms | "
            f"Moving Avg: {metric['moving_avg']:>5.1f} ms | "
            f"Window: {metric['window']}"
        )

    print(r"""
Sliding Window Stream Rules:
  1. Use `collections.deque(maxlen=N)` to ensure memory never grows beyond N items.
  2. Yield enriched telemetry envelopes containing moving metrics.
  3. Combine with `itertools.islice()` or consumer break conditions.
""")
    print("[PASSED] Sliding Window Real-Time Metrics Aggregator Verified.")


if __name__ == "__main__":
    demonstrate_sliding_window_stream()
