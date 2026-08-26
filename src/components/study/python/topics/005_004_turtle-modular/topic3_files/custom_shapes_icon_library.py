"""
Module: 005_004_turtle-modular
Topic: Topic 3 - Building an extensible custom Shape & Icon Library
File: custom_shapes_icon_library.py
Teacher & Mentor: Sukanta Hui

Description:
Professional, reusable Turtle icon & shape library providing standardized
API methods for rendering UI vector icons:
- draw_gear(t, x, y, radius, teeth, color)
- draw_shield(t, x, y, width, height, color)
- draw_heart(t, x, y, size, color)
- draw_cloud(t, x, y, size, color)
- draw_sun(t, x, y, radius, rays, color)
"""

import turtle
import math

def draw_gear(t, x, y, radius=40, teeth=8, fill_color="#38bdf8", border_color="white"):
    """Draws a mechanical gear icon centered at (x, y)."""
    t.penup(); t.goto(x, y); t.setheading(0); t.pendown()
    t.color(border_color, fill_color)
    t.begin_fill()

    outer_r = radius
    inner_r = radius * 0.75
    angle_step = 360 / (teeth * 2)

    for i in range(teeth * 2):
        r = outer_r if i % 2 == 0 else inner_r
        rad = math.radians(i * angle_step)
        t.goto(x + r * math.cos(rad), y + r * math.sin(rad))
    t.goto(x + outer_r, y)
    t.end_fill()

    # Center bore hole
    t.penup(); t.goto(x, y - radius * 0.25); t.setheading(0); t.pendown()
    t.color("white", "#020617")
    t.begin_fill()
    t.circle(radius * 0.25)
    t.end_fill()

def draw_shield(t, x, y, width=60, height=80, fill_color="#10b981", border_color="white"):
    """Draws a cybersecurity/security badge shield anchored at top-center (x, y)."""
    t.penup(); t.goto(x - width/2, y); t.setheading(0); t.pendown()
    t.color(border_color, fill_color)
    t.begin_fill()
    t.forward(width)
    t.right(90)
    t.forward(height * 0.5)
    # Tapering to shield point
    t.goto(x, y - height)
    t.goto(x - width/2, y - height * 0.5)
    t.goto(x - width/2, y)
    t.end_fill()

def draw_heart(t, x, y, size=50, fill_color="#f43f5e"):
    """Draws a smooth cardiovascular heart icon anchored at bottom point (x, y)."""
    t.penup(); t.goto(x, y); t.setheading(0); t.pendown()
    t.color("white", fill_color)
    t.begin_fill()
    t.left(50)
    t.forward(size)
    t.circle(size * 0.35, 200)
    t.right(140)
    t.circle(size * 0.35, 200)
    t.forward(size)
    t.end_fill()

def draw_cloud(t, x, y, size=60, fill_color="#0ea5e9"):
    """Draws a fluffy cloud icon using overlapping circular arcs."""
    t.penup(); t.goto(x - size*0.6, y); t.setheading(0); t.pendown()
    t.color("white", fill_color)
    t.begin_fill()
    t.forward(size * 1.2)
    t.circle(size * 0.35, 180)
    t.circle(size * 0.45, 120)
    t.circle(size * 0.35, 120)
    t.end_fill()

def draw_sun(t, x, y, radius=30, rays=8, fill_color="#fbbf24"):
    """Draws a bright sun icon with radiating rays."""
    # Rays
    ray_len = radius * 0.5
    for i in range(rays):
        angle = i * (360 / rays)
        rad = math.radians(angle)
        x1 = x + radius * math.cos(rad)
        y1 = y + radius * math.sin(rad)
        x2 = x + (radius + ray_len) * math.cos(rad)
        y2 = y + (radius + ray_len) * math.sin(rad)
        t.penup(); t.goto(x1, y1); t.pendown()
        t.color(fill_color); t.pensize(3)
        t.goto(x2, y2)

    # Core Disc
    t.penup(); t.goto(x, y - radius); t.setheading(0); t.pendown()
    t.color("white", fill_color); t.pensize(2)
    t.begin_fill()
    t.circle(radius)
    t.end_fill()

def main():
    screen = turtle.Screen()
    screen.title("Custom Shape & Icon Library Showcase - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()

    # Render gallery of library icons
    draw_gear(t, -250, 0, radius=45, teeth=8, fill_color="#38bdf8")
    draw_shield(t, -120, 40, width=65, height=85, fill_color="#10b981")
    draw_heart(t, 20, -35, size=45, fill_color="#f43f5e")
    draw_cloud(t, 150, 0, size=50, fill_color="#06b6d4")
    draw_sun(t, 260, 10, radius=25, rays=8, fill_color="#fbbf24")

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
