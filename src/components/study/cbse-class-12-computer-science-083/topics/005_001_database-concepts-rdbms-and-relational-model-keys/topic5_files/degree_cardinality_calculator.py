"""
CBSE Class 12 Computer Science (083)
Topic 5: Degree & Cardinality Calculator and Cartesian Product Simulator
Demonstrates:
1. Dynamic calculation of Degree (columns) and Cardinality (rows)
2. Effects of INSERT, DELETE, ADD COLUMN, and DROP COLUMN
3. Cartesian Product (Cross Join) Degree (+) and Cardinality (*) formulas
"""

class TableMetricsEngine:
    def __init__(self, name, columns, rows):
        self.name = name
        self.columns = list(columns)
        self.rows = list(rows)

    @property
    def degree(self):
        return len(self.columns)

    @property
    def cardinality(self):
        return len(self.rows)

    def print_status(self, action_name="CURRENT STATUS"):
        print(f"\n[{action_name}] Table: '{self.name}'")
        print(f"  * Columns ({self.degree}): {', '.join(self.columns)}")
        print(f"  * Degree      = {self.degree} (Number of Attributes/Columns)")
        print(f"  * Cardinality = {self.cardinality} (Number of Tuples/Rows)")

    def add_column(self, col_name):
        self.columns.append(col_name)
        for r in self.rows:
            r[col_name] = None
        self.print_status(f"ACTION: ALTER TABLE ADD COLUMN '{col_name}'")

    def insert_row(self, row_dict):
        self.rows.append(row_dict)
        self.print_status("ACTION: INSERT INTO")

    def delete_row(self):
        if self.rows:
            popped = self.rows.pop()
            self.print_status(f"ACTION: DELETE FROM (Deleted row {popped})")

def simulate_cartesian_product(t1, t2):
    print("\n" + "=" * 65)
    print(f"  CARTESIAN PRODUCT (CROSS JOIN): {t1.name} x {t2.name}")
    print("=" * 65)
    print(f"  * {t1.name}: Degree = {t1.degree}, Cardinality = {t1.cardinality}")
    print(f"  * {t2.name}: Degree = {t2.degree}, Cardinality = {t2.cardinality}")
    
    prod_degree = t1.degree + t2.degree
    prod_cardinality = t1.cardinality * t2.cardinality
    
    print("\n  APPLYING CBSE CARTESIAN RULES:")
    print(f"  1. Degree({t1.name} x {t2.name})      = {t1.degree} + {t2.degree} = {prod_degree} (ADD)")
    print(f"  2. Cardinality({t1.name} x {t2.name}) = {t1.cardinality} * {t2.cardinality} = {prod_cardinality} (MULTIPLY)")
    print("=" * 65)

if __name__ == "__main__":
    t_student = TableMetricsEngine(
        "STUDENT",
        ["RollNo", "Name", "Class", "Marks"],
        [
            {"RollNo": 1, "Name": "Rohan", "Class": 12, "Marks": 91},
            {"RollNo": 2, "Name": "Pooja", "Class": 12, "Marks": 84},
            {"RollNo": 3, "Name": "Karan", "Class": 12, "Marks": 79}
        ]
    )
    t_student.print_status("INITIAL STATE")
    t_student.insert_row({"RollNo": 4, "Name": "Neha", "Class": 12, "Marks": 95})
    t_student.add_column("Stream")
    t_student.delete_row()
    
    t_course = TableMetricsEngine(
        "COURSE",
        ["CourseId", "CourseName"],
        [{"CourseId": "C1", "CourseName": "CS"}, {"CourseId": "C2", "CourseName": "IP"}]
    )
    simulate_cartesian_product(t_student, t_course)
