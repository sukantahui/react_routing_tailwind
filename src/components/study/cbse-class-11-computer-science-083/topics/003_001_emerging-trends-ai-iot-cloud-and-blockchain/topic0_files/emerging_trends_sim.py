"""
================================================================================
CBSE CLASS XI COMPUTER SCIENCE (083) - ENRICHMENT LABORATORY
MODULE 003_001: EMERGING TRENDS IN COMPUTING
Topic: Python Mini-Blockchain & SHA-256 Cryptographic Hash Simulator
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================
"""

import hashlib
import time
from typing import List, Dict


class Block:
    """Represents a single immutable block in a cryptographic Blockchain ledger."""
    def __init__(self, index: int, timestamp: float, data: str, previous_hash: str):
        self.index = index
        self.timestamp = timestamp
        self.data = data
        self.previous_hash = previous_hash
        self.nonce = 0
        self.hash = self.calculate_hash()

    def calculate_hash(self) -> str:
        """Calculates SHA-256 cryptographic hash over block header fields."""
        block_string = f"{self.index}{self.timestamp}{self.data}{self.previous_hash}{self.nonce}"
        return hashlib.sha256(block_string.encode("utf-8")).hexdigest()

    def mine_block(self, difficulty: int = 2) -> None:
        """Simulates Proof of Work (PoW) consensus mining by finding leading zeros."""
        target_prefix = "0" * difficulty
        while not self.hash.startswith(target_prefix):
            self.nonce += 1
            self.hash = self.calculate_hash()


class Blockchain:
    """Manages the distributed ledger chain and validates tamper-evidence."""
    def __init__(self, difficulty: int = 2):
        self.difficulty = difficulty
        self.chain: List[Block] = [self.create_genesis_block()]

    def create_genesis_block(self) -> Block:
        """Creates the initial genesis block (Block 0)."""
        genesis = Block(0, time.time(), "Genesis Block: Coder & AccoTax Ledger Init", "0" * 64)
        genesis.mine_block(self.difficulty)
        return genesis

    def get_latest_block(self) -> Block:
        return self.chain[-1]

    def add_block(self, data: str) -> Block:
        """Mines and appends a new block referencing previous block hash."""
        prev = self.get_latest_block()
        new_block = Block(len(self.chain), time.time(), data, prev.hash)
        new_block.mine_block(self.difficulty)
        self.chain.append(new_block)
        return new_block

    def is_chain_valid(self) -> bool:
        """Validates cryptographic integrity across every block in the ledger."""
        for i in range(1, len(self.chain)):
            curr = self.chain[i]
            prev = self.chain[i - 1]

            # 1. Verify block data has not been altered
            if curr.hash != curr.calculate_hash():
                print(f"[ALERT] Block {curr.index} data has been tampered! Hash mismatch.")
                return False

            # 2. Verify chain linkage to previous hash
            if curr.previous_hash != prev.hash:
                print(f"[ALERT] Block {curr.index} previous_hash link is broken!")
                return False

        return True


if __name__ == "__main__":
    print("=" * 70)
    print("DEMONSTRATION: PYTHON MINI-BLOCKCHAIN LEDGER ENGINE")
    print("=" * 70)

    my_chain = Blockchain(difficulty=2)
    print(f"Genesis Block Hash: {my_chain.chain[0].hash}")

    # Add real-world transactions from Barrackpore & Kolkata students
    print("\nMining Block 1: Student Marksheet Certification...")
    b1 = my_chain.add_block("Mamata CBSE CS Score: 98/100, Roll: 1101")
    print(f"-> Block 1 Mined! Nonce: {b1.nonce} | Hash: {b1.hash}")

    print("\nMining Block 2: Tuition Fee Payment Confirmation...")
    b2 = my_chain.add_block("Susmita Fee Received: Rs. 2500, TxID: TX99812")
    print(f"-> Block 2 Mined! Nonce: {b2.nonce} | Hash: {b2.hash}")

    print("\nMining Block 3: Lab Certificate Hash...")
    b3 = my_chain.add_block("Abhronila Python Lab Practical Verified: Grade A1")
    print(f"-> Block 3 Mined! Nonce: {b3.nonce} | Hash: {b3.hash}")

    print("\n" + "-" * 70)
    print(f"Ledger Integrity Verification: {my_chain.is_chain_valid()} (100% Tamper-Proof)")
    print("=" * 70)
