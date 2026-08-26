"""
Module: 005_005_turtle-animation
Topic: Topic 3 - Timing and loop delays using time.sleep() and ontimer()
File: blocking_sleep_vs_ontimer.py
Teacher & Mentor: Sukanta Hui

Description:
Direct comparison between two animation paradigms:
1. BLOCKING: `while True:` loop paired with `time.sleep(1/60)`
   - Simple, linear, but can block Tkinter UI events if delays are large.
2. NON-BLOCKING: `screen.ontimer(game_tick, 16)`
   - Event-driven, cooperative multitasking, fully responsive to keyboard/mouse events.
"""

import turtle
import time

def run_ontimer_nonblocking_demo():
    screen = turtle.Screen()
    screen.title("Non-Blocking ontimer() Animation Loop - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=500)
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    # Ball State
    state = {"x": -250, "vx": 4, "angle": 0, "frame": 0}

    def game_tick():
        """Non-blocking frame tick callback scheduled every 16 ms (~60 FPS)."""
        t.clear()

        # Update math
        state["x"] += state["vx"]
        state["angle"] = (state["angle"] + 5) % 360
        state["frame"] += 1

        if state["x"] > 250 or state["x"] < -250:
            state["vx"] *= -1

        # Draw Rotating Spinner Ball
        t.penup(); t.goto(state["x"], 0); t.pendown()
        t.color("#38bdf8", "#0284c7")
        t.begin_fill(); t.circle(25); t.end_fill()

        # Spoke Line
        t.penup(); t.goto(state["x"], 25); t.setheading(state["angle"]); t.pendown()
        t.color("#fbbf24"); t.forward(25)

        # HUD Telemetry
        t.penup(); t.goto(-320, 190); t.pendown()
        t.color("#34d399")
        t.write(f"ontimer(16ms) NON-BLOCKING TICK · FRAME: {state['frame']:04d}", font=("Arial", 11, "bold"))

        # Flush buffer
        screen.update()

        # Recursively schedule NEXT frame tick in 16ms
        screen.ontimer(game_tick, 16)

    # Launch initial tick
    game_tick()

    # Enter Tkinter main event loop (Never blocks!)
    screen.mainloop()

if __name__ == "__main__":
    run_ontimer_nonblocking_demo()
