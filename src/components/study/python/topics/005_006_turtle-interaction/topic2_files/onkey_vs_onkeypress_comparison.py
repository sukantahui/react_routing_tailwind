"""
Module: 005_006_turtle-interaction
Topic: Topic 2 - Keyboard input binding: screen.onkey() and screen.onkeypress()
File: onkey_vs_onkeypress_comparison.py
Teacher & Mentor: Sukanta Hui

Description:
Comparison between Keyboard Input Binding Methods:
1. Discrete Staccato Trigger: `onkeypress(step_move, 'Up')`
   - Moves only once per physical keypress or suffers from OS key-repeat stutter delay.
2. Continuous Smooth Movement: Key State Dictionary (`keys['Up'] = True/False`)
   - Binds `onkeypress` to set `True` and `onkeyrelease` to set `False`.
   - Physics loop applies continuous velocity every 16 ms tick for butter-smooth movement!
"""

import turtle

def run_keyboard_binding_demo():
    screen = turtle.Screen()
    screen.title("Keyboard Binding Mechanics - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()

    # Ship Kinematic State
    ship = {"x": 0.0, "y": 0.0, "vx": 0.0, "vy": 0.0, "speed": 5.0}

    # Key State Dictionary (Multi-key tracking)
    keys_pressed = {"Up": False, "Down": False, "Left": False, "Right": False}

    # Key Press / Release Handlers
    def press_up(): keys_pressed["Up"] = True
    def release_up(): keys_pressed["Up"] = False

    def press_down(): keys_pressed["Down"] = True
    def release_down(): keys_pressed["Down"] = False

    def press_left(): keys_pressed["Left"] = True
    def release_left(): keys_pressed["Left"] = False

    def press_right(): keys_pressed["Right"] = True
    def release_right(): keys_pressed["Right"] = False

    # Bind Press and Release Pairs
    screen.onkeypress(press_up, "Up")
    screen.onkeyrelease(release_up, "Up")

    screen.onkeypress(press_down, "Down")
    screen.onkeyrelease(release_down, "Down")

    screen.onkeypress(press_left, "Left")
    screen.onkeyrelease(release_left, "Left")

    screen.onkeypress(press_right, "Right")
    screen.onkeyrelease(release_right, "Right")

    screen.listen()

    # 60 FPS Game Loop
    def game_loop():
        t.clear()

        # Update ship from active key states (Supports diagonal movement!)
        ship["vx"] = 0
        ship["vy"] = 0
        if keys_pressed["Up"]:    ship["vy"] += ship["speed"]
        if keys_pressed["Down"]:  ship["vy"] -= ship["speed"]
        if keys_pressed["Left"]:  ship["vx"] -= ship["speed"]
        if keys_pressed["Right"]: ship["vx"] += ship["speed"]

        ship["x"] = max(-330, min(330, ship["x"] + ship["vx"]))
        ship["y"] = max(-230, min(230, ship["y"] + ship["vy"]))

        # Draw Ship
        t.penup(); t.goto(ship["x"], ship["y"]); t.pendown()
        t.color("white", "#38bdf8"); t.begin_fill(); t.circle(18); t.end_fill()

        # Telemetry HUD
        active_keys = [k for k, v in keys_pressed.items() if v]
        t.penup(); t.goto(-330, 230); t.pendown()
        t.color("#34d399")
        t.write(f"ACTIVE KEYS: {active_keys or 'None'} | POS: ({ship['x']:.0f}, {ship['y']:.0f})", font=("Arial", 11, "bold"))

        screen.update()
        screen.ontimer(game_loop, 16)

    game_loop()
    screen.mainloop()

if __name__ == "__main__":
    run_keyboard_binding_demo()
