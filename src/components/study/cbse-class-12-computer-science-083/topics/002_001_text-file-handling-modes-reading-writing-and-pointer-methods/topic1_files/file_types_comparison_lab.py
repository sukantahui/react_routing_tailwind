"""
CBSE Class XII Computer Science (Code 083)
Topic 1: File Types Demonstration - Text, Binary (.dat), and CSV
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

import pickle
import csv
import os

def demo_text_file():
    print("--- 1. TEXT FILE HANDLING ---")
    filename = "sample_text.txt"
    with open(filename, "w", encoding="utf-8") as f:
        f.write("CBSE Class 12 Computer Science\n")
        f.write("Educator: Sukanta Hui\n")
        f.write("Locality: Barrackpore, WB\n")
    print(f"[+] Text file written: {filename}")
    with open(filename, "r", encoding="utf-8") as f:
        print("[Content Preview]:\n" + f.read())

def demo_binary_file():
    print("--- 2. BINARY FILE HANDLING (PICKLE) ---")
    filename = "sample_binary.dat"
    student_records = [
        {"roll": 1, "name": "Mamata", "marks": 96},
        {"roll": 2, "name": "Susmita", "marks": 94}
    ]
    with open(filename, "wb") as f:
        pickle.dump(student_records, f)
    print(f"[+] Binary file serialized via pickle: {filename}")
    with open(filename, "rb") as f:
        loaded = pickle.load(f)
        print(f"[Deserialized Python Objects]: {loaded}\n")

def demo_csv_file():
    print("--- 3. CSV FILE HANDLING ---")
    filename = "sample_tabular.csv"
    headers = ["RollNo", "StudentName", "Subject", "Score"]
    rows = [
        [101, "Mahima", "Computer Science", 98],
        [102, "Abhronila", "Computer Science", 95]
    ]
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        writer.writerows(rows)
    print(f"[+] CSV file written with newline='': {filename}")
    with open(filename, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        for row in reader:
            print("  CSV Row:", row)

if __name__ == "__main__":
    demo_text_file()
    demo_binary_file()
    demo_csv_file()
