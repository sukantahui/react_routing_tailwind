"""
CBSE Class 11 Computer Science (Code: 083)
Unit 2: Computational Thinking and Programming - 1
Topic 10: Standard Console Input: input(), Prompts, and Explicit Type Conversions

This script demonstrates Python's console input mechanics:
1. input() always returns a <str> string
2. Explicit typecasting: int(input()), float(input()), eval(input())
3. Splitting multiple inputs on a single line
4. Handling ValueError exceptions
"""

def simulate_input_conversion(raw_str: str, target_type: str) -> dict:
    """Simulates receiving `raw_str` from input() and casting to `target_type`."""
    try:
        if target_type == "str":
            converted = str(raw_str)
            typ_name = "<class 'str'>"
        elif target_type == "int":
            converted = int(raw_str)
            typ_name = "<class 'int'>"
        elif target_type == "float":
            converted = float(raw_str)
            typ_name = "<class 'float'>"
        elif target_type == "eval":
            converted = eval(raw_str)
            typ_name = str(type(converted))
        elif target_type == "split_ints":
            converted = [int(x) for x in raw_str.split()]
            typ_name = "<class 'list of ints'>"
        else:
            raise ValueError(f"Unsupported target type '{target_type}'")
            
        return {
            "success": True,
            "raw_input": raw_str,
            "target_type": target_type,
            "converted_value": repr(converted),
            "resulting_type": typ_name,
            "note": "Typecast succeeded without errors."
        }
    except ValueError as e:
        return {
            "success": False,
            "raw_input": raw_str,
            "target_type": target_type,
            "error_name": "ValueError",
            "message": str(e),
            "note": f"Cannot parse '{raw_str}' as a valid {target_type}."
        }
    except Exception as e:
        return {
            "success": False,
            "raw_input": raw_str,
            "error_name": type(e).__name__,
            "message": str(e)
        }


if __name__ == "__main__":
    print("=== CONSOLE INPUT SIMULATION & TYPECASTING ===")
    test_cases = [
        ("42", "int"),
        ("98.6", "float"),
        ("hello", "int"),       # Triggers ValueError
        ("10 20 30", "split_ints"),
        ("[1, 2, 3]", "eval")
    ]
    for raw, tgt in test_cases:
        res = simulate_input_conversion(raw, tgt)
        status = "SUCCESS" if res["success"] else "FAILED"
        print(f"\nInput: {repr(raw):<12} -> Cast to {tgt:<10} [{status}]")
        if res["success"]:
            print(f"  Result: {res['converted_value']} ({res['resulting_type']})")
        else:
            print(f"  Error: {res['error_name']} - {res['message']}")
