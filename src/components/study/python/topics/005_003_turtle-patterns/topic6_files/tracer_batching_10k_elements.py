"""
Module: 005_003_turtle-patterns
Topic: Topic 6 - Pattern optimization and computational efficiency
File: tracer_batching_10k_elements.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates periodic buffer batching (`screen.tracer(100)`) for smooth
live animations with 10,000+ geometric particles without canvas stalling.
"""

import turtle
import random

def run_batched_particle_system():
    screen = turtle.Screen()
    screen.title("Batched Particle Optimization - Coder & AccoTax")
    screen.bgcolor("#0f172a")
    screen.setup(width=800, height=600)

    # Refresh canvas once every 50 draw calls for smooth progressive animation
    screen.tracer(50)

    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.pensize(1)

    palette = ["#38bdf8", "#34d399", "#fbbf24", "#f43f5e", "#a78bfa"]

    # 10,000 algorithmic particles
    for i in range(10000):
        t.color(palette[i % len(palette)])
        t.forward(i * 0.02)
        t.left(91)

    screen.update()
    turtle.done()

if __name__ == "__main__":
    run_batched_particle_system()
