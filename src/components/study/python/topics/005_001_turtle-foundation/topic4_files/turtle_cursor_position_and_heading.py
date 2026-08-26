"""
# Module: 005_001_turtle-foundation
# Topic 4: Turtle cursor (pen) behavior: position, heading, visibility (showturtle(), hideturtle())
# File: turtle_cursor_position_and_heading.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating turtle coordinate and compass heading telemetry.
"""

from dataclasses import dataclass

@dataclass
class CursorTelemetrySnapshot:
    pos_x: float
    pos_y: float
    heading_deg: float

    @property
    def compass_direction_label(self) -> str:
        # Normalize angle to [0, 360)
        deg = self.heading_deg % 360.0
        if 45.0 <= deg < 135.0:
            return "North (+Y) [UP]"
        elif 135.0 <= deg < 225.0:
            return "West (-X) [LEFT]"
        elif 225.0 <= deg < 315.0:
            return "South (-Y) [DOWN]"
        else:
            return "East (+X) [RIGHT]"

def test_cursor_telemetry():
    print("   [...] Testing Cursor Position & Compass Heading Telemetry...")
    
    # 1. East Heading (0 deg)
    t1 = CursorTelemetrySnapshot(100.0, 50.0, 0.0)
    assert "East" in t1.compass_direction_label
    print(f"   [PASS] 1. Telemetry at ({t1.pos_x}, {t1.pos_y}) Heading: {t1.heading_deg} deg -> Direction: {t1.compass_direction_label}")

    # 2. North Heading (90 deg)
    t2 = CursorTelemetrySnapshot(100.0, 150.0, 90.0)
    assert "North" in t2.compass_direction_label
    print(f"   [PASS] 2. Telemetry at ({t2.pos_x}, {t2.pos_y}) Heading: {t2.heading_deg} deg -> Direction: {t2.compass_direction_label}")

    # 3. West Heading (180 deg)
    t3 = CursorTelemetrySnapshot(0.0, 150.0, 180.0)
    assert "West" in t3.compass_direction_label
    print(f"   [PASS] 3. Telemetry at ({t3.pos_x}, {t3.pos_y}) Heading: {t3.heading_deg} deg -> Direction: {t3.compass_direction_label}")

    # 4. South Heading (270 deg)
    t4 = CursorTelemetrySnapshot(0.0, 50.0, 270.0)
    assert "South" in t4.compass_direction_label
    print(f"   [PASS] 4. Telemetry at ({t4.pos_x}, {t4.pos_y}) Heading: {t4.heading_deg} deg -> Direction: {t4.compass_direction_label}")

def main():
    print("=" * 75)
    print("[CURSOR TELEMETRY] Position Coordinates & Compass Heading Inspection")
    print("=" * 75)

    test_cursor_telemetry()

    print("=" * 75)
    print("[TAKEAWAY] Methods pos(), xcor(), ycor(), and heading() provide exact")
    print("           mathematical telemetry for spatial reasoning.")
    print("=" * 75)

if __name__ == "__main__":
    main()
