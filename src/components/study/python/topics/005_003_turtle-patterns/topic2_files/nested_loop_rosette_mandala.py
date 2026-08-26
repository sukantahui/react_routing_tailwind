"""
Module: 005_003_turtle-patterns
Topic: Topic 2 - Nested loops for complex geometric pattern creation
File: nested_loop_rosette_mandala.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates nested loop architecture:
- Outer Loop: Rotates the radial orientation around 360 degrees
- Inner Loop: Draws the individual polygon/petal shape at each rotation
"""

import turtle

def draw_nested_mandala():
    screen = turtle.Screen()
    screen.title("Nested Loop Rosette Mandala - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=600)

    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.pensize(2)

    total_petals = 36
    spoke_turn = 360 / total_petals  # 10 degrees

    # Outer Loop: Controls radial rotation around 360 degrees
    for spoke in range(total_petals):
        t.color("#38bdf8" if spoke % 2 == 0 else "#34d399")

        # Inner Loop: Draws a regular square at the current heading
        for _ in range(4):
            t.forward(100)
            t.left(90)

        # Pivot to next spoke
        t.left(spoke_turn)

    turtle.done()

if __name__ == "__main__":
    draw_nested_mandala()
