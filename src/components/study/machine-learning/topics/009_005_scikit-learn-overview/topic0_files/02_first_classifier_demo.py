"""
02_first_classifier_demo.py
Title: Your Very First Scikit-Learn Classification Model
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

def main():
    print("=" * 65)
    print("🎓 Scikit-Learn Lab 02: End-to-End Iris Flower Classification in 5 Lines")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Swadeep")
    print("=" * 65)

    # 1. Load built-in toy dataset
    iris = load_iris()
    X, y = iris.data, iris.target
    print(f"\nDataset shape: Features X={X.shape}, Target y={y.shape}")
    print(f"Target classes: {iris.target_names}")

    # 2. Split dataset into 80% train and 20% test
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # 3. Instantiate Estimator
    clf = KNeighborsClassifier(n_neighbors=3)

    # 4. Fit / Train the model
    clf.fit(X_train, y_train)

    # 5. Predict and Evaluate
    y_pred = clf.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    
    print(f"\n🎯 Test Set Classification Accuracy: {acc * 100:.2f}%")
    print("✓ Model successfully learned decision boundaries!")

if __name__ == "__main__":
    main()
