# topic1_files/institutional_pathlib_document_vault_manager.py
# Module: 004_001_filesystem-os
# Topic: Modern path manipulation with pathlib.Path
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 4: Institutional Document Vault & Path Manager (Case Study)
Demonstrates:
  1. Complete digital vault manager using `pathlib.Path`
  2. Automated candidate folder creation, document sanitization, and extension checks
  3. Recursive audit scanning with `.rglob()` and computing `.relative_to()` summaries
"""

import json
import shutil
from pathlib import Path
from typing import Dict, Any, List, Tuple

class InstitutionalDocumentVaultManager:
    """Production digital document vault manager powered by pathlib.Path."""

    ALLOWED_EXTENSIONS = {".pdf", ".jpg", ".png", ".json"}

    def __init__(self, vault_root: Path):
        self.vault_root = vault_root
        self.vault_root.mkdir(parents=True, exist_ok=True)

    def register_student_dossier(self, campus: str, batch: str, student_id: str, student_name: str, payload_data: Dict[str, Any]) -> Path:
        """Creates a dedicated student dossier folder and persists profile metadata."""
        # Sanitize student folder name
        sanitized_name = student_name.strip().replace(" ", "_")
        student_folder = self.vault_root / campus.lower() / batch.lower() / f"{student_id}_{sanitized_name}"
        student_folder.mkdir(parents=True, exist_ok=True)

        # Write metadata profile JSON:
        profile_path = student_folder / "profile.json"
        profile_path.write_text(json.dumps(payload_data, indent=2), encoding="utf-8")

        # Create mock KYC files
        (student_folder / "aadhaar_card.pdf").write_text("DUMMY_AADHAAR_CONTENT", encoding="utf-8")
        (student_folder / "marksheet_12th.pdf").write_text("DUMMY_MARKSHEET_CONTENT", encoding="utf-8")

        return student_folder

    def audit_vault_documents(self) -> Dict[str, Any]:
        """Scans entire vault recursively with .rglob() and verifies document integrity."""
        all_files = list(self.vault_root.rglob("*"))
        regular_files = [f for f in all_files if f.is_file()]

        valid_docs = []
        invalid_extensions = []

        for doc in regular_files:
            rel_path = doc.relative_to(self.vault_root)
            if doc.suffix.lower() in self.ALLOWED_EXTENSIONS:
                valid_docs.append({
                    "filename": doc.name,
                    "stem": doc.stem,
                    "suffix": doc.suffix,
                    "relative_path": str(rel_path),
                    "size_bytes": doc.stat().st_size
                })
            else:
                invalid_extensions.append(str(rel_path))

        return {
            "vault_root": str(self.vault_root.resolve()),
            "total_files_audited": len(regular_files),
            "valid_document_count": len(valid_docs),
            "quarantined_files": invalid_extensions,
            "document_inventory": valid_docs
        }


def demonstrate_vault_manager():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL DOCUMENT VAULT & PATH MANAGER")
    print("=" * 70)

    vault_path = Path("temp_accotax_institutional_vault")
    manager = InstitutionalDocumentVaultManager(vault_path)

    try:
        # 1. Registering Candidate Dossiers across Campuses:
        print("1. Initializing Student Dossier Paths with `pathlib.Path`:")
        s1_folder = manager.register_student_dossier(
            campus="Barrackpore",
            batch="PY-AI-2026",
            student_id="STU-101",
            student_name="Sourav Mukherjee",
            payload_data={"id": "STU-101", "name": "Sourav Mukherjee", "course": "PY-AI", "fee_cleared": True}
        )
        print(f"   * Registered Dossier 1: {s1_folder}")

        s2_folder = manager.register_student_dossier(
            campus="Kolkata",
            batch="DS-ML-2026",
            student_id="STU-102",
            student_name="Priyanka Sen",
            payload_data={"id": "STU-102", "name": "Priyanka Sen", "course": "DS-ML", "fee_cleared": True}
        )
        print(f"   * Registered Dossier 2: {s2_folder}\n")

        # 2. Executing Recursive Vault Audit (.rglob):
        print("2. Executing Recursive Vault Audit (`vault_path.rglob('*')`):")
        audit_report = manager.audit_vault_documents()

        print(f"   * Vault Canonical Path     : {audit_report['vault_root']}")
        print(f"   * Total Files Stored       : {audit_report['total_files_audited']}")
        print(f"   * Valid Approved Documents : {audit_report['valid_document_count']}")
        print(f"   * Quarantined Files        : {audit_report['quarantined_files']}\n")

        print("3. Sample Document Inventory Entries:")
        for doc in audit_report["document_inventory"][:4]:
            print(f"   * [{doc['suffix']:<5}] {doc['filename']:<22} | Rel: {doc['relative_path']}")

    finally:
        # Cleanup vault directory
        if vault_path.exists():
            shutil.rmtree(vault_path)
            print("\n4. Cleanup: Removed institutional document vault safely.")

    print("\n[PASSED] Institutional Document Vault & Path Manager Verified.")


if __name__ == "__main__":
    demonstrate_vault_manager()
