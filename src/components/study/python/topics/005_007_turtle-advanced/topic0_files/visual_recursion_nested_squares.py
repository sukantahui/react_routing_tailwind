"""
Module: 005_007_turtle-advanced
Topic: Topic 0 - Understanding recursion through visual geometry
File: visual_recursion_nested_squares.py
Teacher & Mentor: Sukanta Hui

Description:
Visualizing Recursion via Concentric Self-Similar Squares:
- Winding Phase (Call Stack Growth): Draws square and calls `draw_nested(size * 0.75, depth - 1)`.
- Unwinding Phase (Call Stack Return): Fills color and returns control upward.
"""

import turtle

def draw_nested_squares(t, size, depth):
    if depth == 0 or size < 10:  # BASE CASE
        return

    # WINDING PHASE: Draw current square
    t.penup(); t.goto(-size/2, -size/2); t.pendown()
    colors = ["#38bdf8", "#34d399", "#fbbf24", "#f43f5e", "#a855f7"]
    t.color(colors[depth % len(colors)])
    t.pensize(depth)

    for _ in range(4):
        t.forward(size)
        t.left(90)

    # RECURSIVE STEP: Shrink size and decrement depth
    draw_nested_squares(t, size * 0.75, depth - 1)

    # UNWINDING PHASE: Returns back up the stack

def run_nested_demo():
    screen = turtle.Screen()
    screen.title("Visual Recursion: Nested Squares - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)

    t = turtle.Turtle(); t.hideturtle(); t.speed(0)

    # Header HUD
    t.penup(); t.goto(0, 210); t.pendown()
    t.color("#38bdf8")
    t.write("RECURSION VISUALIZER: 6 NESTED SELF-SIMILAR FRAMES", align="center", font=("Arial", 12, "bold"))

    draw_nested_squares(t, 320, 6)

    screen.mainloop()

if __name__ == "__main__":
    run_nested_demo()
