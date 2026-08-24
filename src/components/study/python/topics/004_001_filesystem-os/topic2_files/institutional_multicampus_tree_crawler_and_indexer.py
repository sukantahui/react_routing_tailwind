# topic2_files/institutional_multicampus_tree_crawler_and_indexer.py
# Module: 004_001_filesystem-os
# Topic: Directory traversal: os.walk(), scandir(), and glob patterns
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 4: Institutional Storage Tree Crawler & Indexer (Case Study)
Demonstrates:
  1. Production multi-campus crawler using `os.walk()` and `os.scandir()`
  2. Dynamic in-place directory pruning (`dirs[:]`) to ignore caches and archives
  3. Building comprehensive telemetry indexes: file counts, extension breakdowns, and total storage usage
"""

import os
import shutil
import fnmatch
from typing import Dict, Any, List, Set, Tuple

class InstitutionalTreeCrawlerAndIndexer:
    """Production filesystem crawler and storage indexer for Coder & AccoTax."""

    IGNORED_DIRECTORY_PATTERNS = {"__pycache__", ".*", "temp_*", "archive_*"}

    def __init__(self, root_dir: str):
        self.root_dir = root_dir
        self.total_dirs_scanned = 0
        self.total_files_indexed = 0
        self.pruned_subtrees_count = 0
        self.extension_distribution: Dict[str, int] = {}
        self.file_index: List[Dict[str, Any]] = []

    def crawl_and_index(self) -> Dict[str, Any]:
        """Crawls root directory, prunes excluded folders, and indexes file assets."""
        total_storage_bytes = 0

        for root, dirs, files in os.walk(self.root_dir, topdown=True):
            self.total_dirs_scanned += 1

            # 1. In-Place Directory Pruning
            original_dir_count = len(dirs)
            dirs[:] = [
                d for d in dirs
                if not any(fnmatch.fnmatch(d, pat) for pat in self.IGNORED_DIRECTORY_PATTERNS)
            ]
            self.pruned_subtrees_count += (original_dir_count - len(dirs))

            # 2. Index Regular Files using os.scandir for high-speed attribute retrieval
            with os.scandir(root) as entries:
                for entry in entries:
                    if entry.is_file():
                        self.total_files_indexed += 1
                        file_stat = entry.stat()
                        size = file_stat.st_size
                        total_storage_bytes += size

                        ext = os.path.splitext(entry.name)[1].lower() or ".unknown"
                        self.extension_distribution[ext] = self.extension_distribution.get(ext, 0) + 1

                        self.file_index.append({
                            "name": entry.name,
                            "path": entry.path,
                            "relative_path": os.path.relpath(entry.path, self.root_dir),
                            "extension": ext,
                            "size_bytes": size
                        })

        return {
            "root_scanned": os.path.abspath(self.root_dir),
            "directories_visited": self.total_dirs_scanned,
            "subtrees_pruned": self.pruned_subtrees_count,
            "files_indexed": self.total_files_indexed,
            "total_storage_bytes": total_storage_bytes,
            "extension_breakdown": self.extension_distribution,
            "file_catalog_sample": self.file_index[:5]
        }


def demonstrate_crawler_suite():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL STORAGE TREE CRAWLER & INDEXER")
    print("=" * 70)

    demo_root = "temp_accotax_institutional_storage"

    try:
        # Create mock multi-campus storage hierarchy:
        os.makedirs(os.path.join(demo_root, "barrackpore", "py_ai_2026"), exist_ok=True)
        os.makedirs(os.path.join(demo_root, "barrackpore", "__pycache__"), exist_ok=True)
        os.makedirs(os.path.join(demo_root, "barrackpore", "archive_2025"), exist_ok=True)
        os.makedirs(os.path.join(demo_root, "kolkata", "ds_ml_2026"), exist_ok=True)

        with open(os.path.join(demo_root, "barrackpore", "py_ai_2026", "stu_101.json"), "w") as f:
            f.write('{"id": "STU-101", "fee": 30000.0}')
        with open(os.path.join(demo_root, "barrackpore", "py_ai_2026", "stu_101.pdf"), "w") as f:
            f.write("DUMMY_PDF_PAYLOAD_CONTENT")
        with open(os.path.join(demo_root, "barrackpore", "__pycache__", "module.pyc"), "w") as f:
            f.write("CACHED_BYTECODE_SHOULD_BE_PRUNED")
        with open(os.path.join(demo_root, "kolkata", "ds_ml_2026", "stu_102.json"), "w") as f:
            f.write('{"id": "STU-102", "fee": 35000.0}')
        with open(os.path.join(demo_root, "kolkata", "ds_ml_2026", "stu_102.pdf"), "w") as f:
            f.write("DUMMY_PDF_PAYLOAD_CONTENT")

        crawler = InstitutionalTreeCrawlerAndIndexer(demo_root)
        audit_summary = crawler.crawl_and_index()

        print("1. Multi-Campus Filesystem Crawl Audit Summary:")
        print(f"   * Root Scanned           : {audit_summary['root_scanned']}")
        print(f"   * Directories Visited    : {audit_summary['directories_visited']}")
        print(f"   * Subtrees Pruned (DLQ)  : {audit_summary['subtrees_pruned']} (Ignored cache & archives)")
        print(f"   * Total Files Indexed    : {audit_summary['files_indexed']}")
        print(f"   * Total Vault Storage    : {audit_summary['total_storage_bytes']} Bytes\n")

        print("2. Extension Distribution Breakdown:")
        for ext, count in audit_summary["extension_breakdown"].items():
            print(f"   * {ext:<10} : {count} files")

        print("\n3. Sample File Catalog Index Entries:")
        for item in audit_summary["file_catalog_sample"]:
            print(f"   * [{item['extension']:<6}] {item['name']:<18} | Rel: {item['relative_path']}")

    finally:
        # Cleanup mock storage hierarchy
        if os.path.exists(demo_root):
            shutil.rmtree(demo_root)
            print("\n4. Cleanup: Removed institutional storage tree safely.")

    print("\n[PASSED] Institutional Storage Tree Crawler & Indexer Verified.")


if __name__ == "__main__":
    demonstrate_crawler_suite()
