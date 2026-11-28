"""
CBSE Class 12 Computer Science - CSV File Handling
Topic 7: Mathematical Aggregations (Sum, Avg, Max, Min) on CSV Data
Author: Sukanta Hui, Coder & AccoTax
"""

import csv

def generate_sales_data(filename):
    data = [
        ["InvoiceNo", "Salesperson", "Region", "SaleAmount"],
        ["INV1001", "Aarav Sharma", "East", 45000.0],
        ["INV1002", "Diya Sen", "East", 62000.0],
        ["INV1003", "Rohan Roy", "North", 38000.0],
        ["INV1004", "Pooja Verma", "South", 71000.0],
        ["INV1005", "Tanmay Sen", "East", 89000.0],
        ["INV1006", "Kavita Nair", "West", 54000.0]
    ]
    with open(filename, "w", newline="", encoding="utf-8") as f:
        csv.writer(f).writerows(data)

def perform_aggregations(filename):
    print(f"--- PERFORMING AGGREGATIONS ON '{filename}' ---\n")
    
    total_sales = 0.0
    count = 0
    highest_sale = -float("inf")
    lowest_sale = float("inf")
    top_salesperson = ""
    min_salesperson = ""
    
    with open(filename, "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        header = next(reader)
        
        for row in reader:
            if not row: continue
            amount = float(row[3])
            person = row[1]
            
            total_sales += amount
            count += 1
            
            if amount > highest_sale:
                highest_sale = amount
                top_salesperson = person
                
            if amount < lowest_sale:
                lowest_sale = amount
                min_salesperson = person
                
    if count > 0:
        avg_sale = total_sales / count
        print(f"Total Transactions  : {count}")
        print(f"Total Sales Revenue : Rs. {total_sales:,.2f}")
        print(f"Average Sale Value  : Rs. {avg_sale:,.2f}")
        print(f"Highest Sale        : Rs. {highest_sale:,.2f} (by {top_salesperson})")
        print(f"Lowest Sale         : Rs. {lowest_sale:,.2f} (by {min_salesperson})")
    else:
        print("No transactions found.")

if __name__ == "__main__":
    sales_file = "company_sales.csv"
    generate_sales_data(sales_file)
    perform_aggregations(sales_file)