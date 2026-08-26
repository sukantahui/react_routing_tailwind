"""
# Module: 004_003_python-testing
# Topic 1: Types of testing: Unit testing, Integration testing, Functional testing
# File: testing_pyramid_case_study.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating the full Testing Pyramid in action - Comparing execution
#              speed, test counts, and isolation across Unit, Integration, and E2E tiers.
"""

import time

def run_pyramid_suite():
    print("=" * 80)
    print("[TESTING PYRAMID BENCHMARK] Executing Multi-Tier Test Suite Distribution")
    print("=" * 80)

    # 1. UNIT TEST TIER (70% of Suite, e.g. 50 tests in memory)
    start_unit = time.perf_counter()
    unit_tests_count = 50
    for i in range(unit_tests_count):
        # Pure math calculation
        res = (i * 25.0) * 0.90
        assert res >= 0
    t_unit = time.perf_counter() - start_unit

    # 2. INTEGRATION TEST TIER (20% of Suite, e.g. 15 tests with simulated I/O)
    start_integ = time.perf_counter()
    integ_tests_count = 15
    for i in range(integ_tests_count):
        # Simulated database handshake / table query
        time.sleep(0.001) # 1ms database latency
        assert i < 100
    t_integ = time.perf_counter() - start_integ

    # 3. FUNCTIONAL / E2E TIER (10% of Suite, e.g. 5 full workflows)
    start_e2e = time.perf_counter()
    e2e_tests_count = 5
    for i in range(e2e_tests_count):
        # Simulated HTTP / UI workflow
        time.sleep(0.010) # 10ms full journey latency
        assert i < 10
    t_e2e = time.perf_counter() - start_e2e

    total_time = t_unit + t_integ + t_e2e

    print("\n[TIER BREAKDOWN & TIMING METRICS]")
    print(f"   * Tier 1 (UNIT)        : {unit_tests_count:>2} Tests | Time: {t_unit*1000:>6.2f} ms | ~{(t_unit/unit_tests_count)*1000000:.1f} microsec/test (Ultra Fast)")
    print(f"   * Tier 2 (INTEGRATION) : {integ_tests_count:>2} Tests | Time: {t_integ*1000:>6.2f} ms | ~{(t_integ/integ_tests_count)*1000:.1f} ms/test (Component Boundaries)")
    print(f"   * Tier 3 (FUNCTIONAL)  : {e2e_tests_count:>2} Tests | Time: {t_e2e*1000:>6.2f} ms | ~{(t_e2e/e2e_tests_count)*1000:.1f} ms/test (User Workflows)")
    print("-" * 80)
    print(f"   [+] TOTAL TEST SUITE TIME : {total_time*1000:.2f} ms for {unit_tests_count + integ_tests_count + e2e_tests_count} automated tests!")

def main():
    run_pyramid_suite()

    print("\n" + "=" * 80)
    print("[TAKEAWAY] Follow the 70/20/10 pyramid rule: high speed + maximum coverage")
    print("           without the flakiness and high maintenance of top-heavy test suites.")
    print("=" * 80)

if __name__ == "__main__":
    main()
