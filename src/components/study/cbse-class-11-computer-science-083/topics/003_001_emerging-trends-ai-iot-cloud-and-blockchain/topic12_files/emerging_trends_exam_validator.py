"""
Module 003: Emerging Trends in Computing
Topic 12: Board Examination Scoring & Skill Assessment Simulator
Pure Python Script Evaluating Mastery Across AI, ML, NLP, AR/VR, Robotics, Big Data, IoT, Cloud, and Blockchain.
"""

from typing import Dict, List, Any

class BoardExamEvaluator:
    def __init__(self):
        self.categories = [
            "Artificial Intelligence & Machine Learning",
            "Natural Language Processing & Speech",
            "Immersive Technologies (AR/VR/MR)",
            "Robotics Subsystems & Control",
            "Big Data 5Vs & Storage Scale",
            "Internet of Things & RFID",
            "Cloud Computing & Deployment Models",
            "Grid Computing & Blockchain Technology"
        ]

    def evaluate_exam_performance(self, user_answers: Dict[int, int], answer_key: Dict[int, int]) -> Dict[str, Any]:
        total_questions = len(answer_key)
        correct_count = 0
        incorrect_count = 0
        unattempted_count = 0

        for q_id, correct_opt in answer_key.items():
            if q_id not in user_answers or user_answers[q_id] is None:
                unattempted_count += 1
            elif user_answers[q_id] == correct_opt:
                correct_count += 1
            else:
                incorrect_count += 1

        score_pct = round((correct_count / total_questions) * 100, 1) if total_questions > 0 else 0.0
        
        if score_pct >= 90:
            grade = "A1 (Outstanding Master)"
            feedback = "Exemplary grasp of emerging technological paradigms. You are fully prepared for the CBSE Class 11 Board Exams!"
        elif score_pct >= 75:
            grade = "A2 / B1 (Proficient)"
            feedback = "Solid conceptual foundation. Review subtle distinctions like IaaS vs PaaS and 3-DoF vs 6-DoF."
        elif score_pct >= 50:
            grade = "B2 / C1 (Satisfactory)"
            feedback = "Fair understanding. Revise the 5 Vs of Big Data and Blockchain SHA-256 previous-hash linkage."
        else:
            grade = "Needs Improvement"
            feedback = "Re-read Topic 11 Revision Handbook and experiment with the interactive topic sandboxes."

        return {
            "total_questions": total_questions,
            "attempted": total_questions - unattempted_count,
            "correct": correct_count,
            "incorrect": incorrect_count,
            "unattempted": unattempted_count,
            "percentage": f"{score_pct}%",
            "cbse_grade": grade,
            "mentor_feedback": feedback
        }

if __name__ == "__main__":
    evaluator = BoardExamEvaluator()
    print("=" * 65)
    print("CBSE Class 11 CS (083) Unit 3 Examination Evaluator")
    print("=" * 65)

    sample_answer_key = {i: 0 for i in range(1, 31)}
    sample_user_answers = {i: 0 for i in range(1, 28)}
    sample_user_answers[28] = 1 # Mistake
    sample_user_answers[29] = 2 # Mistake

    result = evaluator.evaluate_exam_performance(sample_user_answers, sample_answer_key)
    for k, v in result.items():
        print(f"  {k:20}: {v}")
