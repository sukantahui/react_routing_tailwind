"""
Module 003: Emerging Trends in Computing
Topic 10: Grid Computing & Blockchain Simulation Engine
Pure Python Implementation of Distributed Grid Compute Sharing and SHA-256 Cryptographic Blockchain with Proof-of-Work Mining.
"""

import hashlib
import time
import json
from typing import List, Dict, Any

class GridComputingSimulator:
    """Simulates distributed grid compute job partitioning across heterogeneous nodes."""

    def __init__(self):
        self.nodes = [
            {"id": "Node_Alpha_Delhi", "cores": 8, "speed_ghz": 3.4, "status": "AVAILABLE"},
            {"id": "Node_Beta_Kolkata", "cores": 16, "speed_ghz": 2.8, "status": "AVAILABLE"},
            {"id": "Node_Gamma_Bengaluru", "cores": 32, "speed_ghz": 3.8, "status": "AVAILABLE"}
        ]

    def distribute_computational_job(self, total_matrix_rows: int) -> Dict[str, Any]:
        total_cores = sum(n["cores"] for n in self.nodes)
        node_allocations = []

        for node in self.nodes:
            assigned_rows = int((node["cores"] / total_cores) * total_matrix_rows)
            node_allocations.append({
                "node_id": node["id"],
                "allocated_rows": assigned_rows,
                "cores_used": node["cores"],
                "est_completion_sec": round(assigned_rows / (node["cores"] * node["speed_ghz"] * 100), 2)
            })

        return {
            "total_job_size": f"{total_matrix_rows:,} rows",
            "grid_nodes_active": len(self.nodes),
            "total_grid_cores": total_cores,
            "allocations": node_allocations
        }


class Block:
    def __init__(self, index: int, timestamp: float, data: Any, previous_hash: str, nonce: int = 0):
        self.index = index
        self.timestamp = timestamp
        self.data = data
        self.previous_hash = previous_hash
        self.nonce = nonce
        self.hash = self.calculate_hash()

    def calculate_hash(self) -> str:
        block_string = f"{self.index}{self.timestamp}{json.dumps(self.data, sort_keys=True)}{self.previous_hash}{self.nonce}"
        return hashlib.sha256(block_string.encode('utf-8')).hexdigest()

    def mine_block(self, difficulty: int):
        target = "0" * difficulty
        while not self.hash.startswith(target):
            self.nonce += 1
            self.hash = self.calculate_hash()


class Blockchain:
    def __init__(self, difficulty: int = 3):
        self.chain: List[Block] = []
        self.difficulty = difficulty
        self.create_genesis_block()

    def create_genesis_block(self):
        genesis_block = Block(0, time.time(), "Genesis Block: Emerging Trends 083 Module", "0" * 64)
        genesis_block.mine_block(self.difficulty)
        self.chain.append(genesis_block)

    def get_latest_block(self) -> Block:
        return self.chain[-1]

    def add_block(self, data: Any) -> Block:
        latest = self.get_latest_block()
        new_block = Block(len(self.chain), time.time(), data, latest.hash)
        new_block.mine_block(self.difficulty)
        self.chain.append(new_block)
        return new_block

    def is_chain_valid(self) -> bool:
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            prev = self.chain[i - 1]

            if current.hash != current.calculate_hash():
                return False
            if current.previous_hash != prev.hash:
                return False
        return True


if __name__ == "__main__":
    print("=" * 65)
    print("1. GRID COMPUTING DISTRIBUTED SCIENTIFIC JOB ALLOCATION")
    print("=" * 65)
    grid = GridComputingSimulator()
    job_result = grid.distribute_computational_job(1000000)
    print(json.dumps(job_result, indent=2))

    print("\n" + "=" * 65)
    print("2. CRYPTOGRAPHIC SHA-256 BLOCKCHAIN WITH PROOF-OF-WORK")
    print("=" * 65)
    bc = Blockchain(difficulty=2)
    
    print(f"Mining Block 1 (Transaction: Rahul -> Priya 10 BTC)...")
    b1 = bc.add_block({"sender": "Rahul", "receiver": "Priya", "amount": 10.0})
    print(f"  Block #{b1.index} Mined! Hash: {b1.hash} (Nonce: {b1.nonce})")

    print(f"\nMining Block 2 (Transaction: Priya -> Sneha 4.5 BTC)...")
    b2 = bc.add_block({"sender": "Priya", "receiver": "Sneha", "amount": 4.5})
    print(f"  Block #{b2.index} Mined! Hash: {b2.hash} (Nonce: {b2.nonce})")

    print(f"\nBlockchain Integrity Verified: {bc.is_chain_valid()}")
