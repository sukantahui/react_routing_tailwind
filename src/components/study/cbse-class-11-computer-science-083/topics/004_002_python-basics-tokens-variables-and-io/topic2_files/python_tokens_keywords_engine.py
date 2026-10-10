"""
CBSE Class 11 Computer Science (Code: 083)
Unit 2: Computational Thinking and Programming - 1
Topic 2: Python Lexical Tokens: Keywords (35 reserved words) and Identifiers

This script demonstrates Python's 5 lexical token categories, audits all 35
standard keywords, and validates candidate variable identifiers against PEP 8 rules.
"""

import keyword
import tokenize
import io

def audit_all_python_keywords() -> dict:
    """Returns all reserved keywords in Python 3.12+ categorized by purpose."""
    all_kw = sorted(keyword.kwlist)
    categories = {
        "Boolean / Special Literals": ["False", "None", "True"],
        "Logical Operators": ["and", "or", "not"],
        "Conditionals & Branching": ["if", "elif", "else"],
        "Loops & Iteration": ["for", "while", "break", "continue"],
        "Functions & Definitions": ["def", "lambda", "return", "yield"],
        "Classes & OOP": ["class"],
        "Exception Handling": ["try", "except", "finally", "raise", "assert"],
        "Namespace & Scope": ["global", "nonlocal", "import", "from", "as", "del"],
        "Context Managers & Async": ["with", "async", "await", "pass"]
    }
    return {
        "total_count": len(all_kw),
        "keywords_list": all_kw,
        "categories": categories
    }


def validate_identifier(name: str) -> dict:
    """Audits a candidate identifier against official Python lexical rules."""
    if not name or name.strip() == "":
        return {"valid": False, "reason": "Identifier name cannot be empty."}
        
    if keyword.iskeyword(name):
        return {
            "valid": False,
            "name": name,
            "reason": f"'{name}' is a reserved Python KEYWORD and cannot be used as an identifier."
        }
        
    if name[0].isdigit():
        return {
            "valid": False,
            "name": name,
            "reason": "Rule Violation: Identifiers CANNOT begin with a numeric digit (0-9)."
        }
        
    # Check legal characters: letters, digits, underscore
    for ch in name:
        if not (ch.isalnum() or ch == "_"):
            return {
                "valid": False,
                "name": name,
                "reason": f"Rule Violation: Character '{ch}' is illegal. Only letters (a-z, A-Z), digits (0-9), and underscore (_) are allowed."
            }
            
    return {
        "valid": True,
        "name": name,
        "reason": f"'{name}' satisfies all Python identifier naming conventions!"
    }


def tokenize_sample_statement(code_str: str) -> list:
    """Tokenizes a Python statement into lexical tokens."""
    tokens_found = []
    try:
        tokens = tokenize.tokenize(io.BytesIO(code_str.encode("utf-8")).readline)
        for tok in tokens:
            tok_name = tokenize.tok_name[tok.type]
            if tok_name not in ["ENCODING", "ENDMARKER", "NEWLINE"]:
                tokens_found.append({
                    "token_type": tok_name,
                    "string": tok.string,
                    "start": tok.start,
                    "end": tok.end
                })
    except Exception as e:
        tokens_found.append({"error": str(e)})
    return tokens_found


if __name__ == "__main__":
    kw_info = audit_all_python_keywords()
    print(f"=== PYTHON KEYWORDS AUDIT (Total: {kw_info['total_count']}) ===")
    for cat, words in kw_info["categories"].items():
        print(f"[{cat}]: {', '.join(words)}")
        
    print("\n=== IDENTIFIER VALIDATION EXAMPLES ===")
    test_cases = ["student_name", "2nd_rank", "total$marks", "def", "_count", "True", "False", "class_11"]
    for t in test_cases:
        res = validate_identifier(t)
        status = "VALID" if res["valid"] else "INVALID"
        print(f"'{t}': {status} -> {res['reason']}")
        
    print("\n=== TOKENIZER DEMO: 'total = 50 + score' ===")
    statement = "total = 50 + score"
    toks = tokenize_sample_statement(statement)
    for tok in toks:
        print(f"Token: {tok['string']:<10} | Type: {tok['token_type']}")
