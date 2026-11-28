"""
CBSE Class 12 Computer Science (083)
Topic 4: Domain & Atomicity Validator Engine
Demonstrates:
1. Validating attribute values against defined Domain sets and ranges
2. Detecting non-atomic cells (comma-separated lists, composite records)
3. Decomposing composite attributes into atomic columns (1NF transformation)
"""

class DomainAtomicityValidator:
    def __init__(self):
        # Defined domains
        self.domains = {
            "RollNo": lambda x: isinstance(x, int) and x > 0,
            "Gender": lambda x: x in {"M", "F", "O"},
            "Marks": lambda x: isinstance(x, (int, float)) and 0 <= x <= 100
        }

    def validate_cell(self, attr_name, value):
        """Check if a cell value conforms to its domain and is atomic"""
        # Atomicity check
        if isinstance(value, (list, tuple, dict, set)):
            return False, f"NON-ATOMIC: Value is a compound structure: {value}"
            
        if isinstance(value, str) and ("," in value or ";" in value):
            return False, f"NON-ATOMIC: Value contains comma/semicolon list: '{value}'"
            
        # Domain check
        validator = self.domains.get(attr_name)
        if validator and not validator(value):
            return False, f"DOMAIN VIOLATION: Value '{value}' is outside legal domain for {attr_name}"
            
        return True, "VALID & ATOMIC"

    def demonstrate_1nf_decomposition(self, composite_record):
        """Transform a composite address into atomic 1NF columns"""
        print("\n[BEFORE - Non-Atomic Record]:")
        print(f"  Student: {composite_record['Name']}")
        print(f"  Address (Composite): '{composite_record['Address']}'")
        
        # Decompose
        parts = [p.strip() for p in composite_record["Address"].split(",")]
        decomposed = {
            "StudentId": composite_record["StudentId"],
            "Name": composite_record["Name"],
            "Street": parts[0] if len(parts) > 0 else "",
            "City": parts[1] if len(parts) > 1 else "",
            "Pincode": parts[2] if len(parts) > 2 else ""
        }
        
        print("\n[AFTER - 1NF Decomposed Atomic Columns]:")
        for col, val in decomposed.items():
            print(f"  * {col:<12}: {val}")

if __name__ == "__main__":
    engine = DomainAtomicityValidator()
    print("=" * 65)
    print("  CBSE CS 083: DOMAIN & ATOMICITY VALIDATION ENGINE")
    print("=" * 65)
    
    test_cases = [
        ("RollNo", 105),
        ("RollNo", -5),                        # Negative roll
        ("Gender", "M"),
        ("Gender", "Male"),                     # Outside {'M', 'F', 'O'}
        ("Marks", 92.5),
        ("Marks", 150),                        # Outside [0, 100]
        ("Phone", "9830012345, 9830067890")   # Multi-valued non-atomic
    ]
    
    for attr, val in test_cases:
        valid, msg = engine.validate_cell(attr, val)
        status = "[PASS]" if valid else "[FAIL]"
        print(f"{status} {attr:<10} = {str(val):<30} -> {msg}")
        
    print("-" * 65)
    # Composite address decomposition
    raw_student = {
        "StudentId": 201,
        "Name": "Ritwik Sen",
        "Address": "12 Park Circus, Kolkata, 700017"
    }
    engine.demonstrate_1nf_decomposition(raw_student)
    print("=" * 65)
