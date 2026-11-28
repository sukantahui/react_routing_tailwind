"""
CBSE Class 12 Computer Science - Computer Networks
Topic 0: Simulation of Network Evolution & Packet Routing Across Historic Milestones
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax
"""

class NetworkEvolutionSimulator:
    def __init__(self):
        self.arpanet_nodes = ["UCLA", "SRI_Stanford", "UCSB", "Univ_Utah"]
        self.nsfnet_centers = ["Cornell", "Illinois", "Pittsburgh", "San_Diego", "Princeton"]
        
    def simulate_arpanet_transmission(self, source, destination, message):
        print(f"--- 1969: ARPANET PACKET ROUTING ({source} -> {destination}) ---")
        if source not in self.arpanet_nodes or destination not in self.arpanet_nodes:
            print("Error: Node not present in 4-node ARPANET backbone!")
            return
            
        print(f"Step 1: Message '{message}' segmented into 56 kbps IMP packets.")
        path = [source]
        for node in self.arpanet_nodes:
            if node != source and node not in path:
                path.append(node)
            if node == destination:
                break
        print(f"Step 2: Hop-by-hop transmission route: {' -> '.join(path)}")
        print("Step 3: Packet reassembled successfully at destination!\n")

    def simulate_modern_internet(self, data_size_mb, bandwidth_mbps):
        print("--- MODERN BROADBAND INTERNET TRANSMISSION ---")
        bits = data_size_mb * 8 * 1_000_000
        bps = bandwidth_mbps * 1_000_000
        time_sec = bits / bps
        print(f"Data Payload  : {data_size_mb} MB ({bits:,.0f} bits)")
        print(f"Bandwidth     : {bandwidth_mbps} Mbps ({bps:,.0f} bps)")
        print(f"Transfer Time : {time_sec:.4f} seconds (Ultra-low latency)")

if __name__ == "__main__":
    sim = NetworkEvolutionSimulator()
    sim.simulate_arpanet_transmission("UCLA", "Univ_Utah", "LOGIN")
    sim.simulate_modern_internet(data_size_mb=25, bandwidth_mbps=100)