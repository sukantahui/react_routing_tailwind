"""
Module: 005_002_turtle-design
Topic: Topic 4 - Background canvas design and window customization
File: screen_dimension_and_scroll_canvas.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates querying window geometry attributes and understanding the distinction
between physical viewport window (setup) and logical canvas world (screensize).
"""

import turtle

def inspect_canvas_geometry():
    screen = turtle.Screen()
    screen.title("Geometry Inspector - Coder & AccoTax")
    screen.bgcolor("#0f172a")

    # Set viewport to 700x500
    screen.setup(width=700, height=500)

    # Query active screen properties
    win_w = screen.window_width()
    win_h = screen.window_height()

    print("Screen Geometry Attributes:")
    print(f"  Viewport Width : {win_w}px (Half bounds: -{win_w//2} to +{win_w//2})")
    print(f"  Viewport Height: {win_h}px (Half bounds: -{win_h//2} to +{win_h//2})")

    t = turtle.Turtle()
    t.color("#38bdf8")
    t.pensize(2)

    # Draw Crosshair Center Lines
    t.penup(); t.goto(-win_w // 2, 0); t.pendown(); t.goto(win_w // 2, 0)
    t.penup(); t.goto(0, -win_h // 2); t.pendown(); t.goto(0, win_h // 2)

    # Label Origin and Bounds
    t.penup(); t.goto(10, 10)
    t.write("Origin (0, 0)", font=("Arial", 11, "bold"))

    t.hideturtle()
    turtle.done()

if __name__ == "__main__":
    inspect_canvas_geometry()
