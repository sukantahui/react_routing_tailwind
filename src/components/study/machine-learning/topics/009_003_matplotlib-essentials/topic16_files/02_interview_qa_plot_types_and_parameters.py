"""
=============================================================================
TOPIC 16: Short Questions & Interview Preparation
Script 02: Plot Selection Rules & Parameter Decisions Q&A
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

# -----------------------------------------------------------------------------
# Question 4: Bar vs Barh
# -----------------------------------------------------------------------------
section("Q4: When should you use plt.barh() instead of plt.bar()?")
print("""
• Use `plt.barh()` when category labels are long (e.g. Feature Importance names like
  'Annual_Household_Income' or 'Revolving_Line_Utilization').
• Horizontal bars read naturally from top to bottom without forcing users to tilt
  their heads or requiring ugly 90-degree rotated vertical text labels.
""")

# -----------------------------------------------------------------------------
# Question 5: Scatter vs Hexbin
# -----------------------------------------------------------------------------
section("Q5: What is overplotting in scatter plots, and how does hexbin resolve it?")
print("""
• Overplotting occurs when tens of thousands of data points overlap, merging into
  a solid, uninterpretable ink blot that hides internal cluster density.
• Solutions:
  1. Reduce `alpha=0.1` transparency.
  2. Use `ax.hexbin(x, y, gridsize=30, cmap='inferno')`, which groups 2D spatial
     coordinates into hexagonal bins and maps frequency count to color intensity.
""")

# -----------------------------------------------------------------------------
# Question 6: Log vs Symlog
# -----------------------------------------------------------------------------
section("Q6: Why is ax.set_yscale('symlog') used instead of 'log'?")
print("""
• Standard `log` scale is mathematically undefined for x <= 0.
• Symmetrical Log (`symlog`) allows negative values and zeros by providing a linear
  range `[-linthresh, +linthresh]` around zero, switching to log scale beyond.
• Essential for plotting gradient oscillations and financial profit/loss curves.
""")
