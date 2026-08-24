# topic2_files/institutional_course_catalog_and_fee_exporter.py
# Module: 003_004_working-with-json
# Topic: Serialization: json.dump() vs json.dumps() with indent, sort_keys
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 4: Course Catalog & Fee Exporter Suite (Case Study)
Demonstrates:
  1. Multi-target JSON serialization (Human-readable catalog, minified API payload)
  2. Generating SHA-256 integrity manifests for institutional auditing
  3. Production file persistence with UTF-8 encoding and sort_keys
"""

import json
import hashlib
import tempfile
import os
from typing import Dict, Any, Tuple

class CourseCatalogExporter:
    """Manages multi-format JSON export for Coder & AccoTax Course Catalogs."""

    @staticmethod
    def generate_human_readable_spec(data: Dict[str, Any]) -> str:
        """Exports pretty-printed JSON for administrator inspection."""
        return json.dumps(data, indent=4, sort_keys=True, ensure_ascii=False)

    @staticmethod
    def generate_minified_api_payload(data: Dict[str, Any]) -> str:
        """Exports ultra-compact JSON for high-speed API data transfer."""
        return json.dumps(data, separators=(",", ":"), sort_keys=True, ensure_ascii=True)

    @classmethod
    def export_catalog_package(cls, data: Dict[str, Any], output_dir: str) -> Tuple[str, str, str]:
        """Saves both human-readable and minified files alongside a SHA-256 manifest."""
        os.makedirs(output_dir, exist_ok=True)
        
        pretty_path = os.path.join(output_dir, "catalog_admin_spec.json")
        minified_path = os.path.join(output_dir, "catalog_api_payload.min.json")
        manifest_path = os.path.join(output_dir, "manifest.sha256")

        # 1. Write Human-Readable File:
        with open(pretty_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, sort_keys=True)

        # 2. Write Minified File:
        minified_content = cls.generate_minified_api_payload(data)
        with open(minified_path, "w", encoding="utf-8") as f:
            f.write(minified_content)

        # 3. Compute Checksum and Write Manifest:
        file_hash = hashlib.sha256(minified_content.encode("utf-8")).hexdigest()
        with open(manifest_path, "w", encoding="utf-8") as f:
            f.write(f"SHA256 (catalog_api_payload.min.json) = {file_hash}\n")

        return pretty_path, minified_path, file_hash


def run_exporter_case_study():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL COURSE CATALOG EXPORTER")
    print("=" * 70)

    official_catalog = {
        "institution": "Coder & AccoTax",
        "academic_session": "2026-2027",
        "accreditation": "Autonomous Technical Education",
        "catalog_entries": [
            {
                "code": "PY-101",
                "title": "Python Core & Advanced Systems",
                "fee_inr": 25000.0,
                "duration_weeks": 16,
                "modules": ["OOP", "Decorators", "Generators", "JSON APIs"]
            },
            {
                "code": "AI-201",
                "title": "Machine Learning & Generative AI",
                "fee_inr": 35000.0,
                "duration_weeks": 24,
                "modules": ["NumPy", "PyTorch", "LLMs", "Agentic Systems"]
            }
        ]
    }

    export_dir = os.path.join(tempfile.gettempdir(), "coder_catalog_export_2026")
    pretty_p, min_p, sha = CourseCatalogExporter.export_catalog_package(official_catalog, export_dir)

    print("1. Catalog Exported Successfully:")
    print(f"   * Admin Spec Path   : {pretty_p} ({os.path.getsize(pretty_p)} bytes)")
    print(f"   * Minified API Path : {min_p} ({os.path.getsize(min_p)} bytes)")
    print(f"   * SHA-256 Checksum  : {sha}")

    # Clean up:
    for p in (pretty_p, min_p, os.path.join(export_dir, "manifest.sha256")):
        if os.path.exists(p):
            os.remove(p)
    if os.path.exists(export_dir):
        os.rmdir(export_dir)

    print("\n[PASSED] Institutional Course Catalog Exporter Verified.")


if __name__ == "__main__":
    run_exporter_case_study()
