"""
Module: 005_006_turtle-interaction
Topic: Topic 1 - Screen event listening: screen.listen()
File: screen_listen_focus_mechanics.py
Teacher & Mentor: Sukanta Hui

Description:
Deep dive into `screen.listen()` and GUI Window Focus:
- Why keystrokes fail without `listen()`: The OS does not route keyboard events
  to a window until it claims focus via Tkinter's `focus_force()` / `listen()`.
- Interactive steering demonstrator showing live key capture telemetry.
"""

import turtle

def run_listen_focus_demo():
    screen = turtle.Screen()
    screen.title("Screen Focus Mechanics - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()
    ship = {"x": 0, "y": 0, "angle": 0, "speed": 10}

    def render_scene():
        t.clear()

        # Focus Status Banner
        t.penup(); t.goto(-320, 220); t.pendown()
        t.color("#34d399")
        t.write("FOCUS STATUS: LISTENING ACTIVE (screen.listen())", font=("Arial", 11, "bold"))

        t.penup(); t.goto(-320, 190); t.pendown()
        t.color("#94a3b8")
        t.write("USE ARROWS: Left/Right to Rotate · Up to Move Forward", font=("Arial", 10))

        # Ship Geometry
        t.penup(); t.goto(ship["x"], ship["y"]); t.setheading(ship["angle"]); t.pendown()
        t.color("#38bdf8", "#0284c7"); t.begin_fill()
        t.forward(30); t.left(140); t.forward(35); t.left(80); t.forward(35)
        t.end_fill()

        screen.update()

    def turn_left():
        ship["angle"] = (ship["angle"] + 15) % 360
        render_scene()

    def turn_right():
        ship["angle"] = (ship["angle"] - 15) % 360
        render_scene()

    def move_forward():
        rad = turtle.math.radians(ship["angle"])
        ship["x"] += ship["speed"] * turtle.math.cos(rad)
        ship["y"] += ship["speed"] * turtle.math.sin(rad)
        render_scene()

    # Register Key Bindings
    screen.onkeypress(turn_left, "Left")
    screen.onkeypress(turn_right, "Right")
    screen.onkeypress(move_forward, "Up")

    # CRITICAL: Claim keyboard focus!
    screen.listen()

    render_scene()
    screen.mainloop()

if __name__ == "__main__":
    run_listen_focus_demo()
