"""
02_lineplot_aggregation_ci.py
Title: sns.lineplot() with Automatic Aggregation and Uncertainty Bands
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 02: Time Series & Repeated Measurements")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    # fmri dataset contains repeated signals across multiple subjects and time points
    fmri = sns.load_dataset("fmri")

    plt.figure(figsize=(9, 5))
    # When multiple y measurements exist for the same x,
    # sns.lineplot() automatically aggregates the mean and draws a shaded 95% confidence band!
    sns.lineplot(
        data=fmri,
        x="timepoint",
        y="signal",
        hue="event",
        style="region",
        markers=True,
        dashes=False,
        errorbar="ci"
    )

    plt.title("FMRI Signal over Timepoint with 95% Bootstrap Confidence Bands", fontsize=12)
    plt.tight_layout()
    print("✓ Successfully generated lineplot with automatic aggregation.")

if __name__ == "__main__":
    main()
