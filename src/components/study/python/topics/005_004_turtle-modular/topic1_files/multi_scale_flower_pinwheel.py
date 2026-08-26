"""
Module: 005_004_turtle-modular
Topic: Topic 1 - Parameterized graphics (position x, y, radius, color, rotation)
File: multi_scale_flower_pinwheel.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates parametric floral generation: scaling and rotating petals around
a central hub across multiple garden coordinates.
"""

import turtle
import math

def draw_petal(t, radius, angle=60, fill_color="#ec4899"):
    """Draws a single curved petal using two symmetric circle arcs."""
    t.color("white", fill_color)
    t.begin_fill()
    for _ in range(2):
        t.circle(radius, angle)
        t.left(180 - angle)
    t.end_fill()

def draw_flower(t, x, y, num_petals=8, petal_radius=50, rotation=0, petal_color="#ec4899", center_color="#fbbf24"):
    """Draws a fully parameterized flower with rotating petals and center pistil."""
    t.penup()
    t.goto(x, y)

    # 1. Radial Petals
    turn_step = 360 / num_petals
    for i in range(num_petals):
        t.penup()
        t.goto(x, y)
        t.setheading(rotation + i * turn_step)
        t.pendown()
        draw_petal(t, petal_radius, angle=60, fill_color=petal_color)

    # 2. Central Core Pistil
    t.penup()
    core_radius = petal_radius * 0.25
    t.goto(x, y - core_radius)
    t.setheading(0)
    t.pendown()
    t.color("white", center_color)
    t.begin_fill()
    t.circle(core_radius)
    t.end_fill()

def main():
    screen = turtle.Screen()
    screen.title("Multi-Scale Parametric Garden - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    # Parametric flowers across coordinates with distinct scales and rotations
    draw_flower(t, -220, 40, num_petals=6, petal_radius=40, rotation=15, petal_color="#f43f5e", center_color="#fef08a")
    draw_flower(t, -60, -30, num_petals=10, petal_radius=60, rotation=45, petal_color="#06b6d4", center_color="#fbbf24")
    draw_flower(t, 120, 60, num_petals=8, petal_radius=50, rotation=0, petal_color="#a855f7", center_color="#facc15")
    draw_flower(t, 250, -40, num_petals=12, petal_radius=35, rotation=30, petal_color="#10b981", center_color="#ffffff")

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
