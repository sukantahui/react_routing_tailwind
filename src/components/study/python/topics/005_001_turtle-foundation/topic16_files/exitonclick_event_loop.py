"""
Module: 005_001_turtle-foundation
Topic: Topic 16 - Introduction to turtle.done() and program lifecycle completion
File: exitonclick_event_loop.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates screen.exitonclick() vs turtle.done() for interactive canvas closure.
"""

import turtle

def interactive_exit_demo():
    screen = turtle.Screen()
    screen.title("Click Canvas Anywhere to Exit")
    screen.bgcolor("#1e1b4b")  # Deep indigo canvas
    screen.setup(width=650, height=650)

    artist = turtle.Turtle()
    artist.speed(8)
    artist.color("#f43f5e")  # Rose pen

    # Draw hexagonal spiral
    for i in range(50):
        artist.forward(i * 3)
        artist.left(59)

    artist.penup()
    artist.goto(0, -220)
    artist.color("#fbbf24")  # Amber text
    artist.write("Click anywhere on this canvas to close!", align="center", font=("Verdana", 12, "normal"))
    artist.hideturtle()

    # exitonclick() binds a mouse click listener to screen.bye() and starts mainloop
    print("Canvas waiting for user mouse click...")
    screen.exitonclick()

if __name__ == "__main__":
    interactive_exit_demo()
