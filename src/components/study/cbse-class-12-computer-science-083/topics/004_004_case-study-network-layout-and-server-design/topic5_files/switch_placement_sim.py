"""
CBSE Class 12 CS - Topic 5 Simulation: Campus Multi-Block Switch Sizing Engine
Calculates switch hardware requirements and port density sizing for all blocks.
"""

def size_campus_switches(blocks_data):
    print("=== CAMPUS MULTI-BLOCK SWITCH SIZING SIMULATOR ===\n")
    total_switches = 0
    total_ports_needed = 0

    for block, pc_count in blocks_data.items():
        # Uplink requires 1 extra port for campus backbone link
        ports_needed = pc_count + 1
        total_ports_needed += ports_needed

        # Select standard switch size: 8, 16, 24, 48
        if ports_needed <= 8:
            switch_choice = "1x 8-Port Switch"
            switches_count = 1
        elif ports_needed <= 16:
            switch_choice = "1x 16-Port Switch"
            switches_count = 1
        elif ports_needed <= 24:
            switch_choice = "1x 24-Port Switch"
            switches_count = 1
        elif ports_needed <= 48:
            switch_choice = "1x 48-Port Switch"
            switches_count = 1
        else:
            # Multi-switch stack for large labs
            switches_count = (ports_needed + 47) // 48
            switch_choice = f"{switches_count}x 48-Port Switches (Stacked)"

        total_switches += switches_count
        print(f"[{block.upper()}] Workstations: {pc_count:3d} PCs")
        print(f"  -> Hardware Installed: Switch MANDATORY in this block.")
        print(f"  -> Sizing Recommendation: {switch_choice} (Dedicated 1Gbps Uplink)\n")

    print(f"Summary: All {len(blocks_data)} blocks equipped with dedicated Layer-2 Switches.")
    print("Verdict: Complete collision isolation and wire-speed local switching achieved.")

if __name__ == "__main__":
    campus_blocks = {
        'Admin Wing': 25,
        'Technical Wing (Server)': 110,
        'Finance Wing': 15,
        'Academic Wing': 45
    }
    size_campus_switches(campus_blocks)
