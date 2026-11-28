"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 9: Bus Topology Backbone Failure & Signal Reflection Simulator
Author: Sukanta Hui, Coder & AccoTax
"""

class BusTopologyNetwork:
    def __init__(self, node_names: list, backbone_length_m: float = 100.0, terminators_intact: bool = True):
        self.nodes = node_names
        self.length = backbone_length_m
        self.terminators = terminators_intact
        self.backbone_cut_at = None  # None = cable intact; or meter mark of cut

    def cut_backbone(self, cut_distance_m: float):
        """Simulates physical cable severing on the shared backbone."""
        self.backbone_cut_at = cut_distance_m

    def transmit_frame(self, sender: str, recipient: str, data: str) -> dict:
        """Simulates linear bus transmission."""
        if not self.terminators:
            return {
                "status": "FAILED: Massive Collisions",
                "reason": "Terminator missing! Unabsorbed signal reflections bounce endlessly, corrupting all frames across the bus."
            }

        if self.backbone_cut_at is not None:
            return {
                "status": "FAILED: Entire Network Down",
                "reason": f"Single point of failure! Cable severed at {self.backbone_cut_at}m. Open circuit causes reflections that collapse the whole bus."
            }

        return {
            "status": "SUCCESSFUL BROADCAST",
            "sender": sender,
            "recipient": recipient,
            "data": data,
            "behavior": f"Frame broadcast across backbone. Checked by all nodes ({', '.join(self.nodes)}); processed only by '{recipient}'."
        }

def run_bus_lab():
    print("=" * 70)
    print("LINEAR BUS TOPOLOGY BACKBONE & FAULT SIMULATOR - CBSE CS 083")
    print("=" * 70)

    workstations = ["Node_A", "Node_B", "Node_C", "Node_D"]
    bus = BusTopologyNetwork(workstations, backbone_length_m=120.0, terminators_intact=True)

    # 1. Normal Transmission
    print("\n[1. Normal Operation - Node A sends data to Node C]")
    res1 = bus.transmit_frame("Node_A", "Node_C", "Exam_Schedule.pdf")
    print(f"  * Status: {res1['status']}")
    print(f"  * Detail: {res1['behavior']}")

    # 2. Missing Terminator Test
    print("\n[2. Fault Test: Terminator Removed at End of Bus]")
    bus_faulty = BusTopologyNetwork(workstations, backbone_length_m=120.0, terminators_intact=False)
    res2 = bus_faulty.transmit_frame("Node_A", "Node_B", "Report.docx")
    print(f"  * Status: {res2['status']}")
    print(f"  * Reason: {res2['reason']}")

    # 3. Cable Severing Test
    print("\n[3. Fault Test: Physical Cable Cut along Backbone]")
    bus.cut_backbone(cut_distance_m=65.0)
    res3 = bus.transmit_frame("Node_A", "Node_B", "Data.txt")
    print(f"  * Status: {res3['status']}")
    print(f"  * Reason: {res3['reason']}")

if __name__ == "__main__":
    run_bus_lab()