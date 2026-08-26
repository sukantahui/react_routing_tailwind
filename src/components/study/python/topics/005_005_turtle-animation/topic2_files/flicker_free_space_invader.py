"""
Module: 005_005_turtle-animation
Topic: Topic 2 - Eliminating flickering in Turtle animations
File: flicker_free_space_invader.py
Teacher & Mentor: Sukanta Hui

Description:
Mini arcade game loop showing rock-solid flicker-free animation with:
- Static Starfield
- Moving Player Spaceship
- Oscillating Alien Invaders
- Lasers
"""

import turtle
import time
import math

def run_space_invader_demo():
    screen = turtle.Screen()
    screen.title("Flicker-Free Space Invader - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=600)
    screen.tracer(0)

    # Layer 1: Static Starfield
    star_turtle = turtle.Turtle()
    star_turtle.hideturtle()
    stars = [(-250, 200), (-120, 150), (40, 220), (180, 180), (-300, -50), (220, -100), (0, 0)]
    for sx, sy in stars:
        star_turtle.penup(); star_turtle.goto(sx, sy); star_turtle.pendown()
        star_turtle.dot(4, "#fef08a")

    # Layer 2: Dynamic Game Entity Turtle
    game_t = turtle.Turtle()
    game_t.hideturtle()

    player_x = 0
    alien_x = -150
    alien_dir = 3

    for frame in range(150):
        game_t.clear()

        # Update math
        alien_x += alien_dir
        if abs(alien_x) > 220:
            alien_dir *= -1

        # 1. Draw Player Cannon
        game_t.penup(); game_t.goto(player_x - 20, -220); game_t.pendown()
        game_t.color("#34d399", "#059669")
        game_t.begin_fill()
        for _ in range(2): game_t.forward(40); game_t.left(90); game_t.forward(20); game_t.left(90)
        game_t.end_fill()
        # Cannon barrel
        game_t.penup(); game_t.goto(player_x - 4, -200); game_t.pendown()
        game_t.color("#34d399", "#34d399"); game_t.begin_fill()
        for _ in range(2): game_t.forward(8); game_t.left(90); game_t.forward(12); game_t.left(90)
        game_t.end_fill()

        # 2. Draw Alien Invader
        game_t.penup(); game_t.goto(alien_x, 150); game_t.pendown()
        game_t.color("#f43f5e", "#e11d48")
        game_t.begin_fill()
        for _ in range(6): game_t.forward(25); game_t.left(60)
        game_t.end_fill()

        # 3. Draw Laser Bolt
        laser_y = -180 + (frame * 8) % 400
        game_t.penup(); game_t.goto(player_x - 1, laser_y); game_t.pendown()
        game_t.color("#fbbf24"); game_t.pensize(3); game_t.forward(15); game_t.pensize(1)

        screen.update()
        time.sleep(0.0166)

    turtle.done()

if __name__ == "__main__":
    run_space_invader_demo()
