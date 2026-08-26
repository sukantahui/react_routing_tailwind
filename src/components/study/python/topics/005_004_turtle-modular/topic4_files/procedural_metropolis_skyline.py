"""
Module: 005_004_turtle-modular
Topic: Topic 4 - Combining multiple modular shapes into complex town and nature scenes
File: procedural_metropolis_skyline.py
Teacher & Mentor: Sukanta Hui

Description:
Procedural Metropolis generator:
1. Moon & Starfield
2. Distant Dark Skyscraper Silhouettes
3. Foreground Tower Blocks with Grid Windows
4. Road with Dashed Center Lane Lines & Street Lamps
"""

import turtle
import random

def draw_star(t, x, y, size=10):
    t.penup(); t.goto(x, y); t.pendown()
    t.color("#fef08a", "#fef08a")
    t.begin_fill()
    for _ in range(5):
        t.forward(size); t.right(144)
    t.end_fill()

def draw_skyscraper(t, x, y, width, height, body_color="#1e293b", has_spire=False):
    """Draws a modern skyscraper with antenna spire and illuminated window matrix."""
    # 1. Building Body
    t.penup(); t.goto(x, y); t.setheading(0); t.pendown()
    t.color("#475569", body_color)
    t.begin_fill()
    for _ in range(2):
        t.forward(width); t.left(90)
        t.forward(height); t.left(90)
    t.end_fill()

    # 2. Spire if requested
    if has_spire:
        t.penup(); t.goto(x + width/2, y + height); t.pendown()
        t.color("#ef4444"); t.pensize(2)
        t.goto(x + width/2, y + height + 35)
        t.dot(6, "#ef4444")
        t.pensize(1)

    # 3. Window Grid
    cols = max(2, int(width // 14))
    rows = max(3, int(height // 18))
    win_w = (width - (cols + 1) * 3) / cols
    win_h = 7

    for r in range(rows):
        for c in range(cols):
            # 60% chance of illuminated window
            if random.random() > 0.35:
                wx = x + 3 + c * (win_w + 3)
                wy = y + 8 + r * (win_h + 8)
                t.penup(); t.goto(wx, wy); t.pendown()
                t.color("#fef08a", "#fef08a")
                t.begin_fill()
                for _ in range(2):
                    t.forward(win_w); t.left(90); t.forward(win_h); t.left(90)
                t.end_fill()

def draw_road(t, y=-150, height=80):
    """Draws an asphalt roadway with dashed yellow center dividing lines."""
    # Asphalt
    t.penup(); t.goto(-425, y); t.setheading(0); t.pendown()
    t.color("#0f172a", "#1e293b")
    t.begin_fill()
    for _ in range(2):
        t.forward(850); t.right(90); t.forward(height); t.right(90)
    t.end_fill()

    # Dashed Yellow Stripe
    dash_y = y - height / 2
    t.penup(); t.goto(-425, dash_y); t.pendown()
    t.color("#fbbf24"); t.pensize(3)
    for x in range(-425, 425, 40):
        t.penup(); t.goto(x, dash_y); t.pendown()
        t.forward(20)

def main():
    random.seed(42)  # Deterministic procedural layout
    screen = turtle.Screen()
    screen.title("Procedural Metropolis Skyline - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=850, height=600)
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()

    # 1. Starfield
    for _ in range(25):
        draw_star(t, random.randint(-400, 400), random.randint(50, 270), random.randint(6, 12))

    # 2. Moon
    t.penup(); t.goto(-280, 200); t.pendown()
    t.color("#ffffff", "#f8fafc"); t.begin_fill(); t.circle(35); t.end_fill()

    # 3. Distant Skyline Layer (Dark Blue-Gray)
    for x in range(-420, 400, 65):
        h = random.randint(140, 260)
        draw_skyscraper(t, x, -150, width=60, height=h, body_color="#091428", has_spire=False)

    # 4. Foreground Tower Blocks (Vibrant Illuminated)
    for x in range(-400, 380, 85):
        h = random.randint(180, 320)
        draw_skyscraper(t, x, -150, width=75, height=h, body_color="#0f172a", has_spire=(h > 260))

    # 5. Road
    draw_road(t, y=-150, height=90)

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
