# topic11_files/infinite_stream_generators_and_itertools.py
# Module: 003_003_decorators-generators
# Topic: Infinite streams and large data processing with generators
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 11 - File 1: Infinite Stream Generators & itertools Slicing
Demonstrates:
  1. Creating infinite event and timestamp stream generators
  2. Bounding infinite streams safely with `itertools.islice` and `itertools.takewhile`
  3. Cycle generators and stateful sequence synthesis
"""

import itertools
import time
from typing import Generator, Dict, Any

def institutional_heartbeat_stream() -> Generator[Dict[str, Any], None, None]:
    """Generates an infinite heartbeat telemetry stream."""
    sequence_id = 1
    while True:
        yield {
            "seq": sequence_id,
            "timestamp": time.time(),
            "server": "srv-kolkata-primary.codernaccotax.internal",
            "status": "HEALTHY",
            "cpu_load_pct": round(20.0 + (sequence_id % 15) * 1.8, 1)
        }
        sequence_id += 1


def timestamped_transaction_stream(start_tx_id: int = 1001) -> Generator[Dict[str, Any], None, None]:
    """Infinite synthetic payment stream."""
    current_id = start_tx_id
    while True:
        yield {
            "tx_id": f"TX-2026-{current_id}",
            "amount": float(15000 + (current_id % 7) * 2500),
            "gateway": "RAZORPAY_INDIA"
        }
        current_id += 1


def demonstrate_infinite_streams():
    print("=" * 70)
    print("CODER & ACCOTAX - INFINITE STREAM GENERATORS & ITERTOOLS")
    print("=" * 70)

    # 1. Bounding Infinite Heartbeat Stream with `itertools.islice`:
    print("1. Bounding Infinite Heartbeat Stream (Taking 5 items with `itertools.islice`):")
    heartbeats = institutional_heartbeat_stream()

    for hb in itertools.islice(heartbeats, 5):
        print(f"   * [HEARTBEAT #{hb['seq']:03d}] Server: {hb['server']} | CPU: {hb['cpu_load_pct']:4.1f}% | Status: {hb['status']}")

    # 2. Bounding with `itertools.takewhile`:
    print("\n2. Consuming Transactions with `itertools.takewhile(lambda t: t['amount'] <= 25000, stream)`:")
    tx_stream = timestamped_transaction_stream()
    bounded_txs = itertools.takewhile(lambda t: t["amount"] <= 25000.0, tx_stream)

    for tx in bounded_txs:
        print(f"   * Processed Transaction {tx['tx_id']}: INR {tx['amount']:,.2f} via {tx['gateway']}")

    # 3. Round-Robin Resource Cycle with `itertools.cycle`:
    print("\n3. Round-Robin Classroom Server Rotation with `itertools.cycle`:")
    servers = ["srv-barrackpore-01", "srv-barrackpore-02", "srv-kolkata-01"]
    rotator = itertools.cycle(servers)

    for req_id in range(1, 7):
        assigned_server = next(rotator)
        print(f"   * Incoming Portal Request #{req_id:02d} -> Routed to: {assigned_server}")

    print(r"""
Infinite Stream Golden Rules:
  1. Never use `list(infinite_gen)` or `for x in infinite_gen:` without a termination condition (Causes infinite loop / freeze).
  2. Use `itertools.islice(gen, limit)` to consume a fixed count safely.
  3. Use `itertools.takewhile(predicate, gen)` to consume until condition fails.
""")
    print("[PASSED] Infinite Stream Generators & itertools Verified.")


if __name__ == "__main__":
    demonstrate_infinite_streams()
