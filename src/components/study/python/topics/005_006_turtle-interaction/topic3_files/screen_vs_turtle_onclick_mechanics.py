"""
Module: 005_006_turtle-interaction
Topic: Topic 3 - Mouse click event handling: screen.onclick() and turtle.onclick()
File: screen_vs_turtle_onclick_mechanics.py
Teacher & Mentor: Sukanta Hui

Description:
Direct comparison between two mouse click targets:
1. `screen.onclick(fun)`: Fires when user clicks ANYWHERE on the global canvas background.
   Callback receives `(x, y)` canvas coordinates.
2. `turtle.onclick(fun)`: Fires ONLY when the user clicks directly on that specific Turtle's shape/sprite!
   Callback receives `(x, y)` relative to turtle.
"""

import turtle
import random

def run_onclick_comparison():
    screen = turtle.Screen()
    screen.title("Screen vs Turtle onclick Mechanics - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)

    # 1. Global Canvas Stamp Turtle
    brush_t = turtle.Turtle()
    brush_t.hideturtle()
    brush_t.speed(0)

    # 2. Interactive Target Turtle (Sprite Click Target)
    target_t = turtle.Turtle()
    target_t.shape("circle")
    target_t.shapesize(3, 3)
    target_t.color("#f43f5e", "#fbbf24")
    target_t.penup()
    target_t.goto(0, 50)

    # Instructions
    info_t = turtle.Turtle(); info_t.hideturtle()
    info_t.penup(); info_t.goto(0, 200); info_t.pendown()
    info_t.color("#38bdf8")
    info_t.write("Click Background: Stamp Star  |  Click Target Turtle: Spin & Relocate", align="center", font=("Arial", 11, "bold"))

    # Handler 1: Screen Click Callback (Fires on canvas background)
    def on_screen_clicked(x, y):
        brush_t.penup(); brush_t.goto(x, y); brush_t.pendown()
        brush_t.color("#38bdf8", "#0284c7"); brush_t.begin_fill()
        for _ in range(5): brush_t.forward(15); brush_t.right(144)
        brush_t.end_fill()

    # Handler 2: Turtle Click Callback (Fires ONLY when clicking the target turtle)
    def on_target_clicked(x, y):
        # Animate Spin & Relocate
        for _ in range(12):
            target_t.right(30)
        nx = random.randint(-250, 250)
        ny = random.randint(-150, 150)
        target_t.goto(nx, ny)

    # Bind Events
    screen.onclick(on_screen_clicked)
    target_t.onclick(on_target_clicked)

    screen.mainloop()

if __name__ == "__main__":
    run_onclick_comparison()
