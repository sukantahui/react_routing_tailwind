"""
02_dataset_loading_tips.py
Title: Exploring Built-in Seaborn Datasets
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import pandas as pd

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 02: Built-in Datasets & DataFrame Feeding")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Swadeep, Tuhina")
    print("=" * 65)

    # Seaborn comes with popular toy datasets via sns.load_dataset()
    dataset_names = sns.get_dataset_names()
    print(f"\n📦 Seaborn provides {len(dataset_names)} built-in datasets for quick prototyping.")
    print(f"Sample datasets: {dataset_names[:10]} ...")

    # Let's inspect the famous 'tips' dataset
    print("\nLoading 'tips' dataset:")
    tips = sns.load_dataset("tips")
    print(tips.head(6))
    print(f"\nShape of tips dataset: {tips.shape}")
    print("\nSummary Statistics:")
    print(tips.describe())

    # Notice how seamlessly Seaborn consumes pandas Column Names directly as strings!
    print("\n💡 Key Insight: Unlike Matplotlib which requires x=df['total_bill'],")
    print("   Seaborn takes data=df, x='total_bill', y='tip', hue='smoker'.")

if __name__ == "__main__":
    main()
