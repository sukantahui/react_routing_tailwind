# ====================================================================
# Topic 2: Unique Nature of Sets
# File: custom_class_hashing.py
# Description: Controlling uniqueness in custom Python classes (__eq__ and __hash__)
# ====================================================================

class StudentRecord:
    def __init__(self, roll_no: int, name: str, branch: str):
        self.roll_no = roll_no
        self.name = name
        self.branch = branch

    def __eq__(self, other):
        # Two student records are equal if their roll_no matches
        if isinstance(other, StudentRecord):
            return self.roll_no == other.roll_no
        return False

    def __hash__(self):
        # Hash code based on the unique roll_no
        return hash(self.roll_no)

    def __repr__(self):
        return f"StudentRecord(Roll={self.roll_no}, Name='{self.name}', Branch='{self.branch}')"


# Creating records (including duplicate roll numbers with slightly different names)
student_a = StudentRecord(101, "Susmita Roy", "Barrackpore")
student_b = StudentRecord(102, "Debangshu Mukherjee", "Kolkata")
student_c = StudentRecord(101, "Susmita R. (Duplicate Entry)", "Barrackpore")

# Populating into a set
student_registry = {student_a, student_b, student_c}

print(f"Total entries submitted: 3")
print(f"Unique records stored in set: {len(student_registry)}")
for student in student_registry:
    print(" ->", student)
