"""
# Module: 005_001_turtle-foundation
# Topic 3: Turtle object creation and lifecycle
# File: institutional_multi_agent_drawing_orchestrator.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Multi-agent collaborative drawing orchestrator assigning dedicated
#              turtles to Mamata, Mahima, and Susmita for synchronized art.
"""

from dataclasses import dataclass

@dataclass
class StudentDrawingAgent:
    student_name: str
    campus: str
    assigned_layer: str
    pencolor_hex: str
    active_segments_drawn: int = 0

    def draw_segment(self, length: float):
        self.active_segments_drawn += 1

class CollaborativeCanvasDirector:
    """Orchestrates multi-agent layered drawing projects."""
    def __init__(self):
        self.agents: list[StudentDrawingAgent] = []

    def assign_agent(self, agent: StudentDrawingAgent):
        self.agents.append(agent)

    def execute_synchronized_frame(self) -> list[str]:
        logs = []
        for a in self.agents:
            a.draw_segment(50.0)
            logs.append(
                f"[AGENT DISPATCH] {a.student_name} ({a.campus}) -> Layer: '{a.assigned_layer}' | "
                f"Color: {a.pencolor_hex} | Total Segments: {a.active_segments_drawn}"
            )
        return logs

def test_collaborative_director():
    print("   [...] Running Institutional Multi-Agent Drawing Test...")
    director = CollaborativeCanvasDirector()

    # Assign Mamata (Background Grid), Mahima (Fractal Tree), and Susmita (Star Mandala)
    director.assign_agent(StudentDrawingAgent("Mamata", "Barrackpore", "Background Coordinate Grid", "#334155"))
    director.assign_agent(StudentDrawingAgent("Mahima", "Kolkata", "Fractal Tree Geometry", "#2dd4bf"))
    director.assign_agent(StudentDrawingAgent("Susmita", "Ichapur", "Star Mandala Highlights", "#facc15"))

    assert len(director.agents) == 3
    logs = director.execute_synchronized_frame()
    for l in logs:
        print(f"   [PASS] {l}")

    assert director.agents[0].active_segments_drawn == 1
    assert director.agents[1].active_segments_drawn == 1
    assert director.agents[2].active_segments_drawn == 1

def main():
    print("=" * 80)
    print("[CASE STUDY] Institutional Multi-Agent Collaborative Drawing System")
    print("=" * 80)

    test_collaborative_director()

    print("=" * 80)
    print("[TAKEAWAY] Dividing complex visual art into specialized Turtle agent")
    print("           layers maximizes modularity, code reuse, and teamwork.")
    print("=" * 80)

if __name__ == "__main__":
    main()
