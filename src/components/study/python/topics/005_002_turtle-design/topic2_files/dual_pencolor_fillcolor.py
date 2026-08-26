"""
Module: 005_002_turtle-design
Topic: Topic 2 - Color systems (RGB 0-255 vs 0-1, hex codes, named colors)
File: dual_pencolor_fillcolor.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates decoupling stroke color (pencolor) and interior fill color (fillcolor),
including the dual-argument color(pen, fill) signature.
"""

import turtle

def draw_styled_badges():
    screen = turtle.Screen()
    screen.title("Dual Color System: Pencolor vs Fillcolor - Coder & AccoTax")
    screen.bgcolor("#0f172a")

    t = turtle.Turtle()
    t.speed(3)
    t.pensize(4)

    # Shape 1: Direct pencolor() and fillcolor() calls
    t.penup(); t.goto(-180, 0); t.pendown()
    t.pencolor("#38bdf8")  # Sky Blue Stroke
    t.fillcolor("#0369a1")  # Deep Blue Fill

    t.begin_fill()
    for _ in range(4):
        t.forward(100)
        t.left(90)
    t.end_fill()

    # Shape 2: Dual color(pen, fill) signature
    t.penup(); t.goto(80, 0); t.pendown()
    t.color("#f43f5e", "#ffe4e6")  # Rose stroke, soft blush fill

    t.begin_fill()
    for _ in range(4):
        t.forward(100)
        t.left(90)
    t.end_fill()

    t.hideturtle()
    turtle.done()

if __name__ == "__main__":
    draw_styled_badges()
