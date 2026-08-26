"""
Module: 005_003_turtle-patterns
Topic: Topic 0 - Using loops for drawing repetitive structures
File: repetitive_loops_basics.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates replacing repetitive manual drawing code with structured
Python for-loops to generate regular polygons and repetitive geometric motifs.
"""

import turtle

def draw_loop_patterns():
    screen = turtle.Screen()
    screen.title("Repetitive Loop Geometry - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=600)

    t = turtle.Turtle()
    t.speed(5)
    t.pensize(2)

    # 1. Equilateral Triangle with 3 iterations
    t.penup(); t.goto(-220, 50); t.pendown()
    t.color("#38bdf8", "#0284c7")
    t.begin_fill()
    for _ in range(3):
        t.forward(100)
        t.left(120)
    t.end_fill()

    # 2. Square with 4 iterations
    t.penup(); t.goto(-60, 50); t.pendown()
    t.color("#34d399", "#065f46")
    t.begin_fill()
    for _ in range(4):
        t.forward(100)
        t.left(90)
    t.end_fill()

    # 3. Regular Hexagon with 6 iterations
    t.penup(); t.goto(120, 50); t.pendown()
    t.color("#fbbf24", "#d97706")
    t.begin_fill()
    for _ in range(6):
        t.forward(60)
        t.left(60)
    t.end_fill()

    t.hideturtle()
    turtle.done()

if __name__ == "__main__":
    draw_loop_patterns()
