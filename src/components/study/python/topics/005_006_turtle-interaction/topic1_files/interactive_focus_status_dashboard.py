"""
Module: 005_006_turtle-interaction
Topic: Topic 1 - Screen event listening: screen.listen()
File: interactive_focus_status_dashboard.py
Teacher & Mentor: Sukanta Hui

Description:
Interactive Focus Dashboard demonstrating how the OS routes keyboard signals
only when the Turtle canvas holds active focus.
"""

import turtle

def run_focus_dashboard():
    screen = turtle.Screen()
    screen.title("Interactive Focus Status Dashboard - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()
    history = []

    def log_key(key_name):
        history.append(key_name)
        if len(history) > 8: history.pop(0)

        t.clear()
        # Dashboard Header
        t.penup(); t.goto(0, 160); t.pendown()
        t.color("#38bdf8")
        t.write("FOCUS ACTIVE · KEYBOARD STREAM LIVE", align="center", font=("Arial", 12, "bold"))

        # Render Key Stream Badges
        for i, k in enumerate(history):
            x = -240 + (i * 65)
            t.penup(); t.goto(x, 20); t.pendown()
            t.color("#334155", "#0f172a"); t.begin_fill()
            for _ in range(2): t.forward(55); t.left(90); t.forward(45); t.left(90)
            t.end_fill()

            t.penup(); t.goto(x + 27, 32); t.pendown()
            t.color("#34d399")
            t.write(k, align="center", font=("Courier", 12, "bold"))

        screen.update()

    # Bind multiple test keys
    for k in ["W", "A", "S", "D", "w", "a", "s", "d", "space"]:
        screen.onkeypress(lambda key=k: log_key(key.upper()), k)

    # Claim focus
    screen.listen()
    log_key("READY")
    screen.mainloop()

if __name__ == "__main__":
    run_focus_dashboard()
