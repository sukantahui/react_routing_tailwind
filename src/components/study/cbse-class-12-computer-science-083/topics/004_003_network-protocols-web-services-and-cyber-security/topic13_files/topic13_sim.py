"""
CBSE Class 12 CS Module 3: Diagnostic Assessment Tester
Validates user answers against answer key and provides detailed feedback
"""
def grade_assessment(answers, key):
    score = sum(1 for q, ans in answers.items() if key.get(q) == ans)
    total = len(key)
    pct = (score / total) * 100
    return score, total, pct

if __name__ == "__main__":
    print("Module 3 Diagnostic Engine Initialized.")
