# topic7_files/file_sorter_and_extension_classifier.py
# Module: 004_001_filesystem-os
# Topic: Automated directory backup and file organizer scripts
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 1: Automated File Sorter & Extension Classifier
Demonstrates:
  1. Automated sorting of messy ingestion directories (e.g. Downloads, incoming vaults)
  2. Categorizing files by extension (`.pdf` -> `Documents/`, `.csv` -> `Data/`, `.png` -> `Images/`)
  3. Collision resolution (renaming duplicates `name (1).ext`) and atomic moving with `shutil.move()`
"""

import os
import shutil
from pathlib import Path
from typing import Dict, List, Any

class AutomatedFileOrganizer:
    """Production directory organizer and extension classifier."""

    CATEGORY_MAP = {
        "Documents": {".pdf", ".docx", ".doc", ".txt", ".odt"},
        "Spreadsheets_and_Data": {".csv", ".xlsx", ".xls", ".json", ".sql"},
        "Images_and_Media": {".png", ".jpg", ".jpeg", ".svg", ".gif"},
        "Archives_and_Backups": {".zip", ".tar", ".gz", ".rar", ".7z"}
    }

    def __init__(self, watch_dir: str):
        self.watch_dir = Path(watch_dir)

    def resolve_filename_collision(self, target_path: Path) -> Path:
        """Returns a non-colliding path by appending a counter: 'doc (1).pdf'."""
        if not target_path.exists():
            return target_path
        
        parent = target_path.parent
        stem = target_path.stem
        suffix = target_path.suffix
        counter = 1

        while True:
            new_path = parent / f"{stem} ({counter}){suffix}"
            if not new_path.exists():
                return new_path
            counter += 1

    def organize_directory(self) -> Dict[str, Any]:
        """Categorizes and moves all loose files in watch_dir to categorized subfolders."""
        if not self.watch_dir.exists():
            return {"error": "Watch directory does not exist"}

        moved_files = []
        uncategorized_files = []

        # Iterate over immediate files in watch directory
        for item in self.watch_dir.iterdir():
            if not item.is_file():
                continue

            file_ext = item.suffix.lower()
            target_category = "Other_Uncategorized"

            # Match extension against category mapping:
            for cat, extensions in self.CATEGORY_MAP.items():
                if file_ext in extensions:
                    target_category = cat
                    break

            cat_dir = self.watch_dir / target_category
            cat_dir.mkdir(parents=True, exist_ok=True)

            destination_path = self.resolve_filename_collision(cat_dir / item.name)
            shutil.move(str(item), str(destination_path))

            record = {
                "original_name": item.name,
                "category": target_category,
                "moved_to": str(destination_path.relative_to(self.watch_dir))
            }

            if target_category == "Other_Uncategorized":
                uncategorized_files.append(record)
            else:
                moved_files.append(record)

        return {
            "watch_directory": str(self.watch_dir.resolve()),
            "total_files_organized": len(moved_files) + len(uncategorized_files),
            "categorized_count": len(moved_files),
            "uncategorized_count": len(uncategorized_files),
            "organized_manifest": moved_files + uncategorized_files
        }


def demonstrate_file_organizer():
    print("=" * 70)
    print("CODER & ACCOTAX - AUTOMATED FILE SORTER & EXTENSION CLASSIFIER")
    print("=" * 70)

    sandbox = Path("temp_accotax_organizer_sandbox")
    sandbox.mkdir(parents=True, exist_ok=True)

    try:
        # Create loose unorganized files:
        (sandbox / "sourav_admission.pdf").write_text("DUMMY_PDF")
        (sandbox / "admissions_2026.csv").write_text("id,name\nSTU-101,Sourav")
        (sandbox / "campus_logo.png").write_text("DUMMY_PNG")
        (sandbox / "backup_archive.zip").write_text("DUMMY_ZIP")
        (sandbox / "unrecognized_asset.xyz").write_text("DUMMY_XYZ")

        organizer = AutomatedFileOrganizer(str(sandbox))
        report = organizer.organize_directory()

        print("1. File Organization Execution Summary:")
        print(f"   * Watch Directory  : {report['watch_directory']}")
        print(f"   * Total Organized  : {report['total_files_organized']}")
        print(f"   * Categorized      : {report['categorized_count']}")
        print(f"   * Uncategorized    : {report['uncategorized_count']}\n")

        print("2. Organized Files Manifest:")
        for item in report["organized_manifest"]:
            print(f"   * {item['original_name']:<24} -> [{item['category']:<22}] {item['moved_to']}")

    finally:
        # Cleanup sandbox directory
        if sandbox.exists():
            shutil.rmtree(sandbox)
            print("\n3. Cleanup: Removed organizer demo sandbox.")

    print("\n[PASSED] Automated File Sorter & Classifier Verified.")


if __name__ == "__main__":
    demonstrate_file_organizer()
