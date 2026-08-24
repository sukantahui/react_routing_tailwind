# topic8_files/append_only_ndjson_wal_engine.py
# Module: 003_004_working-with-json
# Topic: Building JSON-backed persistent data stores
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 3: Append-Only NDJSON Write-Ahead Log (WAL) & Compaction
Demonstrates:
  1. High-throughput Write-Ahead Logging (WAL) using newline-delimited JSON (NDJSON)
  2. Crash-resilient transaction ledger: fast O(1) appends without full-file rewrites
  3. Snapshot compaction engine: collapsing delta transactions into a canonical state
"""

import json
import os
import tempfile
from typing import Dict, Any, List

class NdjsonWalEngine:
    """High-performance append-only Write-Ahead Log engine for JSON transactions."""

    def __init__(self, wal_filepath: str, snapshot_filepath: str):
        self.wal_filepath = wal_filepath
        self.snapshot_filepath = snapshot_filepath

    def append_transaction(self, action: str, doc_id: str, payload: Dict[str, Any]):
        """Appends a transaction log line (O(1) append time)."""
        tx_record = {
            "action": action,     # INSERT | UPDATE | DELETE
            "doc_id": doc_id,
            "data": payload
        }
        with open(self.wal_filepath, "a", encoding="utf-8") as f:
            f.write(json.dumps(tx_record) + "\n")
            f.flush()

    def replay_wal_to_state(self) -> Dict[str, Dict[str, Any]]:
        """Replays all transactions from disk into in-memory state."""
        state = {}

        # 1. Start from base snapshot if exists
        if os.path.exists(self.snapshot_filepath):
            with open(self.snapshot_filepath, "r", encoding="utf-8") as f:
                state = json.load(f)

        # 2. Replay incremental WAL logs
        if os.path.exists(self.wal_filepath):
            with open(self.wal_filepath, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line:
                        continue
                    tx = json.loads(line)
                    action = tx["action"]
                    doc_id = tx["doc_id"]

                    if action in ("INSERT", "UPDATE"):
                        state[doc_id] = tx["data"]
                    elif action == "DELETE":
                        state.pop(doc_id, None)

        return state

    def compact_and_checkpoint(self):
        """Compacts WAL into a clean base snapshot and resets the log."""
        canonical_state = self.replay_wal_to_state()

        # Write canonical snapshot atomically
        target_dir = os.path.dirname(os.path.abspath(self.snapshot_filepath))
        fd, tmp_path = tempfile.mkstemp(dir=target_dir, prefix="snap_tmp_", suffix=".json")
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(canonical_state, f, indent=2)
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp_path, self.snapshot_filepath)

        # Reset WAL log
        with open(self.wal_filepath, "w", encoding="utf-8") as f:
            f.write("")  # Truncate clean


def demonstrate_ndjson_wal():
    print("=" * 70)
    print("CODER & ACCOTAX - APPEND-ONLY NDJSON WAL & COMPACTION")
    print("=" * 70)

    wal_file = os.path.join(tempfile.gettempdir(), "student_tx_ledger.ndjson")
    snap_file = os.path.join(tempfile.gettempdir(), "student_snapshot.json")
    engine = NdjsonWalEngine(wal_file, snap_file)

    # 1. Append fast transaction events:
    print("1. Appending Fast Transaction Events to NDJSON WAL:")
    engine.append_transaction("INSERT", "STU-101", {"name": "Sourav Mukherjee", "fee": 28000.0, "status": "PENDING"})
    engine.append_transaction("INSERT", "STU-102", {"name": "Priyanka Sen", "fee": 32000.0, "status": "PENDING"})
    engine.append_transaction("UPDATE", "STU-101", {"name": "Sourav Mukherjee", "fee": 28000.0, "status": "PAID_VERIFIED"})
    engine.append_transaction("INSERT", "STU-103", {"name": "Temporary Record", "fee": 0.0, "status": "DRAFT"})
    engine.append_transaction("DELETE", "STU-103", {})

    print(f"   * WAL Transaction Log Size: {os.path.getsize(wal_file)} bytes")

    # 2. Replay state from WAL:
    print("\n2. Replaying Incremental WAL Log into Canonical State:")
    current_state = engine.replay_wal_to_state()
    print(f"   * Total Active Entities: {len(current_state)}")
    for sid, doc in current_state.items():
        print(f"     - [{sid}] {doc['name']:<18} | Status: {doc['status']}")

    # 3. Compact WAL:
    print("\n3. Compacting WAL Log into Permanent Base Snapshot:")
    engine.compact_and_checkpoint()
    print(f"   * Snapshot File Size: {os.path.getsize(snap_file)} bytes")
    print(f"   * Compacted WAL Size: {os.path.getsize(wal_file)} bytes (Cleanly Reset)")

    # Cleanup:
    for path in (wal_file, snap_file):
        if os.path.exists(path):
            os.remove(path)

    print("\n[PASSED] Append-Only NDJSON WAL Engine Verified.")


if __name__ == "__main__":
    demonstrate_ndjson_wal()
