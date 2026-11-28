"""
CBSE Class 12 Computer Science (083)
Unit II: Computer Networks - Module 2 Master Simulation Suite
Covers: Network Devices, Topologies, Collision Domains & Network Sizing
Author: Sukanta Hui (Senior CS Educator, Coder & AccoTax)
"""

class NetworkDevice:
    def __init__(self, name, layer, is_intelligent):
        self.name = name
        self.layer = layer
        self.is_intelligent = is_intelligent

    def describe(self):
        return f"{self.name} (OSI Layer {self.layer}) - Intelligent: {self.is_intelligent}"

class Hub(NetworkDevice):
    def __init__(self, ports=8):
        super().__init__("Hub", layer=1, is_intelligent=False)
        self.ports = ports

    def forward(self, source_port, frame_data):
        print(f"[HUB BROADCAST] Frame from port {source_port} flooded to ALL {self.ports - 1} other ports!")
        return [p for p in range(self.ports) if p != source_port]

class Switch(NetworkDevice):
    def __init__(self, ports=24):
        super().__init__("Switch", layer=2, is_intelligent=True)
        self.ports = ports
        self.mac_table = {}

    def learn_mac(self, port, mac_addr):
        self.mac_table[mac_addr] = port

    def forward(self, source_port, src_mac, dst_mac, data):
        self.learn_mac(source_port, src_mac)
        if dst_mac in self.mac_table:
            target_port = self.mac_table[dst_mac]
            print(f"[SWITCH UNICAST] Delivering directly from port {source_port} -> port {target_port} for {dst_mac}")
            return [target_port]
        else:
            print(f"[SWITCH FLOODING] Unknown MAC {dst_mac}. Flooding to all ports except {source_port}")
            return [p for p in range(self.ports) if p != source_port]

def calculate_mesh_links(n_nodes):
    links = (n_nodes * (n_nodes - 1)) // 2
    ports_per_node = n_nodes - 1
    return links, ports_per_node

def classify_network_by_range(distance_meters):
    if distance_meters <= 10:
        return "PAN (Personal Area Network) - Typical tech: Bluetooth/ZigBee"
    elif distance_meters <= 2000:
        return "LAN (Local Area Network) - Typical tech: Cat6 UTP / Wi-Fi"
    elif distance_meters <= 50000:
        return "MAN (Metropolitan Area Network) - Typical tech: Metro Ethernet / Fiber"
    else:
        return "WAN (Wide Area Network) - Typical tech: Leased Lines / Satellite"

if __name__ == "__main__":
    print("==================================================")
    print(" CBSE CLASS 12 COMPUTER SCIENCE - MODULE 2 MASTER LAB")
    print("==================================================")

    print("\n1. HUB VS SWITCH FORWARDING SIMULATION:")
    hub = Hub(ports=4)
    hub.forward(source_port=0, frame_data="Student_Record_001")

    switch = Switch(ports=8)
    switch.learn_mac(port=3, mac_addr="AA:BB:CC:DD:EE:03")
    switch.forward(source_port=1, src_mac="AA:BB:CC:DD:EE:01", dst_mac="AA:BB:CC:DD:EE:03", data="Exam_Score")

    print("\n2. MESH TOPOLOGY LINK SIZING:")
    for nodes in [4, 8, 16]:
        links, ports = calculate_mesh_links(nodes)
        print(f"Nodes: {nodes:2d} -> Total Dedicated Links: {links:3d}, Ports/NICs per Node: {ports:2d}")

    print("\n3. NETWORK CLASSIFICATION BY DISTANCE:")
    test_distances = [5, 150, 15000, 1500000]
    for d in test_distances:
        print(f"Distance: {d:7d} m -> {classify_network_by_range(d)}")
    print("\nSimulation Complete.")
