"""
CBSE Class 12 Computer Science - CSV File Handling
Topic 4: Custom Delimiters (Pipes, Tabs, Semicolons)
Author: Sukanta Hui, Coder & AccoTax
"""

import csv

def demonstrate_custom_delimiters():
    pipe_file = "products_pipe.csv"
    tab_file = "products_tab.tsv"
    
    products = [
        ["ProdID", "ProdName", "Category", "UnitPrice"],
        ["P101", "Gaming Mouse", "Peripherals", 1499.0],
        ["P102", "Mechanical Keyboard", "Peripherals", 3299.0],
        ["P103", "4K Monitor", "Displays", 24999.0]
    ]
    
    # 1. Writing with Pipe Delimiter ('|')
    print("Writing with Pipe Delimiter ('|')...")
    with open(pipe_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f, delimiter="|")
        writer.writerows(products)
        
    # 2. Writing with Tab Delimiter ('\t')
    print("Writing with Tab Delimiter ('\\t')...")
    with open(tab_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f, delimiter="\t")
        writer.writerows(products)
        
    # 3. Reading back with correct delimiter
    print("\n--- READING PIPE FILE (delimiter='|') ---")
    with open(pipe_file, "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f, delimiter="|")
        for row in reader:
            print(f"Row item count: {len(row)} -> {row}")
            
    # 4. Demonstating Mismatched Delimiter trap!
    print("\n--- TRAP: READING PIPE FILE WITH DEFAULT COMMA DELIMITER ---")
    with open(pipe_file, "r", newline="", encoding="utf-8") as f:
        wrong_reader = csv.reader(f)  # Defaults to comma ','
        for row in wrong_reader:
            print(f"Row item count: {len(row)} (NOT SPLIT!) -> {row}")

if __name__ == "__main__":
    demonstrate_custom_delimiters()