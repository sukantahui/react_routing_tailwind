"""
Module: 005_003_turtle-patterns
Topic: Topic 0 - Using loops for drawing repetitive structures
File: geometric_square_tunnel.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates dynamic loop parameterization where side length expands
inside a loop to create a 3D geometric tunnel illusion.
"""

import turtle

def draw_square_tunnel():
    screen = turtle.Screen()
    screen.title("Concentric Square Tunnel - Coder & AccoTax")
    screen.bgcolor("#020617")

    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.pensize(2)

    # Draw 25 expanding concentric squares
    for i in range(1, 26):
        side = i * 12
        # Position turtle at top-left of each centered square
        t.penup()
        t.goto(-side / 2, side / 2)
        t.pendown()

        # Color cycle
        t.color("#38bdf8" if i % 2 == 0 else "#34d399")

        for _ in range(4):
            t.forward(side)
            t.right(90)

    turtle.done()

if __name__ == "__main__":
    draw_square_tunnel()
