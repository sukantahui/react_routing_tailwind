"""
CBSE Class 11 Computer Science (Code: 083)
Unit 2: Computational Thinking and Programming - 1
Topic 8: Dynamic Typing in Python: Variable Rebinding across Data Types

This script demonstrates:
1. Dynamic Typing vs Static Typing
2. Variable rebinding across int, float, str, and list
3. Type introspection with type() and isinstance()
"""

def demonstrate_dynamic_rebinding() -> list:
    """Tracks a single variable identifier 'data' as it morphs across 4 distinct data types."""
    timeline = []
    
    # Stage 1: Integer Binding
    data = 42
    timeline.append({
        "stage": 1,
        "value": repr(data),
        "type": str(type(data)),
        "id": id(data),
        "explanation": "Identifier 'data' is bound to an <int> object in heap memory."
    })
    
    # Stage 2: Float Rebinding
    data = 98.75
    timeline.append({
        "stage": 2,
        "value": repr(data),
        "type": str(type(data)),
        "id": id(data),
        "explanation": "Identifier 'data' is rebound to a new <float> object at a new memory address."
    })
    
    # Stage 3: String Rebinding
    data = "Python 3.12"
    timeline.append({
        "stage": 3,
        "value": repr(data),
        "type": str(type(data)),
        "id": id(data),
        "explanation": "Identifier 'data' is rebound to a <str> object."
    })
    
    # Stage 4: List Rebinding
    data = [10, 20, 30]
    timeline.append({
        "stage": 4,
        "value": repr(data),
        "type": str(type(data)),
        "id": id(data),
        "explanation": "Identifier 'data' is rebound to a mutable <list> object."
    })
    
    return timeline


def inspect_type_compatibility(var_val: any, expected_type: type) -> dict:
    """Performs type introspection using type() and isinstance()."""
    return {
        "value": repr(var_val),
        "actual_type": str(type(var_val)),
        "expected_type": str(expected_type),
        "is_instance_match": isinstance(var_val, expected_type)
    }


if __name__ == "__main__":
    print("=== DYNAMIC TYPING REBINDING TIMELINE ===")
    history = demonstrate_dynamic_rebinding()
    for step in history:
        print(f"\nStage {step['stage']}: value={step['value']:<15} | Type: {step['type']:<20} | ID: {step['id']}")
        print(f"  Note: {step['explanation']}")
