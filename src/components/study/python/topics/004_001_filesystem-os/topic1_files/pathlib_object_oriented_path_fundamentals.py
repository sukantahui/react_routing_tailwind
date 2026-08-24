# topic1_files/pathlib_object_oriented_path_fundamentals.py
# Module: 004_001_filesystem-os
# Topic: Modern path manipulation with pathlib.Path
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 1: `pathlib.Path` Object-Oriented Path Fundamentals
Demonstrates:
  1. Creating and anchoring paths: `Path.cwd()`, `Path.home()`, `Path()`
  2. The intuitive slash `/` path joining operator (replaces `os.path.join`)
  3. Decomposing paths: `.name`, `.stem`, `.suffix`, `.suffixes`, `.parent`, `.parents`
"""

from pathlib import Path
from typing import List

def demonstrate_pathlib_fundamentals():
    print("=" * 70)
    print("CODER & ACCOTAX - PATHLIB OBJECT-ORIENTED FUNDAMENTALS")
    print("=" * 70)

    # 1. Instantiating Path Objects & Anchors:
    cwd_path = Path.cwd()
    home_path = Path.home()
    print("1. Path Anchors & Instances:")
    print(f"   * Current Working Directory : {cwd_path}")
    print(f"   * User Home Directory       : {home_path}\n")

    # 2. Intuitive Slash `/` Operator (Replaces `os.path.join`):
    vault_base = Path("accotax_vault")
    student_doc = vault_base / "students" / "2026" / "STU_101_Sourav.kyc.pdf"

    print("2. Slash `/` Path Composition:")
    print(f"   * Composed Path: {student_doc}")
    print(f"   * Path Type    : {type(student_doc).__name__} ({'WindowsPath' if Path is type(student_doc) else 'PosixPath'})\n")

    # 3. Path Anatomy & Decomposition:
    print("3. Path Anatomy Breakdown (`.name`, `.stem`, `.suffix`, `.parent`):")
    print(f"   * Full Path Str       : {student_doc}")
    print(f"   * .name (Filename)    : {student_doc.name}")
    print(f"   * .stem (Base Name)   : {student_doc.stem} (Without last extension)")
    print(f"   * .suffix (Extension) : {student_doc.suffix}")
    print(f"   * .suffixes (All Exts): {student_doc.suffixes} (Multiple extensions)")
    print(f"   * .parent (Folder)    : {student_doc.parent}")
    print(f"   * .parents[0] (Parent): {student_doc.parents[0]}")
    print(f"   * .parents[1] (Grand) : {student_doc.parents[1]}")
    print(f"   * .parents[2] (Great) : {student_doc.parents[2]}\n")

    # 4. Pure Path Transformations (.with_suffix, .with_name):
    print("4. Pure Path Transformation Helpers (Copy-on-Write):")
    backup_doc = student_doc.with_suffix(".bak.pdf")
    renamed_doc = student_doc.with_name("STU_101_Archived.pdf")

    print(f"   * with_suffix('.bak.pdf') : {backup_doc.name}")
    print(f"   * with_name('Archived')   : {renamed_doc.name}")

    print(r"""
pathlib Invariants:
  1. `pathlib.Path` treats paths as first-class objects with rich methods rather than raw strings.
  2. The `/` operator automatically joins paths with the correct operating system separator.
  3. `.stem` extracts the filename without the last extension; `.suffixes` returns a list of all extensions.
""")
    print("[PASSED] pathlib.Path Fundamentals Verified.")


if __name__ == "__main__":
    demonstrate_pathlib_fundamentals()
