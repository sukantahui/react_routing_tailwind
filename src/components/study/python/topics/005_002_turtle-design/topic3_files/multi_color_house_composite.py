"""
Module: 005_002_turtle-design
Topic: Topic 3 - Fill mechanics: begin_fill(), end_fill(), fillcolor()
File: multi_color_house_composite.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates combining multiple distinct filled components (walls, roof, door, window)
to compose a complete multi-colored illustration.
"""

import turtle

def draw_composite_house():
    screen = turtle.Screen()
    screen.title("Multi-Component Filled House - Coder & AccoTax")
    screen.bgcolor("#0f172a")

    t = turtle.Turtle()
    t.speed(5)
    t.pensize(2)

    # 1. Base Wall (Blue Rectangle)
    t.penup(); t.goto(-100, -100); t.pendown()
    t.color("#0284c7", "#0369a1")
    t.begin_fill()
    for _ in range(2):
        t.forward(200)
        t.left(90)
        t.forward(150)
        t.left(90)
    t.end_fill()

    # 2. Roof (Rose Red Triangle)
    t.penup(); t.goto(-120, 50); t.pendown()
    t.color("#f43f5e", "#be123c")
    t.begin_fill()
    t.goto(0, 150)
    t.goto(120, 50)
    t.goto(-120, 50)
    t.end_fill()

    # 3. Door (Amber Rectangle)
    t.penup(); t.goto(-30, -100); t.pendown()
    t.color("#fbbf24", "#b45309")
    t.begin_fill()
    for _ in range(2):
        t.forward(60)
        t.left(90)
        t.forward(90)
        t.left(90)
    t.end_fill()

    t.hideturtle()
    turtle.done()

if __name__ == "__main__":
    draw_composite_house()
