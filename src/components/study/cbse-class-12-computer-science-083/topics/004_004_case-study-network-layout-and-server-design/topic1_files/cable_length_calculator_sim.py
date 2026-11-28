"""
CBSE Class 12 CS - Topic 1 Simulation: Distance Matrix & Cable Length Calculator
Compares Star Layout cable requirements vs Bus Layout cable requirements.
"""

def compare_layouts(server, computers, distances):
    print("=== CAMPUS NETWORK TOPOLOGY CABLE SIZING COMPARATOR ===")
    print(f"Server Location: '{server}' (Host to {computers[server]} PCs)\n")

    # Star Layout Calculation (from Server to all other blocks)
    star_links = []
    star_total = 0
    for block in computers:
        if block != server:
            d = distances.get((server, block)) or distances.get((block, server), 0)
            star_links.append((server, block, d))
            star_total += d

    print("1. STAR TOPOLOGY LAYOUT (Direct Links from Server):")
    for b1, b2, d in star_links:
        rep = " [REPEATER NEEDED (>100m)]" if d > 100 else ""
        print(f"  {b1} <======> {b2} : {d} meters{rep}")
    print(f"  TOTAL STAR CABLE LENGTH: {star_total} meters\n")

    # Sample Sequential Bus Layout
    blocks = list(computers.keys())
    bus_total = 0
    print("2. BUS TOPOLOGY LAYOUT (Shortest Adjacent Chain):")
    for i in range(len(blocks) - 1):
        b1 = blocks[i]
        b2 = blocks[i+1]
        d = distances.get((b1, b2)) or distances.get((b2, b1), 0)
        bus_total += d
        print(f"  {b1} ------ {b2} : {d} meters")
    print(f"  TOTAL BUS CABLE LENGTH: {bus_total} meters\n")
    print(f"Cable Savings in Bus Layout: {star_total - bus_total} meters.")
    print("Recommendation: Use Star Topology for mission-critical reliability and fault isolation.")

if __name__ == "__main__":
    comp_map = {'Admin': 30, 'Technical': 110, 'Finance': 25, 'Academic': 45}
    dist_map = {
        ('Admin', 'Technical'): 140,
        ('Admin', 'Finance'): 50,
        ('Technical', 'Finance'): 85,
        ('Academic', 'Technical'): 95,
        ('Academic', 'Finance'): 60,
        ('Admin', 'Academic'): 110
    }
    compare_layouts('Technical', comp_map, dist_map)
