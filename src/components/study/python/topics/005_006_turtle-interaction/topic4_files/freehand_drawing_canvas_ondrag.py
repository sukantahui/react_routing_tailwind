"""
Module: 005_006_turtle-interaction
Topic: Topic 4 - Mouse drag events with ondrag() for freehand drawing
File: freehand_drawing_canvas_ondrag.py
Teacher & Mentor: Sukanta Hui

Description:
Freehand Digital Whiteboard using `turtle.ondrag(fun)`:
- Drags pen cursor following mouse coordinates in real time.
- Color switching palette via number keys.
- Clear canvas on spacebar.
"""

import turtle

def run_freehand_canvas():
    screen = turtle.Screen()
    screen.title("Freehand Digital Whiteboard - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)

    # Drawing Pen Turtle
    pen = turtle.Turtle()
    pen.shape("circle")
    pen.shapesize(0.8, 0.8)
    pen.color("#38bdf8")
    pen.pensize(4)
    pen.speed(0)

    # Palette
    colors = {"1": "#38bdf8", "2": "#34d399", "3": "#fbbf24", "4": "#f43f5e", "5": "#a855f7"}

    def set_color(c):
        pen.color(c)
        pen.pencolor(c)

    def on_drag(x, y):
        # Continuous mouse dragging callback
        pen.ondrag(None)  # Temporarily disable to prevent event queue buildup
        pen.goto(x, y)
        pen.ondrag(on_drag)

    def on_space():
        pen.clear()

    # Bind Drag Callback
    pen.ondrag(on_drag)

    # Bind Keyboard Palette
    for k, col in colors.items():
        screen.onkeypress(lambda c=col: set_color(c), k)
    screen.onkeypress(on_space, "space")

    screen.listen()

    # HUD
    hud = turtle.Turtle(); hud.hideturtle()
    hud.penup(); hud.goto(0, 220); hud.pendown()
    hud.color("#94a3b8")
    hud.write("DRAG MOUSE: Draw  |  KEYS [1-5]: Colors  |  SPACE: Clear", align="center", font=("Arial", 11, "bold"))

    screen.mainloop()

if __name__ == "__main__":
    run_freehand_canvas()
