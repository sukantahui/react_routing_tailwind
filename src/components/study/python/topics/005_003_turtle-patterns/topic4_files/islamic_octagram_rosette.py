"""
Module: 005_003_turtle-patterns
Topic: Topic 4 - Angle mathematics in star polygons and mandalas
File: islamic_octagram_rosette.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates constructing the 8-pointed Islamic Star (Rub el Hizb / Octagram)
by overlaying two concentric squares rotated by 45 degrees.
"""

import turtle

def draw_octagram():
    screen = turtle.Screen()
    screen.title("Islamic 8-Pointed Star Rosette - Coder & AccoTax")
    screen.bgcolor("#020617")

    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.pensize(2)

    side = 140

    # Draw first square
    t.penup(); t.goto(-side / 2, side / 2); t.pendown()
    t.color("#38bdf8", "#0284c7")
    t.begin_fill()
    for _ in range(4):
        t.forward(side)
        t.right(90)
    t.end_fill()

    # Draw second square rotated 45 degrees
    t.penup(); t.goto(0, 0); t.pendown()
    t.setheading(45)
    t.penup(); t.forward(side * 0.7071); t.left(135); t.pendown()
    t.color("#fbbf24", "#d97706")
    t.begin_fill()
    for _ in range(4):
        t.forward(side)
        t.right(90)
    t.end_fill()

    turtle.done()

if __name__ == "__main__":
    draw_octagram()
