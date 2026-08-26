"""
Module: 005_002_turtle-design
Topic: Topic 1 - Line thickness, pensize, and cap styling
File: tapered_calligraphy_pen.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates dynamic calligraphic stroke tapering where pensize increases
and decreases dynamically across a continuous mathematical curve.
"""

import turtle
import math

def draw_calligraphic_spiral():
    screen = turtle.Screen()
    screen.title("Calligraphic Tapered Spiral - Coder & AccoTax")
    screen.bgcolor("#090d16")

    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.color("#a78bfa")  # Purple pastel

    # Draw expanding and tapering spiral
    for i in range(120):
        # Calculate dynamic thickness using sine curve (1px to 10px)
        dynamic_width = max(1, int(1 + 9 * math.sin(i * math.pi / 60)))
        t.pensize(dynamic_width)
        t.forward(i * 1.5)
        t.left(35)

    turtle.done()

if __name__ == "__main__":
    draw_calligraphic_spiral()
