"""
Module: 005_003_turtle-patterns
Topic: Topic 1 - Polygon mathematics: The 360/n degree exterior angle rule
File: polygon_mathematics_theorem.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates the mathematical derivation of regular polygon geometry:
- Total exterior angle sum = 360°
- Single exterior turn angle theta = 360 / n
- Single interior angle phi = 180 - (360 / n) = ((n - 2) * 180) / n
"""

import turtle

def draw_regular_polygon(t, x, y, sides, side_length, stroke_color, fill_color):
    """Draws any regular N-sided polygon at given coordinate."""
    exterior_angle = 360.0 / sides
    interior_angle = ((sides - 2) * 180.0) / sides

    print(f"Polygon with {sides} sides:")
    print(f"  Exterior Turn Angle: {exterior_angle:.2f}°")
    print(f"  Interior Angle     : {interior_angle:.2f}°")

    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    t.color(stroke_color, fill_color)
    t.pensize(2)

    t.begin_fill()
    for _ in range(sides):
        t.forward(side_length)
        t.left(exterior_angle)
    t.end_fill()

def demonstrate_polygon_family():
    screen = turtle.Screen()
    screen.title("Polygon Mathematics Family - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=800, height=600)

    t = turtle.Turtle()
    t.speed(5)

    # 1. Triangle (n=3, ext=120°)
    draw_regular_polygon(t, -300, 50, sides=3, side_length=90, stroke_color="#38bdf8", fill_color="#0284c7")

    # 2. Square (n=4, ext=90°)
    draw_regular_polygon(t, -160, 50, sides=4, side_length=80, stroke_color="#34d399", fill_color="#065f46")

    # 3. Pentagon (n=5, ext=72°)
    draw_regular_polygon(t, -10, 50, sides=5, side_length=65, stroke_color="#fbbf24", fill_color="#d97706")

    # 4. Octagon (n=8, ext=45°)
    draw_regular_polygon(t, 150, 50, sides=8, side_length=45, stroke_color="#f43f5e", fill_color="#be123c")

    t.hideturtle()
    turtle.done()

if __name__ == "__main__":
    demonstrate_polygon_family()
