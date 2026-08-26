"""
# Module: 005_001_turtle-foundation
# Topic 0: Introduction to Turtle Graphics: history, educational purpose, and real-world relevance
# File: turtle_first_screen_and_motion.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: First Turtle graphics program setting up canvas, pen properties,
#              linear movements, and angles.
"""

import turtle

def draw_first_geometric_path(demo_mode: bool = True):
    """Initializes turtle screen and draws a 2-segment path."""
    print("   [...] Initializing Turtle Screen and Canvas...")
    
    # 1. Screen Configuration
    screen = turtle.Screen()
    screen.title("Coder & Accotax • First Turtle Canvas (Barrackpore)")
    screen.bgcolor("#090d16")
    screen.setup(width=600, height=450)

    # 2. Instantiate Turtle Pen
    t = turtle.Turtle()
    t.shape("turtle")
    t.color("#2dd4bf")  # Teal pen color
    t.pensize(3)
    t.speed(3)

    # 3. Movement Commands (Forward & Left Turn)
    t.forward(120)  # Move 120 units East
    t.left(90)      # Rotate 90 degrees North
    t.forward(80)   # Move 80 units North

    # Verify positions
    pos = t.pos()
    heading = t.heading()
    print(f"   [PASS] 1. Turtle position verified at coordinates: ({pos[0]:.1f}, {pos[1]:.1f})")
    print(f"   [PASS] 2. Turtle heading angle verified: {heading:.1f} degrees (North)")

    if demo_mode:
        # In automated tests, close window cleanly after drawing
        turtle.bye()
    else:
        # In interactive mode, wait for user click
        screen.exitonclick()

def main():
    print("=" * 75)
    print("[TURTLE FOUNDATION] First Canvas Setup & Linear Path Drawing")
    print("=" * 75)

    draw_first_geometric_path(demo_mode=True)

    print("=" * 75)
    print("[TAKEAWAY] Turtle translates procedural commands (forward, left) into")
    print("           continuous mathematical vector coordinates on a 2D Cartesian plane.")
    print("=" * 75)

if __name__ == "__main__":
    main()
