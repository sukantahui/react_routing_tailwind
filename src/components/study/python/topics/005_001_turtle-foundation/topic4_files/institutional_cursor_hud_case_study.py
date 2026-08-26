"""
# Module: 005_001_turtle-foundation
# Topic 4: Turtle cursor (pen) behavior: position, heading, visibility (showturtle(), hideturtle())
# File: institutional_cursor_hud_case_study.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Real-time Heads-Up Display (HUD) telemetry generator tracking
#              cursor telemetry for Mamata, Mahima, and Susmita.
"""

from dataclasses import dataclass

@dataclass
class StudentCursorTelemetryHUD:
    student_name: str
    campus: str
    current_x: float
    current_y: float
    heading_deg: float
    is_pen_down: bool
    is_cursor_visible: bool
    stroke_width: int
    pencolor_hex: str

    def generate_hud_overlay_string(self) -> str:
        pen_status = "DRAWING (PEN DOWN)" if self.is_pen_down else "TRANSIT (PEN UP)"
        vis_status = "VISIBLE" if self.is_cursor_visible else "HIDDEN (FAST)"
        return (
            f"[HUD TELEMETRY] Student: {self.student_name} ({self.campus}) | "
            f"Pos: ({self.current_x:.1f}, {self.current_y:.1f}) | Heading: {self.heading_deg:.1f} deg | "
            f"Pen: {pen_status} | Cursor: {vis_status} | Stroke: {self.stroke_width}px ({self.pencolor_hex})"
        )

def test_cursor_hud():
    print("   [...] Running Institutional Cursor Telemetry HUD Test...")
    
    # 1. Mamata's HUD at Barrackpore
    hud_mamata = StudentCursorTelemetryHUD("Mamata", "Barrackpore", 150.0, 100.0, 45.0, True, False, 3, "#2dd4bf")
    log1 = hud_mamata.generate_hud_overlay_string()
    assert "Mamata" in log1 and "DRAWING" in log1
    print(f"   [PASS] 1. {log1}")

    # 2. Mahima's HUD at Kolkata
    hud_mahima = StudentCursorTelemetryHUD("Mahima", "Kolkata", 0.0, 150.0, 90.0, False, True, 2, "#38bdf8")
    log2 = hud_mahima.generate_hud_overlay_string()
    assert "Mahima" in log2 and "TRANSIT" in log2
    print(f"   [PASS] 2. {log2}")

    # 3. Susmita's HUD at Ichapur
    hud_susmita = StudentCursorTelemetryHUD("Susmita", "Ichapur", -120.0, -80.0, 180.0, True, True, 4, "#c084fc")
    log3 = hud_susmita.generate_hud_overlay_string()
    assert "Susmita" in log3 and "180.0 deg" in log3
    print(f"   [PASS] 3. {log3}")

def main():
    print("=" * 80)
    print("[CASE STUDY] Real-Time Student Cursor Telemetry HUD Overlay Engine")
    print("=" * 80)

    test_cursor_hud()

    print("=" * 80)
    print("[TAKEAWAY] Displaying real-time telemetry overlays assists learners in")
    print("           debugging spatial movements and orientation angles.")
    print("=" * 80)

if __name__ == "__main__":
    main()
