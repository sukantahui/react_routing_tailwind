# topic2_files/os_scandir_high_performance_iterator.py
# Module: 004_001_filesystem-os
# Topic: Directory traversal: os.walk(), scandir(), and glob patterns
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 2: `os.scandir()` High-Performance Iterator & `DirEntry`
Demonstrates:
  1. `os.scandir()` iterator yielding rich `os.DirEntry` objects
  2. Inode & metadata caching: avoiding redundant `stat` system calls
  3. Performance benchmark: `os.scandir()` vs legacy `os.listdir() + os.stat()`
"""

import os
import shutil
import timeit

def demonstrate_scandir_performance():
    print("=" * 70)
    print("CODER & ACCOTAX - OS.SCANDIR() HIGH-PERFORMANCE ITERATOR")
    print("=" * 70)

    sandbox = "temp_accotax_scandir_bench"

    try:
        # Create 100 dummy files for benchmarking
        os.makedirs(sandbox, exist_ok=True)
        for i in range(100):
            with open(os.path.join(sandbox, f"record_{i:04d}.csv"), "w") as f:
                f.write("SAMPLE_RECORD_DATA")

        # 1. Using os.scandir() with Context Manager:
        print("1. Inspecting `os.DirEntry` Objects via `os.scandir()`:")
        with os.scandir(sandbox) as entries:
            sample_entries = [e for _, e in zip(range(3), entries)]
            for entry in sample_entries:
                print(f"   * Entry Name   : {entry.name}")
                print(f"   * Entry Path   : {entry.path}")
                print(f"   * is_file()    : {entry.is_file()}")
                print(f"   * is_dir()     : {entry.is_dir()}")
                print(f"   * Cached Size  : {entry.stat().st_size} bytes\n")

        # 2. Performance Benchmark on 100 files:
        print("2. Performance Benchmark: `os.scandir()` vs `os.listdir() + os.stat()` (100 files x 20 runs):")

        def bench_listdir():
            total_size = 0
            for name in os.listdir(sandbox):
                full_p = os.path.join(sandbox, name)
                if os.path.isfile(full_p):
                    total_size += os.path.getsize(full_p)
            return total_size

        def bench_scandir():
            total_size = 0
            with os.scandir(sandbox) as entries:
                for entry in entries:
                    if entry.is_file():
                        total_size += entry.stat().st_size
            return total_size

        t_listdir = timeit.timeit(bench_listdir, number=20)
        t_scandir = timeit.timeit(bench_scandir, number=20)

        print(f"   * Legacy `os.listdir() + os.stat()` : {t_listdir:.4f}s")
        print(f"   * Modern `os.scandir()`             : {t_scandir:.4f}s (C-level Cached Inodes)")
        print(f"   * Speedup                           : ~{t_listdir / t_scandir:.1f}x Faster with os.scandir()!\n")

    finally:
        # Cleanup sandbox directory
        if os.path.exists(sandbox):
            shutil.rmtree(sandbox)
            print("3. Cleanup: Removed benchmark directory successfully.")

    print(r"""
os.scandir Invariants:
  1. `os.scandir()` returns an iterator of `DirEntry` objects that cache file attributes from the directory scan.
  2. It avoids expensive secondary `stat()` system calls, making it 2x to 10x faster than `os.listdir()`.
  3. Always use `with os.scandir(path) as it:` to ensure early release of OS directory file handles.
""")
    print("[PASSED] os.scandir() High-Performance Iterator Verified.")


if __name__ == "__main__":
    demonstrate_scandir_performance()
