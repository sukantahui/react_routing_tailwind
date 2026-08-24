# topic6_files/log_exporter_and_report_builder.py
# Module: 002_007_string-processing
# Topic: Joining Lists of Strings with join()
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 6 - File 4: Production Report Builder & Multi-Format Exporter with join()
Demonstrates:
  1. Generating clean RFC-compliant CSV tables using comma.join()
  2. Formatting GitHub-Flavored Markdown tables using pipe.join()
  3. Generating bulk SQL INSERT statement batches
  4. Building semantic HTML summary lists with join()
  5. Building clean JSON string arrays
"""

from typing import List, Dict, Any

# Sample student batch dataset from Coder & AccoTax Barrackpore
STUDENT_DATASET = [
    {"id": 101, "name": "Susmita Mukherjee", "course": "Python Pro", "city": "Barrackpore", "marks": 96.5, "status": "PASSED"},
    {"id": 102, "name": "Rahul Roy Chowdhury", "course": "Data Analytics", "city": "Kolkata", "marks": 88.0, "status": "PASSED"},
    {"id": 103, "name": "Anirban Banerjee", "course": "Python Core", "city": "Palta", "marks": 91.5, "status": "PASSED"},
    {"id": 104, "name": "Priya Das", "course": "Web Dev React", "city": "Barrackpore", "marks": 84.0, "status": "PASSED"},
    {"id": 105, "name": "Debojyoti Sen Gupta", "course": "Python Core", "city": "Sodepur", "marks": 94.0, "status": "PASSED"}
]

class ReportBuilder:
    """Industrial multi-format text & document exporter utilizing str.join()."""

    @staticmethod
    def build_csv(records: List[Dict[str, Any]]) -> str:
        """Generates standard CSV output."""
        headers = ["ID", "Name", "Course", "City", "Marks", "Status"]
        rows = [",".join(headers)]
        
        for r in records:
            row_vals = [str(r["id"]), f'"{r["name"]}"', f'"{r["course"]}"', r["city"], f"{r['marks']:.1f}", r["status"]]
            rows.append(",".join(row_vals))
            
        return "\n".join(rows)

    @staticmethod
    def build_markdown_table(records: List[Dict[str, Any]]) -> str:
        """Generates GitHub-Flavored Markdown table."""
        headers = ["ID", "Student Name", "Course", "Center", "Marks", "Result"]
        header_row = f"| {' | '.join(headers)} |"
        separator_row = f"| {' | '.join(['---'] * len(headers))} |"
        
        data_rows = []
        for r in records:
            row = f"| {r['id']:<3} | {r['name']:<20} | {r['course']:<15} | {r['city']:<11} | {r['marks']:>5.1f} | {r['status']:<6} |"
            data_rows.append(row)

        table_lines = [header_row, separator_row] + data_rows
        return "\n".join(table_lines)

    @staticmethod
    def build_sql_batch_insert(table_name: str, records: List[Dict[str, Any]]) -> str:
        """Constructs an optimized bulk SQL INSERT statement."""
        columns = " (id, student_name, course_name, branch_city, final_marks, exam_status)"
        
        value_tuples = []
        for r in records:
            tup = f"({r['id']}, '{r['name']}', '{r['course']}', '{r['city']}', {r['marks']:.1f}, '{r['status']}')"
            value_tuples.append(tup)
            
        values_clause = ",\n  ".join(value_tuples)
        return f"INSERT INTO {table_name}{columns} VALUES\n  {values_clause};"

    @staticmethod
    def build_html_bullet_list(records: List[Dict[str, Any]]) -> str:
        """Constructs semantic HTML list."""
        items = [f"  <li><strong>{r['name']}</strong> ({r['city']}) - {r['course']} : <em>{r['marks']}%</em></li>" for r in records]
        return "<ul>\n" + "\n".join(items) + "\n</ul>"


def run_exporter_demo():
    print("=" * 75)
    print("CODER & ACCOTAX - PRODUCTION MULTI-FORMAT EXPORTER WITH join()")
    print("=" * 75)

    print("\n--- 1. GENERATING CSV EXPORT ---")
    print(ReportBuilder.build_csv(STUDENT_DATASET))

    print("\n--- 2. GENERATING MARKDOWN TABLE ---")
    print(ReportBuilder.build_markdown_table(STUDENT_DATASET))

    print("\n--- 3. GENERATING BULK SQL INSERT QUERY ---")
    print(ReportBuilder.build_sql_batch_insert("student_assessments", STUDENT_DATASET))

    print("\n--- 4. GENERATING SEMANTIC HTML LIST ---")
    print(ReportBuilder.build_html_bullet_list(STUDENT_DATASET))


if __name__ == "__main__":
    run_exporter_demo()
