"""
Module: 005_002_turtle-design
Topic: Topic 4 - Background canvas design and window customization
File: dark_theme_space_backdrop.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates procedural night sky generation with random star fields,
nebula gradients, and moon glow across a dark custom canvas.
"""

import turtle
import random

def generate_cosmic_backdrop():
    screen = turtle.Screen()
    screen.title("Procedural Starfield Backdrop - Coder & AccoTax")
    screen.bgcolor("#030712")  # Deep space black
    screen.setup(width=750, height=600)
    screen.tracer(0)  # Instant generation

    t = turtle.Turtle()
    t.hideturtle()

    # 1. Scatter 100 random twinkling stars
    star_colors = ["#ffffff", "#fef08a", "#93c5fd", "#f472b6"]
    for _ in range(100):
        t.penup()
        x = random.randint(-360, 360)
        y = random.randint(-280, 280)
        t.goto(x, y)
        star_size = random.choice([2, 3, 4])
        t.dot(star_size, random.choice(star_colors))

    # 2. Glowing Moon at Top-Right
    t.penup(); t.goto(220, 160); t.pendown()
    t.color("#fef9c3", "#fef08a")  # Pale yellow moon
    t.begin_fill()
    t.circle(45)
    t.end_fill()

    # Render all vectors immediately
    screen.update()
    turtle.done()

if __name__ == "__main__":
    generate_cosmic_backdrop()
