"""
CBSE Class 12 Computer Science (083)
Topic 11: Foreign Key & Referential Integrity Simulator
Demonstrates:
1. Enforcing Referential Integrity on child insertions (Blocking non-existent parent IDs)
2. Enforcing RESTRICT vs CASCADE on parent deletions
3. Detecting and preventing orphan records
"""

class ReferentialIntegritySimulator:
    def __init__(self):
        # Parent Table: DEPARTMENT (DeptId is Primary Key)
        self.departments = {
            10: "Computer Science",
            20: "Physics",
            30: "Mathematics"
        }
        
        # Child Table: EMPLOYEE (DeptId is Foreign Key referencing DEPARTMENT)
        self.employees = [
            {"EmpId": 101, "Name": "Amit Roy", "DeptId": 10},
            {"EmpId": 102, "Name": "Pooja Sen", "DeptId": 20},
            {"EmpId": 103, "Name": "Rohan Das", "DeptId": 10},
            {"EmpId": 104, "Name": "Sneha Pal", "DeptId": None}  # NULL foreign key is valid!
        ]

    def insert_employee(self, emp_id, name, dept_id):
        print(f"\n[CHILD INSERT ATTEMPT] Employee: ID={emp_id}, Name='{name}', DeptId={dept_id}")
        
        # Referential Integrity Check
        if dept_id is not None and dept_id not in self.departments:
            print(f"  [ERROR 1452 - FOREIGN KEY CONSTRAINT FAILS]:")
            print(f"  Parent DeptId={dept_id} does NOT exist in DEPARTMENT table!")
            print("  Insertion REJECTED. Orphan record prevented.")
            return False
            
        self.employees.append({"EmpId": emp_id, "Name": name, "DeptId": dept_id})
        print(f"  [SUCCESS]: Employee '{name}' inserted. Referential integrity satisfied.")
        return True

    def delete_department_restrict(self, dept_id):
        """Simulate default RESTRICT rule"""
        print(f"\n[PARENT DELETE ATTEMPT - RESTRICT] DeptId={dept_id}")
        referencing_children = [e for e in self.employees if e["DeptId"] == dept_id]
        
        if referencing_children:
            print(f"  [ERROR 1451 - RESTRICT VIOLATION]: Cannot delete parent DeptId={dept_id}!")
            print(f"  {len(referencing_children)} child employee records still reference this department.")
            print("  Deletion BLOCKED. Delete or reassign child employees first.")
            return False
            
        del self.departments[dept_id]
        print(f"  [SUCCESS]: Department {dept_id} deleted safely (no referencing children).")
        return True

    def delete_department_cascade(self, dept_id):
        """Simulate ON DELETE CASCADE rule"""
        print(f"\n[PARENT DELETE ATTEMPT - ON DELETE CASCADE] DeptId={dept_id}")
        if dept_id in self.departments:
            del self.departments[dept_id]
            # Cascade delete child records
            before_count = len(self.employees)
            self.employees = [e for e in self.employees if e["DeptId"] != dept_id]
            after_count = len(self.employees)
            print(f"  [CASCADE SUCCESS]: Department {dept_id} deleted.")
            print(f"  Automatically deleted {before_count - after_count} referencing child employee records.")

if __name__ == "__main__":
    sim = ReferentialIntegritySimulator()
    print("=" * 65)
    print("  CBSE CS 083: FOREIGN KEY & REFERENTIAL INTEGRITY SIMULATOR")
    print("=" * 65)
    
    # 1. Valid insertion with existing parent DeptId
    sim.insert_employee(105, "Tanya Bose", 30)
    
    # 2. Invalid insertion with non-existent parent DeptId (Blocked!)
    sim.insert_employee(106, "Invalid Dept", 99)
    
    # 3. Attempt to delete department 10 under RESTRICT (Blocked!)
    sim.delete_department_restrict(10)
    
    # 4. Delete department 20 under CASCADE (Child employee 102 automatically deleted)
    sim.delete_department_cascade(20)
    print("=" * 65)
