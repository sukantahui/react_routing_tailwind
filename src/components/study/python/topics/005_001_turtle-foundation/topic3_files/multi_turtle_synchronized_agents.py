"""
# Module: 005_001_turtle-foundation
# Topic 3: Turtle object creation and lifecycle
# File: multi_turtle_synchronized_agents.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Multi-agent coordination simulating synchronized multi-turtle drawing.
"""

from dataclasses import dataclass
import math

@dataclass
class SwarmTurtle:
    agent_id: int
    name: str
    color_hex: str
    radius: float
    angular_offset_deg: float
    current_angle_deg: float = 0.0

    def step(self, angular_delta_deg: float) -> tuple[float, float]:
        self.current_angle_deg = (self.current_angle_deg + angular_delta_deg) % 360.0
        total_rad = math.radians(self.current_angle_deg + self.angular_offset_deg)
        x = round(self.radius * math.cos(total_rad), 2)
        y = round(self.radius * math.sin(total_rad), 2)
        return (x, y)

class SwarmOrchestrator:
    """Manages synchronized multi-agent drawing swarms."""
    def __init__(self):
        self.agents: list[SwarmTurtle] = []

    def add_agent(self, agent: SwarmTurtle):
        self.agents.append(agent)

    def step_swarm(self, angle_step: float) -> list[tuple[str, float, float]]:
        return [(a.name, *a.step(angle_step)) for a in self.agents]

def test_multi_agent_swarm():
    print("   [...] Testing Multi-Agent Synchronized Turtle Swarm...")
    orchestrator = SwarmOrchestrator()

    # Create a 3-agent tri-arm spiral (Mamata, Mahima, Susmita)
    orchestrator.add_agent(SwarmTurtle(1, "Mamata's Pen", "#2dd4bf", radius=100.0, angular_offset_deg=0.0))
    orchestrator.add_agent(SwarmTurtle(2, "Mahima's Pen", "#38bdf8", radius=100.0, angular_offset_deg=120.0))
    orchestrator.add_agent(SwarmTurtle(3, "Susmita's Pen", "#c084fc", radius=100.0, angular_offset_deg=240.0))

    assert len(orchestrator.agents) == 3
    print("   [PASS] 1. Initialized 3 synchronized drawing agents with 120-degree phase separation")

    # Advance swarm by 90 degrees
    positions = orchestrator.step_swarm(90.0)
    assert len(positions) == 3
    for name, x, y in positions:
        print(f"   [PASS] 2. Agent '{name}' moved to synchronized position: ({x}, {y})")

def main():
    print("=" * 75)
    print("[MULTI-AGENT SWARM] Synchronized Multi-Turtle Drawing Orchestration")
    print("=" * 75)

    test_multi_agent_swarm()

    print("=" * 75)
    print("[TAKEAWAY] Managing multiple Turtle instances allows creating complex")
    print("           synchronized geometric patterns and multi-agent physics simulations.")
    print("=" * 75)

if __name__ == "__main__":
    main()
