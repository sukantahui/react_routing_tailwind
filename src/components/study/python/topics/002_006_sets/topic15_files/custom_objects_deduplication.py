# ====================================================================
# Topic 15: Removing Duplicates Using Sets
# File: custom_objects_deduplication.py
# Description: Deduplicating custom business class objects via __hash__ and __eq__
# ====================================================================

class StudentRecord:
    def __init__(self, roll_no: str, name: str, fee_paid: int):
        self.roll_no = roll_no
        self.name = name
        self.fee_paid = fee_paid

    # 1. Custom __hash__ based on unique student roll number
    def __hash__(self):
        return hash(self.roll_no)

    # 2. Custom __eq__ confirming roll number identity
    def __eq__(self, other):
        if isinstance(other, StudentRecord):
            return self.roll_no == other.roll_no
        return False

    def __repr__(self):
        return f"Student({self.roll_no}, {self.name}, ₹{self.fee_paid})"


# Raw student registration list with duplicate object instances
raw_students = [
    StudentRecord("ROLL-101", "Susmita Roy", 4500),
    StudentRecord("ROLL-102", "Debangshu Mukherjee", 6500),
    StudentRecord("ROLL-101", "Susmita Roy (Duplicate Entry)", 4500), # Duplicate roll 101
    StudentRecord("ROLL-103", "Mamata Banerjee", 4500),
    StudentRecord("ROLL-102", "Debangshu (Duplicate Retry)", 6500),   # Duplicate roll 102
]

print(f"Total Raw Registrations: {len(raw_students)}")

# Deduplicating custom objects using set()
unique_students_set = set(raw_students)
print(f"Total Unique Verified Students: {len(unique_students_set)}")

for s in unique_students_set:
    print(" ", s)
