"""
# Module: 005_001_turtle-foundation
# Topic 2: Screen configuration: setup(), title(), bgcolor(), screensize()
# File: screen_setup_and_window_geometry.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating screen setup, window geometry, title branding,
#              and fractional monitor scaling.
"""

from dataclasses import dataclass

@dataclass
class WindowGeometryConfig:
    title: str
    width: int | float
    height: int | float
    start_x: int | None = None
    start_y: int | None = None

    @property
    def is_fractional(self) -> bool:
        return isinstance(self.width, float) and (0.0 < self.width <= 1.0)

    def calculate_pixel_dimensions(self, monitor_w: int = 1920, monitor_h: int = 1080) -> tuple[int, int]:
        if self.is_fractional:
            return (int(monitor_w * self.width), int(monitor_h * self.height))
        return (int(self.width), int(self.height))

def test_window_geometry():
    print("   [...] Testing Window Geometry & Screen Setup Calculator...")
    
    # 1. Standard Absolute Window (800x600)
    cfg1 = WindowGeometryConfig("Coder & Accotax Standard", 800, 600)
    w1, h1 = cfg1.calculate_pixel_dimensions()
    assert (w1, h1) == (800, 600)
    print(f"   [PASS] 1. Absolute window dimensions: {w1}x{h1} px")

    # 2. Fractional Window (75% of 1080p monitor)
    cfg2 = WindowGeometryConfig("Presentation Display", 0.75, 0.75)
    w2, h2 = cfg2.calculate_pixel_dimensions(1920, 1080)
    assert (w2, h2) == (1440, 810)
    print(f"   [PASS] 2. Fractional window dimensions (75% scale): {w2}x{h2} px")

def main():
    print("=" * 75)
    print("[SCREEN SETUP] Window Geometry & Responsive Monitor Scaling")
    print("=" * 75)

    test_window_geometry()

    print("=" * 75)
    print("[TAKEAWAY] screen.setup() accepts absolute pixels or fractional floats")
    print("           for responsive desktop application design.")
    print("=" * 75)

if __name__ == "__main__":
    main()
