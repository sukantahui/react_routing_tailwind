"""
# Module: 005_001_turtle-foundation
# Topic 2: Screen configuration: setup(), title(), bgcolor(), screensize()
# File: canvas_theming_and_bgcolor_control.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Background styling with Named Colors, Hex Codes, and RGB tuples.
"""

from dataclasses import dataclass

@dataclass
class ThemePalette:
    theme_name: str
    bg_hex: str
    primary_pen_hex: str
    secondary_pen_hex: str
    rgb_255_tuple: tuple[int, int, int]

class CanvasThemeManager:
    """Manages color palettes and theme configurations for Python Turtle."""
    PALETTES = {
        "CYBERPUNK_DARK": ThemePalette("Cyberpunk Dark", "#090d16", "#2dd4bf", "#f43f5e", (9, 13, 22)),
        "DEEP_OCEAN": ThemePalette("Deep Ocean", "#030712", "#38bdf8", "#818cf8", (3, 7, 18)),
        "NEBULA_PURPLE": ThemePalette("Nebula Purple", "#1e1b4b", "#c084fc", "#f472b6", (30, 27, 75)),
        "CLASSIC_SLATE": ThemePalette("Classic Slate", "#0f172a", "#34d399", "#fbbf24", (15, 23, 42)),
    }

    @classmethod
    def get_palette(cls, theme_key: str) -> ThemePalette:
        return cls.PALETTES.get(theme_key, cls.PALETTES["CYBERPUNK_DARK"])

def test_canvas_theming():
    print("   [...] Testing Canvas Background Theming & Color Modes...")
    palette = CanvasThemeManager.get_palette("CYBERPUNK_DARK")

    assert palette.bg_hex == "#090d16"
    assert palette.rgb_255_tuple == (9, 13, 22)
    print(f"   [PASS] 1. Theme '{palette.theme_name}' loaded -> Hex: {palette.bg_hex} | RGB: {palette.rgb_255_tuple}")

    # Verify all presets have valid RGB ranges (0 to 255)
    for key, p in CanvasThemeManager.PALETTES.items():
        r, g, b = p.rgb_255_tuple
        assert 0 <= r <= 255 and 0 <= g <= 255 and 0 <= b <= 255
        print(f"   [PASS] 2. Verified palette '{p.theme_name}' RGB integrity")

def main():
    print("=" * 75)
    print("[CANVAS THEMING] Background Colors, Hex Palettes & RGB Colormode")
    print("=" * 75)

    test_canvas_theming()

    print("=" * 75)
    print("[TAKEAWAY] Using screen.colormode(255) with curated dark themes")
    print("           creates high-contrast, professional visual graphics.")
    print("=" * 75)

if __name__ == "__main__":
    main()
