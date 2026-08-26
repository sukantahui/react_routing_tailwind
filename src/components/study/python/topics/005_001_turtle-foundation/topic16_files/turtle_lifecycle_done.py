"""
Module: 005_001_turtle-foundation
Topic: Topic 16 - Introduction to turtle.done() and program lifecycle completion
File: turtle_lifecycle_done.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates the complete Turtle program lifecycle, showing how turtle.done()
initializes the Tkinter GUI main event loop and prevents the canvas from closing abruptly.
"""

import turtle

def draw_completed_artwork():
    # 1. Initialization Phase: Setup canvas window
    screen = turtle.Screen()
    screen.title("Turtle Program Lifecycle Completion - Coder & AccoTax")
    screen.bgcolor("#0f172a")  # Dark slate background
    screen.setup(width=600, height=600)

    # 2. Entity Creation Phase: Instantiate turtle artist
    artist = turtle.Turtle()
    artist.shape("turtle")
    artist.color("#38bdf8")  # Sky blue pen
    artist.pensize(3)
    artist.speed(6)

    # 3. Execution / Drawing Phase: Procedural graphics
    # Draw a vibrant geometric star rosette
    for step in range(8):
        artist.forward(120)
        artist.left(135)

    # Move to center and stamp completion mark
    artist.penup()
    artist.goto(0, -180)
    artist.color("#34d399")  # Emerald green text
    artist.write("Program Execution Completed!", align="center", font=("Arial", 14, "bold"))
    artist.hideturtle()

    # 4. Completion / Event Loop Phase: Keep window alive
    print("Drawing finished. Handing control over to turtle.done() event loop...")
    turtle.done()

if __name__ == "__main__":
    draw_completed_artwork()
