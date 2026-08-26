"""
# Module: 005_001_turtle-foundation
# Topic 4: Turtle cursor (pen) behavior: position, heading, visibility (showturtle(), hideturtle())
# File: turtle_pen_state_and_trail_control.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating penup/pendown state toggling, pensize, and stroke colors.
"""

from dataclasses import dataclass

@dataclass
class PenTrailSegment:
    x1: float
    y1: float
    x2: float
    y2: float
    is_drawn: bool
    pen_size: int
    pen_color: str

class PenStateController:
    """Manages pen drawing state, width, and discrete segment generation."""
    def __init__(self):
        self.is_down = True
        self.current_x = 0.0
        self.current_y = 0.0
        self.pen_size = 1
        self.pen_color = "#2dd4bf"
        self.segments: list[PenTrailSegment] = []

    def penup(self):
        self.is_down = False

    def pendown(self):
        self.is_down = True

    def pensize(self, size: int):
        self.pen_size = size

    def pencolor(self, color: str):
        self.pen_color = color

    def move_to(self, new_x: float, new_y: float):
        seg = PenTrailSegment(
            x1=self.current_x,
            y1=self.current_y,
            x2=new_x,
            y2=new_y,
            is_drawn=self.is_down,
            pen_size=self.pen_size,
            pen_color=self.pen_color
        )
        self.segments.append(seg)
        self.current_x = new_x
        self.current_y = new_y

def test_pen_state_control():
    print("   [...] Testing Pen Up/Down Mechanics & Trail Control...")
    controller = PenStateController()

    # 1. Draw first line with pendown()
    controller.move_to(100.0, 0.0)
    assert controller.segments[0].is_drawn is True
    print(f"   [PASS] 1. Drawn segment from (0,0) to (100,0) with pen down: True")

    # 2. Lift pen and jump to (200, 0)
    controller.penup()
    controller.move_to(200.0, 0.0)
    assert controller.segments[1].is_drawn is False
    print(f"   [PASS] 2. Jumped without drawing from (100,0) to (200,0) with pen up: True")

    # 3. Lower pen and draw second line with 4px width
    controller.pendown()
    controller.pensize(4)
    controller.pencolor("#38bdf8")
    controller.move_to(300.0, 0.0)
    assert controller.segments[2].is_drawn is True
    assert controller.segments[2].pen_size == 4
    print(f"   [PASS] 3. Drawn segment from (200,0) to (300,0) with pen size: 4px")

def main():
    print("=" * 75)
    print("[PEN CONTROL] Discrete Segment Drawing via penup() and pendown()")
    print("=" * 75)

    test_pen_state_control()

    print("=" * 75)
    print("[TAKEAWAY] Toggling penup() and pendown() allows moving across the canvas")
    print("           without leaving unwanted connecting ink lines.")
    print("=" * 75)

if __name__ == "__main__":
    main()
