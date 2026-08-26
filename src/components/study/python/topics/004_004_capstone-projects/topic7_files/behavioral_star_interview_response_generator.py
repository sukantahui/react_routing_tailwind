"""
# Module: 004_004_capstone-projects
# Topic 7: Resume and portfolio presentation strategies
# File: behavioral_star_interview_response_generator.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating structured STAR behavioral interview response generation.
"""

from dataclasses import dataclass

@dataclass
class STARStory:
    question: str
    situation: str
    task: str
    action: str
    result: str

    def format_script(self) -> str:
        return f"""
[INTERVIEW QUESTION]: "{self.question}"

1. [SITUATION]:
   {self.situation.strip()}

2. [TASK]:
   {self.task.strip()}

3. [ACTION]:
   {self.action.strip()}

4. [RESULT]:
   {self.result.strip()}
"""

def generate_production_bug_star_story() -> STARStory:
    return STARStory(
        question="Tell me about a difficult production bug you diagnosed and solved.",
        situation="During peak student admission week across Barrackpore and Kolkata campuses, concurrent tuition payment settlements were causing intermittent database lock timeouts in SQLite.",
        task="I needed to eliminate transaction lock contention and ensure zero payment data corruption under 50 concurrent administrative transactions.",
        action="I enabled SQLite Write-Ahead Logging (WAL mode), implemented a dedicated transaction context manager with automatic rollback on error, and added a Redis Cache-Aside layer for read-only queries.",
        result="Database lock errors dropped to 0%, fee reconciliation throughput increased by 4x, and all 3,500 admissions completed without a single dropped transaction."
    )

def test_star_generator():
    print("   [...] Testing STAR Behavioral Response Engine...")
    story = generate_production_bug_star_story()
    script = story.format_script()
    assert "SITUATION" in script
    assert "ACTION" in script
    assert "RESULT" in script
    print("   [PASS] 1. STAR technical interview response formatted and verified")

def main():
    print("=" * 75)
    print("[STAR METHOD] Behavioral & Technical Interview Storytelling")
    print("=" * 75)

    test_star_generator()

    print("=" * 75)
    print("[TAKEAWAY] Structuring interview responses with the STAR method showcases")
    print("           problem-solving maturity, technical depth, and quantifiable impact.")
    print("=" * 75)

if __name__ == "__main__":
    main()
