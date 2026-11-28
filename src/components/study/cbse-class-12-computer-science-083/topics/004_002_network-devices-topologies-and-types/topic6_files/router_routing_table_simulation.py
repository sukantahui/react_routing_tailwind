"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 6: Layer-3 Router Forwarding & Routing Table Lookup Lab
Author: Sukanta Hui, Coder & AccoTax
"""

class RouterSimulator:
    def __init__(self):
        # Routing table: (destination_subnet, mask_bits, next_hop_ip, interface_name)
        self.routing_table = [
            ("192.168.1.0", 24, "Directly Connected", "eth0 (LAN Lab A)"),
            ("192.168.2.0", 24, "Directly Connected", "eth1 (LAN Lab B)"),
            ("10.0.0.0", 8, "172.16.0.1", "eth2 (Corporate Backbone)"),
            ("0.0.0.0", 0, "203.0.113.1", "wan0 (Default Gateway / Internet)")
        ]

    @staticmethod
    def ip_to_int(ip_str: str) -> int:
        octets = [int(o) for o in ip_str.split(".")]
        return (octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3]

    def route_packet(self, src_ip: str, dest_ip: str, ttl: int, payload: str) -> dict:
        """Simulates Layer-3 packet inspection, TTL decrement, and next-hop lookup."""
        if ttl <= 1:
            return {
                "status": "DROPPED (TTL Expired in Transit)",
                "action": "Sent ICMP Time Exceeded message back to sender."
            }

        new_ttl = ttl - 1
        dest_int = self.ip_to_int(dest_ip)

        # Longest Prefix Match Search
        best_match = None
        highest_mask = -1

        for subnet, mask_len, next_hop, iface in self.routing_table:
            subnet_int = self.ip_to_int(subnet)
            mask = ((1 << 32) - 1) ^ ((1 << (32 - mask_len)) - 1) if mask_len > 0 else 0
            if (dest_int & mask) == (subnet_int & mask):
                if mask_len > highest_mask:
                    highest_mask = mask_len
                    best_match = (subnet, mask_len, next_hop, iface)

        return {
            "status": "FORWARDED",
            "src_ip": src_ip,
            "dest_ip": dest_ip,
            "original_ttl": ttl,
            "decremented_ttl": new_ttl,
            "matched_route": f"{best_match[0]}/{best_match[1]}",
            "next_hop": best_match[2],
            "out_interface": best_match[3]
        }

def run_router_lab():
    print("=" * 70)
    print("LAYER-3 ROUTER ROUTING TABLE SIMULATOR - CBSE CS 083")
    print("=" * 70)

    r = RouterSimulator()

    test_packets = [
        ("192.168.1.50", "192.168.2.100", 64, "Ping Lab B"),
        ("192.168.1.20", "10.50.1.2", 64, "Access Database"),
        ("192.168.1.15", "8.8.8.8", 64, "Google DNS Query"),
        ("192.168.1.15", "8.8.8.8", 1, "Looping Packet")
    ]

    for src, dst, ttl, desc in test_packets:
        res = r.route_packet(src, dst, ttl, desc)
        print(f"\nPacket: {desc} ({src} -> {dst})")
        print(f"  * Status:        {res['status']}")
        if res['status'] == "FORWARDED":
            print(f"  * Matched Route: {res['matched_route']} via {res['out_interface']}")
            print(f"  * Next Hop:      {res['next_hop']} (TTL decremented to {res['decremented_ttl']})")

if __name__ == "__main__":
    run_router_lab()