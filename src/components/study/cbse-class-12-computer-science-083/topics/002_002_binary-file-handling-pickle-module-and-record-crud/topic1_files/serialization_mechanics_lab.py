"""
CBSE Class XII Computer Science (Code 083)
Topic 1: Serialization and Deserialization Mechanics (dumps / loads)
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

import pickle

def demo_serialization_deserialization():
    print("=" * 65)
    print("DEMONSTRATION: IN-MEMORY SERIALIZATION (dumps) & DESERIALIZATION (loads)")
    print("=" * 65)
    
    # 1. Complex nested Python object
    student_record = {
        "roll_number": 101,
        "name": "Mamata",
        "locality": "Barrackpore",
        "scores": [95, 98, 92],
        "is_enrolled": True
    }
    
    print(f"[*] Original Python Object: {student_record}")
    print(f"[*] Type of original object: {type(student_record)}")
    
    # 2. Serialization (Pickling)
    serialized_bytes = pickle.dumps(student_record)
    print("\n[+] Serialized Byte Stream (Pickled):")
    print(f"    Bytes: {serialized_bytes}")
    print(f"    Total Byte Length: {len(serialized_bytes)} bytes")
    print(f"    Type: {type(serialized_bytes)}")
    
    # 3. Deserialization (Unpickling)
    restored_object = pickle.loads(serialized_bytes)
    print("\n[+] Deserialized Python Object (Unpickled):")
    print(f"    Restored: {restored_object}")
    print(f"    Type: {type(restored_object)}")
    print(f"    Identity check (Same values?): {restored_object == student_record}")
    print(f"    Accessing field 'name': {restored_object['name']}")

if __name__ == "__main__":
    demo_serialization_deserialization()
