"""
Module: 005_003_turtle-patterns
Topic: Topic 2 - Nested loops for complex geometric pattern creation
File: spinning_fractal_squares.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates nested loop depth scaling:
- Outer Loop: Iterates over 50 rotational angle steps
- Inner Loop: Draws a 4-sided square with dynamic length scaling
"""

import turtle

def draw_spinning_vortex():
    screen = turtle.Screen()
    screen.title("Spinning Fractal Vortex - Coder & AccoTax")
    screen.bgcolor("#020617")

    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.pensize(2)

    # 60 outer rotations
    for i in range(60):
        # Color shifting palette
        t.color("#38bdf8" if i % 3 == 0 else "#a78bfa" if i % 3 == 1 else "#34d399")

        # Inner square with side length expanding with i
        for _ in range(4):
            t.forward(i * 3 + 20)
            t.left(90)

        # 5-degree rotational twist per square
        t.left(6)

    turtle.done()

if __name__ == "__main__":
    draw_spinning_vortex()
