"""
Module: 005_006_turtle-interaction
Topic: Topic 6 - Managing game and interactive states (active, paused, game-over)
File: finite_state_machine_game_engine.py
Teacher & Mentor: Sukanta Hui

Description:
Finite State Machine (FSM) Game Architecture:
- State enum/string: "MENU", "PLAYING", "PAUSED", "GAME_OVER"
- State-specific rendering and physics logic.
- Clean transition events on Spacebar and Escape.
"""

import turtle

def run_fsm_game():
    screen = turtle.Screen()
    screen.title("FSM Game State Engine - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)
    screen.tracer(0)

    t = turtle.Turtle(); t.hideturtle()

    game_state = {
        "current": "MENU",  # "MENU" | "PLAYING" | "PAUSED" | "GAME_OVER"
        "score": 0,
        "lives": 3,
        "player_x": 0,
        "ball_x": 0, "ball_y": 0, "ball_vx": 4, "ball_vy": 4
    }

    def start_game():
        game_state["current"] = "PLAYING"
        game_state["score"] = 0
        game_state["lives"] = 3
        game_state["ball_x"] = 0
        game_state["ball_y"] = 0

    def toggle_pause():
        if game_state["current"] == "PLAYING":
            game_state["current"] = "PAUSED"
        elif game_state["current"] == "PAUSED":
            game_state["current"] = "PLAYING"

    def handle_space():
        if game_state["current"] in ["MENU", "GAME_OVER"]:
            start_game()
        elif game_state["current"] == "PLAYING":
            toggle_pause()
        elif game_state["current"] == "PAUSED":
            toggle_pause()

    screen.onkeypress(handle_space, "space")
    screen.onkeypress(toggle_pause, "p")
    screen.onkeypress(toggle_pause, "P")
    screen.listen()

    def tick():
        t.clear()

        curr = game_state["current"]

        # 1. MENU STATE RENDER
        if curr == "MENU":
            t.penup(); t.goto(0, 50); t.pendown()
            t.color("#38bdf8")
            t.write("CYBER BRICK ARENA", align="center", font=("Arial", 22, "bold"))

            t.penup(); t.goto(0, -30); t.pendown()
            t.color("#34d399")
            t.write("PRESS SPACEBAR TO START GAME", align="center", font=("Arial", 13, "bold"))

        # 2. PLAYING STATE (Physics + Render)
        elif curr == "PLAYING":
            # Ball Physics
            game_state["ball_x"] += game_state["ball_vx"]
            game_state["ball_y"] += game_state["ball_vy"]

            if game_state["ball_x"] > 330 or game_state["ball_x"] < -330:
                game_state["ball_vx"] = -game_state["ball_vx"]
            if game_state["ball_y"] > 230:
                game_state["ball_vy"] = -game_state["ball_vy"]
            elif game_state["ball_y"] < -230:
                game_state["lives"] -= 1
                game_state["ball_x"] = 0; game_state["ball_y"] = 0
                if game_state["lives"] <= 0:
                    game_state["current"] = "GAME_OVER"

            game_state["score"] += 1

            # Render Ball
            t.penup(); t.goto(game_state["ball_x"], game_state["ball_y"]); t.pendown()
            t.color("white", "#fbbf24"); t.begin_fill(); t.circle(12); t.end_fill()

            # HUD
            t.penup(); t.goto(-330, 230); t.pendown(); t.color("#38bdf8")
            t.write(f"SCORE: {game_state['score']}  |  LIVES: {game_state['lives']}  |  [P]: PAUSE", font=("Arial", 11, "bold"))

        # 3. PAUSED STATE (Freeze physics + Draw overlay)
        elif curr == "PAUSED":
            # Draw Ball frozen
            t.penup(); t.goto(game_state["ball_x"], game_state["ball_y"]); t.pendown()
            t.color("white", "#64748b"); t.begin_fill(); t.circle(12); t.end_fill()

            # Pause Banner
            t.penup(); t.goto(0, 20); t.pendown()
            t.color("#fbbf24")
            t.write("⏸ GAME PAUSED", align="center", font=("Arial", 20, "bold"))
            t.penup(); t.goto(0, -30); t.pendown()
            t.color("#94a3b8")
            t.write("Press 'P' or Spacebar to Resume", align="center", font=("Arial", 12))

        # 4. GAME OVER STATE
        elif curr == "GAME_OVER":
            t.penup(); t.goto(0, 40); t.pendown()
            t.color("#f43f5e")
            t.write("💀 GAME OVER", align="center", font=("Arial", 22, "bold"))

            t.penup(); t.goto(0, -20); t.pendown()
            t.color("#38bdf8")
            t.write(f"FINAL SCORE: {game_state['score']} PTS", align="center", font=("Arial", 14, "bold"))

            t.penup(); t.goto(0, -60); t.pendown()
            t.color("#34d399")
            t.write("PRESS SPACEBAR TO RESTART", align="center", font=("Arial", 12, "bold"))

        screen.update()
        screen.ontimer(tick, 16)

    tick()
    screen.mainloop()

if __name__ == "__main__":
    run_fsm_game()
