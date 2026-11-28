"""
CBSE Class 12 Computer Science (083)
Topic 2: RDBMS Architecture & Query Lifecycle Simulator
Demonstrates:
1. SQL Parsing & Syntax verification
2. Data Dictionary / Catalog metadata lookup
3. Query Optimization & Execution Plan generation
4. Buffer Pool Caching vs Disk Read
"""

class RDBMSEngineSimulator:
    def __init__(self):
        # 1. System Catalog / Data Dictionary (Metadata)
        self.catalog = {
            "Student": {
                "columns": ["RollNo", "Name", "Class", "Marks"],
                "types": {"RollNo": "INT", "Name": "VARCHAR", "Class": "INT", "Marks": "INT"},
                "primary_key": "RollNo",
                "indexes": ["RollNo"]
            }
        }
        
        # 2. Disk Storage (Physical data blocks)
        self.disk_table = [
            {"RollNo": 1, "Name": "Amit Roy", "Class": 12, "Marks": 92},
            {"RollNo": 2, "Name": "Deepa Sen", "Class": 12, "Marks": 78},
            {"RollNo": 3, "Name": "Rohan Das", "Class": 12, "Marks": 85},
            {"RollNo": 4, "Name": "Sneha Pal", "Class": 12, "Marks": 95}
        ]
        
        # 3. Buffer Pool (RAM Cache)
        self.buffer_pool = {}

    def execute_query(self, sql_query):
        print("=" * 65)
        print(f"  PROCESSING SQL: '{sql_query}'")
        print("=" * 65)
        
        # Step 1: Lexical Parsing
        tokens = sql_query.strip().split()
        if tokens[0].upper() != "SELECT" or "FROM" not in [t.upper() for t in tokens]:
            print("  [SYNTAX ERROR]: Invalid SQL syntax.")
            return
            
        print("  Step 1: SQL Parser verified query grammar and syntax.")
        
        # Step 2: Catalog Lookup
        table_idx = [t.upper() for t in tokens].index("FROM") + 1
        table_name = tokens[table_idx].strip(";")
        
        if table_name not in self.catalog:
            print(f"  [CATALOG ERROR]: Table '{table_name}' does not exist in Data Dictionary!")
            return
        print(f"  Step 2: Catalog validated table '{table_name}' and column metadata.")
        
        # Step 3: Query Optimization
        has_index = "RollNo" in self.catalog[table_name]["indexes"]
        plan = "Index Scan via B-Tree" if has_index else "Full Table Sequential Scan"
        print(f"  Step 3: Query Optimizer selected execution plan: [{plan}].")
        
        # Step 4: Buffer Manager / Execution Engine
        if table_name in self.buffer_pool:
            print("  Step 4: Buffer Manager HIT! Read data from RAM Cache (Zero Disk I/O).")
            rows = self.buffer_pool[table_name]
        else:
            print("  Step 4: Buffer Manager MISS. Fetching pages from physical disk into RAM...")
            rows = self.disk_table
            self.buffer_pool[table_name] = rows
            
        # Step 5: Result Set Delivery
        print("\n  [RESULT SET RETURNED TO CLIENT]:")
        print(f"  {'RollNo':<8} {'Name':<15} {'Class':<8} {'Marks':<8}")
        print("  " + "-" * 42)
        for r in rows:
            print(f"  {r['RollNo']:<8} {r['Name']:<15} {r['Class']:<8} {r['Marks']:<8}")
        print("=" * 65)

if __name__ == "__main__":
    rdbms = RDBMSEngineSimulator()
    # First query -> Buffer miss, reads disk
    rdbms.execute_query("SELECT * FROM Student;")
    # Second query -> Buffer hit, reads RAM cache!
    rdbms.execute_query("SELECT * FROM Student;")
