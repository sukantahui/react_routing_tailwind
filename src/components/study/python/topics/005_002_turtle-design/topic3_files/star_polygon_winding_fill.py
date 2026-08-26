"""
Module: 005_002_turtle-design
Topic: Topic 3 - Fill mechanics: begin_fill(), end_fill(), fillcolor()
File: star_polygon_winding_fill.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates self-intersecting polygon fill rules (even-odd winding rule)
when filling complex star polygons in Python Turtle.
"""

import turtle

def draw_winding_stars():
    screen = turtle.Screen()
    screen.title("Winding Rule & Self-Intersecting Fills - Coder & AccoTax")
    screen.bgcolor("#020617")

    t = turtle.Turtle()
    t.speed(6)
    t.pensize(3)

    # 5-pointed star: Center is filled depending on parity
    t.penup(); t.goto(-180, 0); t.pendown()
    t.color("#38bdf8", "#0284c7")
    t.begin_fill()
    for _ in range(5):
        t.forward(140)
        t.right(144)
    t.end_fill()

    # 8-pointed star: Complex interior geometry
    t.penup(); t.goto(100, 0); t.pendown()
    t.color("#f43f5e", "#9f1239")
    t.begin_fill()
    for _ in range(8):
        t.forward(120)
        t.left(135)
    t.end_fill()

    t.hideturtle()
    turtle.done()

if __name__ == "__main__":
    draw_winding_stars()
