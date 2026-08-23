#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: BLOCKCHAIN CRYPTOGRAPHIC IMMUTABILITY & 51% ATTACK ENGINE
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_006 (Emerging Technologies)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides forensic simulations of:
1. Cryptographic Block Construction & Merkle Root Binary Tree calculation.
2. Proof-of-Work (PoW) Nonce Mining & Target Difficulty verification.
3. Cryptographic Chain Integrity & Tamper Cascade Propagation.
4. 51% Consensus Attack Simulation (Honest vs Rogue Hashrate Race).
"""

import sys
import time
import hashlib
import json
from dataclasses import dataclass
from typing import Dict, List, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

@dataclass
class Block:
    index: int
    timestamp: float
    transactions: List[str]
    previous_hash: str
    merkle_root: str
    nonce: int
    hash: str

class BlockchainSecurityEngine:
    def __init__(self, difficulty: int = 2):
        self.difficulty = difficulty # Number of leading zeros required in SHA-256 hash
        self.chain: List[Block] = []
        self._create_genesis_block()

    def _compute_merkle_root(self, transactions: List[str]) -> str:
        """
        Computes binary SHA-256 Merkle Tree root from a transaction list.
        """
        if not transactions:
            return hashlib.sha256(b"EMPTY").hexdigest()

        hashes = [hashlib.sha256(tx.encode('utf-8')).hexdigest() for tx in transactions]

        while len(hashes) > 1:
            if len(hashes) % 2 != 0:
                hashes.append(hashes[-1]) # Duplicate last hash if odd
            new_level = []
            for i in range(0, len(hashes), 2):
                combined = hashes[i] + hashes[i+1]
                new_level.append(hashlib.sha256(combined.encode('utf-8')).hexdigest())
            hashes = new_level

        return hashes[0]

    def _calculate_block_hash(self, index: int, timestamp: float, previous_hash: str, merkle_root: str, nonce: int) -> str:
        header = f"{index}{timestamp}{previous_hash}{merkle_root}{nonce}".encode('utf-8')
        return hashlib.sha256(header).hexdigest()

    def _create_genesis_block(self):
        txs = ["GENESIS_BLOCK_BARRACKPORE_TREASURY_INITIALIZATION"]
        m_root = self._compute_merkle_root(txs)
        t = 1774829100.0
        h = self._calculate_block_hash(0, t, "0" * 64, m_root, 0)
        self.chain.append(Block(0, t, txs, "0" * 64, m_root, 0, h))

    def mine_new_block(self, transactions: List[str]) -> Block:
        """
        Proof-of-Work: Iterates nonce until SHA-256 hash meets target difficulty.
        """
        prev_block = self.chain[-1]
        index = prev_block.index + 1
        timestamp = time.time()
        merkle_root = self._compute_merkle_root(transactions)
        target_prefix = "0" * self.difficulty

        nonce = 0
        while True:
            block_hash = self._calculate_block_hash(index, timestamp, prev_block.hash, merkle_root, nonce)
            if block_hash.startswith(target_prefix):
                break
            nonce += 1

        new_block = Block(index, timestamp, transactions, prev_block.hash, merkle_root, nonce, block_hash)
        self.chain.append(new_block)
        return new_block

    def verify_chain_integrity(self) -> Tuple[bool, str]:
        """
        Verifies cryptographic linking across the entire chain.
        """
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            previous = self.chain[i - 1]

            # Check 1: Previous Hash Link
            if current.previous_hash != previous.hash:
                return False, f"Broken Chain Link at Block #{current.index}! Previous hash does not match Block #{previous.index}."

            # Check 2: Hash Validity
            recalc_hash = self._calculate_block_hash(current.index, current.timestamp, current.previous_hash, current.merkle_root, current.nonce)
            if current.hash != recalc_hash:
                return False, f"Tampered Data in Block #{current.index}! Stored hash does not match computed hash."

            # Check 3: Merkle Root Integrity
            recalc_merkle = self._compute_merkle_root(current.transactions)
            if current.merkle_root != recalc_merkle:
                return False, f"Tampered Transactions in Block #{current.index}! Merkle root mismatch."

        return True, "BLOCKCHAIN IMMUTABILITY VERIFIED ✔ (100% Cryptographic Integrity)"

    def simulate_51_percent_attack(self, attacker_hashrate_pct: float) -> Dict:
        """
        Simulates 51% consensus takeover probability.
        """
        if attacker_hashrate_pct >= 51.0:
            return {
                "hashrate_share": f"{attacker_hashrate_pct}%",
                "attack_outcome": "51% CONSENSUS ATTACK SUCCESSFUL 🚨 (Double-Spend Achieved)",
                "reason": "Rogue mining pool outpaces honest nodes in Proof-of-Work chain extension, rewriting transaction history.",
                "remediation": "Transition to Proof-of-Stake (PoS) with slashing penalties or Byzantine Agreement."
            }
        return {
            "hashrate_share": f"{attacker_hashrate_pct}%",
            "attack_outcome": "ATTACK FAILED ✔ (Honest Chain Wins)",
            "reason": "Honest network holds majority compute power. Rogue fork is mathematically abandoned by Nakamoto consensus.",
            "remediation": "Standard decentralized operation secure."
        }

def main():
    print("=" * 80)
    print("BLOCKCHAIN CRYPTOGRAPHIC IMMUTABILITY & 51% ATTACK LAB")
    print("Institution: Coder & AccoTax | Instructor: Sukanta Hui | Location: Barrackpore")
    print("=" * 80)

    engine = BlockchainSecurityEngine(difficulty=2)

    # Step 1: Mine Blocks
    print("\n[STEP 1]: MINING CRYPTOGRAPHIC BLOCKS (PROOF-OF-WORK)")
    b1 = engine.mine_new_block(["Tx1: ₹5,00,000 Susmita -> Debangshu", "Tx2: ₹2,50,000 Mamata -> Mahima"])
    b2 = engine.mine_new_block(["Tx3: ₹12,00,000 Treasury -> Contractor_X", "Tx4: ₹1,00,000 Audit -> SecOps"])

    print(f"Block #1 Hash: {b1.hash} (Nonce: {b1.nonce})")
    print(f"Block #2 Hash: {b2.hash} (Nonce: {b2.nonce})")

    # Step 2: Verify Integrity
    print("\n" + "=" * 80)
    print("[STEP 2]: CRYPTOGRAPHIC CHAIN VALIDATION")
    is_valid, msg = engine.verify_chain_integrity()
    print(f"Integrity Status: {msg}")

    # Step 3: Simulate Tampering on Block #1
    print("\n" + "=" * 80)
    print("[STEP 3]: ADVERSARIAL TAMPERING SIMULATION ON BLOCK #1")
    print("Adversary modifies Block #1 transaction to: 'Tx1: ₹50,00,000 Susmita -> Attacker'")
    engine.chain[1].transactions[0] = "Tx1: ₹50,00,000 Susmita -> Attacker"

    is_valid_after, msg_after = engine.verify_chain_integrity()
    print(f"Post-Tamper Check: {'TAMPERING DETECTED 🚨' if not is_valid_after else 'VALID'}")
    print(f"Forensic Diagnostic : {msg_after}")

    # Step 4: 51% Attack Simulation
    print("\n" + "=" * 80)
    print("[STEP 4]: 51% CONSENSUS HASHRATE TAKEOVER SIMULATION")
    res_40 = engine.simulate_51_percent_attack(40.0)
    res_55 = engine.simulate_51_percent_attack(55.0)

    print(f"Cartel with 40% Hashrate: {res_40['attack_outcome']}")
    print(f"Cartel with 55% Hashrate: {res_55['attack_outcome']}")
    print("=" * 80)

if __name__ == "__main__":
    main()
