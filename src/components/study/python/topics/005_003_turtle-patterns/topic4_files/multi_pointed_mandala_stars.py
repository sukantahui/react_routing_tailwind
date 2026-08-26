"""
Module: 005_003_turtle-patterns
Topic: Topic 4 - Angle mathematics in star polygons and mandalas
File: multi_pointed_mandala_stars.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates drawing multi-pointed geometric star mandalas by rotating
a 5-pointed star motif around a central point across 12 radial spokes.
"""

import turtle

def draw_star_mandala():
    screen = turtle.Screen()
    screen.title("Multi-Pointed Star Mandala - Coder & AccoTax")
    screen.bgcolor("#0f172a")

    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.pensize(2)

    spokes = 12
    star_size = 110

    for spoke in range(spokes):
        t.color("#fbbf24" if spoke % 2 == 0 else "#38bdf8")

        # Draw 5-pointed star (turn angle = 144°)
        for _ in range(5):
            t.forward(star_size)
            t.right(144)

        # Pivot to next spoke
        t.left(360 / spokes)

    turtle.done()

if __name__ == "__main__":
    draw_star_mandala()
