"""
# Module: 005_001_turtle-foundation
# Topic 3: Turtle object creation and lifecycle
# File: turtle_instantiation_and_properties.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating explicit OOP Turtle object creation, state inspection,
#              shapes, and pen customization.
"""

from dataclasses import dataclass

@dataclass
class VirtualTurtleAgent:
    name: str
    shape_name: str = "classic"
    pen_color: str = "black"
    fill_color: str = "black"
    pen_size: int = 1
    is_pen_down: bool = True
    speed_val: int = 3
    is_cursor_visible: bool = True
    x: float = 0.0
    y: float = 0.0
    heading_deg: float = 0.0

    def shape(self, new_shape: str) -> str:
        self.shape_name = new_shape
        return self.shape_name

    def color(self, pen_col: str, fill_col: str | None = None):
        self.pen_color = pen_col
        self.fill_color = fill_col if fill_col is not None else pen_col

    def pensize(self, size: int):
        self.pen_size = size

    def speed(self, val: int):
        self.speed_val = val

    def hideturtle(self):
        self.is_cursor_visible = False

    def showturtle(self):
        self.is_cursor_visible = True

def test_turtle_instantiation():
    print("   [...] Testing Object-Oriented Turtle Instantiation & State Encapsulation...")
    
    # 1. Instantiate Mamata's Custom Pen
    t1 = VirtualTurtleAgent("Mamata's Pen")
    assert t1.x == 0.0 and t1.y == 0.0
    assert t1.is_pen_down is True
    assert t1.is_cursor_visible is True
    print(f"   [PASS] 1. Instantiated agent '{t1.name}' with default state: Pos ({t1.x}, {t1.y}), PenDown: {t1.is_pen_down}")

    # 2. Customize Properties
    t1.shape("turtle")
    t1.color("#2dd4bf", "#0d9488")
    t1.pensize(3)
    t1.speed(0)
    t1.hideturtle()

    assert t1.shape_name == "turtle"
    assert t1.pen_color == "#2dd4bf" and t1.fill_color == "#0d9488"
    assert t1.pen_size == 3
    assert t1.is_cursor_visible is False
    print(f"   [PASS] 2. Configured custom shape: '{t1.shape_name}', Pen: {t1.pen_color}, Fill: {t1.fill_color}, Speed: {t1.speed_val}")

def main():
    print("=" * 75)
    print("[TURTLE OOP] Explicit Object Instantiation & State Customization")
    print("=" * 75)

    test_turtle_instantiation()

    print("=" * 75)
    print("[TAKEAWAY] Explicit OOP turtle instances encapsulate independent visual")
    print("           state (shape, pencolor, fillcolor, visibility) with clean modularity.")
    print("=" * 75)

if __name__ == "__main__":
    main()
