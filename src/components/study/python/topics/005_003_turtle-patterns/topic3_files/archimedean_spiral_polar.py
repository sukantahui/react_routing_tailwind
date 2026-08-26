"""
Module: 005_003_turtle-patterns
Topic: Topic 3 - Spirals, Archimedean spirals, and radial symmetry
File: archimedean_spiral_polar.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates the Archimedean Spiral where the radial distance from origin
increases linearly with the angle: r = a * theta.
In Turtle, this is achieved by incrementing forward distance inside a loop.
"""

import turtle
import math

def draw_archimedean_spiral():
    screen = turtle.Screen()
    screen.title("Archimedean Polar Spiral - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=600)

    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.pensize(2)
    t.color("#38bdf8")

    # Method 1: Discrete Turtle Step Increments
    t.penup(); t.goto(0, 0); t.pendown()
    for i in range(250):
        t.color("#38bdf8" if i % 2 == 0 else "#34d399")
        t.forward(i * 0.4)
        t.left(10)

    turtle.done()

if __name__ == "__main__":
    draw_archimedean_spiral()
