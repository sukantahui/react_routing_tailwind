"""
CBSE Class 12 Computer Science - CSV File Handling
Topic 5: Reading CSV Files with csv.reader() and Traversing Rows
Author: Sukanta Hui, Coder & AccoTax
"""

import csv

def create_sample_csv(filename):
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["EmpID", "EmpName", "Department", "Salary"])
        writer.writerow(["E101", "Debashis Roy", "IT", 65000])
        writer.writerow(["E102", "Priya Nair", "HR", 58000])
        writer.writerow(["E103", "Sameer Khan", "Finance", 72000])
        writer.writerow(["E104", "Ritu Sen", "IT", 69000])

def read_and_traverse_csv(filename):
    print(f"--- READING '{filename}' WITH csv.reader() ---\n")
    
    with open(filename, "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        
        # 1. Skip and inspect header row
        header = next(reader)
        print(f"Header Columns: {header}")
        print("-" * 50)
        
        # 2. Iterate through data rows
        row_count = 0
        for row in reader:
            if not row:  # Safety guard against empty lines
                continue
            row_count += 1
            emp_id = row[0]
            name = row[1]
            dept = row[2]
            sal = float(row[3])  # Convert string to float
            print(f"Record {row_count}: ID={emp_id} | Name={name:<15} | Dept={dept:<8} | Salary=Rs.{sal:,.2f}")
            
        print("-" * 50)
        print(f"Total data records processed: {row_count}")

if __name__ == "__main__":
    test_file = "company_employees.csv"
    create_sample_csv(test_file)
    read_and_traverse_csv(test_file)