"""
Module: 005_002_turtle-design
Topic: Topic 5 - Speed vs rendering performance: speed() settings
File: speed_settings_benchmark.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates the full speed hierarchy in Python Turtle:
- speed(1) / 'slowest'
- speed(3) / 'slow'
- speed(6) / 'normal'
- speed(10) / 'fast'
- speed(0) / 'fastest' (Zero animation delay)
"""

import turtle
import time

def benchmark_turtle_speeds():
    screen = turtle.Screen()
    screen.title("Speed Settings Benchmark - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=600)

    speed_configs = [
        (1, "1 / 'slowest'", "#f43f5e", 150),
        (3, "3 / 'slow'", "#fbbf24", 80),
        (6, "6 / 'normal'", "#38bdf8", 10),
        (10, "10 / 'fast'", "#34d399", -60),
        (0, "0 / 'fastest'", "#a78bfa", -130)
    ]

    for speed_val, label, color, y_pos in speed_configs:
        t = turtle.Turtle()
        t.shape("turtle")
        t.color(color)
        t.pensize(3)
        t.speed(speed_val)

        # Move to starting lane
        t.penup()
        t.goto(-300, y_pos)
        t.pendown()

        # Write speed label
        t.write(f"speed({label})", font=("Arial", 10, "bold"))
        t.penup(); t.forward(120); t.pendown()

        # Draw a race track line
        t.forward(350)

    turtle.done()

if __name__ == "__main__":
    benchmark_turtle_speeds()
