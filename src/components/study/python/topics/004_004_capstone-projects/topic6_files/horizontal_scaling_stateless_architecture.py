"""
# Module: 004_004_capstone-projects
# Topic 6: System design basics for Python backends
# File: horizontal_scaling_stateless_architecture.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating Load Balancing algorithms, Stateless Backend Workers,
#              and Externalized Session State.
"""

from dataclasses import dataclass
from typing import Optional

@dataclass
class BackendWorker:
    worker_id: str
    campus_region: str
    active_connections: int = 0

    def process_request(self, path: str) -> str:
        return f"Worker {self.worker_id} ({self.campus_region}) handled: {path}"

class RoundRobinLoadBalancer:
    """Distributes incoming requests evenly across stateless backend instances."""
    def __init__(self, workers: list[BackendWorker]):
        if not workers:
            raise ValueError("Load balancer requires at least one worker.")
        self.workers = workers
        self._current_index = 0

    def route_request(self, path: str) -> tuple[str, str]:
        worker = self.workers[self._current_index]
        self._current_index = (self._current_index + 1) % len(self.workers)
        response = worker.process_request(path)
        return worker.worker_id, response

class LeastConnectionsLoadBalancer:
    """Routes requests to the worker handling the fewest active connections."""
    def __init__(self, workers: list[BackendWorker]):
        self.workers = workers

    def route_request(self, path: str) -> tuple[str, str]:
        worker = min(self.workers, key=lambda w: w.active_connections)
        worker.active_connections += 1
        response = worker.process_request(path)
        return worker.worker_id, response

def test_stateless_architecture():
    print("   [...] Testing Load Balancing & Stateless Worker Dispatch...")

    workers = [
        BackendWorker("SRV_01", "Barrackpore"),
        BackendWorker("SRV_02", "Kolkata"),
        BackendWorker("SRV_03", "Ichapur")
    ]

    # 1. Round Robin Dispatch Verification
    lb_rr = RoundRobinLoadBalancer(workers)
    routes = [lb_rr.route_request(f"/api/v1/students/{i}")[0] for i in range(6)]
    assert routes == ["SRV_01", "SRV_02", "SRV_03", "SRV_01", "SRV_02", "SRV_03"]
    print(f"   [PASS] 1. Round Robin Load Balancer evenly cycled: {' -> '.join(routes)}")

    # 2. Least Connections Dispatch Verification
    workers[0].active_connections = 5
    workers[1].active_connections = 1  # Least busy
    workers[2].active_connections = 4

    lb_lc = LeastConnectionsLoadBalancer(workers)
    assigned_worker_id, _ = lb_lc.route_request("/api/v1/enroll")
    assert assigned_worker_id == "SRV_02"
    print(f"   [PASS] 2. Least Connections routed request to least busy server: {assigned_worker_id}")

def main():
    print("=" * 75)
    print("[SYSTEM DESIGN] Horizontal Scaling & Stateless Load Balancing")
    print("=" * 75)

    test_stateless_architecture()

    print("=" * 75)
    print("[TAKEAWAY] Stateless backend workers paired with intelligent load balancers")
    print("           enable elastic scale-out across multi-cloud and regional datacenters.")
    print("=" * 75)

if __name__ == "__main__":
    main()
