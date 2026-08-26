"""
Module: 005_006_turtle-interaction
Topic: Topic 3 - Mouse click event handling: screen.onclick() and turtle.onclick()
File: multi_button_mouse_dispatcher.py
Teacher & Mentor: Sukanta Hui

Description:
Multi-Button Mouse Event Dispatching:
- Left Click (btn=1): Stamps a vibrant circle
- Middle Click / Scroll Wheel (btn=2): Clears canvas
- Right Click (btn=3): Stamps an emerald square
"""

import turtle

def run_multi_button_demo():
    screen = turtle.Screen()
    screen.title("Multi-Button Mouse Dispatcher - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)

    t = turtle.Turtle(); t.hideturtle(); t.speed(0); t.pensize(2)

    # Header HUD
    t.penup(); t.goto(0, 200); t.pendown()
    t.color("#38bdf8")
    t.write("LEFT CLICK: Circle  |  RIGHT CLICK: Square  |  MIDDLE CLICK: Clear", align="center", font=("Arial", 11, "bold"))

    # Handler 1: Left Click (Button 1)
    def on_left_click(x, y):
        t.penup(); t.goto(x, y); t.pendown()
        t.color("#f43f5e", "#fbbf24"); t.begin_fill(); t.circle(20); t.end_fill()

    # Handler 2: Right Click (Button 3)
    def on_right_click(x, y):
        t.penup(); t.goto(x - 20, y - 20); t.pendown()
        t.color("#34d399", "#059669"); t.begin_fill()
        for _ in range(4): t.forward(40); t.left(90)
        t.end_fill()

    # Handler 3: Middle Click (Button 2)
    def on_middle_click(x, y):
        t.clear()
        t.penup(); t.goto(0, 200); t.pendown()
        t.color("#38bdf8")
        t.write("CANVAS CLEARED · LEFT: Circle | RIGHT: Square | MIDDLE: Clear", align="center", font=("Arial", 11, "bold"))

    # Bind Mouse Buttons
    screen.onclick(on_left_click, btn=1)
    screen.onclick(on_middle_click, btn=2)
    screen.onclick(on_right_click, btn=3)

    screen.mainloop()

if __name__ == "__main__":
    run_multi_button_demo()
