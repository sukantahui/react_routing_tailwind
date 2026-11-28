"""
CBSE Class 12 Computer Science (083)
Topic 0: File Processing Limitations vs DBMS Simulation
Demonstrates:
1. Data Redundancy (duplicate copies in separate files)
2. Data Inconsistency (update anomaly where one copy is missed)
3. Orphan Records (referential integrity failure in flat files)
"""

import json

class FileProcessingSimulator:
    def __init__(self):
        # Simulating independent departmental flat files
        self.fees_file = [
            {"roll_no": 101, "name": "Aman Sharma", "address": "12 Park St, Kolkata", "fees_due": 1500},
            {"roll_no": 102, "name": "Priya Sen", "address": "45 Lake Rd, Kolkata", "fees_due": 0},
            {"roll_no": 103, "name": "Rohan Das", "address": "88 MG Rd, Barrackpore", "fees_due": 2400}
        ]
        self.library_file = [
            {"roll_no": 101, "name": "Aman Sharma", "address": "12 Park St, Kolkata", "books_issued": 2},
            {"roll_no": 102, "name": "Priya Sen", "address": "45 Lake Rd, Kolkata", "books_issued": 1},
            {"roll_no": 103, "name": "Rohan Das", "address": "88 MG Rd, Barrackpore", "books_issued": 0}
        ]

    def update_student_address_in_fee_office(self, roll_no, new_address):
        """Simulate updating address in only one departmental file"""
        print(f"\n[ACTION] Updating address for Roll No {roll_no} in Fees Office to: '{new_address}'")
        for record in self.fees_file:
            if record["roll_no"] == roll_no:
                record["address"] = new_address
                break
        # The library file is NOT updated! This simulates uncoordinated file updates.

    def inspect_data_consistency(self):
        print("\n" + "=" * 65)
        print("  INSPECTING DATA ACROSS DEPARTMENTAL FLAT FILES")
        print("=" * 65)
        inconsistency_detected = False
        
        for fee_rec in self.fees_file:
            r_no = fee_rec["roll_no"]
            lib_rec = next((r for r in self.library_file if r["roll_no"] == r_no), None)
            
            print(f"\nRoll No: {r_no} ({fee_rec['name']})")
            print(f"  * Fees File Address   : {fee_rec['address']}")
            print(f"  * Library File Address: {lib_rec['address'] if lib_rec else 'NOT FOUND'}")
            
            if lib_rec and fee_rec['address'] != lib_rec['address']:
                inconsistency_detected = True
                print("  [ALERT - ANOMALY]: DATA INCONSISTENCY DETECTED!")
                print("  Reason: Redundant data was updated in Fees file but not in Library file.")
                
        if not inconsistency_detected:
            print("\nAll departmental copies currently match (No inconsistency yet).")
        print("=" * 65)

if __name__ == "__main__":
    sim = FileProcessingSimulator()
    print("Initial State (Data Redundancy present):")
    sim.inspect_data_consistency()
    
    # Simulate student changing residence
    sim.update_student_address_in_fee_office(101, "Flat 4B, Salt Lake Sector V, Kolkata")
    sim.inspect_data_consistency()
