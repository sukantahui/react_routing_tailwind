"""
Module: 005_006_turtle-interaction
Topic: Topic 2 - Keyboard input binding: screen.onkey() and screen.onkeypress()
File: interactive_keysym_inspector.py
Teacher & Mentor: Sukanta Hui

Description:
Interactive Keysym Inspector:
Displays exact Tkinter keysym names for common keys:
- Arrow keys: "Up", "Down", "Left", "Right"
- Actions: "space", "Return", "Escape", "Tab", "BackSpace"
- Letters: "w", "a", "s", "d" / "W", "A", "S", "D"
"""

import turtle

def run_keysym_inspector():
    screen = turtle.Screen()
    screen.title("Interactive Keysym Inspector - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()
    active_keys = []

    def handle_key(name):
        active_keys.append(name)
        if len(active_keys) > 6: active_keys.pop(0)

        t.clear()
        t.penup(); t.goto(0, 150); t.pendown()
        t.color("#38bdf8")
        t.write("KEYSYM INSPECTOR ACTIVE · PRESS ANY KEY", align="center", font=("Arial", 12, "bold"))

        # Render Detected Key Badges
        for idx, k in enumerate(active_keys):
            y = 60 - (idx * 38)
            t.penup(); t.goto(-140, y); t.pendown()
            t.color("#334155", "#0f172a"); t.pensize(2); t.begin_fill()
            for _ in range(2): t.forward(280); t.left(90); t.forward(30); t.left(90)
            t.end_fill()

            t.penup(); t.goto(0, y + 8); t.pendown()
            t.color("#34d399")
            t.write(f"KEYSYM DETECTED: '{k}'", align="center", font=("Courier", 11, "bold"))

        screen.update()

    # Bind broad spectrum of keysyms
    test_keys = [
        "Up", "Down", "Left", "Right", "space", "Return", "Escape", "Tab",
        "w", "s", "a", "d", "W", "S", "A", "D", "r", "R", "c", "C"
    ]

    for k in test_keys:
        screen.onkeypress(lambda key=k: handle_key(key), k)

    screen.listen()
    handle_key("START")
    screen.mainloop()

if __name__ == "__main__":
    run_keysym_inspector()
