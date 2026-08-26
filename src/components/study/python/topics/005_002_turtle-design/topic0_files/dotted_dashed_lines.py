"""
Module: 005_002_turtle-design
Topic: Topic 0 - Pen Control: penup(), pendown(), and pensize()
File: dotted_dashed_lines.py
Teacher & Mentor: Sukanta Hui

Description:
Shows how to draw patterned dashed and dotted borders using
iterative penup() and pendown() cycles.
"""

import turtle

def draw_dashed_border():
    screen = turtle.Screen()
    screen.title("Dashed and Dotted Geometry - Coder & AccoTax")
    screen.bgcolor("#020617")

    t = turtle.Turtle()
    t.speed(0)
    t.color("#fbbf24")
    t.pensize(3)

    # Move to starting corner
    t.penup()
    t.goto(-200, 200)

    # Draw a 400x400 dashed square
    for side in range(4):
        # 10 dashes of 20px line + 20px gap per side
        for dash in range(10):
            t.pendown()
            t.forward(20)
            t.penup()
            t.forward(20)
        t.right(90)

    t.hideturtle()
    turtle.done()

if __name__ == "__main__":
    draw_dashed_border()
