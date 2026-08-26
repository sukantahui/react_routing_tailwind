"""
Module: 005_003_turtle-patterns
Topic: Topic 1 - Polygon mathematics: The 360/n degree exterior angle rule
File: interior_vs_exterior_visualizer.py
Teacher & Mentor: Sukanta Hui

Description:
Visualizes the fundamental geometric distinction between the Interior Angle
and the Exterior Turn Angle of a regular pentagon.
"""

import turtle

def visualize_angles():
    screen = turtle.Screen()
    screen.title("Interior vs Exterior Angle Visualizer - Coder & AccoTax")
    screen.bgcolor("#020617")

    t = turtle.Turtle()
    t.speed(3)
    t.pensize(3)

    # Draw regular pentagon (n=5, ext=72°, int=108°)
    side = 140
    t.penup(); t.goto(-100, -80); t.pendown()
    t.color("#38bdf8")

    # Step 1: Forward base
    t.forward(side)

    # Show extended dashed guideline for exterior turn
    t.color("#94a3b8")
    t.pensize(1)
    for _ in range(5):
        t.forward(10); t.penup(); t.forward(10); t.pendown()
    t.backward(100)

    # Show exterior turn (72°)
    t.color("#fbbf24")
    t.pensize(3)
    t.left(72)
    t.forward(side)

    # Complete remaining 3 sides of pentagon
    t.color("#38bdf8")
    for _ in range(3):
        t.left(72)
        t.forward(side)

    # Write annotation labels
    t.penup(); t.goto(40, -65)
    t.color("#34d399")
    t.write("Interior Angle: 108°", font=("Arial", 10, "bold"))

    t.goto(150, -65)
    t.color("#fbbf24")
    t.write("Exterior Turn: 72°", font=("Arial", 10, "bold"))

    t.hideturtle()
    turtle.done()

if __name__ == "__main__":
    visualize_angles()
