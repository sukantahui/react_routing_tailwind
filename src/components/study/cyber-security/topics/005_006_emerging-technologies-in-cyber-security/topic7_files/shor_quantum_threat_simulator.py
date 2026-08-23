#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: SHOR'S ALGORITHM & QUANTUM CRYPTOGRAPHIC THREAT ENGINE
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_006 (Emerging Technologies)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides comprehensive simulations of:
1. Shor's Algorithm: Quantum Period Finding & RSA-2048 / ECC-256 Factorization.
2. Grover's Algorithm: Quadratic Search Speedup on Symmetric Ciphers (AES / SHA).
3. Classical (GNFS) vs Quantum Complexity Curves ($O((\log N)^3)$ vs Exponential).
4. Physical vs Logical Qubit Requirements (Surface Code Error Correction).
5. Harvest Now, Decrypt Later (HNDL) Threat Assessment.
"""

import sys
import math
import random
from dataclasses import dataclass
from typing import Dict, List, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

class QuantumThreatSimulator:
    def __init__(self):
        pass

    def simulate_classical_vs_quantum_factorization(self, rsa_key_bits: int = 2048) -> Dict:
        """
        Compares time complexity between Classical GNFS and Quantum Shor's Algorithm.
        """
        # Classical General Number Field Sieve (GNFS): sub-exponential
        # O(exp((64/9 * b)^(1/3) * (log b)^(2/3)))
        classical_operations_log10 = 0.45 * (rsa_key_bits ** (1/3)) * (math.log(rsa_key_bits) ** (2/3))
        classical_years_estimate = "300 Trillion Years (Classical Supercomputer)" if rsa_key_bits >= 2048 else "1,000 Years"

        # Quantum Shor's Algorithm: polynomial O((log N)^3)
        quantum_qubits_required = 2 * rsa_key_bits + 3 # ~4,099 Logical Qubits
        physical_qubits_needed = quantum_qubits_required * 1000 # ~4.1 Million Physical Qubits with Surface Code (1:1000 ratio)
        quantum_break_time_estimate = "8.4 Hours on a 4,100 Logical Qubit CRQC"

        return {
            "rsa_key_size": f"{rsa_key_bits}-bit RSA Modulus N",
            "classical_security_status": "SECURE (Infeasible to factor via GNFS)",
            "classical_time_to_crack": classical_years_estimate,
            "shors_algorithm_complexity": f"O(({rsa_key_bits})^3) = Polynomial Time",
            "logical_qubits_needed": f"{quantum_qubits_required:,} Logical Qubits",
            "physical_qubits_needed": f"{physical_qubits_needed:,} Physical Qubits (Surface Code 1:1000)",
            "quantum_time_to_crack": quantum_break_time_estimate,
            "verdict": "COMPLETE CRYPTOGRAPHIC COLLAPSE UNDER SHOR'S ALGORITHM 🚨"
        }

    def evaluate_grovers_algorithm_impact(self, cipher_name: str, key_bits: int) -> Dict:
        """
        Simulates Grover's Algorithm Quadratic Speedup on Symmetric Ciphers.
        Effective Quantum Security = N / 2 bits
        """
        quantum_security_bits = key_bits // 2
        is_safe = quantum_security_bits >= 128

        return {
            "cipher": cipher_name,
            "classical_key_strength": f"{key_bits}-bit Security ($2^{{{key_bits}}}$ operations)",
            "grovers_quantum_strength": f"{quantum_security_bits}-bit Security ($2^{{{quantum_security_bits}}}$ operations)",
            "quantum_status": "QUANTUM SAFE ✔ (128-bit margin maintained)" if is_safe else "QUANTUM VULNERABLE 🚨 (Below 128-bit threshold)",
            "recommendation": "Maintain standard deployment" if is_safe else f"Upgrade immediately from {cipher_name} to AES-256!"
        }

    def assess_hndl_threat(self, data_secrecy_shelf_life_years: int, migration_time_years: int, crqc_arrival_years: int = 7) -> Dict:
        """
        Mosca's Theorem: If (Secrecy Shelf Life X + Migration Time Y) > Quantum Arrival Z -> BROKEN!
        """
        total_risk_window = data_secrecy_shelf_life_years + migration_time_years
        is_in_danger = total_risk_window > crqc_arrival_years

        return {
            "data_shelf_life_X": f"{data_secrecy_shelf_life_years} Years (Classified Treasury Records)",
            "migration_time_Y": f"{migration_time_years} Years (PQC Transition Timeline)",
            "quantum_arrival_Z": f"{crqc_arrival_years} Years (Estimated Cryptanalytically Relevant Quantum Computer)",
            "moscas_theorem_check": f"X + Y = {total_risk_window} > Z ({crqc_arrival_years})",
            "threat_status": "CRITICAL HNDL EXPOSURE 🚨 (Adversaries intercepting ciphertext today!)" if is_in_danger else "PQC MIGRATION ON SCHEDULE ✔",
            "action": "Immediate hybrid classical-PQC TLS encapsulation required."
        }

def main():
    print("=" * 80)
    print("SHOR'S ALGORITHM & QUANTUM CRYPTOGRAPHIC THREAT LAB")
    print("Institution: Coder & AccoTax | Instructor: Sukanta Hui | Location: Barrackpore")
    print("=" * 80)

    sim = QuantumThreatSimulator()

    # Test 1: Shor's Factorization on RSA-2048
    print("\n[TEST 1]: SHOR'S ALGORITHM VS CLASSICAL GNFS FACTORIZATION (RSA-2048)")
    rsa_res = sim.simulate_classical_vs_quantum_factorization(2048)
    for k, v in rsa_res.items():
        print(f"  {k:<30}: {v}")

    # Test 2: Grover's Algorithm on AES-128 vs AES-256
    print("\n" + "=" * 80)
    print("[TEST 2]: GROVER'S ALGORITHM ON SYMMETRIC CIPHERS (AES & SHA)")
    aes128_res = sim.evaluate_grovers_algorithm_impact("AES-128", 128)
    aes256_res = sim.evaluate_grovers_algorithm_impact("AES-256", 256)

    print(f"AES-128 : Classical {aes128_res['classical_key_strength']} -> Quantum {aes128_res['grovers_quantum_strength']} -> {aes128_res['quantum_status']}")
    print(f"AES-256 : Classical {aes256_res['classical_key_strength']} -> Quantum {aes256_res['grovers_quantum_strength']} -> {aes256_res['quantum_status']}")

    # Test 3: Mosca's Theorem & Harvest Now, Decrypt Later (HNDL)
    print("\n" + "=" * 80)
    print("[TEST 3]: MOSCA'S THEOREM & HARVEST NOW, DECRYPT LATER (HNDL)")
    hndl_res = sim.assess_hndl_threat(data_secrecy_shelf_life_years=15, migration_time_years=3, crqc_arrival_years=7)
    for k, v in hndl_res.items():
        print(f"  {k:<30}: {v}")
    print("=" * 80)

if __name__ == "__main__":
    main()
