"""
03_viva_q3_pairplot_usecase.py
Title: Viva Q3: Diagnosing Classifier Separability via Pairplots
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt

def main():
    print("=" * 65)
    print("🎓 Seaborn Viva Q3: How do Pairplots guide Machine Learning Algorithm Choice?")
    print("   Instructor: Sukanta Hui | Students: Sachin, Tuhina, Swadeep")
    print("=" * 65)

    # Q: When looking at a pairplot during EDA, what decisions does an ML engineer make?
    # A:
    # 1. Linear Separability -> If classes are cleanly separated by a line/plane,
    #    use Logistic Regression, Linear SVM, or LDA.
    # 2. Non-linear / Interlocking distributions -> If clusters are nested or concentric,
    #    use Tree ensembles (Random Forest, XGBoost) or RBF Kernel SVMs.
    # 3. Multicollinear Predictors -> If off-diagonal scatter plots show tight y=mx lines,
    #    drop redundant features or apply PCA dimensionality reduction!

    print("✓ Successfully executed Viva Q3 algorithmic decision guidance.")

if __name__ == "__main__":
    main()
