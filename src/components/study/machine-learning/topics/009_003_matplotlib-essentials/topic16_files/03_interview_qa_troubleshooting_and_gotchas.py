"""
=============================================================================
TOPIC 16: Short Questions & Interview Preparation
Script 03: Troubleshooting Common Gotchas & Debugging Q&A
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

# -----------------------------------------------------------------------------
# Question 7: Headless Server GUI Crash
# -----------------------------------------------------------------------------
section("Q7: How do you fix '_tkinter.TclError: no display name' on a headless Docker container?")
print("""
• Problem: Matplotlib defaults to an interactive GUI backend (TkAgg/Qt5Agg) which
  crashes on Linux servers or Docker containers lacking an X11 display server.
• Solution: Set the backend to headless 'Agg' BEFORE importing pyplot:
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
""")

# -----------------------------------------------------------------------------
# Question 8: Cropped Legends in savefig
# -----------------------------------------------------------------------------
section("Q8: Why does plt.savefig() cut off outside legends, and how is it fixed?")
print("""
• Problem: `plt.savefig()` defaults to nominal figure bounding dimensions, ignoring
  artists positioned outside the plot area with `bbox_to_anchor=(1.02, 1)`.
• Solution: Always pass `bbox_inches='tight'` to savefig:
    fig.savefig('output.png', bbox_inches='tight')
  This forces Matplotlib to calculate the full outer bounding envelope.
""")

# -----------------------------------------------------------------------------
# Question 9: Equal Aspect Ratio in PCA
# -----------------------------------------------------------------------------
section("Q9: Why does omitting ax.set_aspect('equal') distort PCA cluster interpretation?")
print("""
• Problem: Matplotlib automatically stretches axes to fill the rectangular window.
• If X ranges [-5, +5] and Y ranges [-2, +2], a spherical Gaussian cluster will
  visually appear stretched into an elliptical pancake.
• Solution: Call `ax.set_aspect('equal')` so 1 unit of PC1 physically matches 1 unit
  of PC2 on screen.
""")
