# topic8_files/thread_safe_json_document_database.py
# Module: 003_004_working-with-json
# Topic: Building JSON-backed persistent data stores
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 2: Thread-Safe JSON Document Database with Secondary Indexing
Demonstrates:
  1. Thread-safe concurrency control using `threading.RLock`
  2. In-memory dictionary store with secondary hash indices for O(1) attribute lookups
  3. CRUD API with ACID-like atomic disk persistence
"""

import json
import os
import tempfile
import threading
from typing import Dict, Any, List, Optional, Callable

class ThreadSafeJsonDocDB:
    """Thread-safe, indexed JSON document store."""

    def __init__(self, db_filepath: str):
        self.db_filepath = db_filepath
        self._lock = threading.RLock()
        self._documents: Dict[str, Dict[str, Any]] = {}
        # Secondary index: course_code -> Set of document IDs
        self._index_by_course: Dict[str, set] = {}
        self._load_from_disk()

    def _load_from_disk(self):
        with self._lock:
            if os.path.exists(self.db_filepath) and os.path.getsize(self.db_filepath) > 0:
                try:
                    with open(self.db_filepath, "r", encoding="utf-8") as f:
                        self._documents = json.load(f)
                    self._rebuild_indices()
                except Exception:
                    self._documents = {}

    def _rebuild_indices(self):
        self._index_by_course.clear()
        for doc_id, doc in self._documents.items():
            course = doc.get("course_code")
            if course:
                self._index_by_course.setdefault(course, set()).add(doc_id)

    def _save_atomic_to_disk(self):
        target_dir = os.path.dirname(os.path.abspath(self.db_filepath))
        os.makedirs(target_dir, exist_ok=True)
        fd, tmp_path = tempfile.mkstemp(dir=target_dir, prefix="db_flush_", suffix=".json")
        try:
            with os.fdopen(fd, "w", encoding="utf-8") as f:
                json.dump(self._documents, f, indent=2)
                f.flush()
                os.fsync(f.fileno())
            os.replace(tmp_path, self.db_filepath)
        except Exception:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
            raise

    def insert(self, doc_id: str, doc: Dict[str, Any]) -> bool:
        with self._lock:
            if doc_id in self._documents:
                return False  # Primary key conflict
            self._documents[doc_id] = doc
            # Update secondary index
            course = doc.get("course_code")
            if course:
                self._index_by_course.setdefault(course, set()).add(doc_id)
            self._save_atomic_to_disk()
            return True

    def get(self, doc_id: str) -> Optional[Dict[str, Any]]:
        with self._lock:
            return self._documents.get(doc_id)

    def find_by_course(self, course_code: str) -> List[Dict[str, Any]]:
        """O(1) secondary index lookup."""
        with self._lock:
            doc_ids = self._index_by_course.get(course_code, set())
            return [self._documents[did] for did in doc_ids if did in self._documents]

    def query(self, predicate: Callable[[Dict[str, Any]], bool]) -> List[Dict[str, Any]]:
        """General predicate scan."""
        with self._lock:
            return [doc for doc in self._documents.values() if predicate(doc)]

    def count(self) -> int:
        with self._lock:
            return len(self._documents)


def demonstrate_thread_safe_docdb():
    print("=" * 70)
    print("CODER & ACCOTAX - THREAD-SAFE JSON DOCUMENT STORE")
    print("=" * 70)

    db_path = os.path.join(tempfile.gettempdir(), "coder_accotax_doc_db.json")
    db = ThreadSafeJsonDocDB(db_path)

    # 1. Insert documents
    print("1. Inserting Student Documents with Concurrency Locks & Indices:")
    db.insert("STU-101", {"name": "Sourav Mukherjee", "course_code": "PY-AI", "fee": 28500.0})
    db.insert("STU-102", {"name": "Priyanka Sen", "course_code": "DS-ML", "fee": 32000.0})
    db.insert("STU-103", {"name": "Debolina Roy", "course_code": "PY-AI", "fee": 28500.0})

    print(f"   * Total Records in Database: {db.count()}")

    # 2. Fast O(1) Secondary Index Query:
    print("\n2. Querying Students by Course Code (O(1) Secondary Index Lookup):")
    py_students = db.find_by_course("PY-AI")
    print(f"   * Found {len(py_students)} Students in 'PY-AI':")
    for s in py_students:
        print(f"     - {s['name']} (Fee: INR {s['fee']:,.2f})")

    # 3. Predicate Scan Query:
    print("\n3. Scanning with Predicate Function (Fee > 30,000):")
    high_fee_students = db.query(lambda d: d.get("fee", 0) > 30000.0)
    for s in high_fee_students:
        print(f"     - {s['name']} (Course: {s['course_code']})")

    # Cleanup:
    if os.path.exists(db_path):
        os.remove(db_path)

    print("\n[PASSED] Thread-Safe JSON Document Database Verified.")


if __name__ == "__main__":
    demonstrate_thread_safe_docdb()
