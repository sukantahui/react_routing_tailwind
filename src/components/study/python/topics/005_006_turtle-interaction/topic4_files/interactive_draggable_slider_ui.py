"""
Module: 005_006_turtle-interaction
Topic: Topic 4 - Mouse drag events with ondrag() for freehand drawing
File: interactive_draggable_slider_ui.py
Teacher & Mentor: Sukanta Hui

Description:
Custom Draggable GUI Slider Widget:
- Constrains horizontal dragging between -150 and +150 px.
- Maps slider knob position to a 0% - 100% value readout.
"""

import turtle

def run_slider_widget():
    screen = turtle.Screen()
    screen.title("Draggable GUI Slider Widget - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)

    # 1. Slider Track Background
    track_t = turtle.Turtle(); track_t.hideturtle(); track_t.speed(0)
    track_t.penup(); track_t.goto(-150, 0); track_t.pendown()
    track_t.color("#334155"); track_t.pensize(8); track_t.forward(300)

    # 2. Draggable Knob Turtle
    knob = turtle.Turtle()
    knob.shape("circle")
    knob.shapesize(1.6, 1.6)
    knob.color("white", "#38bdf8")
    knob.penup()
    knob.goto(0, 0)

    # 3. Readout Display Turtle
    readout_t = turtle.Turtle(); readout_t.hideturtle(); readout_t.speed(0)

    def update_readout(knob_x):
        # Map [-150, 150] -> [0%, 100%]
        pct = int(((knob_x + 150) / 300.0) * 100)
        readout_t.clear()
        readout_t.penup(); readout_t.goto(0, 80); readout_t.pendown()
        readout_t.color("#34d399")
        readout_t.write(f"VOLUME LEVEL: {pct}%", align="center", font=("Arial", 16, "bold"))

    def on_drag_knob(x, y):
        knob.ondrag(None)
        # Constrain X to slider bounds [-150, 150] and lock Y = 0
        clamped_x = max(-150, min(150, x))
        knob.goto(clamped_x, 0)
        update_readout(clamped_x)
        knob.ondrag(on_drag_knob)

    knob.ondrag(on_drag_knob)
    update_readout(0)

    screen.mainloop()

if __name__ == "__main__":
    run_slider_widget()
