"""
Module: 005_003_turtle-patterns
Topic: Topic 3 - Spirals, Archimedean spirals, and radial symmetry
File: square_and_hexagonal_spirals.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates polygonal spirals (spiral squares, spiral hexagons):
- By setting turn angle slightly off from polygon exterior (e.g. 91° or 61°),
  the paths shift continuously to produce geometric spiral vortices.
"""

import turtle

def draw_polygonal_spirals():
    screen = turtle.Screen()
    screen.title("Polygonal Spiral Vortices - Coder & AccoTax")
    screen.bgcolor("#0f172a")
    screen.setup(width=800, height=600)

    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.pensize(2)

    # 1. Square Spiral (turn = 91°)
    t.penup(); t.goto(-200, 0); t.pendown()
    for i in range(70):
        t.color("#38bdf8" if i % 2 == 0 else "#a78bfa")
        t.forward(i * 3)
        t.left(91)

    # 2. Hexagonal Spiral (turn = 61°)
    t.penup(); t.goto(200, 0); t.pendown()
    for i in range(80):
        t.color("#fbbf24" if i % 2 == 0 else "#f43f5e")
        t.forward(i * 2.5)
        t.left(61)

    turtle.done()

if __name__ == "__main__":
    draw_polygonal_spirals()
