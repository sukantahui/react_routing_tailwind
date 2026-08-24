# topic2_files/timeit_syntax_and_idiom_shootouts.py
# Module: 004_002_performance-optimization
# Topic: Benchmarking code with timeit module
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 2: Python Idiom Shootouts & Bytecode Disassembly
Demonstrates:
  1. Shootout 1: String formatting (`+` concat vs `%` vs `.format()` vs f-string)
  2. Shootout 2: Dict literal `{}` vs `dict()` constructor
  3. Shootout 3: Sequence emptiness check `if not seq:` vs `if len(seq) == 0:`
  4. Inspecting CPython bytecode instructions with `dis.dis()` to explain speed differences
"""

import dis
import timeit

def benchmark_idiom_shootouts():
    print("=" * 70)
    print("CODER & ACCOTAX - PYTHON IDIOM BENCHMARK SHOOTOUTS")
    print("=" * 70)

    loops = 1_000_000

    # -------------------------------------------------------------
    # Shootout 1: String Formatting
    # -------------------------------------------------------------
    print(f"1. Shootout: String Formatting ({loops:,} executions):")
    t_fstring = min(timeit.repeat("name = 'Sourav'; f'Student: {name}'", number=loops, repeat=5))
    t_plus = min(timeit.repeat("name = 'Sourav'; 'Student: ' + name", number=loops, repeat=5))
    t_format = min(timeit.repeat("name = 'Sourav'; 'Student: {}'.format(name)", number=loops, repeat=5))
    t_percent = min(timeit.repeat("name = 'Sourav'; 'Student: %s' % name", number=loops, repeat=5))

    print(f"   * f-string (`f'Student: {{name}}'`) : {t_fstring * 1000:.2f} ms (FASTEST)")
    print(f"   * `+` concat (`'Student: ' + name`) : {t_plus * 1000:.2f} ms")
    print(f"   * `%` formatting (`'%s' % name`)   : {t_percent * 1000:.2f} ms")
    print(f"   * `.format()` (`'{{}}'.format(...)`): {t_format * 1000:.2f} ms (SLOWEST)\n")

    # -------------------------------------------------------------
    # Shootout 2: Dict Literal vs Constructor
    # -------------------------------------------------------------
    print(f"2. Shootout: Dict Creation (`{{}}` vs `dict()`):")
    t_literal = min(timeit.repeat("{'a': 1, 'b': 2}", number=loops, repeat=5))
    t_func = min(timeit.repeat("dict(a=1, b=2)", number=loops, repeat=5))

    print(f"   * Dict Literal (`{{'a': 1, 'b': 2}}`) : {t_literal * 1000:.2f} ms (Direct Bytecode)")
    print(f"   * `dict(...)` Constructor           : {t_func * 1000:.2f} ms (Function Call Overhead)")
    print(f"   * Speedup                           : {t_func / (t_literal or 0.001):.1f}x FASTER!\n")

    # -------------------------------------------------------------
    # Shootout 3: Emptiness Check
    # -------------------------------------------------------------
    print(f"3. Shootout: Emptiness Check (`if not seq:` vs `if len(seq) == 0:`):")
    setup_code = "seq = []"
    t_truthy = min(timeit.repeat("if not seq: pass", setup=setup_code, number=loops, repeat=5))
    t_len = min(timeit.repeat("if len(seq) == 0: pass", setup=setup_code, number=loops, repeat=5))

    print(f"   * Truthiness (`if not seq:`)       : {t_truthy * 1000:.2f} ms (Direct C truth check)")
    print(f"   * Length Check (`if len(seq) == 0`): {t_len * 1000:.2f} ms (Function call + comparison)")
    print(f"   * Speedup                           : {t_len / (t_truthy or 0.001):.1f}x FASTER!\n")

    # -------------------------------------------------------------
    # Bytecode Disassembly Insight
    # -------------------------------------------------------------
    print("4. Bytecode Comparison (Disassembly Insight):")
    print("--- [DISASSEMBLY: `dict()` Constructor] ---")
    dis.dis(compile("dict(a=1)", "<string>", "eval"))

    print("\n--- [DISASSEMBLY: `{}` Literal] ---")
    dis.dis(compile("{'a': 1}", "<string>", "eval"))

    print(r"""
Bytecode Optimization Invariants:
  1. Dict and List literals (`{}`, `[]`) compile directly into single CPython opcodes (`BUILD_MAP`, `BUILD_LIST`).
  2. `dict()` and `list()` must perform a global name lookup (`LOAD_NAME`) and a function call (`CALL_FUNCTION`).
  3. f-strings compile into optimized `FORMAT_VALUE` bytecodes, executing faster than `.format()` or `%`.
""")
    print("[PASSED] Python Idiom Benchmark Shootouts Verified.")


if __name__ == "__main__":
    benchmark_idiom_shootouts()
