"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 3: Network Hub Blind Broadcast & Collision Domain Simulation
Author: Sukanta Hui, Coder & AccoTax
"""

class NetworkHubSimulator:
    def __init__(self, num_ports: int = 4, total_bandwidth_mbps: float = 10.0, is_active: bool = True):
        self.num_ports = num_ports
        self.total_bandwidth = total_bandwidth_mbps
        self.is_active = is_active  # Active regenerates signal; Passive does not

    def broadcast_packet(self, incoming_port: int, packet_data: str) -> dict:
        """Hub operation: Blindly repeats incoming signal to ALL other ports."""
        if incoming_port < 1 or incoming_port > self.num_ports:
            raise ValueError(f"Port {incoming_port} does not exist on this {self.num_ports}-port hub.")

        forwarded_ports = [p for p in range(1, self.num_ports + 1) if p != incoming_port]
        return {
            "incoming_port": incoming_port,
            "packet_data": packet_data,
            "forwarded_to_ports": forwarded_ports,
            "hub_behavior": "Blind electrical broadcast to ALL other ports (Zero MAC awareness)",
            "signal_status": "Regenerated & Cleaned (Active Hub)" if self.is_active else "Degraded Attenuation (Passive Hub)"
        }

    def simulate_concurrent_transmissions(self, transmitting_ports: list) -> dict:
        """Simulates simultaneous transmissions on shared hub medium."""
        if len(transmitting_ports) > 1:
            return {
                "collision_occurred": True,
                "status": "COLLISION DETECTED! Packets corrupted across entire collision domain.",
                "action": "All transmitting nodes must back off using CSMA/CD random wait timer."
            }
        return {
            "collision_occurred": False,
            "status": "Transmission successful across shared channel."
        }

def run_hub_lab():
    print("=" * 70)
    print("NETWORK HUB BROADCAST & COLLISION DOMAIN LAB - CBSE CS 083")
    print("=" * 70)

    hub = NetworkHubSimulator(num_ports=4, total_bandwidth_mbps=10.0, is_active=True)
    print(f"Configured Hub: 4-Port Active Hub | Shared Bandwidth: {hub.total_bandwidth} Mbps")

    # 1. Normal Packet Transmission
    print("\n[1. Frame Transmission from Port 2 to Destination on Port 4]")
    res1 = hub.broadcast_packet(incoming_port=2, packet_data="Exam_Marks_Confidential.csv")
    print(f"  * Incoming on: Port {res1['incoming_port']}")
    print(f"  * Broadcast to: Ports {res1['forwarded_to_ports']} (Notice Port 1 & 3 also receive confidential data!)")
    print(f"  * Hub Logic:   {res1['hub_behavior']}")

    # 2. Collision Scenario
    print("\n[2. Concurrent Transmission Collision Test]")
    res2 = hub.simulate_concurrent_transmissions(transmitting_ports=[1, 3])
    print(f"  * Node 1 and Node 3 transmit simultaneously:")
    print(f"  * Result: {res2['status']}")

if __name__ == "__main__":
    run_hub_lab()