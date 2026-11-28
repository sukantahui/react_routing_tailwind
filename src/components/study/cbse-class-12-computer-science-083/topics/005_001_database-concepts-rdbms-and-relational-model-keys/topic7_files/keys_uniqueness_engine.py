"""
CBSE Class 12 Computer Science (083)
Topic 7: Key Hierarchy & Uniqueness Discovery Engine
Demonstrates:
1. Identifying all Super Keys from tabular data
2. Testing for Minimality to extract Candidate Keys
3. Recommending Primary Key vs Alternate Keys
"""

from itertools import combinations

class KeyDiscoveryEngine:
    def __init__(self, table_name, attributes, data_rows):
        self.table_name = table_name
        self.attributes = attributes
        self.rows = data_rows
        self.num_rows = len(data_rows)

    def is_unique(self, attr_combination):
        """Check if an attribute combination uniquely identifies all rows"""
        seen = set()
        for r in self.rows:
            val_tuple = tuple(r.get(a) for a in attr_combination)
            if None in val_tuple:
                return False  # Candidate/Primary keys must not contain NULL
            if val_tuple in seen:
                return False  # Duplicate found
            seen.add(val_tuple)
        return True

    def find_all_keys(self):
        print("=" * 65)
        print(f"  KEY DISCOVERY & HIERARCHY ANALYSIS: '{self.table_name}'")
        print("=" * 65)
        
        super_keys = []
        candidate_keys = []
        
        # Test all attribute combinations from size 1 to N
        for size in range(1, len(self.attributes) + 1):
            for combo in combinations(self.attributes, size):
                if self.is_unique(combo):
                    super_keys.append(combo)
                    # Test minimality: Is any proper subset already a candidate key?
                    is_minimal = True
                    for ck in candidate_keys:
                        if set(ck).issubset(set(combo)):
                            is_minimal = False
                            break
                    if is_minimal:
                        candidate_keys.append(combo)

        print(f"  1. TOTAL CANDIDATE KEYS IDENTIFIED (Minimal Super Keys) = {len(candidate_keys)}:")
        for i, ck in enumerate(candidate_keys, 1):
            print(f"     Candidate Key #{i}: {', '.join(ck)}")
            
        print(f"\n  2. TOTAL SUPER KEYS IDENTIFIED = {len(super_keys)}:")
        for sk in super_keys[:6]:  # Display first 6
            print(f"     Super Key: ({', '.join(sk)})")
        if len(super_keys) > 6:
            print(f"     ... and {len(super_keys) - 6} more super keys.")
            
        if candidate_keys:
            primary_key = candidate_keys[0]
            alt_keys = candidate_keys[1:]
            print(f"\n  3. RECOMMENDED PRIMARY KEY: ({', '.join(primary_key)})")
            print(f"  4. ALTERNATE KEYS (Unchosen): {['(' + ', '.join(ak) + ')' for ak in alt_keys] if alt_keys else 'None'}")
        print("=" * 65)

if __name__ == "__main__":
    sample_cols = ["RollNo", "AdmNo", "Name", "Email", "Marks"]
    sample_data = [
        {"RollNo": 1, "AdmNo": "ADM-001", "Name": "Rohan", "Email": "rohan@xyz.com", "Marks": 92},
        {"RollNo": 2, "AdmNo": "ADM-002", "Name": "Pooja", "Email": "pooja@xyz.com", "Marks": 88},
        {"RollNo": 3, "AdmNo": "ADM-003", "Name": "Rohan", "Email": "rohan_v@xyz.com", "Marks": 95}  # duplicate name!
    ]
    
    analyzer = KeyDiscoveryEngine("STUDENT", sample_cols, sample_data)
    analyzer.find_all_keys()
