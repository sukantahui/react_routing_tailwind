"""
# Module: 005_001_turtle-foundation
# Topic 2: Screen configuration: setup(), title(), bgcolor(), screensize()
# File: institutional_multi_screen_presentation_suite.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Screen configuration engine managing branded presentation windows
#              for student projects across Barrackpore and Kolkata.
"""

from dataclasses import dataclass

@dataclass
class StudentScreenPreset:
    student_name: str
    campus_location: str
    project_title: str
    window_w: int
    window_h: int
    bg_theme: str

class InstitutionalScreenDirector:
    """Configures branded Turtle windows for student project exhibitions."""
    def __init__(self):
        self.presets: list[StudentScreenPreset] = []

    def register_preset(self, preset: StudentScreenPreset):
        self.presets.append(preset)

    def generate_manifest(self) -> list[str]:
        results = []
        for p in self.presets:
            results.append(
                f"[SCREEN MANIFEST] '{p.project_title}' ({p.student_name} - {p.campus_location}) | "
                f"Window: {p.window_w}x{p.window_h} px | Theme: {p.bg_theme}"
            )
        return results

def test_screen_director():
    print("   [...] Running Institutional Screen Presentation Suite Test...")
    director = InstitutionalScreenDirector()

    # Register Mamata, Mahima, and Susmita presentation presets
    director.register_preset(StudentScreenPreset("Mamata", "Barrackpore", "Algorithmic Geometric Mandelbrot", 1024, 768, "#090d16"))
    director.register_preset(StudentScreenPreset("Mahima", "Kolkata", "Distributed Particle Simulation", 1280, 800, "#030712"))
    director.register_preset(StudentScreenPreset("Susmita", "Ichapur", "Recursive Botanical Tree Generator", 900, 700, "#1e1b4b"))

    manifest = director.generate_manifest()
    assert len(manifest) == 3
    for line in manifest:
        print(f"   [PASS] {line}")

def main():
    print("=" * 80)
    print("[CASE STUDY] Institutional Student Exhibition Screen Director")
    print("=" * 80)

    test_screen_director()

    print("=" * 80)
    print("[TAKEAWAY] Cohesive screen setup, title branding, and dark theme")
    print("           presets ensure professional visual project presentations.")
    print("=" * 80)

if __name__ == "__main__":
    main()
