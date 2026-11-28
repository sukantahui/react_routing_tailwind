"""
CBSE Class XII Computer Science (Code 083)
Topic 11: Diagnostic Skill Challenge Lab (Binary CRUD Operations)
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

import pickle
import os

def challenge_binary_operations():
    db = "challenge_quiz_db.dat"
    if os.path.exists(db): os.remove(db)
    
    # 1. Add records
    students = [
        {"roll": 101, "name": "Mamata", "marks": 96.0},
        {"roll": 102, "name": "Susmita", "marks": 95.0},
        {"roll": 103, "name": "Mahima", "marks": 94.0}
    ]
    with open(db, "wb") as f:
        for s in students: pickle.dump(s, f)
        
    # 2. Count records via EOFError
    count = 0
    with open(db, "rb") as f:
        try:
            while True:
                pickle.load(f)
                count += 1
        except EOFError:
            pass
            
    print(f"Total Challenge Records Verified: {count}")
    if os.path.exists(db): os.remove(db)

if __name__ == "__main__":
    challenge_binary_operations()
