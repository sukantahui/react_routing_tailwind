"""
Module: 005_004_turtle-modular
Topic: Topic 5 - Clean code and DRY principles in graphical programming
File: spaghetti_vs_dry_refactoring.py
Teacher & Mentor: Sukanta Hui

Description:
Side-by-side demonstration of DRY (Don't Repeat Yourself) Refactoring:
- ANTI-PATTERN: Copy-pasting 50 lines of sequential forward/left/fill commands for each house.
- BEST PRACTICE: Single parameterized `draw_house()` function called over a coordinate array.
"""

import turtle

# ==============================================================================
# ANTI-PATTERN (SPAGHETTI CODE): DO NOT WRITE THIS!
# ==============================================================================
def draw_spaghetti_houses_bad():
    """Violates DRY principle with massive copy-paste duplication."""
    t = turtle.Turtle()
    # House 1
    t.penup(); t.goto(-200, 0); t.pendown()
    t.color("blue", "lightblue"); t.begin_fill()
    t.forward(80); t.left(90); t.forward(80); t.left(90); t.forward(80); t.left(90); t.forward(80); t.left(90)
    t.end_fill()
    # Roof 1
    t.penup(); t.goto(-210, 80); t.pendown()
    t.color("red", "pink"); t.begin_fill()
    t.goto(-160, 130); t.goto(-110, 80); t.goto(-210, 80)
    t.end_fill()
    # ... Repeated 10 more times for House 2, House 3 ...

# ==============================================================================
# REFACTORED BEST PRACTICE (CLEAN DRY CODE)
# ==============================================================================
def draw_rectangle(t, x, y, width, height, fill_color, border_color="white"):
    """Single Responsibility: Draws a clean rectangle."""
    t.penup(); t.goto(x, y); t.setheading(0); t.pendown()
    t.color(border_color, fill_color)
    t.begin_fill()
    for _ in range(2):
        t.forward(width); t.left(90); t.forward(height); t.left(90)
    t.end_fill()

def draw_house(t, x, y, size=80, wall_color="#0284c7", roof_color="#f43f5e"):
    """Composite DRY Function."""
    # Base
    draw_rectangle(t, x, y, size, size*0.8, wall_color)
    # Roof
    t.penup(); t.goto(x - size*0.1, y + size*0.8); t.pendown()
    t.color("white", roof_color)
    t.begin_fill()
    t.goto(x + size*0.5, y + size*1.3)
    t.goto(x + size*1.1, y + size*0.8)
    t.goto(x - size*0.1, y + size*0.8)
    t.end_fill()

def main():
    screen = turtle.Screen()
    screen.title("DRY Refactoring Showcase - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    # Data-driven clean execution
    village_dataset = [
        {"x": -260, "y": -50, "size": 90, "wall": "#0284c7", "roof": "#f43f5e"},
        {"x": -70,  "y": -50, "size": 110, "wall": "#059669", "roof": "#eab308"},
        {"x": 140,  "y": -50, "size": 80,  "wall": "#7c3aed", "roof": "#fb923c"}
    ]

    for house in village_dataset:
        draw_house(t, house["x"], house["y"], house["size"], house["wall"], house["roof"])

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
