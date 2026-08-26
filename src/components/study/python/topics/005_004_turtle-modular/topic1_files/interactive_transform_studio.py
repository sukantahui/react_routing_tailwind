"""
Module: 005_004_turtle-modular
Topic: Topic 1 - Parameterized graphics (position x, y, radius, color, rotation)
File: interactive_transform_studio.py
Teacher & Mentor: Sukanta Hui

Description:
Interactive Transformation Engine showing the 3 Fundamental 2D Affine Transforms:
1. Translation: Moving shape origin to (x, y)
2. Scaling: Multiplying primitive dimensions by scale_factor
3. Rotation: Orienting the local coordinate system by theta degrees
"""

import turtle

def draw_arrow_compass(t, x, y, scale=1.0, rotation=0, color="#38bdf8"):
    """Draws a transformable directional arrow compass."""
    t.penup()
    t.goto(x, y)
    t.setheading(rotation)
    t.pendown()
    t.color("white", color)
    t.begin_fill()

    # Arrowhead + stem geometry scaled proportionally
    t.forward(60 * scale)
    t.left(90); t.forward(15 * scale)
    t.right(120); t.forward(40 * scale)
    t.right(120); t.forward(40 * scale)
    t.right(120); t.forward(15 * scale)
    t.left(90); t.forward(60 * scale)
    t.right(90); t.forward(20 * scale)

    t.end_fill()

def main():
    screen = turtle.Screen()
    screen.title("2D Affine Transform Studio - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    # 1. Base scale at 0 rotation
    draw_arrow_compass(t, -200, 0, scale=0.8, rotation=0, color="#38bdf8")

    # 2. Scaled 1.2x at 90 deg rotation
    draw_arrow_compass(t, -50, -50, scale=1.2, rotation=90, color="#fbbf24")

    # 3. Scaled 1.0x at 180 deg rotation
    draw_arrow_compass(t, 100, 50, scale=1.0, rotation=180, color="#f43f5e")

    # 4. Scaled 0.7x at 270 deg rotation
    draw_arrow_compass(t, 220, 0, scale=0.7, rotation=270, color="#34d399")

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
