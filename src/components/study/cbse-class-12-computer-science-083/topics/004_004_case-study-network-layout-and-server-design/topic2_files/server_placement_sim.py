"""
CBSE Class 12 CS - Topic 2 Simulation: 80-20 Traffic Locality Simulator
Compares inter-building cable saturation when server is in Max-PC block vs Min-PC block.
"""

def simulate_traffic_locality(blocks_data, chosen_server):
    total_pcs = sum(blocks_data.values())
    server_pcs = blocks_data[chosen_server]

    # Traffic model: each PC generates 100 packets/sec directed to server
    local_traffic = server_pcs * 100
    backbone_traffic = (total_pcs - server_pcs) * 100
    local_pct = (local_traffic / (total_pcs * 100)) * 100
    backbone_pct = (backbone_traffic / (total_pcs * 100)) * 100

    print(f"Server Placed in: '{chosen_server}' ({server_pcs} PCs out of {total_pcs} total)")
    print(f"  -> Local Building Switch Traffic: {local_traffic:6d} pkts/s ({local_pct:5.1f}%)")
    print(f"  -> Inter-Building Backbone Traffic: {backbone_traffic:6d} pkts/s ({backbone_pct:5.1f}%)")

    if local_pct >= 60:
        print("  VERDICT: OPTIMAL! Aligns with 80-20 Rule. Backbone cables protected from saturation.\n")
    else:
        print("  VERDICT: POOR DESIGN! Backbone cables heavily choked with inter-building traffic!\n")

if __name__ == "__main__":
    campus = {'Admin Wing': 20, 'Science Wing': 110, 'Commerce Wing': 30, 'Arts Wing': 25}
    print("=== 80-20 TRAFFIC LOCALITY SIMULATION ===\n")
    print("Scenario A: Placing Server in Science Wing (Max Computers: 110 PCs)")
    simulate_traffic_locality(campus, 'Science Wing')

    print("Scenario B: Placing Server in Admin Wing (Only 20 PCs)")
    simulate_traffic_locality(campus, 'Admin Wing')
