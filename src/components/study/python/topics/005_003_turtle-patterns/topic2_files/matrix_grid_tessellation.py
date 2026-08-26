"""
Module: 005_003_turtle-patterns
Topic: Topic 2 - Nested loops for complex geometric pattern creation
File: matrix_grid_tessellation.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates 2D matrix grid tessellation using nested loops:
- Outer Loop: Iterates over rows (Y coordinates)
- Inner Loop: Iterates over columns (X coordinates)
"""

import turtle

def draw_tessellation_grid():
    screen = turtle.Screen()
    screen.title("2D Matrix Grid Tessellation - Coder & AccoTax")
    screen.bgcolor("#0f172a")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    rows, cols = 5, 5
    cell_size = 60
    spacing = 75
    start_x, start_y = -150, 150

    # Outer Loop: Rows (Y)
    for r in range(rows):
        y = start_y - (r * spacing)

        # Inner Loop: Columns (X)
        for c in range(cols):
            x = start_x + (c * spacing)

            # Move to cell position
            t.penup()
            t.goto(x, y)
            t.pendown()

            # Dynamic color pattern based on (r + c) parity
            t.color("#fbbf24" if (r + c) % 2 == 0 else "#f43f5e")

            # Draw cell diamond
            for _ in range(4):
                t.forward(cell_size / 2)
                t.left(90)

    screen.update()
    turtle.done()

if __name__ == "__main__":
    draw_tessellation_grid()
