"""
CBSE Class 12 Computer Science - CSV File Handling
Topic 10: Diagnostic Assessment Solution Lab
Author: Sukanta Hui, Coder & AccoTax
"""

import csv

def verify_all_csv_features():
    print("--- CBSE CLASS 12 CS: CSV SKILL BENCHMARK ---")
    test_file = "diagnostic_test.csv"
    
    # 1. Write with newline='' and custom pipe delimiter
    with open(test_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f, delimiter="|")
        writer.writerow(["ID", "CandidateName", "Score", "Result"])
        writer.writerows([
            ["C101", "Aarav Sharma", 95.0, "PASS"],
            ["C102", "Pooja Roy", 89.5, "PASS"],
            ["C103", "Tanmay Sen", 92.0, "PASS"]
        ])
    print("1. File creation & writerows() verified.")
    
    # 2. Read back and perform aggregations
    with open(test_file, "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f, delimiter="|")
        header = next(reader)
        total = 0.0
        count = 0
        for row in reader:
            if not row: continue
            total += float(row[2])
            count += 1
            
        print(f"2. Read verified: {count} candidates with average score {total/count:.2f}")

if __name__ == "__main__":
    verify_all_csv_features()