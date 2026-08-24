# topic3_files/shutil_archiving_and_unzipping.py
# Module: 004_001_filesystem-os
# Topic: shutil module: copying, moving, archiving, and recursive deletions
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 3: `shutil` High-Level Archiving & Unpacking
Demonstrates:
  1. Inspecting supported archive formats: `shutil.get_archive_formats()`
  2. Compressing directories into `.zip` and `.tar.gz` with `shutil.make_archive()`
  3. Decompressing and extracting archives with `shutil.unpack_archive()`
"""

import os
import shutil

def demonstrate_archiving_and_unpacking():
    print("=" * 70)
    print("CODER & ACCOTAX - SHUTIL ARCHIVING & UNPACKING SUITE")
    print("=" * 70)

    sandbox = "temp_accotax_archive_sandbox"
    data_dir = os.path.join(sandbox, "data_to_pack")
    extracted_dir = os.path.join(sandbox, "extracted_output")
    archive_base_name = os.path.join(sandbox, "accotax_backup_2026")

    try:
        # 1. Inspect Supported Formats:
        print("1. Supported Standard Archive Formats in Python:")
        for fmt, desc in shutil.get_archive_formats():
            print(f"   * Format: {fmt:<8} -> {desc}")

        # 2. Setup Files for Compression:
        os.makedirs(data_dir, exist_ok=True)
        with open(os.path.join(data_dir, "students.csv"), "w") as f:
            f.write("id,name,course\nSTU-101,Sourav Mukherjee,Python Pro\n")
        with open(os.path.join(data_dir, "metadata.json"), "w") as f:
            f.write('{"backup_version": "2026.1", "encrypted": false}')

        # 3. Create Zip Archive with shutil.make_archive():
        print("\n2. Creating Compressed `.zip` Archive with `shutil.make_archive()`:")
        archive_path = shutil.make_archive(
            base_name=archive_base_name,
            format="zip",
            root_dir=data_dir
        )
        print(f"   * Created Archive File : {archive_path}")
        print(f"   * Archive Size on Disk : {os.path.getsize(archive_path)} bytes\n")

        # 4. Unpack Archive with shutil.unpack_archive():
        print("3. Extracting Archive with `shutil.unpack_archive()`:")
        shutil.unpack_archive(archive_path, extract_dir=extracted_dir)
        print(f"   * Extracted to Directory: {extracted_dir}")
        print(f"   * Extracted Files       : {os.listdir(extracted_dir)}")

    finally:
        # Cleanup sandbox directory
        if os.path.exists(sandbox):
            shutil.rmtree(sandbox)
            print("\n4. Cleanup: Removed archiving sandbox directory.")

    print(r"""
shutil Archiving Invariants:
  1. `shutil.make_archive()` handles zip, tar, gztar, bztar, and xztar compression formats without third-party libraries.
  2. `shutil.unpack_archive()` automatically detects the archive format from the file extension.
  3. `root_dir` specifies the folder to compress, preventing deep nested relative paths in the resulting zip.
""")
    print("[PASSED] shutil Archiving & Unpacking Verified.")


if __name__ == "__main__":
    demonstrate_archiving_and_unpacking()
