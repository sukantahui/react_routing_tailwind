"""
CBSE Class 11 Computer Science (Code: 083)
Unit 2: Computational Thinking and Programming - 1
Topic 1: Python Character Set: Letters, Digits, Special Symbols, Whitespace, and Unicode

This script inspects and classifies any input character or text string into
statutory Python character set categories: Letters (A-Z, a-z), Digits (0-9),
Special Symbols, Whitespaces, and Extended Unicode Code Points.
"""

import unicodedata

def classify_character_set(text: str) -> dict:
    """Classifies every character in `text` into Python Character Set categories."""
    classification = {
        "letters": [],
        "digits": [],
        "special_symbols": [],
        "whitespace": [],
        "other_unicode": []
    }
    
    char_analysis = []
    
    for ch in text:
        code_point = ord(ch)
        char_name = unicodedata.name(ch, "UNKNOWN")
        
        if ch.isalpha() and ord(ch) < 128:
            cat = "ASCII Letter (A-Z / a-z)"
            classification["letters"].append(ch)
        elif ch.isdigit() and ord(ch) < 128:
            cat = "ASCII Decimal Digit (0-9)"
            classification["digits"].append(ch)
        elif ch in " \t\n\r\v\f":
            cat = f"Whitespace ({repr(ch)})"
            classification["whitespace"].append(repr(ch))
        elif ord(ch) < 128:
            cat = "ASCII Special Symbol / Operator / Delimiter"
            classification["special_symbols"].append(ch)
        else:
            cat = f"Extended Unicode Character ({unicodedata.category(ch)})"
            classification["other_unicode"].append(ch)
            
        char_analysis.append({
            "character": ch,
            "category": cat,
            "unicode_code_point": f"U+{code_point:04X}",
            "ascii_val": code_point if code_point < 128 else "Non-ASCII",
            "unicode_name": char_name
        })
        
    return {
        "raw_text": text,
        "total_characters": len(text),
        "summary": {k: len(v) for k, v in classification.items()},
        "details": char_analysis
    }


if __name__ == "__main__":
    sample = "Total_Marks = 98.5 # সুপ্রভাত! \n"
    res = classify_character_set(sample)
    print("=== PYTHON CHARACTER SET AUDIT ===")
    print(f"Analyzing: {repr(sample)}")
    print("Category Breakdown:", res["summary"])
    print("\nDetailed Per-Character Inspection:")
    for item in res["details"]:
        print(f"Char: {repr(item['character']):<6} | Type: {item['category']:<35} | {item['unicode_code_point']} ({item['unicode_name']})")
