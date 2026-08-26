"""
Module: 005_003_turtle-patterns
Topic: Topic 0 - Using loops for drawing repetitive structures
File: circular_pinwheel_spokes.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates angular repetition by rotating a basic geometric petal
around a central origin point inside a for-loop.
"""

import turtle

def draw_radial_pinwheel():
    screen = turtle.Screen()
    screen.title("Radial Pinwheel Rosette - Coder & AccoTax")
    screen.bgcolor("#0f172a")

    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.pensize(2)

    total_petals = 36
    turn_angle = 360 / total_petals  # 10 degrees

    for i in range(total_petals):
        t.color("#fbbf24" if i % 2 == 0 else "#f43f5e")
        # Draw one petal (diamond shape)
        t.forward(120)
        t.left(45)
        t.forward(50)
        t.left(135)
        t.forward(120)
        t.left(45)
        t.forward(50)
        t.left(135)

        # Pivot to next radial spoke
        t.left(turn_angle)

    turtle.done()

if __name__ == "__main__":
    draw_radial_pinwheel()
