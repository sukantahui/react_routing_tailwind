"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 12: Mesh Link Calculator & Dual-Ring Self-Healing Simulator
Author: Sukanta Hui, Coder & AccoTax
"""

class TopologyAnalyzer:
    @staticmethod
    def calculate_mesh_requirements(n_nodes: int) -> dict:
        """Calculates physical links and port requirements for a full mesh."""
        if n_nodes < 2:
            return {"error": "Need at least 2 nodes."}
        links = (n_nodes * (n_nodes - 1)) // 2
        ports_per_node = n_nodes - 1
        total_ports = n_nodes * ports_per_node
        return {
            "num_nodes": n_nodes,
            "total_physical_links": links,
            "ports_per_node": ports_per_node,
            "total_system_ports": total_ports
        }

    @staticmethod
    def simulate_dual_ring_self_healing(ring_nodes: list, broken_link: tuple) -> dict:
        """Simulates FDDI Dual Counter-Rotating Ring wrapping around a cable cut."""
        n = len(ring_nodes)
        node_a, node_b = broken_link
        return {
            "original_topology": f"Dual Ring with nodes: {' -> '.join(ring_nodes)} -> {ring_nodes[0]}",
            "severed_link": f"{node_a} <--> {node_b}",
            "self_healing_action": f"Primary and secondary rings wrapped at {node_a} and {node_b} to restore a single closed loop.",
            "status": "OPERATIONAL (Self-Healing Complete with zero data loss)"
        }

def run_mesh_ring_lab():
    print("=" * 70)
    print("MESH & RING TOPOLOGY METRIC CALCULATOR - CBSE CS 083")
    print("=" * 70)

    # 1. Mesh Scaling Analysis
    print("\n[1. Full Mesh Cable Scaling Calculation: N*(N-1)/2]")
    node_counts = [4, 6, 10, 20, 50]
    for n in node_counts:
        res = TopologyAnalyzer.calculate_mesh_requirements(n)
        print(f"  * {n:2d} Nodes -> Links: {res['total_physical_links']:4d} cables | Ports/Node: {res['ports_per_node']:2d}")

    # 2. Dual-Ring Self-Healing
    print("\n[2. FDDI Dual-Ring Self-Healing Simulation]")
    nodes = ["Node_1", "Node_2", "Node_3", "Node_4", "Node_5"]
    cut = ("Node_2", "Node_3")
    ring_res = TopologyAnalyzer.simulate_dual_ring_self_healing(nodes, cut)
    print(f"  * Event:   Cable between {ring_res['severed_link']} is severed!")
    print(f"  * Action:  {ring_res['self_healing_action']}")
    print(f"  * Network: {ring_res['status']}")

if __name__ == "__main__":
    run_mesh_ring_lab()