"""
CBSE Class 12 CS - Topic 3 Simulation: Star vs Bus Topology Designer
Generates ASCII layout diagrams and computes total cable length for examination problems.
"""

def generate_layout_report(server, blocks, distances):
    print("=== TOPOLOGY CABLE LAYOUT ARCHITECTURAL REPORT ===")
    print(f"Campus Blocks: {', '.join(blocks)}")
    print(f"Designated Server Location: '{server}'\n")

    # Star Layout
    print("--------------------------------------------------")
    print("1. STAR TOPOLOGY LAYOUT (Centered at Server):")
    print("--------------------------------------------------")
    star_meters = 0
    for b in blocks:
        if b != server:
            d = distances.get((server, b)) or distances.get((b, server), 0)
            star_meters += d
            print(f"  [{server} (SERVER)] <====== {d:3d} m ======> [{b}]")
    print(f"  TOTAL STAR CABLE LENGTH: {star_meters} meters.")
    print("  Advantage: Superior fault tolerance and dedicated bandwidth.\n")

    # Sequential Bus Layout
    print("--------------------------------------------------")
    print("2. BUS TOPOLOGY LAYOUT (Shortest Adjacent Links):")
    print("--------------------------------------------------")
    bus_meters = 0
    for i in range(len(blocks) - 1):
        b1, b2 = blocks[i], blocks[i+1]
        d = distances.get((b1, b2)) or distances.get((b2, b1), 0)
        bus_meters += d
        print(f"  [{b1}] ------ {d:3d} m ------ [{b2}]")
    print(f"  TOTAL BUS CABLE LENGTH: {bus_meters} meters.")
    print("  Advantage: Minimum physical cable expenditure.")

if __name__ == "__main__":
    blocks_list = ['Admin', 'Technical', 'Finance', 'Academic']
    dist_table = {
        ('Admin', 'Technical'): 140,
        ('Admin', 'Finance'): 50,
        ('Technical', 'Finance'): 85,
        ('Academic', 'Technical'): 95,
        ('Academic', 'Finance'): 60
    }
    generate_layout_report('Technical', blocks_list, dist_table)
