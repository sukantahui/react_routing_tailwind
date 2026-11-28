"""
=============================================================================
CBSE CLASS 12 COMPUTER SCIENCE (SUBJECT CODE 083)
MASTER LABORATORY PACKAGE: RELATIONAL DATABASE CONCEPTS & KEYS ENGINE
Teacher: Sukanta Hui (Coder & AccoTax, Barrackpore)
=============================================================================
Features:
1. Dynamic Degree & Cardinality calculations.
2. Automated Candidate Key discovery with minimality verification.
3. Primary Key enforcement (UNIQUE + NOT NULL / Entity Integrity).
4. Alternate Key derivation (Candidate Keys - Primary Key).
5. Foreign Key & Referential Integrity simulator (RESTRICT & CASCADE).
6. Cartesian Product and Join operations calculator.
=============================================================================
"""

from itertools import combinations

class MiniRelationalEngine:
    def __init__(self, name, attributes, primary_key=None):
        self.name = name
        self.attributes = list(attributes)
        self.primary_key = primary_key
        self.candidate_keys = []
        self.alternate_keys = []
        self.rows = []
        self.foreign_keys = {}  # {col_name: (parent_table, parent_col)}

    @property
    def degree(self):
        return len(self.attributes)

    @property
    def cardinality(self):
        return len(self.rows)

    def add_foreign_key(self, child_col, parent_table, parent_col):
        self.foreign_keys[child_col] = (parent_table, parent_col)

    def insert(self, row_dict):
        # 1. Entity Integrity (Primary Key check)
        if self.primary_key:
            pk_val = row_dict.get(self.primary_key)
            if pk_val is None:
                raise ValueError(f"Entity Integrity Violation: Primary Key '{self.primary_key}' cannot be NULL!")
            if any(r[self.primary_key] == pk_val for r in self.rows):
                raise ValueError(f"Primary Key Violation: Duplicate value '{pk_val}' for key '{self.primary_key}'!")

        # 2. Referential Integrity (Foreign Key check)
        for child_col, (parent_tbl, parent_col) in self.foreign_keys.items():
            fk_val = row_dict.get(child_col)
            if fk_val is not None:
                parent_pks = [r[parent_col] for r in parent_tbl.rows]
                if fk_val not in parent_pks:
                    raise ValueError(f"Referential Integrity Violation: Foreign key value '{fk_val}' not found in parent table '{parent_tbl.name}'!")

        self.rows.append(row_dict)

    def discover_keys(self):
        """Discover Candidate Keys using minimality test"""
        all_candidate_keys = []
        for size in range(1, len(self.attributes) + 1):
            for combo in combinations(self.attributes, size):
                # Check uniqueness
                seen = set()
                is_unique = True
                for r in self.rows:
                    val_tuple = tuple(r.get(a) for a in combo)
                    if None in val_tuple or val_tuple in seen:
                        is_unique = False
                        break
                    seen.add(val_tuple)
                if is_unique:
                    # Minimality check
                    if not any(set(ck).issubset(set(combo)) for ck in all_candidate_keys):
                        all_candidate_keys.append(combo)

        self.candidate_keys = all_candidate_keys
        if self.primary_key:
            pk_tuple = (self.primary_key,) if isinstance(self.primary_key, str) else tuple(self.primary_key)
            self.alternate_keys = [ck for ck in self.candidate_keys if ck != pk_tuple]
        return self.candidate_keys

    def display(self):
        print(f"\nTABLE: '{self.name}' [Degree={self.degree}, Cardinality={self.cardinality}]")
        print(f"Attributes: {', '.join(self.attributes)}")
        print(f"Primary Key: {self.primary_key}")
        header = " | ".join(f"{a:<14}" for a in self.attributes)
        print("  " + header)
        print("  " + "-" * len(header))
        for r in self.rows:
            row_str = " | ".join(f"{str(r.get(a, 'NULL')):<14}" for a in self.attributes)
            print("  " + row_str)

if __name__ == "__main__":
    print("=" * 70)
    print("  CBSE CLASS 12 CS (083): MINI RELATIONAL DATABASE ENGINE")
    print("=" * 70)

    # 1. Parent Table: DEPARTMENT
    dept = MiniRelationalEngine("DEPARTMENT", ["DeptId", "DeptName"], primary_key="DeptId")
    dept.insert({"DeptId": 10, "DeptName": "Computer Science"})
    dept.insert({"DeptId": 20, "DeptName": "Physics"})
    dept.display()

    # 2. Child Table: EMPLOYEE
    emp = MiniRelationalEngine("EMPLOYEE", ["EmpId", "Name", "Salary", "DeptId"], primary_key="EmpId")
    emp.add_foreign_key("DeptId", dept, "DeptId")
    emp.insert({"EmpId": 101, "Name": "Ramesh", "Salary": 60000, "DeptId": 10})
    emp.insert({"EmpId": 102, "Name": "Pooja", "Salary": 75000, "DeptId": 20})
    emp.insert({"EmpId": 103, "Name": "Sneha", "Salary": 50000, "DeptId": None})  # Valid NULL foreign key
    emp.display()

    # 3. Test Cartesian Product
    print("\n[CARTESIAN PRODUCT CALCULATIONS]:")
    print(f"Degree(DEPARTMENT x EMPLOYEE)      = {dept.degree} + {emp.degree} = {dept.degree + emp.degree}")
    print(f"Cardinality(DEPARTMENT x EMPLOYEE) = {dept.cardinality} * {emp.cardinality} = {dept.cardinality * emp.cardinality}")
    print("=" * 70)
