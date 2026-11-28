"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 10: Star Topology Fault Isolation & Total Cable Length Lab
Author: Sukanta Hui, Coder & AccoTax
"""

import math

class StarTopologyNetwork:
    def __init__(self, central_switch_pos: tuple, node_positions: dict):
        self.switch_pos = central_switch_pos
        self.nodes = node_positions  # { "Node_A": (x, y), ... }
        self.cable_faults = set()   # set of severed node cables
        self.switch_operational = True

    def calculate_total_cable_length_m(self) -> float:
        """Calculates total cable required from switch to all nodes."""
        total_length = 0.0
        sx, sy = self.switch_pos
        for name, (nx, ny) in self.nodes.items():
            dist = math.sqrt((nx - sx)**2 + (ny - sy)**2)
            total_length += dist
        return round(total_length, 2)

    def sever_cable(self, node_name: str):
        """Simulates cutting a single workstation's cable."""
        self.cable_faults.add(node_name)

    def power_off_switch(self):
        """Simulates central switch failure."""
        self.switch_operational = False

    def test_communication(self, sender: str, receiver: str) -> dict:
        """Evaluates communication between two nodes in Star topology."""
        if not self.switch_operational:
            return {
                "status": "FAILED: Entire Network Down",
                "reason": "Central Point of Failure! The central switch is powered off or failed."
            }

        if sender in self.cable_faults:
            return {
                "status": "FAILED: Sender Isolated",
                "reason": f"Cable for '{sender}' is broken. Only '{sender}' is offline; rest of network is unaffected."
            }

        if receiver in self.cable_faults:
            return {
                "status": "FAILED: Receiver Isolated",
                "reason": f"Cable for '{receiver}' is broken. Only '{receiver}' is offline; rest of network is unaffected."
            }

        return {
            "status": "SUCCESSFUL UNICAST",
            "sender": sender,
            "receiver": receiver,
            "reason": f"Data routed point-to-point through central switch with dedicated bandwidth."
        }

def run_star_lab():
    print("=" * 70)
    print("STAR TOPOLOGY FAULT ISOLATION & CABLE CALCULATOR - CBSE CS 083")
    print("=" * 70)

    # Computer lab with central switch at (0, 0) and 4 corner computers
    nodes = {
        "PC_1": (12, 10),
        "PC_2": (-12, 10),
        "PC_3": (-15, -8),
        "PC_4": (14, -9)
    }
    star = StarTopologyNetwork(central_switch_pos=(0, 0), node_positions=nodes)
    cable_m = star.calculate_total_cable_length_m()
    print(f"Total Cable Required for Star Layout: {cable_m} meters")

    # Test 1: Normal Transmission
    print("\n[Test 1: PC_1 sends data to PC_3]")
    res1 = star.test_communication("PC_1", "PC_3")
    print(f"  * Status: {res1['status']} ({res1['reason']})")

    # Test 2: Fault Isolation (Cut PC_2 cable)
    print("\n[Test 2: Fault Isolation - PC_2 cable is severed]")
    star.sever_cable("PC_2")
    res2 = star.test_communication("PC_1", "PC_4")
    print(f"  * Comm between PC_1 and PC_4: {res2['status']}")
    res2_broken = star.test_communication("PC_1", "PC_2")
    print(f"  * Comm with broken PC_2:      {res2_broken['status']} ({res2_broken['reason']})")

    # Test 3: Central Point of Failure
    print("\n[Test 3: Central Point of Failure - Switch Power Outage]")
    star.power_off_switch()
    res3 = star.test_communication("PC_1", "PC_4")
    print(f"  * Comm between PC_1 and PC_4: {res3['status']} ({res3['reason']})")

if __name__ == "__main__":
    run_star_lab()