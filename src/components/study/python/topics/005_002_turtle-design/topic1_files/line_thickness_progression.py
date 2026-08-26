"""
Module: 005_002_turtle-design
Topic: Topic 1 - Line thickness, pensize, and cap styling
File: line_thickness_progression.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates a multi-tier stroke hierarchy ranging from fine 1px gridlines
to bold 15px structural boundaries in Python Turtle.
"""

import turtle

def draw_stroke_hierarchy():
    screen = turtle.Screen()
    screen.title("Line Thickness Progression - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=700, height=600)

    t = turtle.Turtle()
    t.speed(5)

    strokes = [
        (1, "#94a3b8", "1px - Fine Grid / Axis Guide"),
        (3, "#38bdf8", "3px - Standard Vector Outline"),
        (6, "#34d399", "6px - Medium Architectural Feature"),
        (10, "#fbbf24", "10px - Heavy Foreground Boundary"),
        (15, "#f43f5e", "15px - Bold Structural Element")
    ]

    start_y = 150
    for width, color, label in strokes:
        t.penup()
        t.goto(-250, start_y)
        t.pendown()
        t.pensize(width)
        t.color(color)
        t.forward(200)

        # Write label beside stroke
        t.penup()
        t.forward(20)
        t.write(f"pensize({width}) -> {label}", font=("Arial", 10, "normal"))

        start_y -= 60

    t.hideturtle()
    turtle.done()

if __name__ == "__main__":
    draw_stroke_hierarchy()
