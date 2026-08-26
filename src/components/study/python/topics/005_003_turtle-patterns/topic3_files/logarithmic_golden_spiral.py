"""
Module: 005_003_turtle-patterns
Topic: Topic 3 - Spirals, Archimedean spirals, and radial symmetry
File: logarithmic_golden_spiral.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates drawing logarithmic and Fibonacci golden spirals:
- Radial distance grows exponentially: r = a * e^(b * theta)
- Approximated in Turtle using 90-degree quarter-circle arcs of Fibonacci radii.
"""

import turtle

def draw_fibonacci_spiral():
    screen = turtle.Screen()
    screen.title("Fibonacci Golden Spiral - Coder & AccoTax")
    screen.bgcolor("#020617")

    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.pensize(2)

    # Fibonacci sequence values for arc radii
    fib = [2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
    palette = ["#38bdf8", "#34d399", "#fbbf24", "#f43f5e", "#a78bfa"]

    t.penup(); t.goto(0, -50); t.pendown()

    for i, radius in enumerate(fib):
        t.color(palette[i % len(palette)])
        # Draw 90-degree quarter circle arc
        t.circle(radius, 90)

    turtle.done()

if __name__ == "__main__":
    draw_fibonacci_spiral()
