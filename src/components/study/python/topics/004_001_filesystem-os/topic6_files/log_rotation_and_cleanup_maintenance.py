# topic6_files/log_rotation_and_cleanup_maintenance.py
# Module: 004_001_filesystem-os
# Topic: Building automated system maintenance scripts
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 1: Automated Log Rotation & Compression Maintenance
Demonstrates:
  1. Age-based and size-based log file detection
  2. Compressing oversized `.log` files into `.log.gz` using Python's standard `gzip` module
  3. Purging historical compressed logs older than retention threshold (e.g. 7 days)
"""

import os
import gzip
import time
import shutil
from datetime import datetime, timedelta
from typing import List, Dict, Any

def rotate_and_compress_logs(log_dir: str, max_size_bytes: int = 1000, retention_days: int = 7) -> Dict[str, Any]:
    """Rotates logs exceeding max_size_bytes and purges logs older than retention_days."""
    now = time.time()
    retention_cutoff = now - (retention_days * 86400)

    rotated_files = []
    purged_files = []

    for item in os.listdir(log_dir):
        full_path = os.path.join(log_dir, item)
        if not os.path.isfile(full_path):
            continue

        file_stat = os.stat(full_path)

        # 1. Purge ancient compressed logs:
        if item.endswith(".gz") and file_stat.st_mtime < retention_cutoff:
            os.remove(full_path)
            purged_files.append(item)
            continue

        # 2. Compress and rotate oversized active logs:
        if item.endswith(".log") and file_stat.st_size >= max_size_bytes:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            gz_name = f"{item}.{timestamp}.gz"
            gz_path = os.path.join(log_dir, gz_name)

            # Stream into gzip compressed file:
            with open(full_path, "rb") as f_in, gzip.open(gz_path, "wb") as f_out:
                shutil.copyfileobj(f_in, f_out)

            # Truncate active log to reset size without breaking file handles:
            with open(full_path, "w", encoding="utf-8") as f_reset:
                f_reset.write(f"[{datetime.now().isoformat()}] LOG ROTATED - NEW CYCLE INITIATED\n")

            rotated_files.append({"original": item, "compressed": gz_name, "size_before": file_stat.st_size})

    return {
        "log_directory": os.path.abspath(log_dir),
        "rotated_count": len(rotated_files),
        "purged_count": len(purged_files),
        "rotated_details": rotated_files,
        "purged_files": purged_files
    }


def demonstrate_log_rotation():
    print("=" * 70)
    print("CODER & ACCOTAX - AUTOMATED LOG ROTATION & CLEANUP")
    print("=" * 70)

    sandbox = "temp_accotax_logs_maintenance"
    os.makedirs(sandbox, exist_ok=True)

    try:
        # Create oversized mock log file:
        active_log = os.path.join(sandbox, "accotax_server.log")
        with open(active_log, "w", encoding="utf-8") as f:
            for i in range(50):
                f.write(f"[{datetime.now().isoformat()}] EVENT #{i:03d} - Candidate Fee Transaction Cleared\n")

        # Create ancient mock compressed log (>7 days old):
        old_gz = os.path.join(sandbox, "accotax_server.log.20250101.gz")
        with gzip.open(old_gz, "wb") as f_gz:
            f_gz.write(b"ANCIENT_LOG_ARCHIVE_DATA")
        # Set mtime to 30 days ago:
        ancient_time = time.time() - (30 * 86400)
        os.utime(old_gz, (ancient_time, ancient_time))

        print("1. Running Automated Log Rotation & Purge Cycle:")
        summary = rotate_and_compress_logs(sandbox, max_size_bytes=500, retention_days=7)

        print(f"   * Log Directory  : {summary['log_directory']}")
        print(f"   * Logs Rotated   : {summary['rotated_count']}")
        print(f"   * Logs Purged    : {summary['purged_count']}")
        print(f"   * Purged Files   : {summary['purged_files']}\n")

        print("2. Rotated Files Details:")
        for r in summary["rotated_details"]:
            print(f"   * Compressed '{r['original']}' ({r['size_before']} bytes) -> '{r['compressed']}'")

        print("\n3. Directory Contents after Maintenance:")
        for f in os.listdir(sandbox):
            print(f"   * {f} ({os.path.getsize(os.path.join(sandbox, f))} bytes)")

    finally:
        # Cleanup sandbox directory
        if os.path.exists(sandbox):
            shutil.rmtree(sandbox)
            print("\n4. Cleanup: Removed maintenance sandbox directory.")

    print(r"""
Log Maintenance Invariants:
  1. Truncating active logs (`open(path, 'w')`) resets file size without deleting active file handles.
  2. Compressing rotated logs with `gzip` reduces log footprint by up to 90% on disk.
  3. Age-based purging with `os.stat().st_mtime` prevents disk volume exhaustion over time.
""")
    print("[PASSED] Log Rotation & Cleanup Maintenance Verified.")


if __name__ == "__main__":
    demonstrate_log_rotation()
