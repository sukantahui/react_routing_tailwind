"""
CBSE Class 12 CS - Topic 0 Simulation: 4-Mark Case Study Parser & Validator
Evaluates campus distance matrices and computer counts to generate model answers.
"""

class CaseStudySolver:
    def __init__(self, name, distances, computers):
        self.name = name
        self.distances = distances  # dict: {('BlockA', 'BlockB'): meters}
        self.computers = computers  # dict: {'BlockA': count}

    def solve(self):
        print(f"=== SOLVING CBSE CASE STUDY FOR '{self.name.upper()}' ===")

        # 1. Server Placement
        server_block = max(self.computers, key=self.computers.get)
        max_count = self.computers[server_block]
        print(f"\nSub-Question (a) Server Placement:")
        print(f"  Recommended Block: {server_block}")
        print(f"  Justification: It has the maximum number of computers ({max_count} PCs).")
        print(f"  Applies the 80-20 rule to minimize inter-block network traffic.")

        # 2. Cable Layout (Star from Server)
        print(f"\nSub-Question (b) Cable Layout (Star Topology from Server '{server_block}'):")
        total_cable = 0
        for block in self.computers:
            if block != server_block:
                dist = self.distances.get((server_block, block)) or self.distances.get((block, server_block), 0)
                total_cable += dist
                print(f"  Link: {server_block} <---> {block} ({dist} meters)")
        print(f"  Total Cable Required: {total_cable} meters")

        # 3. Hardware Placement
        print(f"\nSub-Question (c) Hardware Placement:")
        print(f"  - Hub / Switch: Required in EACH block ({', '.join(self.computers.keys())}).")
        repeater_needed = []
        for (b1, b2), dist in self.distances.items():
            if dist > 100:
                repeater_needed.append(f"{b1} <-> {b2} ({dist}m)")
        print(f"  - Repeater: Required on links exceeding 100m: {repeater_needed if repeater_needed else 'None'}.")

        # 4. Medium / Remote link
        print(f"\nSub-Question (d) Best Medium Selection:")
        print(f"  - Intra-campus: Cat6 UTP (economic) or Fiber Optic (high speed/no repeaters).")
        print(f"  - Hilly / Distant branch: Microwave / Radio wave or Satellite Link.")

if __name__ == "__main__":
    distances_sample = {
        ('Admin', 'Accounts'): 60,
        ('Admin', 'Tech'): 140,
        ('Accounts', 'Tech'): 90
    }
    computers_sample = {'Admin': 30, 'Accounts': 20, 'Tech': 110}
    solver = CaseStudySolver("ABC Public School Campus", distances_sample, computers_sample)
    solver.solve()
