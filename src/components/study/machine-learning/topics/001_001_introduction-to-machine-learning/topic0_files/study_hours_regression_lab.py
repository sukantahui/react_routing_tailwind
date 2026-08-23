"""
=============================================================================
TOPIC 0: MEANING AND SCOPE OF MACHINE LEARNING
Laboratory 2: Study Hours vs Exam Marks Prediction (Scikit-Learn & Matplotlib)
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
Course: Introduction to Machine Learning (BCAC701B)
=============================================================================

This program demonstrates the core supervised learning paradigm:
1. Historical Dataset (Experience E): Hours studied vs Marks scored.
2. Separation into Input Feature Matrix (X) and Observed Target (y).
3. Inductive Model Fitting: Scikit-Learn discovers slope w and intercept b.
4. Inference on Unseen Test Candidates (e.g. 5.5 hours of study).
5. Visualizing the regression decision line alongside raw historical points.
=============================================================================
"""

try:
    import matplotlib.pyplot as plt
    import pandas as pd
    from sklearn.linear_model import LinearRegression
    SKLEARN_AVAILABLE = True
except ImportError:
    SKLEARN_AVAILABLE = False


def run_sklearn_pipeline():
    # 1. Historical Dataset (Experience E)
    data = {
        "Hours": [1, 2, 3, 4, 5, 6, 7, 8],
        "Marks": [35, 40, 48, 55, 62, 70, 78, 85]
    }
    df = pd.DataFrame(data)

    # 2. Separate Features (X) and Target (y)
    X = df[["Hours"]]
    y = df["Marks"]

    # 3. Model Architecture & Optimization
    model = LinearRegression()
    model.fit(X, y)

    # 4. Learned Parameters
    w = model.coef_[0]
    b = model.intercept_
    r2_score = model.score(X, y)

    print("=" * 75)
    print("CODER & ACCOTAX - TOPIC 0: SCIKIT-LEARN REGRESSION LAB")
    print("=" * 75)
    print("Historical Training Samples:")
    print(df.to_string(index=False))
    print("-" * 75)
    print(f"Learned Weight (w) : {w:.4f} marks per study hour")
    print(f"Learned Bias   (b) : {b:.4f} base baseline marks")
    print(f"Learned Rule h(x)  : Marks = ({w:.2f} * Hours) + {b:.2f}")
    print(f"Model Fit Accuracy : R^2 Score = {r2_score * 100:.2f}%")
    print("-" * 75)

    # 5. Inference on Unseen Students
    unseen_students = pd.DataFrame({"Hours": [2.5, 5.5, 9.0]})
    predictions = model.predict(unseen_students)

    print("Predictions for Brand New (Unseen) Student Profiles:")
    for hours, pred in zip(unseen_students["Hours"], predictions):
        print(f" -> Student studying {hours:>4.1f} hours/day ===> Predicted Mark: {pred:>5.1f} / 100")
    print("=" * 75)

    # 6. Visualization
    plt.figure(figsize=(9, 5.5))
    plt.scatter(X, y, color="#2563eb", s=80, label="Actual Historical Data (X, y)", zorder=4)
    plt.plot(X, model.predict(X), color="#dc2626", linewidth=2.5, label=f"Learned Line: h(x) = {w:.2f}x + {b:.2f}", zorder=3)
    plt.scatter([5.5], [model.predict([[5.5]])[0]], color="#16a34a", s=130, marker="*", label="Unseen Prediction (5.5 hrs -> 66.7 Marks)", zorder=5)
    plt.xlabel("Study Hours (Input Feature X)", fontsize=11, fontweight="bold")
    plt.ylabel("Exam Marks (Observed Target y)", fontsize=11, fontweight="bold")
    plt.title("Topic 0: Linear Regression - Inductive Learning from Experience", fontsize=12, fontweight="bold")
    plt.legend(frameon=True)
    plt.grid(True, linestyle="--", alpha=0.5)
    plt.tight_layout()
    # plt.show()


def run_pure_python_fallback():
    # Pure Python Analytical Solution (Ordinary Least Squares Closed Form)
    hours = [1, 2, 3, 4, 5, 6, 7, 8]
    marks = [35, 40, 48, 55, 62, 70, 78, 85]

    n = len(hours)
    x_mean = sum(hours) / n
    y_mean = sum(marks) / n

    numerator = sum((x - x_mean) * (y - y_mean) for x, y in zip(hours, marks))
    denominator = sum((x - x_mean) ** 2 for x in hours)

    w = numerator / denominator
    b = y_mean - (w * x_mean)

    print("=" * 75)
    print("CODER & ACCOTAX - TOPIC 0: STUDY HOURS REGRESSION LAB")
    print("=" * 75)
    print("Historical Training Samples (Hours -> Marks):")
    for h, m in zip(hours, marks):
        print(f" -> {h} hours/day ===> {m} Marks")
    print("-" * 75)
    print(f"Learned Weight (w) : {w:.4f} marks gained per study hour")
    print(f"Learned Bias   (b) : {b:.4f} baseline marks")
    print(f"Learned Rule h(x)  : Marks = ({w:.2f} * Hours) + {b:.2f}")
    print("-" * 75)

    print("Predictions for Brand New (Unseen) Student Profiles:")
    for new_h in [2.5, 5.5, 9.0]:
        pred = (w * new_h) + b
        print(f" -> Student studying {new_h:>4.1f} hours/day ===> Predicted Mark: {pred:>5.1f} / 100")
    print("=" * 75)


if __name__ == "__main__":
    if SKLEARN_AVAILABLE:
        run_sklearn_pipeline()
    else:
        run_pure_python_fallback()
