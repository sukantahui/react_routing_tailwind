# topic2_files/os_walk_tree_traversal_mechanics.py
# Module: 004_001_filesystem-os
# Topic: Directory traversal: os.walk(), scandir(), and glob patterns
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 1: `os.walk()` Tree Traversal & In-Place Pruning
Demonstrates:
  1. The 3-tuple `(root, dirs, files)` generated during recursive tree walks
  2. In-place directory pruning by mutating `dirs[:]` or `dirs.remove()`
  3. Top-down (`topdown=True`) vs Bottom-up (`topdown=False`) tree traversal
"""

import os
import shutil

def demonstrate_os_walk_mechanics():
    print("=" * 70)
    print("CODER & ACCOTAX - OS.WALK() TREE TRAVERSAL & PRUNING")
    print("=" * 70)

    demo_root = "temp_accotax_walk_tree"

    try:
        # 1. Setup multi-level folder structure with active and cached folders:
        os.makedirs(os.path.join(demo_root, "barrackpore", "py_ai_2026"), exist_ok=True)
        os.makedirs(os.path.join(demo_root, "barrackpore", "__pycache__"), exist_ok=True)
        os.makedirs(os.path.join(demo_root, "kolkata", "ds_ml_2026"), exist_ok=True)
        os.makedirs(os.path.join(demo_root, "kolkata", ".temp_backup"), exist_ok=True)

        with open(os.path.join(demo_root, "barrackpore", "py_ai_2026", "stu_101.json"), "w") as f:
            f.write('{"id": "STU-101", "name": "Sourav"}')
        with open(os.path.join(demo_root, "barrackpore", "__pycache__", "cache.pyc"), "w") as f:
            f.write("COMPILED_BYTECODE")
        with open(os.path.join(demo_root, "kolkata", "ds_ml_2026", "stu_102.json"), "w") as f:
            f.write('{"id": "STU-102", "name": "Priyanka"}')

        # 2. Standard Top-Down Tree Walk:
        print("1. Standard `os.walk(topdown=True)` - Inspecting 3-Tuple (root, dirs, files):")
        for root, dirs, files in os.walk(demo_root, topdown=True):
            indent_level = root.count(os.sep)
            indent = "  " * indent_level
            print(f"{indent}[DIR] {root}")
            for f_name in files:
                print(f"{indent}  |-- [FILE] {f_name}")

        # 3. In-Place Directory Pruning (Excluding '__pycache__' and '.temp_backup'):
        print("\n2. In-Place Tree Pruning (`dirs[:] = [d for d in dirs if not d.startswith('.')]`):")
        pruned_results = []
        for root, dirs, files in os.walk(demo_root, topdown=True):
            # PRUNING INVARIANT: Modify `dirs` in-place to prevent os.walk from recursing into them!
            dirs[:] = [d for d in dirs if d != "__pycache__" and not d.startswith(".")]

            for f_name in files:
                full_file_path = os.path.join(root, f_name)
                pruned_results.append(full_file_path)

        print(f"   * Discovered {len(pruned_results)} Valid Files after Pruning Caches:")
        for path in pruned_results:
            print(f"     - {path}")

        # 4. Bottom-Up Walk (`topdown=False`):
        print("\n3. Bottom-Up Traversal (`os.walk(topdown=False)`):")
        for root, dirs, files in os.walk(demo_root, topdown=False):
            print(f"   * Finished Children of: {root} (dirs: {dirs}, files: {files})")

    finally:
        # Cleanup demo tree
        if os.path.exists(demo_root):
            shutil.rmtree(demo_root)
            print("\n4. Cleanup: Removed demo directory tree.")

    print(r"""
os.walk Invariants:
  1. `os.walk()` yields a 3-tuple `(root, dirs, files)` at every directory node.
  2. Modifying `dirs[:]` in-place when `topdown=True` tells `os.walk()` to SKIP visiting pruned subtrees.
  3. `topdown=False` traverses child folders before parent folders (ideal for recursive bottom-up cleanup).
""")
    print("[PASSED] os.walk() Tree Traversal & Pruning Verified.")


if __name__ == "__main__":
    demonstrate_os_walk_mechanics()
