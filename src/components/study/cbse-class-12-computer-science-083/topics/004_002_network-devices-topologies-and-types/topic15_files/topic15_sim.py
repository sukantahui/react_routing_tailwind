"""
CBSE Class 12 CS Module 2: Diagnostic Assessment Tester
Validates user answers against answer key and provides detailed feedback
"""
def grade_assessment(answers, key):
    score = sum(1 for q, ans in answers.items() if key.get(q) == ans)
    total = len(key)
    pct = (score / total) * 100
    return score, total, pct

if __name__ == "__main__":
    answer_key = {i: 1 for i in range(1, 26)} # Mock key
    print("Module 2 Diagnostic Engine Initialized.")
