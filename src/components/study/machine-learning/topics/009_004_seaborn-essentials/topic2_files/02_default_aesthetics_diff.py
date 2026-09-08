"""
02_default_aesthetics_diff.py
Title: Visual Defaults and Statistical Inferences
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 02: Statistical Inferences Built-in")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    # In Matplotlib:
    # Creating a bar chart with 95% bootstrap confidence intervals requires writing
    # custom numpy bootstrap loops and errorbar formatting.

    # In Seaborn:
    # sns.barplot() automatically computes the mean and bootstraps 95% CI error bars!
    tips = sns.load_dataset("tips")

    print("\nDataset: Restaurant Tips Sample")
    print(tips[["day", "total_bill"]].head(5))

    print("\nExecuting sns.barplot(data=tips, x='day', y='total_bill'):")
    print("Seaborn automatically performs:")
    print(" 1. Grouping by 'day'")
    print(" 2. Computing mean(total_bill) per day")
    print(" 3. Computing 1000-sample bootstrap confidence intervals for error bars")
    print(" 4. Beautifully formatting categorical x-ticks")

if __name__ == "__main__":
    main()
