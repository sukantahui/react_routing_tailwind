"""
=============================================================================
TOPIC 10: Saving Figures with plt.savefig()
Script 01: Export Formats (Raster vs Vector), DPI & Bounding Boxes
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np
import os

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Exporting High-Resolution Publication Figures")

fig, ax = plt.subplots(figsize=(6, 3.5))
x = np.linspace(0, 10, 100)
ax.plot(x, np.sin(x), color='#0284c7', lw=2, label=r'$\sin(x)$')
ax.plot(x, np.cos(x), color='#f43f5e', lw=2, linestyle='--', label=r'$\cos(x)$')

ax.set_title("Publication-Grade Waveform Export", fontweight='bold')
ax.set_xlabel("Time (seconds)")
ax.set_ylabel("Signal Amplitude")
ax.legend(loc="upper right")
ax.grid(True, linestyle=":", alpha=0.4)

# 1. Raster PNG (Lossless compressed bitmap, ideal for web/apps)
# bbox_inches='tight' ensures outside legends and titles are never clipped!
fig.savefig("signal_plot_300dpi.png", dpi=300, bbox_inches='tight', transparent=False)
print("✓ Saved 300 DPI raster image: signal_plot_300dpi.png")

# 2. Vector SVG (Infinite scalability, ideal for web UI & Illustrator)
fig.savefig("signal_plot.svg", format='svg', bbox_inches='tight')
print("✓ Saved scalable vector graphic: signal_plot.svg")

# 3. Vector PDF (Embedded fonts, ideal for LaTeX papers & conference submissions)
fig.savefig("signal_plot.pdf", format='pdf', bbox_inches='tight')
print("✓ Saved vector document: signal_plot.pdf")

# Clean up sample files from disk
for f in ["signal_plot_300dpi.png", "signal_plot.svg", "signal_plot.pdf"]:
    if os.path.exists(f):
        os.remove(f)

plt.close(fig)
