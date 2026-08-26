"""
Module: 005_006_turtle-interaction
Topic: Topic 0 - Event-driven programming model concepts
File: interactive_traffic_light_controller.py
Teacher & Mentor: Sukanta Hui

Description:
Interactive Traffic Light State Machine:
Demonstrates how user event triggers transition internal state
and trigger clean redraws.
"""

import turtle

def run_traffic_light_demo():
    screen = turtle.Screen()
    screen.title("Event-Driven Traffic Light Controller - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=600)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()

    state = {"active_light": "red"}  # "red", "yellow", "green"

    def render_traffic_light():
        t.clear()

        # Traffic Housing
        t.penup(); t.goto(-50, -180); t.pendown()
        t.color("#475569", "#0f172a"); t.pensize(3); t.begin_fill()
        for _ in range(2): t.forward(100); t.left(90); t.forward(300); t.left(90)
        t.end_fill()

        # Lights configuration: (name, y, on_color, off_color)
        lights = [
            ("red", 60, "#ef4444", "#450a0a"),
            ("yellow", -30, "#eab308", "#422006"),
            ("green", -120, "#22c55e", "#052e16")
        ]

        for name, ly, on_col, off_col in lights:
            t.penup(); t.goto(0, ly); t.pendown()
            col = on_col if state["active_light"] == name else off_col
            t.color(col, col); t.begin_fill(); t.circle(30); t.end_fill()

        # Instructions
        t.penup(); t.goto(0, 180); t.pendown()
        t.color("#38bdf8")
        t.write("PRESS SPACEBAR TO ADVANCE LIGHT CYCLE", align="center", font=("Arial", 11, "bold"))

        screen.update()

    def advance_light():
        order = {"red": "green", "green": "yellow", "yellow": "red"}
        state["active_light"] = order[state["active_light"]]
        render_traffic_light()

    # Initial Render
    render_traffic_light()

    # Bind Event
    screen.onkeypress(advance_light, "space")
    screen.listen()
    screen.mainloop()

if __name__ == "__main__":
    run_traffic_light_demo()
