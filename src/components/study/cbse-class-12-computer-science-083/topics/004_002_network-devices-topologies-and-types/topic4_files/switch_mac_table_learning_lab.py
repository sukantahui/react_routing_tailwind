"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 4: Intelligent Switch MAC Table Learning & Packet Forwarding Lab
Author: Sukanta Hui, Coder & AccoTax
"""

class NetworkSwitchSimulator:
    def __init__(self, num_ports: int = 4):
        self.num_ports = num_ports
        # MAC Address Table (CAM Table): { "MAC_ADDRESS": port_number }
        self.mac_table = {}

    def receive_frame(self, incoming_port: int, src_mac: str, dest_mac: str, payload: str) -> dict:
        """Simulates Layer-2 Switch Frame Processing: Learn -> Lookup -> Forward or Flood."""
        src_mac = src_mac.upper()
        dest_mac = dest_mac.upper()

        # Step 1: Learning Phase (Inspect Source MAC)
        learned_new = False
        if src_mac not in self.mac_table or self.mac_table[src_mac] != incoming_port:
            self.mac_table[src_mac] = incoming_port
            learned_new = True

        # Step 2: Forwarding Decision (Inspect Destination MAC)
        is_broadcast = (dest_mac == "FF:FF:FF:FF:FF:FF")

        if is_broadcast:
            forward_ports = [p for p in range(1, self.num_ports + 1) if p != incoming_port]
            action = f"BROADCAST FLOOD to all other ports: {forward_ports}"
        elif dest_mac in self.mac_table:
            target_port = self.mac_table[dest_mac]
            if target_port == incoming_port:
                action = f"FILTERED / DROPPED (Source and Destination are on same port {incoming_port})"
                forward_ports = []
            else:
                action = f"UNICAST FORWARD solely to Port {target_port}"
                forward_ports = [target_port]
        else:
            forward_ports = [p for p in range(1, self.num_ports + 1) if p != incoming_port]
            action = f"UNKNOWN UNICAST FLOOD to all other ports: {forward_ports}"

        return {
            "incoming_port": incoming_port,
            "src_mac": src_mac,
            "dest_mac": dest_mac,
            "learned_entry": f"Mapped {src_mac} -> Port {incoming_port}" if learned_new else "Already in CAM table",
            "action": action,
            "forward_ports": forward_ports,
            "current_cam_table": dict(self.mac_table)
        }

def run_switch_lab():
    print("=" * 70)
    print("INTELLIGENT LAYER-2 SWITCH CAM TABLE SIMULATOR - CBSE CS 083")
    print("=" * 70)

    sw = NetworkSwitchSimulator(num_ports=4)

    # Frame 1: Node A on Port 1 sends to Node B on Port 2 (Table is empty)
    print("\n[Frame 1: Node A (00:AA) on Port 1 sends to Node B (00:BB)]")
    f1 = sw.receive_frame(1, "00:AA:AA:AA:AA:AA", "00:BB:BB:BB:BB:BB", "Hello Node B")
    print(f"  * Learning:   {f1['learned_entry']}")
    print(f"  * Decision:   {f1['action']}")
    print(f"  * CAM Table:  {f1['current_cam_table']}")

    # Frame 2: Node B on Port 2 replies back to Node A
    print("\n[Frame 2: Node B (00:BB) on Port 2 replies to Node A (00:AA)]")
    f2 = sw.receive_frame(2, "00:BB:BB:BB:BB:BB", "00:AA:AA:AA:AA:AA", "Ack from Node B")
    print(f"  * Learning:   {f2['learned_entry']}")
    print(f"  * Decision:   {f2['action']} (Notice: Zero flooding!)")
    print(f"  * CAM Table:  {f2['current_cam_table']}")

    # Frame 3: Node A sends to Node B again
    print("\n[Frame 3: Node A sends another frame to Node B]")
    f3 = sw.receive_frame(1, "00:AA:AA:AA:AA:AA", "00:BB:BB:BB:BB:BB", "Data Payload 2")
    print(f"  * Decision:   {f3['action']}")

if __name__ == "__main__":
    run_switch_lab()