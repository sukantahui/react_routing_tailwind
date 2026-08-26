"""
Module: 005_002_turtle-design
Topic: Topic 6 - Combining geometric fills to compose complex graphics
File: ashoka_chakra_tiranga_flag.py
Teacher & Mentor: Sukanta Hui

Description:
Renders the Indian National Flag (Tiranga) with exact geometric proportions,
3 filled color bands (Saffron, White, Green), and the 24-spoke Ashoka Chakra.
"""

import turtle

def draw_stripe(t, x, y, width, height, stroke_color, fill_color):
    t.penup()
    t.goto(x, y)
    t.pendown()
    t.color(stroke_color, fill_color)
    t.begin_fill()
    for _ in range(2):
        t.forward(width)
        t.right(90)
        t.forward(height)
        t.right(90)
    t.end_fill()

def draw_ashoka_chakra(t, center_x, center_y, radius):
    # Outer navy circle ring
    t.penup(); t.goto(center_x, center_y - radius); t.pendown()
    t.color("#000080")
    t.pensize(2)
    t.circle(radius)

    # 24 radial spokes
    t.penup(); t.goto(center_x, center_y); t.pendown()
    t.pensize(1)
    for _ in range(24):
        t.forward(radius)
        t.backward(radius)
        t.left(360 / 24)

def render_tiranga_flag():
    screen = turtle.Screen()
    screen.title("Indian National Flag (Tiranga) - Coder & AccoTax")
    screen.bgcolor("#0f172a")
    screen.setup(width=750, height=600)
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()

    flag_w, stripe_h = 360, 80
    start_x, start_y = -180, 120

    # 1. Top Stripe: India Saffron (#FF9933)
    draw_stripe(t, start_x, start_y, flag_w, stripe_h, "#ff9933", "#ff9933")

    # 2. Middle Stripe: White (#FFFFFF)
    draw_stripe(t, start_x, start_y - stripe_h, flag_w, stripe_h, "#ffffff", "#ffffff")

    # 3. Bottom Stripe: India Green (#138808)
    draw_stripe(t, start_x, start_y - (2 * stripe_h), flag_w, stripe_h, "#138808", "#138808")

    # 4. Center Ashoka Chakra (Radius = 35px in middle of white band)
    draw_ashoka_chakra(t, 0, start_y - (1.5 * stripe_h), radius=35)

    screen.update()
    turtle.done()

if __name__ == "__main__":
    render_tiranga_flag()
