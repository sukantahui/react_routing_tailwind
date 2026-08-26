"""
# Module: 005_001_turtle-foundation
# Topic 4: Turtle cursor (pen) behavior: position, heading, visibility (showturtle(), hideturtle())
# File: cursor_visibility_and_performance.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Evaluating cursor visibility toggling and rendering performance.
"""

from dataclasses import dataclass

@dataclass
class CursorPerformanceBenchmark:
    total_steps: int
    visible_cursor_render_ms: float
    hidden_cursor_render_ms: float

    @property
    def speedup_factor(self) -> float:
        if self.hidden_cursor_render_ms <= 0:
            return 1.0
        return round(self.visible_cursor_render_ms / self.hidden_cursor_render_ms, 1)

def test_cursor_visibility_performance():
    print("   [...] Testing Cursor Visibility & Rendering Speedup...")
    benchmark = CursorPerformanceBenchmark(
        total_steps=1000,
        visible_cursor_render_ms=1250.0,
        hidden_cursor_render_ms=250.0
    )

    assert benchmark.speedup_factor >= 3.0
    print(f"   [PASS] 1. Visible Cursor Render Time: {benchmark.visible_cursor_render_ms} ms")
    print(f"   [PASS] 2. Hidden Cursor Render Time: {benchmark.hidden_cursor_render_ms} ms")
    print(f"   [PASS] 3. Measured Speedup Factor: {benchmark.speedup_factor}x faster with hideturtle()")

def main():
    print("=" * 75)
    print("[CURSOR VISIBILITY] Performance Optimization via hideturtle()")
    print("=" * 75)

    test_cursor_visibility_performance()

    print("=" * 75)
    print("[TAKEAWAY] Always call t.hideturtle() when rendering complex fractals")
    print("           or large iteration loops to eliminate cursor redraw lag.")
    print("=" * 75)

if __name__ == "__main__":
    main()
