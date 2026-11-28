"""
CBSE Class 12 Computer Science (083)
Topic 10: Alternate Key Analyzer & Constraint Simulator
Demonstrates:
1. Identifying all Candidate Keys
2. Selecting a Primary Key
3. Automatically deriving Alternate Keys (Candidate Keys - Primary Key)
4. Enforcing UNIQUE constraint on Alternate Keys
"""

class AlternateKeyAnalyzer:
    def __init__(self, table_name, candidate_keys, primary_key):
        self.table_name = table_name
        self.candidate_keys = candidate_keys
        self.primary_key = primary_key
        
        # Calculate Alternate Keys
        self.alternate_keys = [k for k in candidate_keys if k != primary_key]
        self.rows = []

    def print_analysis(self):
        print("=" * 65)
        print(f"  KEY ANALYSIS REPORT: Table '{self.table_name}'")
        print("=" * 65)
        print(f"  * Total Candidate Keys Found = {len(self.candidate_keys)}:")
        for i, ck in enumerate(self.candidate_keys, 1):
            print(f"      Candidate Key #{i}: {ck}")
            
        print(f"\n  * DESIGNATED PRIMARY KEY: {self.primary_key}")
        print(f"  * DERIVED ALTERNATE KEYS ({len(self.alternate_keys)}):")
        if not self.alternate_keys:
            print("      None (Table has only 1 Candidate Key).")
        else:
            for ak in self.alternate_keys:
                print(f"      - Alternate Key: {ak} (Enforced via SQL UNIQUE constraint)")
        print("=" * 65)

    def insert_with_unique_checks(self, row_dict):
        # Check Primary Key
        pk_val = row_dict.get(self.primary_key)
        if any(r[self.primary_key] == pk_val for r in self.rows):
            print(f"  [REJECTED]: Duplicate Primary Key '{pk_val}'!")
            return False
            
        # Check Alternate Keys
        for ak in self.alternate_keys:
            ak_val = row_dict.get(ak)
            if ak_val is not None and any(r.get(ak) == ak_val for r in self.rows):
                print(f"  [REJECTED]: Duplicate Alternate Key '{ak}'='{ak_val}'! UNIQUE constraint failed.")
                return False
                
        self.rows.append(row_dict)
        print(f"  [SUCCESS]: Row inserted for PK={pk_val}. All unique constraints passed.")
        return True

if __name__ == "__main__":
    # CBSE Classic Student Table
    ck_list = ["AdmNo", "RollNo", "AadhaarNo"]
    pk = "AdmNo"
    
    analyzer = AlternateKeyAnalyzer("STUDENT", ck_list, pk)
    analyzer.print_analysis()
    
    # Test insertions
    print("\nTesting Insertions with Alternate Key Constraints:")
    analyzer.insert_with_unique_checks({"AdmNo": "ADM101", "RollNo": 1, "AadhaarNo": "1234-5678-9012", "Name": "Rohan"})
    # Attempt duplicate Alternate Key (same RollNo)
    analyzer.insert_with_unique_checks({"AdmNo": "ADM102", "RollNo": 1, "AadhaarNo": "9999-5678-9012", "Name": "Priya"})
