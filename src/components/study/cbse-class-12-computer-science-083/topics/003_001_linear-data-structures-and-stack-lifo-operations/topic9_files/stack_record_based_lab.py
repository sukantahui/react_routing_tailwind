"""
CBSE Class 12 Computer Science - Data Structures
Topic 9: Record-Based Stack Implementation ([Roll, Name, Marks])
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax
"""

def PushStudent(stk, rno, name, marks):
    """Pushes a composite student record [Roll, Name, Marks] onto the stack."""
    record = [rno, name, marks]
    stk.append(record)
    print(f"Pushed Record: {record}")

def PopStudent(stk):
    """Pops and unpacks the top composite record safely."""
    if len(stk) == 0:
        print("Underflow: No student records in stack!")
        return None
    record = stk.pop()
    print(f"Popped Student -> Roll: {record[0]} | Name: {record[1]} | Marks: {record[2]}")
    return record

def DisplayStudents(stk):
    """Displays composite records in tabular format from TOP to bottom."""
    if len(stk) == 0:
        print("Stack is empty! No records to display.")
        return
        
    print("\n" + "=" * 45)
    print(f"{'RollNo':<10} {'Student Name':<20} {'Marks':<8}")
    print("=" * 45)
    
    top = len(stk) - 1
    for i in range(top, -1, -1):
        rec = stk[i]
        marker = " <-- TOP" if i == top else ""
        print(f"{rec[0]:<10} {rec[1]:<20} {rec[2]:<8.2f}{marker}")
    print("=" * 45)

def test_record_stack():
    student_stack = []
    
    print("--- 1. PUSHING COMPOSITE RECORDS ---")
    PushStudent(student_stack, 101, "Aarav Sharma", 95.5)
    PushStudent(student_stack, 102, "Pooja Roy", 88.0)
    PushStudent(student_stack, 103, "Tanmay Sen", 92.0)
    
    print("\n--- 2. DISPLAYING TABULAR STACK ---")
    DisplayStudents(student_stack)
    
    print("\n--- 3. POPPING TOP RECORD ---")
    PopStudent(student_stack)
    
    print("\n--- 4. DISPLAYING AFTER POP ---")
    DisplayStudents(student_stack)

if __name__ == "__main__":
    test_record_stack()