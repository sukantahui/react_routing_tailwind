"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 12: Diagnostic Assessment Automated Scoring Engine
Author: Sukanta Hui, Coder & AccoTax
"""

def grade_diagnostic_assessment(answers_dict, question_bank):
    score = 0
    total = len(question_bank)
    results = []

    for q in question_bank:
        qid = q['id']
        selected = answers_dict.get(qid, None)
        correct = q['correctAnswer']
        is_correct = (selected == correct)
        if is_correct:
            score += 1
        results.append({
            "id": qid,
            "is_correct": is_correct,
            "selected": selected,
            "correct": correct,
            "question": q['question']
        })

    pct = round((score / total) * 100, 1)
    return score, total, pct, results

print("Diagnostic engine loaded. Run with interactive frontend.")