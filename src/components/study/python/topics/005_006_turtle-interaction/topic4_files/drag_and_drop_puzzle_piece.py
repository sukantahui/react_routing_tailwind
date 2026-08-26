"""
Module: 005_006_turtle-interaction
Topic: Topic 4 - Mouse drag events with ondrag() for freehand drawing
File: drag_and_drop_puzzle_piece.py
Teacher & Mentor: Sukanta Hui

Description:
Drag-and-Drop Puzzle Piece with Snap-to-Grid Mechanics:
- Drag pieces smoothly across the screen.
- On mouse release, snap position to the nearest 50px grid cell.
"""

import turtle

def run_puzzle_game():
    screen = turtle.Screen()
    screen.title("Drag and Drop Snap-to-Grid Puzzle - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.setup(width=750, height=550)

    # 1. Draw Target Grid Slots
    grid_t = turtle.Turtle(); grid_t.hideturtle(); grid_t.speed(0)
    for gx in [-100, 0, 100]:
        for gy in [-50, 50]:
            grid_t.penup(); grid_t.goto(gx - 25, gy - 25); grid_t.pendown()
            grid_t.color("#334155"); grid_t.pensize(2)
            for _ in range(4): grid_t.forward(50); grid_t.left(90)

    # 2. Create Draggable Puzzle Block
    block = turtle.Turtle()
    block.shape("square")
    block.shapesize(2.5, 2.5)
    block.color("#38bdf8", "#0284c7")
    block.penup()
    block.goto(-220, -120)

    def on_drag_block(x, y):
        block.ondrag(None)
        block.goto(x, y)
        block.ondrag(on_drag_block)

    def on_release_block(x, y):
        # Snap to nearest 50px grid point
        snap_x = round(x / 50.0) * 50
        snap_y = round(y / 50.0) * 50
        block.goto(snap_x, snap_y)

    block.ondrag(on_drag_block)
    block.onrelease(on_release_block)

    # HUD
    hud = turtle.Turtle(); hud.hideturtle()
    hud.penup(); hud.goto(0, 210); hud.pendown()
    hud.color("#34d399")
    hud.write("DRAG THE BLUE BLOCK INTO ANY GRID SLOT (AUTO-SNAPS)", align="center", font=("Arial", 11, "bold"))

    screen.mainloop()

if __name__ == "__main__":
    run_puzzle_game()
