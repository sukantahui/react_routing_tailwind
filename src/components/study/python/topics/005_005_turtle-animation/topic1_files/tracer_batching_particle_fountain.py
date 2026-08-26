"""
Module: 005_005_turtle-animation
Topic: Topic 1 - Controlling redraw with tracer(0) and update() for instant rendering
File: tracer_batching_particle_fountain.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates `screen.tracer(n)` batching:
- `tracer(1)`: Updates canvas on every single particle step (Extremely slow)
- `tracer(50)`: Updates canvas once every 50 particle steps (Live progressive flow)
- `tracer(0)`: Complete manual control (Maximum FPS for complex games)
"""

import turtle
import random

def run_particle_fountain():
    screen = turtle.Screen()
    screen.title("Tracer Batching Particle Fountain - Coder & AccoTax")
    screen.bgcolor("#0f172a")
    screen.setup(width=800, height=600)

    # Refresh screen once every 40 operations
    screen.tracer(40)

    t = turtle.Turtle()
    t.hideturtle()
    t.speed(0)

    colors = ["#38bdf8", "#34d399", "#fbbf24", "#f43f5e", "#a855f7"]

    # Render 2,000 particle trajectory strokes
    for i in range(2000):
        t.penup(); t.goto(0, -200); t.pendown()
        t.color(colors[i % len(colors)])

        angle = random.uniform(60, 120)
        speed = random.uniform(4, 12)
        vx = speed * turtle.math.cos(turtle.math.radians(angle))
        vy = speed * turtle.math.sin(turtle.math.radians(angle))

        x, y = 0, -200
        for _ in range(25):
            x += vx
            y += vy
            vy -= 0.5  # Gravity
            t.goto(x, y)

    screen.update()
    turtle.done()

if __name__ == "__main__":
    run_particle_fountain()
