"""
Module: 005_005_turtle-animation
Topic: Topic 3 - Timing and loop delays using time.sleep() and ontimer()
File: event_driven_multitasker_ontimer.py
Teacher & Mentor: Sukanta Hui

Description:
Event-driven multitasking architecture:
- Timer 1 (16 ms): Smooth 60 FPS character rendering & physics
- Timer 2 (1000 ms): 1-second countdown clock & game state timer
- Keyboard Events: Immediate arrow key responsiveness without lag
"""

import turtle

def run_event_driven_multitasker():
    screen = turtle.Screen()
    screen.title("Event-Driven Multitasker with ontimer - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    # Turtles
    actor_t = turtle.Turtle(); actor_t.hideturtle()
    hud_t = turtle.Turtle(); hud_t.hideturtle()

    player = {"x": 0, "y": -150, "speed": 15}
    obstacle = {"x": -300, "y": 50, "vx": 4}
    game_state = {"seconds_elapsed": 0, "running": True}

    # Keyboard Handlers (Instant responsiveness!)
    def move_left(): player["x"] = max(-300, player["x"] - player["speed"])
    def move_right(): player["x"] = min(300, player["x"] + player["speed"])

    screen.listen()
    screen.onkeypress(move_left, "Left")
    screen.onkeypress(move_right, "Right")

    # 1. 60 FPS Physics & Render Loop (every 16 ms)
    def render_loop():
        if not game_state["running"]: return
        actor_t.clear()

        # Update Obstacle
        obstacle["x"] += obstacle["vx"]
        if abs(obstacle["x"]) > 300: obstacle["vx"] *= -1

        # Draw Player
        actor_t.penup(); actor_t.goto(player["x"] - 20, player["y"]); actor_t.pendown()
        actor_t.color("#34d399", "#059669"); actor_t.begin_fill()
        for _ in range(4): actor_t.forward(40); actor_t.left(90)
        actor_t.end_fill()

        # Draw Obstacle
        actor_t.penup(); actor_t.goto(obstacle["x"], obstacle["y"]); actor_t.pendown()
        actor_t.color("#f43f5e", "#e11d48"); actor_t.begin_fill(); actor_t.circle(20); actor_t.end_fill()

        screen.update()
        screen.ontimer(render_loop, 16)

    # 2. 1-Second Periodic Clock Timer (every 1000 ms)
    def clock_tick():
        if not game_state["running"]: return
        game_state["seconds_elapsed"] += 1

        hud_t.clear()
        hud_t.penup(); hud_t.goto(-320, 220); hud_t.pendown()
        hud_t.color("#38bdf8")
        hud_t.write(f"TIME SURVIVED: {game_state['seconds_elapsed']}s  |  USE LEFT/RIGHT ARROWS", font=("Arial", 11, "bold"))

        screen.update()
        screen.ontimer(clock_tick, 1000)

    # Start both asynchronous timers
    render_loop()
    clock_tick()

    screen.mainloop()

if __name__ == "__main__":
    run_event_driven_multitasker()
