"""
CBSE Class 12 Computer Science (083)
Topic 8: Candidate Key Finder & Minimality Engine
Demonstrates:
1. Finding all unique attribute combinations (Super Keys)
2. Enforcing the Minimality Rule to filter out redundant attributes
3. Identifying Candidate Keys vs Non-Minimal Super Keys
"""

from itertools import combinations

class CandidateKeyEngine:
    def __init__(self, table_name, attributes, rows):
        self.table_name = table_name
        self.attributes = attributes
        self.rows = rows

    def check_uniqueness(self, attr_set):
        seen = set()
        for r in self.rows:
            key_val = tuple(r[a] for a in attr_set)
            if None in key_val or key_val in seen:
                return False
            seen.add(key_val)
        return True

    def find_candidate_keys(self):
        print("=" * 65)
        print(f"  CANDIDATE KEY & MINIMALITY AUDIT: Table '{self.table_name}'")
        print("=" * 65)
        
        all_super_keys = []
        candidate_keys = []
        
        # Test 1-attribute combinations, then 2, etc.
        for size in range(1, len(self.attributes) + 1):
            for combo in combinations(self.attributes, size):
                if self.check_uniqueness(combo):
                    all_super_keys.append(combo)
                    # Minimality test: check if any existing candidate key is a subset
                    is_minimal = True
                    for ck in candidate_keys:
                        if set(ck).issubset(set(combo)):
                            is_minimal = False
                            break
                    if is_minimal:
                        candidate_keys.append(combo)

        print(f"  * Total Attributes in Relation: {len(self.attributes)}")
        print(f"  * Total Rows Examined: {len(self.rows)}")
        
        print("\n  [1. IDENTIFIED CANDIDATE KEYS (Minimal Super Keys)]:")
        for i, ck in enumerate(candidate_keys, 1):
            print(f"      Candidate Key #{i}: {ck} (Length {len(ck)})")
            
        print("\n  [2. SUPER KEYS THAT ARE NOT CANDIDATE KEYS (Failed Minimality)]:")
        non_minimal = [sk for sk in all_super_keys if sk not in candidate_keys]
        for sk in non_minimal[:5]:
            print(f"      Super Key {sk} -> Rejected: Contains redundant attributes!")
        if len(non_minimal) > 5:
            print(f"      ... and {len(non_minimal) - 5} more non-minimal super keys.")
        print("=" * 65)

if __name__ == "__main__":
    cols = ["RollNo", "RegNo", "Name", "Class", "Section"]
    sample_students = [
        {"RollNo": 101, "RegNo": "REG-A1", "Name": "Ananya", "Class": 12, "Section": "A"},
        {"RollNo": 102, "RegNo": "REG-A2", "Name": "Bikram", "Class": 12, "Section": "A"},
        {"RollNo": 103, "RegNo": "REG-A3", "Name": "Ananya", "Class": 12, "Section": "B"} # Duplicate Name
    ]
    
    engine = CandidateKeyEngine("STUDENT", cols, sample_students)
    engine.find_candidate_keys()
