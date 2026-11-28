"""
CBSE Class 12 Computer Science (083)
Topic 9: Automated 4-Mark Network Case Study Problem Solver
Calculates:
1. Optimal Server Block (80-20 rule)
2. Star Topology Cable Length
3. Bus Topology (Minimum Spanning Tree) Cable Length
4. Repeater placements (links > 100m)
5. Switch requirements per block
"""

import heapq

class CaseStudySolver:
    def __init__(self, title, computers, distances):
        self.title = title
        self.computers = computers      # dict: block -> count
        self.distances = distances      # dict: (b1, b2) -> distance in meters
        
    def get_server_block(self):
        server_block = max(self.computers.items(), key=lambda x: x[1])
        return server_block
        
    def solve_star_topology(self):
        server, count = self.get_server_block()
        star_links = []
        total_cable = 0
        repeaters_needed = []
        
        for block in self.computers:
            if block == server:
                continue
            pair = (server, block) if (server, block) in self.distances else (block, server)
            dist = self.distances.get(pair, 9999)
            star_links.append((server, block, dist))
            total_cable += dist
            if dist > 100:
                repeaters_needed.append(f"{server} <-> {block} ({dist}m)")
                
        return {
            "center": server,
            "links": star_links,
            "total_cable_m": total_cable,
            "repeaters": repeaters_needed
        }
        
    def solve_bus_topology_mst(self):
        # Kruskal's or Prim's algorithm for Minimum Spanning Tree
        nodes = list(self.computers.keys())
        edges = []
        for (u, v), d in self.distances.items():
            edges.append((d, u, v))
        edges.sort()
        
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
            
        mst_links = []
        total_dist = 0
        repeaters = []
        
        for d, u, v in edges:
            if union(u, v):
                mst_links.append((u, v, d))
                total_dist += d
                if d > 100:
                    repeaters.append(f"{u} <-> {v} ({d}m)")
                    
        return {
            "links": mst_links,
            "total_cable_m": total_dist,
            "repeaters": repeaters
        }
        
    def print_complete_cbse_model_answer(self):
        server, count = self.get_server_block()
        star = self.solve_star_topology()
        bus = self.solve_bus_topology_mst()
        
        print("=" * 70)
        print(f"  CBSE BOARD MODEL SOLUTION: {self.title}")
        print("=" * 70)
        print(f"(a) SERVER PLACEMENT & JUSTIFICATION:")
        print(f"    Suggested Block: {server} (Hosts {count} computers).")
        print(f"    Justification: According to the 80-20 rule, placing the server in")
        print(f"    the block with maximum computers optimizes network traffic and")
        print(f"    minimizes inter-block bandwidth congestion.
")
        
        print(f"(b) CABLE LAYOUT RECOMMENDATION:")
        print(f"    Option 1: Star Topology (Hub-and-Spoke with {server} as center):")
        for u, v, d in star['links']:
            print(f"       * {u} --- {v}: {d} meters")
        print(f"       Total Cable Required: {star['total_cable_m']} meters.")
        print(f"    Option 2: Bus Topology (Minimum Spanning Tree):")
        for u, v, d in bus['links']:
            print(f"       * {u} --- {v}: {d} meters")
        print(f"       Total Cable Required: {bus['total_cable_m']} meters.
")
        
        print(f"(c) REPEATER & HUB/SWITCH PLACEMENT:")
        print(f"    * Hub / Switch: Required in EVERY block ({', '.join(self.computers.keys())})")
        print(f"      to connect multiple computers within each local block LAN.")
        print(f"    * Repeater for Star Layout: {'None needed (<100m)' if not star['repeaters'] else ', '.join(star['repeaters'])}")
        print(f"    * Repeater for Bus Layout: {'None needed (<100m)' if not bus['repeaters'] else ', '.join(bus['repeaters'])}
")
        
        print(f"(d) HARDWARE & CONNECTIVITY RECOMMENDATIONS:")
        print(f"    * Best Medium between Blocks: Fiber Optic Cable (high speed & zero EMI).")
        print(f"    * Video Conferencing: VoIP protocol, Webcams, Microphones, Speakers.")
        print(f"    * Network Boundary Security: Hardware Firewall.
")

if __name__ == "__main__":
    # CBSE 2023 Sample Paper Case Study: 'TechUp Enterprise'
    sample_computers = {
        "Admin": 110,
        "Sales": 45,
        "Accounts": 60,
        "HR": 25
    }
    sample_distances = {
        ("Admin", "Sales"): 40,
        ("Admin", "Accounts"): 60,
        ("Admin", "HR"): 90,
        ("Sales", "Accounts"): 110,
        ("Sales", "HR"): 130,
        ("Accounts", "HR"): 75
    }
    
    solver = CaseStudySolver("TechUp Enterprise Case Study", sample_computers, sample_distances)
    solver.print_complete_cbse_model_answer()
