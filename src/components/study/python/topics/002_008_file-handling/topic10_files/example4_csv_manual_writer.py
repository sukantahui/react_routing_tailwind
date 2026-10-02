"""
Topic 10 - Example 4: Building Structured Tabular & CSV Reports using write()
Module: 002_008_file-handling
Institute: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui

Key Concepts Covered:
1. Writing delimiter-separated files (CSV format) directly using write().
2. Writing formatted text report cards with column alignment and summary totals.
3. Calculating running totals, averages, and highest scores during file generation.
4. Escaping strings containing commas or special characters.
"""

def generate_csv_and_text_report():
    csv_file = "student_performance_2026.csv"
    report_file = "student_report_card.txt"
    
    data = [
        {"id": 101, "name": "Mamata", "center": "Barrackpore", "theory": 95, "practical": 98},
        {"id": 102, "name": "Debangshu", "center": "Jadavpur", "theory": 92, "practical": 94},
        {"id": 103, "name": "Susmita", "center": "Kolkata", "theory": 88, "practical": 96},
        {"id": 104, "name": "Mahima", "center": "Ichapur", "theory": 96, "practical": 95},
        {"id": 105, "name": "Abhronila", "center": "Barrackpore", "theory": 90, "practical": 92}
    ]
    
    # 1. Generating Raw CSV File
    print(f"[*] Generating Comma-Separated Values (CSV) to '{csv_file}'...")
    with open(csv_file, mode="w", encoding="utf-8") as f_csv:
        # Write CSV Header
        f_csv.write("StudentID,StudentName,Center,TheoryMarks,PracticalMarks,TotalMarks,Percentage\n")
        
        for student in data:
            total = student["theory"] + student["practical"]
            percentage = total / 2.0
            # Comma-separated row
            row = f"{student['id']},{student['name']},{student['center']},{student['theory']},{student['practical']},{total},{percentage:.1f}%\n"
            f_csv.write(row)
            
    print(f"[✓] CSV exported successfully!")
    
    # 2. Generating Formatted Text Report Card
    print(f"\n[*] Generating Formatted Text Report Card to '{report_file}'...")
    with open(report_file, mode="w", encoding="utf-8") as f_txt:
        f_txt.write("+" + "-"*76 + "+\n")
        f_txt.write(f"|{'CODER & ACCOTAX - ANNUAL PYTHON EXAMINATION REPORT CARD':^76}|\n")
        f_txt.write(f"|{'Center: Barrackpore & Kolkata Regional Hubs':^76}|\n")
        f_txt.write("+" + "-"*76 + "+\n")
        f_txt.write(f"| {'ID':<4} | {'Name':<12} | {'Center':<12} | {'Theory':<8} | {'Practical':<9} | {'Total':<6} | {'%':<6} |\n")
        f_txt.write("+" + "-"*76 + "+\n")
        
        grand_total = 0
        total_students = len(data)
        
        for student in data:
            total = student["theory"] + student["practical"]
            pct = total / 2.0
            grand_total += total
            f_txt.write(f"| {student['id']:<4} | {student['name']:<12} | {student['center']:<12} | {student['theory']:>8} | {student['practical']:>9} | {total:>6} | {pct:>5.1f}% |\n")
            
        f_txt.write("+" + "-"*76 + "+\n")
        batch_avg = grand_total / (total_students * 2.0)
        f_txt.write(f"| {'BATCH SUMMARY: Total Students: ' + str(total_students):<46} | {'Avg %: ' + f'{batch_avg:.2f}%':>27} |\n")
        f_txt.write("+" + "-"*76 + "+\n")
        
    print(f"[✓] Text Report Card generated!")
    
    # Verification
    print("\n--- Displaying Formatted Report Card ---")
    with open(report_file, mode="r", encoding="utf-8") as f:
        print(f.read())

if __name__ == "__main__":
    generate_csv_and_text_report()
