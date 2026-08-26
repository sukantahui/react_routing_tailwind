"""
Module: 005_006_turtle-interaction
Topic: Topic 1 - Screen event listening: screen.listen()
File: auto_refocus_canvas_keeper.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates the Auto-Refocus pattern:
When users click outside the window or interact with dialogs, window focus is lost.
Binding `screen.onclick` to re-issue `screen.listen()` guarantees immediate keyboard recovery.
"""

import turtle

def run_auto_refocus_demo():
    screen = turtle.Screen()
    screen.title("Auto-Refocus Canvas Keeper - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)

    t = turtle.Turtle(); t.hideturtle(); t.speed(0); t.pensize(3)

    state = {"count": 0}

    def on_space():
        state["count"] += 1
        t.clear()
        t.penup(); t.goto(0, 0); t.pendown()
        t.color("#38bdf8")
        t.write(f"SPACE PRESSES: {state['count']}", align="center", font=("Arial", 16, "bold"))

        t.penup(); t.goto(0, -50); t.pendown()
        t.color("#94a3b8")
        t.write("Click anywhere to guarantee focus is active", align="center", font=("Arial", 10))

    def on_click(x, y):
        # Auto-Refocus Pattern: Re-claim window focus upon mouse click!
        screen.listen()
        t.penup(); t.goto(x, y); t.pendown()
        t.dot(12, "#34d399")

    screen.onkeypress(on_space, "space")
    screen.onclick(on_click)

    screen.listen()
    on_space()  # Draw initial UI
    screen.mainloop()

if __name__ == "__main__":
    run_auto_refocus_demo()
