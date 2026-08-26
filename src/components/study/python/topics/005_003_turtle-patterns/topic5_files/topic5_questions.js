// src/components/study/python/topics/005_003_turtle-patterns/topic5_files/topic5_questions.js

const questions = [
  {
    question: "What does the HSV color model stand for?",
    shortAnswer: "Hue, Saturation, and Value (Brightness).",
    explanation: "HSV represents color intuitively based on color wavelength (Hue), purity (Saturation), and luminance (Value).",
    hint: "What do the letters H, S, and V represent?",
    level: "basic",
    codeExample: "# Hue (0.0-1.0), Saturation (0.0-1.0), Value (0.0-1.0)"
  },
  {
    question: "Which Python standard library module converts HSV to RGB?",
    shortAnswer: "The `colorsys` module with `colorsys.hsv_to_rgb(h, s, v)`.",
    explanation: "`colorsys` is built into Python and provides conversion between RGB, YIQ, HLS, and HSV color systems.",
    hint: "What standard library module handles color conversions?",
    level: "basic",
    codeExample: "import colorsys\nr, g, b = colorsys.hsv_to_rgb(0.5, 1.0, 1.0)"
  },
  {
    question: "What range of values does `colorsys.hsv_to_rgb(h, s, v)` accept and return?",
    shortAnswer: "Floats between 0.0 and 1.0 for all input and output channels.",
    explanation: "This matches Python Turtle's default `colormode(1.0)` perfectly.",
    hint: "Do colorsys functions use 0-255 integers or 0.0-1.0 floats?",
    level: "basic",
    codeExample: "# Accepts [0.0, 1.0] floats -> Returns (r, g, b) in [0.0, 1.0]"
  },
  {
    question: "How do you calculate a continuous hue transition across a loop of N steps?",
    shortAnswer: "Set `hue = i / total_steps` where `i` is the loop variable.",
    explanation: "As `i` goes from 0 to `total_steps - 1`, `hue` sweeps smoothly from 0.0 (Red) across the spectrum back to 1.0 (Red).",
    hint: "How do you normalize loop index to [0.0, 1.0]?",
    level: "basic",
    codeExample: "for i in range(300):\n    hue = i / 300\n    r, g, b = colorsys.hsv_to_rgb(hue, 1.0, 1.0)"
  },
  {
    question: "What color is Hue 0.0, Hue 0.33, and Hue 0.67 in the HSV spectrum?",
    shortAnswer: "Hue 0.0 is Pure Red, Hue 0.33 is Pure Green, and Hue 0.67 is Pure Blue.",
    explanation: "The 3 primary colors are spaced equally 120 degrees (1/3 of circle) apart.",
    hint: "What are the primary colors at 0, 1/3, and 2/3 of the wheel?",
    level: "basic",
    codeExample: "# 0.0 = Red | 0.33 = Green | 0.67 = Blue"
  },
  {
    question: "What is Linear Color Interpolation (Lerp)?",
    shortAnswer: "A mathematical formula `C = C1 + (C2 - C1) * t` that smoothly blends two colors C1 and C2 as parameter `t` moves from 0.0 to 1.0.",
    explanation: "Lerp is the standard method for linear two-color and multi-color gradients.",
    hint: "What is the formula for linear interpolation between two endpoints?",
    level: "moderate",
    codeExample: "r = r1 + (r2 - r1) * t"
  },
  {
    question: "Why does Python Turtle default colormode work seamlessly with `colorsys.hsv_to_rgb()`?",
    shortAnswer: "Because both use float values in the range [0.0, 1.0] by default.",
    explanation: "If you invoke `colormode(255)`, you must multiply RGB floats by 255 before passing to `t.color()`.",
    hint: "Why don't you need to multiply by 255 when using default colormode?",
    level: "moderate",
    codeExample: "t.color(colorsys.hsv_to_rgb(h, s, v))"
  },
  {
    question: "How do you create multiple repeating rainbow cycles across a single loop?",
    shortAnswer: "Multiply the index by a frequency multiplier and apply modulo: `hue = (i * frequency) % 1.0`.",
    explanation: "Modulo 1.0 wraps values exceeding 1.0 back to the start of the spectrum.",
    hint: "What operator wraps floating-point values at 1.0?",
    level: "moderate",
    codeExample: "hue = (i * 0.02) % 1.0"
  },
  {
    question: "How do you create a pastel color palette using HSV?",
    shortAnswer: "Lower the saturation `s` to 0.3 - 0.5 while keeping brightness `v` high at 1.0.",
    explanation: "Lower saturation mixes white into the pure chromatic hue, producing soft pastels.",
    hint: "Does lowering saturation or value create pastel tones?",
    level: "basic",
    codeExample: "r, g, b = colorsys.hsv_to_rgb(hue, 0.4, 1.0)"
  },
  {
    question: "How do you create neon or cyberpunk palettes using HSV?",
    shortAnswer: "Keep both saturation `s = 1.0` and brightness `v = 1.0` at maximum, and restrict hues to cyan (0.5), magenta (0.83), and yellow (0.16).",
    explanation: "High saturation and selected complementary hues produce vivid neon palettes.",
    hint: "What saturation and value settings give maximum neon vibrancy?",
    level: "moderate",
    codeExample: "palette = [0.16, 0.5, 0.83]"
  },
  {
    question: "How do you draw a 360-degree circular color wheel in Python Turtle?",
    shortAnswer: "Loop 360 times: `hue = deg / 360`, set color `(r, g, b)`, draw radial spoke `forward(radius); backward(radius); left(1)`.",
    explanation: "Each 1-degree radial spoke maps to its exact corresponding hue angle.",
    hint: "How do you map 360 degrees to 360 hues?",
    level: "moderate",
    codeExample: "for deg in range(360):\n    t.color(colorsys.hsv_to_rgb(deg/360, 1.0, 1.0))\n    t.forward(100); t.backward(100); t.left(1)"
  },
  {
    question: "What is the difference between linear RGB interpolation and perceptual LAB/HSV interpolation?",
    shortAnswer: "Linear RGB interpolation can pass through a muddy gray/brown midpoint; HSV/LAB maintains constant saturation and vibrancy.",
    explanation: "Perceptual color models interpolate along the hue circle rather than cutting through the color cube interior.",
    hint: "Why does interpolating hue around a circle look more vibrant than RGB lerp?",
    level: "advanced",
    codeExample: "# HSV hue rotation preserves vibrancy"
  },
  {
    question: "How do you create a fading trail effect behind the turtle cursor?",
    shortAnswer: "Reduce line brightness `v` or pen width `pensize` in reverse chronological order.",
    explanation: "Modulating value or alpha creates glowing motion trails.",
    hint: "How does reducing value create a fading effect?",
    level: "advanced",
    codeExample: "v = max(0.0, 1.0 - (age * 0.1))"
  },
  {
    question: "How do you draw a rainbow spiral vortex in Turtle?",
    shortAnswer: "In a 300-step spiral loop, compute `hue = i / 300`, set `t.color(colorsys.hsv_to_rgb(hue, 1, 1))`, and turn `t.left(59)`.",
    explanation: "Combining expanding spiral steps with continuous hue shifts renders rainbow vortices.",
    hint: "How do you combine hsv_to_rgb with spiral loops?",
    level: "basic",
    codeExample: "for i in range(300):\n    t.color(colorsys.hsv_to_rgb(i/300, 1, 1)); t.forward(i*0.5); t.left(59)"
  },
  {
    question: "What happens if Hue exceeds 1.0 without modulo wrapping?",
    shortAnswer: "The colors wrap automatically in `colorsys.hsv_to_rgb()`, but explicit modulo `% 1.0` ensures standards compliance.",
    explanation: "`colorsys` internally normalizes `h % 1.0` in most implementations.",
    hint: "Does colorsys handle hue wrapping internally?",
    level: "basic",
    codeExample: "hue = hue % 1.0"
  },
  {
    question: "How do you generate a dual-color sunset gradient (orange to deep indigo)?",
    shortAnswer: "Interpolate `t` from 0.0 to 1.0 between `(255, 120, 0)` and `(30, 10, 80)` using linear interpolation.",
    explanation: "Vertical bar rendering with interpolated RGB values produces sky gradients.",
    hint: "How do vertical bars create smooth sky gradients?",
    level: "moderate",
    codeExample: "# Sunset gradient: orange -> purple -> indigo"
  },
  {
    question: "How do you apply a radial color gradient to a filled regular polygon?",
    shortAnswer: "Draw concentric shrinking polygons from outside in, stepping the fill color from dark to bright.",
    explanation: "Layered concentric polygons create pseudo-radial gradients in vector graphics.",
    hint: "How do shrinking polygons layer gradient fills?",
    level: "advanced",
    codeExample: "for r in range(100, 0, -5):\n    t.fillcolor(get_color(r)); polygon(6, r)"
  },
  {
    question: "What is gamma correction in gradient rendering?",
    shortAnswer: "Applying a non-linear power curve `(color ** gamma)` to match human eye non-linear light perception.",
    explanation: "Standard linear gradients appear dark in the middle without gamma correction (gamma = 2.2).",
    hint: "Why do linear gradients appear slightly dark in the midpoint?",
    level: "expert",
    codeExample: "corrected = linear_val ** (1.0 / 2.2)"
  },
  {
    question: "How do you oscillate colors back and forth between two hues using sine waves?",
    shortAnswer: "Use `hue = center_hue + amp * math.sin(i * freq)`.",
    explanation: "Trigonometric modulation cycles smoothly between two target color endpoints.",
    hint: "How does math.sin create smooth color bouncing?",
    level: "moderate",
    codeExample: "hue = 0.5 + 0.3 * math.sin(i * 0.05)"
  },
  {
    question: "How do you draw a fire simulation gradient (black -> red -> orange -> yellow -> white)?",
    shortAnswer: "Define keyframe color stops `[(0.0, black), (0.25, red), (0.5, orange), (0.75, yellow), (1.0, white)]` and piecewise lerp between them.",
    explanation: "Multi-stop color ramp interpolation generates thermal and fire palettes.",
    hint: "What color sequence represents blackbody thermal radiation?",
    level: "advanced",
    codeExample: "# Multi-stop color gradient ramp"
  },
  {
    question: "Why is `screen.tracer(0)` required when drawing 100+ bar gradient meshes?",
    shortAnswer: "Drawing 100+ filled bars with individual color changes creates hundreds of canvas draw calls that cause lag without double-buffering.",
    explanation: "`tracer(0)` flushes all 100 bars in a single atomic buffer update.",
    hint: "How do you eliminate rendering stutter in multi-bar gradient meshes?",
    level: "basic",
    codeExample: "screen.tracer(0); draw_gradient(); screen.update()"
  },
  {
    question: "How do you create an iridescent holographic color effect in Turtle?",
    shortAnswer: "Modulate both Hue and Saturation rapidly with high-frequency sine waves: `h = (i*0.05)%1.0`, `s = 0.5 + 0.5*sin(i*0.1)`.",
    explanation: "Coupled phase-shifted oscillations simulate thin-film light interference.",
    hint: "How does varying hue and saturation simulate iridescence?",
    level: "expert",
    codeExample: "# Thin-film holographic modulation"
  },
  {
    question: "What is HSL and how does it differ from HSV in Python?",
    shortAnswer: "HSL stands for Lightness (pure white at 1.0), whereas HSV uses Value (pure color at V=1.0). Python provides `colorsys.hls_to_rgb()` for HSL.",
    explanation: "In HSV, maximum brightness (V=1.0, S=1.0) is a fully saturated pure color; in HSL, maximum lightness (L=1.0) is pure white.",
    hint: "Does HSL or HSV produce pure white when luminance is 1.0?",
    level: "advanced",
    codeExample: "colorsys.hls_to_rgb(h, l, s)"
  },
  {
    question: "How do you create an animated color-shifting mandala in Turtle?",
    shortAnswer: "In an animation loop, add a `frame_offset` to hue: `hue = (spoke / total + frame_offset) % 1.0` and redraw with `tracer(0)`.",
    explanation: "Incrementing `frame_offset` causes the colors to rotate around the mandala continuously.",
    hint: "How does adding a time offset rotate colors around a mandala?",
    level: "advanced",
    codeExample: "hue = (i / count + frame * 0.01) % 1.0"
  },
  {
    question: "How do you convert hex strings like `#38bdf8` to RGB floats for `t.color()`?",
    shortAnswer: "Slice the string into 2-character hex pairs, parse with `int(hex, 16)`, and divide by 255.0.",
    explanation: "Converts standard web hex colors into Python 0.0-1.0 floats.",
    hint: "How do you parse hex strings into RGB floats in Python?",
    level: "moderate",
    codeExample: "r, g, b = [int(hex_str[i:i+2], 16)/255.0 for i in (1, 3, 5)]"
  },
  {
    question: "What is a monochromatic color scheme in algorithmic graphics?",
    shortAnswer: "A palette created by locking Hue constant while varying Saturation and Value across loop steps.",
    explanation: "Varying lightness of a single base hue produces elegant, harmonious monochrome graphics.",
    hint: "How do you generate shades and tints of a single base color?",
    level: "basic",
    codeExample: "r, g, b = colorsys.hsv_to_rgb(0.6, s, v)"
  },
  {
    question: "What is a complementary color scheme in HSV?",
    shortAnswer: "Two colors whose hues are exactly 180 degrees (0.5 in normalized float) apart on the color wheel.",
    explanation: "Complementary colors (e.g. Cyan 0.5 and Orange 0.0) offer maximum visual contrast.",
    hint: "What is the hue distance between complementary colors?",
    level: "basic",
    codeExample: "comp_hue = (base_hue + 0.5) % 1.0"
  },
  {
    question: "What is a triadic color palette in HSV?",
    shortAnswer: "Three colors spaced evenly 120 degrees (1/3 or 0.333) apart on the hue circle.",
    explanation: "Triadic palettes (e.g. Red, Green, Blue or Orange, Purple, Teal) provide balanced harmony.",
    hint: "What fraction of the circle separates triadic colors?",
    level: "moderate",
    codeExample: "triad = [(base + i/3.0) % 1.0 for i in range(3)]"
  },
  {
    question: "Why should `math.sin` arguments be kept in radians when generating wave gradients?",
    shortAnswer: "Python's `math.sin()` expects radians; providing unbounded degree values produces erratic oscillations.",
    explanation: "Scaling radians smoothly with step increments guarantees clean periodic waveforms.",
    hint: "What unit does math.sin use in Python?",
    level: "basic",
    codeExample: "rad = (i / total) * 2 * math.pi"
  },
  {
    question: "What is the summary rule for mastering color gradients in Turtle Graphics?",
    shortAnswer: "Use `colorsys.hsv_to_rgb(hue, sat, val)` with normalized loop progress `(i / total_steps)` to generate smooth, continuous, and vibrant procedural color transitions.",
    explanation: "This simple formula transforms static line drawings into living, dynamic spectrum artworks.",
    hint: "What function and variable ratio produce procedural rainbow gradients?",
    level: "basic",
    codeExample: "t.color(colorsys.hsv_to_rgb(i / total, 1.0, 1.0))"
  }
];

export default questions;
