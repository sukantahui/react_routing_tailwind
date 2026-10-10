"""
CBSE Class 11 Computer Science (Code: 083)
Unit 2: Computational Thinking and Programming - 1
Topic 4: Python Punctuators and Delimiters: (), [], {}, @, comma, colon, dot, =, semicolon

This script demonstrates Python's syntactic punctuators and delimiters,
their specific roles in code structure, and token parsing.
"""

def audit_python_punctuators() -> dict:
    """Returns classification of Python punctuators and delimiters with code examples."""
    punctuators = {
        "Parentheses `( )`": {
            "uses": ["Tuple creation `(1, 2)`", "Function call `print()`", "Mathematical expression grouping `(a + b) * c`", "Generator expressions"],
            "example": "result = (10 + 5) * 2"
        },
        "Square Brackets `[ ]`": {
            "uses": ["List creation `[10, 20]`", "Sequence indexing `arr[0]`", "Sequence slicing `arr[1:4]`", "List comprehensions"],
            "example": "items = [1, 2, 3]; val = items[0]"
        },
        "Curly Braces `{ }`": {
            "uses": ["Dictionary creation `{'a': 1}`", "Set creation `{1, 2, 3}`", "f-string variable interpolation `f'{name}'`"],
            "example": "data = {'name': 'Mamata', 'score': 98}"
        },
        "Colon `:`": {
            "uses": ["Suite/code block starter (after if, for, while, def, class)", "Slice notation `seq[start:stop:step]`", "Dictionary key-value separator `key: value`"],
            "example": "if score >= 90:\n    print('Grade A')"
        },
        "Comma `,`": {
            "uses": ["Separating arguments in function calls", "Separating elements in lists/tuples", "Multiple assignment `a, b = 10, 20`"],
            "example": "x, y, z = 1, 2, 3"
        },
        "Dot / Period `.`": {
            "uses": ["Attribute and method access `obj.method()`", "Module member access `math.sqrt()`", "Decimal point in floats `3.14`"],
            "example": "import math\nres = math.sqrt(16)"
        },
        "At Symbol `@`": {
            "uses": ["Decorator declaration before functions/classes `@staticmethod`", "Matrix multiplication operator (PEP 465)"],
            "example": "@property\ndef score(self): return self._score"
        },
        "Semicolon `;`": {
            "uses": ["Statement separator on a single line (optional/discouraged in PEP 8)"],
            "example": "a = 10; b = 20; print(a + b)"
        }
    }
    return punctuators


if __name__ == "__main__":
    print("=== PYTHON PUNCTUATORS & DELIMITERS AUDIT ===")
    punc_data = audit_python_punctuators()
    for symbol, info in punc_data.items():
        print(f"\n{symbol}:")
        for u in info["uses"]:
            print(f"  • {u}")
        print(f"  Code: {info['example']}")
