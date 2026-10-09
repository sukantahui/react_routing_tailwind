"""
================================================================================
CBSE CLASS XI COMPUTER SCIENCE (083) - UNIT III
MODULE 006_001: ACCESSIBILITY & INCLUSIVE TECHNOLOGY LABORATORY
Topic: WCAG 2.1 Color Contrast Ratio & Automated Readability Audit Engine
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================
"""

from typing import Tuple, Dict


def calculate_relative_luminance(rgb_hex: str) -> float:
    """Calculates relative luminance (L) according to W3C WCAG 2.1 specifications."""
    hex_clean = rgb_hex.lstrip("#")
    r_val = int(hex_clean[0:2], 16) / 255.0
    g_val = int(hex_clean[2:4], 16) / 255.0
    b_val = int(hex_clean[4:6], 16) / 255.0

    def adjust_channel(c: float) -> float:
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    r_linear = adjust_channel(r_val)
    g_linear = adjust_channel(g_val)
    b_linear = adjust_channel(b_val)

    return 0.2126 * r_linear + 0.7152 * g_linear + 0.0722 * b_linear


def audit_wcag_contrast_ratio(fg_hex: str, bg_hex: str) -> Tuple[float, Dict[str, bool]]:
    """Calculates contrast ratio and checks WCAG AA and AAA compliance."""
    l1 = calculate_relative_luminance(fg_hex)
    l2 = calculate_relative_luminance(bg_hex)

    lighter = max(l1, l2)
    darker = min(l1, l2)

    ratio = (lighter + 0.05) / (darker + 0.05)

    compliance = {
        "WCAG_AA_Normal_Text (4.5:1)": ratio >= 4.5,
        "WCAG_AA_Large_Text (3.0:1)": ratio >= 3.0,
        "WCAG_AAA_Normal_Text (7.0:1)": ratio >= 7.0,
        "WCAG_AAA_Large_Text (4.5:1)": ratio >= 4.5,
    }

    return round(ratio, 2), compliance


if __name__ == "__main__":
    print("=" * 70)
    print("WCAG 2.1 COLOR CONTRAST ACCESSIBILITY AUDIT SUITE")
    print("=" * 70)

    color_pairs = [
        ("Dark Slate & White", "#020617", "#FFFFFF"),
        ("Sky Blue on Dark Navy", "#38BDF8", "#0B1120"),
        ("Low Contrast Light Grey on White", "#CCCCCC", "#FFFFFF"),
        ("Amber Warning on Black", "#F59E0B", "#000000"),
        ("Red Text on Green Background (Colorblind Trap)", "#FF0000", "#00FF00")
    ]

    for label, fg, bg in color_pairs:
        c_ratio, results = audit_wcag_contrast_ratio(fg, bg)
        print(f"\nAudit: {label} (Foreground: {fg}, Background: {bg})")
        print(f"-> Contrast Ratio: {c_ratio}:1")
        for standard, passed in results.items():
            status = "[PASS ✓]" if passed else "[FAIL ✗]"
            print(f"   {status:<10} {standard}")
    print("=" * 70)
