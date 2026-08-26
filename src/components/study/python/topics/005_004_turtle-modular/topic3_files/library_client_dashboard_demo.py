"""
Module: 005_004_turtle-modular
Topic: Topic 3 - Building an extensible custom Shape & Icon Library
File: library_client_dashboard_demo.py
Teacher & Mentor: Sukanta Hui

Description:
Client application consuming the custom shape library (`custom_shapes_icon_library.py`)
to render a modern telemetry status dashboard in Python Turtle.
"""

import turtle
from custom_shapes_icon_library import draw_gear, draw_shield, draw_cloud, draw_heart

def draw_metric_card(t, x, y, width, height, title, value, icon_type, icon_color):
    """Draws a modern telemetry card featuring a customized vector icon."""
    # 1. Card Background
    t.penup(); t.goto(x, y); t.setheading(0); t.pendown()
    t.color("#334155", "#0f172a")
    t.begin_fill()
    for _ in range(2):
        t.forward(width); t.left(90)
        t.forward(height); t.left(90)
    t.end_fill()

    # 2. Render Icon based on type
    icon_center_x = x + 35
    icon_center_y = y + height - 40
    if icon_type == "gear":
        draw_gear(t, icon_center_x, icon_center_y, radius=20, teeth=6, fill_color=icon_color)
    elif icon_type == "shield":
        draw_shield(t, icon_center_x, icon_center_y + 15, width=32, height=40, fill_color=icon_color)
    elif icon_type == "cloud":
        draw_cloud(t, icon_center_x, icon_center_y, size=24, fill_color=icon_color)
    elif icon_type == "heart":
        draw_heart(t, icon_center_x, icon_center_y - 15, size=20, fill_color=icon_color)

    # 3. Text Labels
    t.penup(); t.goto(x + 75, y + height - 35); t.pendown()
    t.color("#94a3b8")
    t.write(title, font=("Arial", 10, "normal"))

    t.penup(); t.goto(x + 75, y + 18); t.pendown()
    t.color("#f8fafc")
    t.write(value, font=("Arial", 14, "bold"))

def main():
    screen = turtle.Screen()
    screen.title("Telemetry Dashboard Client - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=850, height=450)
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    # Render 4 Dashboard Cards
    draw_metric_card(t, -380, -50, 175, 110, "SYSTEM HEALTH", "99.98%", "shield", "#10b981")
    draw_metric_card(t, -185, -50, 175, 110, "CPU UTILIZATION", "42.5%", "gear", "#38bdf8")
    draw_metric_card(t, 10, -50, 175, 110, "CLOUD STORAGE", "1.24 TB", "cloud", "#06b6d4")
    draw_metric_card(t, 205, -50, 175, 110, "USER SATISFACTION", "4.9 / 5.0", "heart", "#f43f5e")

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
