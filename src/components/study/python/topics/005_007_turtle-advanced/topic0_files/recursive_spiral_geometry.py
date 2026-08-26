"""
Module: 005_007_turtle-advanced
Topic: Topic 0 - Understanding recursion through visual geometry
File: recursive_spiral_geometry.py
Teacher & Mentor: Sukanta Hui

Description:
Logarithmic Inward Recursive Spiral:
- Explores how each recursive call reduces segment length by 4% and turns 91 degrees.
- Base Case: `if length < 5: return`
"""

import turtle

def recursive_spiral(t, length, depth):
    if length < 4 or depth > 100:  # BASE CASE
        return

    # Color shift based on depth
    colors = ["#38bdf8", "#34d399", "#fbbf24", "#f43f5e", "#a855f7"]
    t.color(colors[(depth // 10) % len(colors)])

    t.forward(length)
    t.left(91)  # 91 degrees creates rotating spiral offset

    # RECURSIVE CALL
    recursive_spiral(t, length * 0.96, depth + 1)

def run_spiral_demo():
    screen = turtle.Screen()
    screen.title("Recursive Spiral Geometry - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)

    t = turtle.Turtle(); t.hideturtle(); t.speed(0); t.pensize(2)
    t.penup(); t.goto(-140, 140); t.pendown()

    recursive_spiral(t, 260, 0)

    screen.mainloop()

if __name__ == "__main__":
    run_spiral_demo()
