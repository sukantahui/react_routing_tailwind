"""
Module: 005_006_turtle-interaction
Topic: Topic 6 - Managing game and interactive states (active, paused, game-over)
File: state_driven_input_router.py
Teacher & Mentor: Sukanta Hui

Description:
State-Driven Input Router Pattern:
Demonstrates dispatching the same physical keypress (e.g. Spacebar, Esc, Enter)
to completely different action handlers depending on current application state.
"""

import turtle

def run_input_router_demo():
    screen = turtle.Screen()
    screen.title("State-Driven Input Router - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()
    state = {"mode": "SPLASH"}  # "SPLASH", "LEVEL_SELECT", "IN_GAME"

    # Input Router Function
    def on_enter_key():
        curr = state["mode"]
        if curr == "SPLASH":
            state["mode"] = "LEVEL_SELECT"
        elif curr == "LEVEL_SELECT":
            state["mode"] = "IN_GAME"
        elif curr == "IN_GAME":
            state["mode"] = "SPLASH"
        render_state()

    def render_state():
        t.clear()
        curr = state["mode"]

        t.penup(); t.goto(0, 80); t.pendown()
        t.color("#38bdf8")
        t.write(f"CURRENT STATE: [{curr}]", align="center", font=("Arial", 16, "bold"))

        t.penup(); t.goto(0, 0); t.pendown()
        t.color("#34d399")
        if curr == "SPLASH":
            t.write("PRESS [ENTER] TO CHOOSE LEVEL", align="center", font=("Arial", 12, "bold"))
        elif curr == "LEVEL_SELECT":
            t.write("PRESS [ENTER] TO LAUNCH LEVEL 1", align="center", font=("Arial", 12, "bold"))
        elif curr == "IN_GAME":
            t.write("PRESS [ENTER] TO RETURN TO TITLE SCREEN", align="center", font=("Arial", 12, "bold"))

        screen.update()

    screen.onkeypress(on_enter_key, "Return")
    screen.listen()

    render_state()
    screen.mainloop()

if __name__ == "__main__":
    run_input_router_demo()
