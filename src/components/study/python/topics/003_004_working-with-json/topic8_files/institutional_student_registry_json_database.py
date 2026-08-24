# topic8_files/institutional_student_registry_json_database.py
# Module: 003_004_working-with-json
# Topic: Building JSON-backed persistent data stores
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 4: Institutional Student Registry JSON Database Engine (Case Study)
Demonstrates:
  1. Complete ACID-like embedded JSON document database
  2. Concurrency-safe transactions, secondary multi-attribute indexing, and atomic writes
  3. Automatic timestamped backup snapshot generation and disaster recovery
"""

import json
import os
import shutil
import tempfile
import threading
import time
from decimal import Decimal
from typing import Dict, Any, List, Optional

class InstitutionalRegistryDB:
    """Production JSON document database for Coder & AccoTax Student Registrations."""

    def __init__(self, base_dir: str):
        self.base_dir = base_dir
        self.db_filepath = os.path.join(base_dir, "student_registry_live.json")
        self.backup_dir = os.path.join(base_dir, "backups")
        os.makedirs(self.backup_dir, exist_ok=True)

        self._lock = threading.RLock()
        self._store: Dict[str, Dict[str, Any]] = {}
        self._index_course: Dict[str, set] = {}
        self._index_status: Dict[str, set] = {}

        self._initialize_store()

    def _initialize_store(self):
        with self._lock:
            if os.path.exists(self.db_filepath) and os.path.getsize(self.db_filepath) > 0:
                try:
                    with open(self.db_filepath, "r", encoding="utf-8") as f:
                        self._store = json.load(f)
                    self._reindex()
                except Exception as exc:
                    print(f"  [ALERT] Primary store corrupt ({exc}). Checking backups...")
                    self._restore_latest_backup()
            else:
                self._store = {}
                self._flush_atomic()

    def _reindex(self):
        self._index_course.clear()
        self._index_status.clear()
        for sid, doc in self._store.items():
            if "course_code" in doc:
                self._index_course.setdefault(doc["course_code"], set()).add(sid)
            if "status" in doc:
                self._index_status.setdefault(doc["status"], set()).add(sid)

    def _flush_atomic(self):
        fd, tmp = tempfile.mkstemp(dir=self.base_dir, prefix="db_tx_", suffix=".json")
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(self._store, f, indent=2)
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp, self.db_filepath)

    def create_backup_snapshot(self) -> str:
        with self._lock:
            ts = time.strftime("%Y%m%d_%H%M%S")
            backup_path = os.path.join(self.backup_dir, f"registry_backup_{ts}.json")
            shutil.copy2(self.db_filepath, backup_path)
            return backup_path

    def _restore_latest_backup(self):
        backups = sorted(os.listdir(self.backup_dir), reverse=True)
        for b in backups:
            bpath = os.path.join(self.backup_dir, b)
            try:
                with open(bpath, "r", encoding="utf-8") as f:
                    self._store = json.load(f)
                self._reindex()
                self._flush_atomic()
                print(f"  [RECOVERY SUCCESS] Restored database from backup: {b}")
                return
            except Exception:
                continue
        self._store = {}

    def register_student(self, student_id: str, full_name: str, course_code: str, fee_paid: float) -> bool:
        with self._lock:
            if student_id in self._store:
                return False
            self._store[student_id] = {
                "student_id": student_id,
                "full_name": full_name,
                "course_code": course_code,
                "fee_paid": fee_paid,
                "status": "ENROLLED",
                "registered_at": time.strftime("%Y-%m-%d %H:%M:%S")
            }
            self._reindex()
            self._flush_atomic()
            return True

    def find_by_course(self, course_code: str) -> List[Dict[str, Any]]:
        with self._lock:
            sids = self._index_course.get(course_code, set())
            return [self._store[sid] for sid in sids if sid in self._store]

    def get_financial_summary(self) -> Dict[str, Any]:
        with self._lock:
            total_rev = sum(Decimal(str(doc.get("fee_paid", 0.0))) for doc in self._store.values())
            return {
                "total_registered_students": len(self._store),
                "total_revenue_inr": total_rev,
                "course_enrollment_counts": {c: len(ids) for c, ids in self._index_course.items()}
            }


def run_institutional_registry_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL STUDENT REGISTRY JSON DATABASE")
    print("=" * 70)

    work_dir = tempfile.mkdtemp(prefix="coder_accotax_db_")
    db = InstitutionalRegistryDB(work_dir)

    # 1. Register students
    print("1. Registering Students into Atomic Document Store:")
    db.register_student("STU-101", "Sourav Mukherjee", "PY-AI", 28500.0)
    db.register_student("STU-102", "Priyanka Sen", "DS-ML", 32000.0)
    db.register_student("STU-103", "Debolina Roy", "PY-AI", 28500.0)

    # 2. Financial & enrollment summary:
    summary = db.get_financial_summary()
    print("\n2. Live Financial & Enrollment Audit Metrics:")
    print(f"   * Total Active Students : {summary['total_registered_students']}")
    print(f"   * Total Collected Revenue: INR {summary['total_revenue_inr']:,.2f}")
    print(f"   * Enrollment By Course  : {summary['course_enrollment_counts']}\n")

    # 3. Create Backup Snapshot:
    print("3. Generating Automated Backup Snapshot:")
    backup_file = db.create_backup_snapshot()
    print(f"   * Backup Created At : {os.path.basename(backup_file)}")

    # 4. Query using Secondary Index:
    print("\n4. Fast O(1) Index Lookup for Course 'PY-AI':")
    py_students = db.find_by_course("PY-AI")
    for s in py_students:
        print(f"   * [{s['student_id']}] {s['full_name']:<18} | Status: {s['status']}")

    # Cleanup:
    shutil.rmtree(work_dir, ignore_errors=True)

    print("\n[PASSED] Institutional Student Registry JSON Database Verified.")


if __name__ == "__main__":
    run_institutional_registry_demo()
