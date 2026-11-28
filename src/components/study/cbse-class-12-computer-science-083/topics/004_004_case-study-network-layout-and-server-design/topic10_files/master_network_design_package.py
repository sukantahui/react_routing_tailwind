"""
=============================================================================
CBSE CLASS 12 COMPUTER SCIENCE (SUBJECT CODE 083)
MASTER LABORATORY PACKAGE: CAMPUS NETWORK LAYOUT & CASE STUDY SOLVER
Teacher: Sukanta Hui (Coder & AccoTax, Barrackpore)
=============================================================================
Features:
1. Automated Server Placement using 80-20 Rule.
2. Star Topology Cable Length & Repeater Analysis.
3. Bus Topology (Kruskal's Minimum Spanning Tree) & Repeater Analysis.
4. Hub / Switch distribution engine.
5. Communication Medium & Security Advisor.
6. Full CBSE Examination Model Answer Generator.
=============================================================================
"""

import sys

class CampusNetworkDesigner:
    def __init__(self, campus_name, computers, distances):
        """
        computers: dict of {block_name: num_computers}
        distances: dict of {(blockA, blockB): distance_in_meters}
        """
        self.campus_name = campus_name
        self.computers = computers
        self.distances = {}
        # Normalize undirected distance lookup
        for (u, v), d in distances.items():
            self.distances[(u, v)] = d
            self.distances[(v, u)] = d

    def get_distance(self, u, v):
        if u == v:
            return 0
        return self.distances.get((u, v), 999999)

    def select_server_block(self):
        """80-20 rule: Block with maximum computers"""
        server_block = max(self.computers.items(), key=lambda x: x[1])
        return server_block  # (block_name, count)

    def calculate_star_topology(self):
        """Star topology: Direct links from Server Block to all other blocks"""
        server, count = self.select_server_block()
        links = []
        total_cable = 0
        repeaters = []

        for block in self.computers:
            if block == server:
                continue
            dist = self.get_distance(server, block)
            links.append((server, block, dist))
            total_cable += dist
            if dist > 100:
                repeaters.append((server, block, dist))

        return {
            "center": server,
            "links": links,
            "total_cable_m": total_cable,
            "repeaters": repeaters
        }

    def calculate_bus_topology_mst(self):
        """Bus topology: Kruskal's Minimum Spanning Tree"""
        nodes = list(self.computers.keys())
        parent = {n: n for n in nodes}

        def find(i):
            if parent[i] == i:
                return i
            parent[i] = find(parent[i])
            return parent[i]

        def union(i, j):
            root_i = find(i)
            root_j = find(j)
            if root_i != root_j:
                parent[root_i] = root_j
                return True
            return False

        # Extract unique edges
        unique_edges = []
        seen = set()
        for (u, v), d in self.distances.items():
            edge_key = tuple(sorted([u, v]))
            if edge_key not in seen:
                seen.add(edge_key)
                unique_edges.append((d, u, v))

        unique_edges.sort()
        mst_links = []
        total_dist = 0
        repeaters = []

        for d, u, v in unique_edges:
            if union(u, v):
                mst_links.append((u, v, d))
                total_dist += d
                if d > 100:
                    repeaters.append((u, v, d))

        return {
            "links": mst_links,
            "total_cable_m": total_dist,
            "repeaters": repeaters
        }

    def generate_full_cbse_report(self):
        server, s_count = self.select_server_block()
        star = self.calculate_star_topology()
        bus = self.calculate_bus_topology_mst()

        print("=" * 75)
        print(f"  CBSE CLASS 12 COMPUTER SCIENCE - CASE STUDY MODEL REPORT")
        print(f"  Project / Campus: {self.campus_name}")
        print("=" * 75)

        print("\n[SUB-QUESTION (a)] SERVER PLACEMENT RECOMMENDATION & JUSTIFICATION:")
        print(f"  * Recommended Location: {server} (Hosts {s_count} computers).")
        print(f"  * Justification (80-20 Rule): In computer networks, approximately 80% of")
        print(f"    traffic is local while 20% traverses the backbone. Placing the server in")
        print(f"    the block with the maximum computers minimizes inter-building data traffic,")
        print(f"    reduces cross-campus cable congestion, and improves response time.")

        print("\n[SUB-QUESTION (b)] CABLE LAYOUT RECOMMENDATION:")
        print(f"  Option 1: Star Topology (Recommended for Reliability & Performance)")
        print(f"    - Hub/Center: {star['center']}")
        for u, v, d in star['links']:
            print(f"      * {u} <---> {v} : {d} meters")
        print(f"    - Total Cable Length: {star['total_cable_m']} meters.")

        print(f"\n  Option 2: Bus Topology (Recommended for Cable Economy / Minimum Length)")
        for u, v, d in bus['links']:
            print(f"      * {u} <---> {v} : {d} meters")
        print(f"    - Total Cable Length: {bus['total_cable_m']} meters.")

        print("\n[SUB-QUESTION (c)] REPEATER & HUB/SWITCH PLACEMENT:")
        print(f"  * Hub / Switch Placement: Must be placed in EVERY BLOCK")
        print(f"    ({', '.join(self.computers.keys())}) to connect multiple workstations locally.")
        print(f"  * Repeater for Star Topology:")
        if not star['repeaters']:
            print("    - No repeater required. (All links <= 100 meters).")
        else:
            for u, v, d in star['repeaters']:
                print(f"    - Place repeater between {u} and {v} (Distance {d}m > 100m).")
        print(f"  * Repeater for Bus Topology:")
        if not bus['repeaters']:
            print("    - No repeater required. (All links <= 100 meters).")
        else:
            for u, v, d in bus['repeaters']:
                print(f"    - Place repeater between {u} and {v} (Distance {d}m > 100m).")

        print("\n[SUB-QUESTION (d)] ADVANCED RECOMMENDATIONS:")
        print("  * Transmission Medium between Blocks: Optical Fiber Cable (Immune to EMI, gigabit speed).")
        print("  * Indoor LAN Cabling: UTP (Cat6) Unshielded Twisted Pair (Cost-effective).")
        print("  * Remote Campus Link (>15 km over hills): Radio Waves / Microwave link or Satellite.")
        print("  * Video Conferencing: VoIP Protocol, High-Definition Webcams, Microphones, Speakers.")
        print("  * Network Perimeter Protection: Hardware / Software Firewall.")
        print("=" * 75)

if __name__ == "__main__":
    # Test with standard CBSE Board Scenario: 'Apex University Campus'
    sample_computers = {
        "Admin Block": 120,
        "Science Wing": 40,
        "Library Wing": 30,
        "Hostel Wing": 20
    }
    sample_distances = {
        ("Admin Block", "Science Wing"): 50,
        ("Admin Block", "Library Wing"): 70,
        ("Admin Block", "Hostel Wing"): 135,
        ("Science Wing", "Library Wing"): 60,
        ("Science Wing", "Hostel Wing"): 150,
        ("Library Wing", "Hostel Wing"): 90
    }

    designer = CampusNetworkDesigner("Apex University Campus", sample_computers, sample_distances)
    designer.generate_full_cbse_report()
