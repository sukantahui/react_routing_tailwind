"""
CBSE Class 12 Computer Science (083)
Topic 3: Relational Terminology & Structure Inspector
Demonstrates:
1. Mapping Table -> Relation, Row -> Tuple, Column -> Attribute
2. Verifying uniqueness of attribute names
3. Verifying atomic values in cells (1NF check)
4. Checking for duplicate tuples
"""

class RelationalTableInspector:
    def __init__(self, relation_name, attributes, tuples_data):
        self.relation_name = relation_name
        self.attributes = attributes
        self.tuples = tuples_data

    def inspect_structure(self):
        print("=" * 65)
        print(f"  RELATIONAL STRUCTURE AUDIT: Relation '{self.relation_name}'")
        print("=" * 65)
        print(f"  * Formal Term: Relation (Table Name) = '{self.relation_name}'")
        print(f"  * Number of Attributes (Columns)    = {len(self.attributes)}")
        print(f"  * List of Attributes (Fields)       = {', '.join(self.attributes)}")
        print(f"  * Number of Tuples (Rows/Records)   = {len(self.tuples)}")
        
        # Check 1: Duplicate attribute names
        if len(self.attributes) != len(set(self.attributes)):
            print("  [ERROR]: Relation contains duplicate attribute names!")
        else:
            print("  [PASS]: All attribute names are unique.")
            
        # Check 2: Atomic values in tuples
        atomic_violation = False
        for i, t in enumerate(self.tuples):
            for attr, val in t.items():
                if isinstance(val, (list, dict, set)):
                    atomic_violation = True
                    print(f"  [1NF VIOLATION]: Tuple #{i+1} has non-atomic value in '{attr}': {val}")
        if not atomic_violation:
            print("  [PASS]: All attribute values are strictly atomic (1NF compliant).")
            
        # Check 3: Duplicate tuples
        tuple_hashes = set()
        has_dup = False
        for t in self.tuples:
            t_repr = tuple(t.items())
            if t_repr in tuple_hashes:
                has_dup = True
                print(f"  [SET VIOLATION]: Duplicate tuple found: {t}")
            tuple_hashes.add(t_repr)
        if not has_dup:
            print("  [PASS]: No duplicate tuples; relation is a true mathematical set.")

        print("\n  TABULAR VIEW (RELATION INSTANCE):")
        header = " | ".join(f"{a:<14}" for a in self.attributes)
        print("  " + header)
        print("  " + "-" * len(header))
        for t in self.tuples:
            row_str = " | ".join(f"{str(t.get(a, 'NULL')):<14}" for a in self.attributes)
            print("  " + row_str)
        print("=" * 65)

if __name__ == "__main__":
    sample_attributes = ["StudentId", "StudentName", "Stream", "Percentage"]
    sample_tuples = [
        {"StudentId": 101, "StudentName": "Tanya Bose", "Stream": "Science", "Percentage": 94.5},
        {"StudentId": 102, "StudentName": "Kabir Sen", "Stream": "Commerce", "Percentage": 88.0},
        {"StudentId": 103, "StudentName": "Meera Nair", "Stream": "Humanities", "Percentage": 91.2}
    ]
    
    inspector = RelationalTableInspector("STUDENT", sample_attributes, sample_tuples)
    inspector.inspect_structure()
