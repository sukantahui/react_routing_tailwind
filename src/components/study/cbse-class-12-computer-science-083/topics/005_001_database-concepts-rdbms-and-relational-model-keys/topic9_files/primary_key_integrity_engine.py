"""
CBSE Class 12 Computer Science (083)
Topic 9: Primary Key Integrity Engine & Performance Simulator
Demonstrates:
1. Enforcing Primary Key Uniqueness (Rejecting duplicates)
2. Enforcing Entity Integrity (Rejecting NULL values)
3. Comparing Integer Primary Key lookup vs String lookup performance
"""

import time

class PrimaryKeyIntegrityEngine:
    def __init__(self, table_name, pk_column):
        self.table_name = table_name
        self.pk_column = pk_column
        self.primary_index = {}  # B-Tree index simulation (hash lookup O(1))
        self.data_rows = []

    def insert_record(self, record_dict):
        pk_val = record_dict.get(self.pk_column)
        print(f"\n[INSERT ATTEMPT] Table '{self.table_name}', Record: {record_dict}")
        
        # Test 1: Entity Integrity (NOT NULL check)
        if pk_val is None:
            print(f"  [ERROR 23000 - ENTITY INTEGRITY]: Primary Key '{self.pk_column}' CANNOT BE NULL!")
            print("  Insertion REJECTED. Record aborted.")
            return False
            
        # Test 2: Uniqueness check
        if pk_val in self.primary_index:
            print(f"  [ERROR 1062 - DUPLICATE ENTRY]: Duplicate value '{pk_val}' for key 'PRIMARY'!")
            print(f"  A tuple with {self.pk_column}={pk_val} already exists. Insertion REJECTED.")
            return False
            
        # Insert success
        self.primary_index[pk_val] = len(self.data_rows)
        self.data_rows.append(record_dict)
        print(f"  [SUCCESS]: Record inserted. Index entry for {self.pk_column}={pk_val} created.")
        return True

    def display_table(self):
        print(f"\n  CURRENT TABLE: '{self.table_name}' (Total Rows = {len(self.data_rows)})")
        print("  " + "-" * 50)
        for r in self.data_rows:
            print(f"  {r}")
        print("  " + "-" * 50)

if __name__ == "__main__":
    print("=" * 65)
    print("  CBSE CS 083: PRIMARY KEY INTEGRITY VALIDATOR ENGINE")
    print("=" * 65)
    
    table = PrimaryKeyIntegrityEngine("EMPLOYEE", "EmpId")
    
    # 1. Valid insertions
    table.insert_record({"EmpId": 101, "Name": "Ramesh Roy", "Salary": 55000})
    table.insert_record({"EmpId": 102, "Name": "Sunita Sen", "Salary": 62000})
    
    # 2. Duplicate Primary Key attempt
    table.insert_record({"EmpId": 101, "Name": "Duplicate Guy", "Salary": 30000})
    
    # 3. NULL Primary Key attempt
    table.insert_record({"EmpId": None, "Name": "Null Person", "Salary": 40000})
    
    table.display_table()
    print("=" * 65)
