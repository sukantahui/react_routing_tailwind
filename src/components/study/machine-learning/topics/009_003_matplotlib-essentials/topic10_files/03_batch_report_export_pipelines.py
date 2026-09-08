"""
=============================================================================
TOPIC 10: Saving Figures with plt.savefig()
Script 03: Automated Multi-Page PDF Diagnostics Report
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import os
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Multi-Page PDF Export using PdfPages Context Manager")

pdf_filename = "ML_Diagnostics_Report.pdf"

with PdfPages(pdf_filename) as pdf:
    # Page 1: Loss Convergence
    fig1, ax1 = plt.subplots(figsize=(7, 4))
    epochs = np.arange(1, 21)
    ax1.plot(epochs, 1.0 / epochs**0.5, 'r--o', label='Training Loss')
    ax1.set_title("Page 1: Training Convergence Curve", fontweight='bold')
    ax1.set_xlabel("Epoch")
    ax1.set_ylabel("Loss")
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    pdf.savefig(fig1, bbox_inches='tight') # Attach page 1
    plt.close(fig1)

    # Page 2: Confusion Matrix
    fig2, ax2 = plt.subplots(figsize=(5, 4))
    cm = np.array([[850, 45], [30, 920]])
    im = ax2.imshow(cm, cmap='Blues')
    ax2.set_title("Page 2: Confusion Matrix", fontweight='bold')
    fig2.colorbar(im, ax=ax2)
    pdf.savefig(fig2, bbox_inches='tight') # Attach page 2
    plt.close(fig2)

    # Page 3: Metadata Summary
    d = pdf.infodict()
    d['Title'] = 'Coder & AccoTax ML Production Audit'
    d['Author'] = 'Sukanta Hui'
    d['Subject'] = 'Automated Model Verification Report'

print(f"✓ Multi-page PDF report compiled: {pdf_filename} (2 Pages generated)")

if os.path.exists(pdf_filename):
    os.remove(pdf_filename)
