"""
CBSE Class 11 Computer Science (Code: 083)
Unit 2: Computational Thinking and Programming - 1
Topic 9: Comments and Docstrings in Python

This script demonstrates single-line comments (#), multiline block comments,
docstring definitions (PEP 257), and programmatic inspection via `.__doc__`.
"""

def calculate_simple_interest(principal: float, rate: float, time_years: float) -> float:
    """
    Computes simple interest given principal, annual interest rate, and time in years.
    
    Parameters:
        principal (float): Principal invested amount in INR
        rate (float): Annual interest percentage (e.g. 7.5 for 7.5%)
        time_years (float): Investment duration in years
        
    Returns:
        float: Calculated simple interest rounded to 2 decimal places
    """
    # Formula: SI = (P * R * T) / 100
    si = (principal * rate * time_years) / 100.0  # Inline calculation comment
    return round(si, 2)


def inspect_docstring_metadata() -> dict:
    """Extracts docstring documentation programmatically from function object."""
    doc_text = calculate_simple_interest.__doc__
    return {
        "function_name": calculate_simple_interest.__name__,
        "has_docstring": doc_text is not None,
        "docstring_content": doc_text.strip() if doc_text else "",
        "doc_length": len(doc_text) if doc_text else 0
    }


if __name__ == "__main__":
    print("=== DOCSTRING INTROSPECTION DEMO ===")
    meta = inspect_docstring_metadata()
    print(f"Function: {meta['function_name']}()")
    print(f"Docstring Present: {meta['has_docstring']}")
    print("\nExtracted Docstring Content:\n" + "-"*40)
    print(meta["docstring_content"])
    print("-"*40)
    
    # Test calculation
    interest = calculate_simple_interest(10000, 8.5, 2)
    print(f"Sample Calculation Result: ₹{interest}")
