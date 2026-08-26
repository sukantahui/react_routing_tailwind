"""
Module: 005_006_turtle-interaction
Topic: Topic 6 - Managing game and interactive states (active, paused, game-over)
File: modal_pause_overlay_system.py
Teacher & Mentor: Sukanta Hui

Description:
Modal Pause Dialog & Level Transition System:
Renders a stylized semi-transparent dark backdrop overlay and interactive modal dialog
when the game enters the PAUSED state.
"""

import turtle

def run_modal_pause_demo():
    screen = turtle.Screen()
    screen.title("Modal Pause Overlay System - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()
    is_paused = [False]
    particles = [{"x": -200 + i*40, "y": 0, "vy": (i % 3 + 2)} for i in range(10)]

    def toggle_pause():
        is_paused[0] = not is_paused[0]

    screen.onkeypress(toggle_pause, "Escape")
    screen.onkeypress(toggle_pause, "space")
    screen.listen()

    def tick():
        t.clear()

        # Update Background Simulation
        if not is_paused[0]:
            for p in particles:
                p["y"] = (p["y"] + p["vy"])
                if p["y"] > 250: p["y"] = -250

        # Draw Particles
        for p in particles:
            t.penup(); t.goto(p["x"], p["y"]); t.pendown()
            t.color("#38bdf8"); t.dot(12)

        # Draw Modal Overlay if Paused
        if is_paused[0]:
            # Dim Backdrop Box
            t.penup(); t.goto(-200, -120); t.pendown()
            t.color("#38bdf8", "#0f172a"); t.pensize(3); t.begin_fill()
            for _ in range(2): t.forward(400); t.left(90); t.forward(240); t.left(90)
            t.end_fill()

            # Modal Text
            t.penup(); t.goto(0, 50); t.pendown(); t.color("#fbbf24")
            t.write("PAUSE MENU", align="center", font=("Arial", 18, "bold"))

            t.penup(); t.goto(0, 0); t.pendown(); t.color("#34d399")
            t.write("► [SPACE] RESUME GAME", align="center", font=("Arial", 12, "bold"))

            t.penup(); t.goto(0, -40); t.pendown(); t.color("#f43f5e")
            t.write("► [ESC] TOGGLE PAUSE", align="center", font=("Arial", 12, "bold"))
        else:
            t.penup(); t.goto(-330, 230); t.pendown(); t.color("#34d399")
            t.write("SIMULATION RUNNING · PRESS ESCAPE TO PAUSE", font=("Arial", 11, "bold"))

        screen.update()
        screen.ontimer(tick, 16)

    tick()
    screen.mainloop()

if __name__ == "__main__":
    run_modal_pause_demo()
