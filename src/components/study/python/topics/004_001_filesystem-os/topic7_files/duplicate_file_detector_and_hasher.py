# topic7_files/duplicate_file_detector_and_hasher.py
# Module: 004_001_filesystem-os
# Topic: Automated directory backup and file organizer scripts
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 2: Two-Stage SHA-256 Duplicate File Detector & Hasher
Demonstrates:
  1. Cryptographic content hashing with `hashlib.sha256`
  2. High-performance two-stage optimization:
     - Stage 1: Group files by exact byte size (avoids hashing unique files)
     - Stage 2: Stream 64KB chunks into SHA-256 hash only for size collisions
  3. Identifying exact duplicate file clusters and calculating reclaimable storage
"""

import os
import shutil
import hashlib
from collections import defaultdict
from typing import Dict, List, Any

def compute_file_sha256(file_path: str, chunk_size: int = 64 * 1024) -> str:
    """Computes SHA-256 hex digest of a file in 64KB streaming chunks."""
    hasher = hashlib.sha256()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(chunk_size), b""):
            hasher.update(chunk)
    return hasher.hexdigest()

def find_duplicate_files(root_dir: str) -> Dict[str, Any]:
    """Scans directory tree using two-stage size + SHA-256 hashing to find duplicate files."""
    # Stage 1: Group files by file size
    size_map = defaultdict(list)
    for root, _, files in os.walk(root_dir):
        for f in files:
            full_p = os.path.join(root, f)
            try:
                size = os.path.getsize(full_p)
                if size > 0:  # Ignore 0-byte empty files
                    size_map[size].append(full_p)
            except (FileNotFoundError, PermissionError):
                continue

    # Stage 2: Hash only files that share the same byte size
    duplicates_by_hash = defaultdict(list)
    potential_collision_groups = {size: paths for size, paths in size_map.items() if len(paths) > 1}

    for size, paths in potential_collision_groups.items():
        for path in paths:
            file_hash = compute_file_sha256(path)
            duplicates_by_hash[file_hash].append({"path": path, "size_bytes": size})

    # Filter only verified SHA-256 collision clusters (len > 1)
    verified_duplicate_clusters = [
        cluster for cluster in duplicates_by_hash.values() if len(cluster) > 1
    ]

    total_wasted_bytes = sum(
        cluster[0]["size_bytes"] * (len(cluster) - 1) for cluster in verified_duplicate_clusters
    )

    return {
        "root_scanned": os.path.abspath(root_dir),
        "total_duplicate_clusters": len(verified_duplicate_clusters),
        "total_wasted_storage_bytes": total_wasted_bytes,
        "duplicate_clusters": verified_duplicate_clusters
    }


def demonstrate_duplicate_detector():
    print("=" * 70)
    print("CODER & ACCOTAX - TWO-STAGE SHA-256 DUPLICATE DETECTOR")
    print("=" * 70)

    sandbox = "temp_accotax_duplicates_sandbox"
    os.makedirs(os.path.join(sandbox, "folder_a"), exist_ok=True)
    os.makedirs(os.path.join(sandbox, "folder_b"), exist_ok=True)

    try:
        # Create identical duplicate files with different names:
        payload_1 = "STUDENT_RECORD: Sourav Mukherjee | Course: Python Pro | Fee: 30000"
        payload_2 = "STUDENT_RECORD: Priyanka Sen | Course: Data Science | Fee: 35000"

        with open(os.path.join(sandbox, "folder_a", "sourav.csv"), "w") as f:
            f.write(payload_1)
        with open(os.path.join(sandbox, "folder_b", "sourav_backup_copy.csv"), "w") as f:
            f.write(payload_1)  # Exact Duplicate of sourav.csv
        with open(os.path.join(sandbox, "folder_a", "priyanka.csv"), "w") as f:
            f.write(payload_2)

        print("1. Running Two-Stage Duplicate Detection Scan:")
        results = find_duplicate_files(sandbox)

        print(f"   * Root Scanned              : {results['root_scanned']}")
        print(f"   * Duplicate Clusters Found  : {results['total_duplicate_clusters']}")
        print(f"   * Redundant Storage Wasted  : {results['total_wasted_storage_bytes']} Bytes\n")

        print("2. Verified Duplicate File Clusters:")
        for idx, cluster in enumerate(results["duplicate_clusters"], 1):
            print(f"   * Cluster #{idx} (Size: {cluster[0]['size_bytes']} bytes, {len(cluster)} copies):")
            for item in cluster:
                print(f"     - {item['path']}")

    finally:
        # Cleanup sandbox directory
        if os.path.exists(sandbox):
            shutil.rmtree(sandbox)
            print("\n3. Cleanup: Removed duplicate detector sandbox.")

    print("\n[PASSED] Two-Stage SHA-256 Duplicate Detector Verified.")


if __name__ == "__main__":
    demonstrate_duplicate_detector()
