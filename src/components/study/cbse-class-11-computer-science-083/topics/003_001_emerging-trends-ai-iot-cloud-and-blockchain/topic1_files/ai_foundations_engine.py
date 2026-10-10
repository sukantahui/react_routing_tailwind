# ai_foundations_engine.py
# CBSE Class XI Computer Science (083) - Segment 3: Emerging Trends
# Topic: Artificial Intelligence (AI) Foundations, Weak vs Strong AI & Expert Systems
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

"""
This Python module demonstrates the foundational principles of Artificial Intelligence:
1. Rule-Based Heuristic Expert System (Course & Career Recommender)
2. Turing Test Conversational Evaluation Engine
3. Classification of AI: Artificial Narrow Intelligence (ANI) vs General (AGI) vs Super (ASI)
"""

from typing import Dict, List, Tuple

class RuleBasedExpertSystem:
    """A rule-based AI expert system for academic career pathway diagnosis."""
    def __init__(self):
        self.knowledge_base = [
            {
                "career": "AI Research Scientist / Machine Learning Engineer",
                "conditions": {"maths": True, "python_interest": True, "algorithms": True}
            },
            {
                "career": "Cloud Solutions Architect & DevOps Engineer",
                "conditions": {"networking": True, "linux": True, "system_admin": True}
            },
            {
                "career": "Cybersecurity Analyst & Digital Forensics Specialist",
                "conditions": {"networking": True, "cryptography": True, "security_interest": True}
            },
            {
                "career": "Full-Stack Web & Mobile App Developer",
                "conditions": {"frontend_design": True, "databases": True, "python_interest": True}
            }
        ]

    def infer(self, facts: Dict[str, bool]) -> str:
        """Inference engine matching current facts against knowledge base rules."""
        for rule in self.knowledge_base:
            match = True
            for condition, value in rule["conditions"].items():
                if facts.get(condition, False) != value:
                    match = False
                    break
            if match:
                return rule["career"]
        return "General Computer Science & Emerging Technologies Pathway"

class TuringTestSimulator:
    """Simulates the 1950 Alan Turing Imitation Game evaluation."""
    @staticmethod
    def evaluate_response(human_query: str) -> Dict[str, str]:
        q_lower = human_query.lower()
        if "weather" in q_lower or "rain" in q_lower:
            return {
                "agent": "Conversational Agent (ANI)",
                "response": "The local atmospheric sensors report 28°C with 65% humidity in Barrackpore. Expect scattered clouds.",
                "turing_score": "High (Domain-Specific Conversational Intelligence)"
            }
        elif "who are you" in q_lower or "sentient" in q_lower:
            return {
                "agent": "Rule-Based Inference Engine",
                "response": "I am an Artificial Narrow Intelligence (ANI) program executing deterministic heuristics on your computer.",
                "turing_score": "Fails AGI threshold (Self-awareness not present)"
            }
        else:
            return {
                "agent": "Statistical Language Processor",
                "response": f"Analyzing semantic vectors for query: '{human_query}'. Confidence score: 0.94.",
                "turing_score": "Moderate Heuristic Match"
            }

def run_ai_demonstrations():
    print("=" * 70)
    print("  CBSE CLASS XI CS (083) - ARTIFICIAL INTELLIGENCE FOUNDATIONS")
    print("=" * 70)

    # 1. Expert System Inference
    expert = RuleBasedExpertSystem()
    student_profile = {"maths": True, "python_interest": True, "algorithms": True}
    recommended = expert.infer(student_profile)
    print(f"\n[1] EXPERT SYSTEM INFERENCE TEST:")
    print(f"  Facts Provided: {student_profile}")
    print(f"  Diagnosed Academic Recommendation: {recommended}")

    # 2. Turing Test Dialogue Simulation
    print(f"\n[2] TURING TEST DIALOGUE EVALUATION:")
    queries = [
        "What is the weather today?",
        "Are you conscious and sentient?",
        "Solve differential equations in calculus"
    ]
    for q in queries:
        res = TuringTestSimulator.evaluate_response(q)
        print(f"  User: '{q}'")
        print(f"  AI  : {res['response']}")
        print(f"  Eval: {res['turing_score']}\n")

if __name__ == "__main__":
    run_ai_demonstrations()
