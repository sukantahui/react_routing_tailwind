# ====================================================================
# Topic 7: Iterating Through Sets
# File: enumerate_and_unpacking.py
# Description: Using enumerate() and tuple unpacking during set iteration
# ====================================================================

# 1. Using enumerate() on a set
topics = {"Functions", "Lists", "Tuples", "Dictionaries", "Sets"}

print("--- Iterating with enumerate() ---")
for index, topic in enumerate(topics, start=1):
    print(f"Step {index}: Mastered {topic}")

# 2. Iterating over sets of tuples with tuple unpacking
student_records = {
    ("Susmita Roy", "Python Pro", 4500),
    ("Debangshu Mukherjee", "Data Science", 6500),
    ("Mamata Banerjee", "Python Pro", 4500),
    ("Abhronila Das", "Web Development", 5000),
}

print("\n--- Unpacking Structured Tuples in Set ---")
total_fee_collected = 0
for name, course, fee in student_records:
    print(f"Student: {name:20} | Course: {course:16} | Fee: ₹{fee}")
    total_fee_collected += fee

print(f"\nTotal Batch Collection in Indian Rupees: ₹{total_fee_collected}")
