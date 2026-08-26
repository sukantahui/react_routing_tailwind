"""
# Module: 004_004_capstone-projects
# Topic 1: Integrating SQLite / JSON persistence, OOP models, and business logic
# File: json_document_store_and_serializer.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating crash-proof atomic JSON persistence and custom encoders.
"""

import json
import os
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from pathlib import Path
import tempfile

@dataclass
class StudentProfileDocument:
    sid: str
    name: str
    campus: str
    enrolled_courses: list[str]
    last_updated: datetime

class InstitutionalJSONEncoder(json.JSONEncoder):
    """Custom JSON encoder handling datetime objects and custom domain models."""
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        if hasattr(obj, "__dataclass_fields__"):
            return asdict(obj)
        return super().default(obj)

def atomic_save_json(filepath: Path, data: dict | list):
    """Atomically writes JSON to disk via temporary file and atomic swap."""
    filepath = Path(filepath)
    filepath.parent.mkdir(parents=True, exist_ok=True)

    # 1. Write to temporary file in the same directory
    temp_file = filepath.with_suffix(".tmp")
    with open(temp_file, "w", encoding="utf-8") as f:
        json.dump(data, f, cls=InstitutionalJSONEncoder, indent=2)

    # 2. Atomic OS replace - atomic across modern filesystems
    os.replace(temp_file, filepath)

def load_json(filepath: Path) -> dict:
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)

def test_atomic_json_store():
    print("   [...] Testing Crash-Resilient Atomic JSON Persistence...")
    with tempfile.TemporaryDirectory() as tmpdir:
        json_path = Path(tmpdir) / "students_registry.json"

        # 1. Create document with datetime
        doc = StudentProfileDocument(
            sid="STU_BP_01",
            name="Mamata",
            campus="Barrackpore",
            enrolled_courses=["Python Pro", "Automated Testing"],
            last_updated=datetime.now(timezone.utc)
        )

        # 2. Atomic save
        atomic_save_json(json_path, [doc])
        print("   [PASS] 1. Document serialized and atomically written to disk")

        # 3. Reload and inspect
        loaded = load_json(json_path)
        assert len(loaded) == 1
        assert loaded[0]["name"] == "Mamata"
        assert loaded[0]["campus"] == "Barrackpore"
        print(f"   [PASS] 2. Reloaded JSON: {loaded[0]['name']} ({loaded[0]['campus']}) -> Courses: {loaded[0]['enrolled_courses']}")

def main():
    print("=" * 75)
    print("[JSON ATOMIC STORAGE] Crash-Resilient Document Persistence")
    print("=" * 75)

    test_atomic_json_store()

    print("=" * 75)
    print("[TAKEAWAY] Writing JSON through a temporary file with os.replace() prevents")
    print("           corrupted 0-byte files if a system loses power during saving.")
    print("=" * 75)

if __name__ == "__main__":
    main()
