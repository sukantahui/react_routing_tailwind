"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 11: Hierarchical Tree Topology Routing & Branch Isolation Lab
Author: Sukanta Hui, Coder & AccoTax
"""

class TreeTopologyHierarchy:
    def __init__(self, root_name: str = "Core_Campus_Switch"):
        self.root = root_name
        # Hierarchy: { branch_switch: [workstations...] }
        self.branches = {
            "Admin_Switch": ["Admin_PC1", "Admin_PC2"],
            "Science_Switch": ["Sci_Lab1", "Sci_Lab2", "Sci_Lab3"],
            "Library_Switch": ["Lib_Desk1", "Lib_Desk2"]
        }
        self.failed_branches = set()
        self.root_operational = True

    def fail_branch(self, branch_name: str):
        """Simulates failure of an intermediate departmental switch."""
        self.failed_branches.add(branch_name)

    def fail_root(self):
        """Simulates failure of the root core switch / backbone."""
        self.root_operational = False

    def find_branch(self, node: str) -> str:
        for b, members in self.branches.items():
            if node in members:
                return b
        return None

    def route_traffic(self, sender: str, recipient: str) -> dict:
        """Simulates hierarchical routing through tree levels."""
        b_sender = self.find_branch(sender)
        b_recip = self.find_branch(recipient)

        if not b_sender or not b_recip:
            return {"status": "FAILED: Unknown node."}

        # Check departmental switch failure
        if b_sender in self.failed_branches:
            return {
                "status": f"FAILED: Sender Branch '{b_sender}' Offline",
                "reason": f"Intermediate switch for '{b_sender}' failed. Other branches remain operational!"
            }
        if b_recip in self.failed_branches:
            return {
                "status": f"FAILED: Recipient Branch '{b_recip}' Offline",
                "reason": f"Intermediate switch for '{b_recip}' failed. Other branches remain operational!"
            }

        # Intra-cluster communication (same branch)
        if b_sender == b_recip:
            return {
                "status": "LOCAL SUCCESS (Intra-Branch)",
                "path": f"{sender} -> {b_sender} -> {recipient}",
                "detail": "Traffic resolved locally at departmental switch without touching core backbone."
            }

        # Inter-cluster communication (cross-branch via root backbone)
        if not self.root_operational:
            return {
                "status": "FAILED: Core Backbone Down",
                "reason": "Root core switch failed! Cross-branch inter-departmental communication is severed."
            }

        return {
            "status": "INTER-BRANCH SUCCESS",
            "path": f"{sender} -> {b_sender} -> [{self.root}] -> {b_recip} -> {recipient}",
            "detail": "Data routed up through departmental switch, across core root backbone, and down to target branch."
        }

def run_tree_lab():
    print("=" * 70)
    print("HIERARCHICAL TREE TOPOLOGY SIMULATOR - CBSE CS 083")
    print("=" * 70)

    tree = TreeTopologyHierarchy(root_name="University_Core_Switch")

    # 1. Intra-Branch Traffic (Local)
    print("\n[Test 1: Local Intra-Branch Traffic (Science Lab 1 to Lab 2)]")
    r1 = tree.route_traffic("Sci_Lab1", "Sci_Lab2")
    print(f"  * Status: {r1['status']}")
    print(f"  * Path:   {r1['path']}")
    print(f"  * Detail: {r1['detail']}")

    # 2. Inter-Branch Traffic (Cross-Department)
    print("\n[Test 2: Inter-Branch Traffic (Admin PC1 to Library Desk1)]")
    r2 = tree.route_traffic("Admin_PC1", "Lib_Desk1")
    print(f"  * Status: {r2['status']}")
    print(f"  * Path:   {r2['path']}")

    # 3. Branch Isolation (Science Switch Fails)
    print("\n[Test 3: Branch Isolation - Science Switch Fails]")
    tree.fail_branch("Science_Switch")
    r3_fail = tree.route_traffic("Admin_PC1", "Sci_Lab1")
    print(f"  * Comm to Science: {r3_fail['status']} ({r3_fail['reason']})")
    r3_ok = tree.route_traffic("Admin_PC1", "Lib_Desk1")
    print(f"  * Comm between Admin & Library: {r3_ok['status']} (Notice: Completely unaffected!)")

    # 4. Core Backbone Failure
    print("\n[Test 4: Core Root Backbone Failure]")
    tree.fail_root()
    r4_cross = tree.route_traffic("Admin_PC1", "Lib_Desk1")
    print(f"  * Cross-Branch Traffic: {r4_cross['status']} ({r4_cross['reason']})")
    r4_local = tree.route_traffic("Admin_PC1", "Admin_PC2")
    print(f"  * Local Admin Traffic:  {r4_local['status']} (Local branch traffic still works!)")

if __name__ == "__main__":
    run_tree_lab()