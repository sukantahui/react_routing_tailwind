"""
=============================================================================
TOPIC 10: Saving Figures with plt.savefig()
Script 02: In-Memory BytesIO Streams for Web APIs & Base64 Embedding
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import io
import base64
import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Exporting Charts directly to RAM Buffer (FastAPI/Flask API Pattern)")

fig, ax = plt.subplots(figsize=(5, 3))
categories = ['Precision', 'Recall', 'F1-Score', 'ROC-AUC']
scores = [0.92, 0.88, 0.90, 0.95]
bars = ax.bar(categories, scores, color=['#38bdf8', '#818cf8', '#c084fc', '#f472b6'], width=0.5)
ax.set_ylim(0, 1.1)
ax.set_title("API Dynamic Metric Response", fontweight='bold')
ax.bar_label(bars, fmt='%.2f', padding=3)

# Create an in-memory byte buffer
buffer = io.BytesIO()

# Save to buffer stream without writing to physical disk storage
fig.savefig(buffer, format='png', dpi=120, bbox_inches='tight')
buffer.seek(0) # Rewind stream pointer to beginning

# Encode to Base64 string for direct HTML / JSON API payloads
img_base64 = base64.b64encode(buffer.read()).decode('utf-8')
data_uri = f"data:image/png;base64,{img_base64[:40]}..." # Truncated display

print("✓ Successfully rendered Figure directly into RAM BytesIO stream!")
print(f"Total In-Memory Buffer Size: {buffer.getbuffer().nbytes:,} bytes")
print(f"Base64 URI Preview         : {data_uri}")

buffer.close()
plt.close(fig)
