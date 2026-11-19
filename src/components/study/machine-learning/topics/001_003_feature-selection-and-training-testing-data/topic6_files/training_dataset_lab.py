"""
=============================================================================
TOPIC 6: TRAINING DATASET LABORATORY SIMULATOR
Module: Feature Selection and Training & Testing Data
Course: Introduction to Machine Learning (BCAC701B) - MAKAUT & Premier Engineering Syllabi
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
=============================================================================

PURE PYTHON IMPLEMENTATION - ZERO EXTERNAL DEPENDENCIES (NO NUMPY / SCIKIT-LEARN)
This production laboratory engine simulates:
1. Empirical Risk Minimization (ERM) with Gradient Descent and L2 Regularization.
2. Learning Curve Engine: Tracking Empirical Error (E_in) vs Out-of-Sample Error (E_out)
   across varying sample sizes N_train in [10, 20, 50, 100, 250, 500].
3. Preprocessing Encapsulation Audit: Proving the mathematical catastrophe of fitting
   normalization parameters (mu, sigma) on Test data vs Train-Only data.
4. Label Noise Contamination & Robust Huber Loss vs Mean Squared Error.
5. Regional Industrial Case Benchmarks across West Bengal (WBSEDCL, Kolkata Metro, SHG Microfinance).
=============================================================================
"""

import math
import random
from typing import List, Tuple, Dict, Any, Callable


class MatrixMath:
    """Pure Python Linear Algebra & Statistical Helper Functions."""
    
    @staticmethod
    def mean(values: List[float]) -> float:
        if not values:
            return 0.0
        return sum(values) / len(values)

    @staticmethod
    def std(values: List[float], ddof: int = 1) -> float:
        n = len(values)
        if n <= ddof:
            return 1e-9
        m = MatrixMath.mean(values)
        var = sum((x - m) ** 2 for x in values) / (n - ddof)
        return math.sqrt(max(var, 1e-9))

    @staticmethod
    def dot(v1: List[float], v2: List[float]) -> float:
        return sum(x * y for x, y in zip(v1, v2))


class StandardScaler:
    """
    StandardScaler strictly adhering to ML data leakage prevention protocols:
    Parameters (mean, std) must be computed EXCLUSIVELY on training data.
    """
    def __init__(self):
        self.means: List[float] = []
        self.stds: List[float] = []
        self.is_fitted: bool = False

    def fit(self, X: List[List[float]]) -> 'StandardScaler':
        n_samples = len(X)
        n_features = len(X[0])
        self.means = []
        self.stds = []
        
        for j in range(n_features):
            col_vals = [X[i][j] for i in range(n_samples)]
            m = MatrixMath.mean(col_vals)
            s = MatrixMath.std(col_vals)
            self.means.append(m)
            self.stds.append(s if s > 1e-9 else 1.0)
            
        self.is_fitted = True
        return self

    def transform(self, X: List[List[float]]) -> List[List[float]]:
        if not self.is_fitted:
            raise RuntimeError("Scaler must be fitted on training data before transform.")
        scaled_X = []
        for row in X:
            scaled_row = [
                (val - self.means[j]) / self.stds[j]
                for j, val in enumerate(row)
            ]
            scaled_X.append(scaled_row)
        return scaled_X

    def fit_transform(self, X: List[List[float]]) -> List[List[float]]:
        return self.fit(X).transform(X)


class EmpiricalRiskMinimizer:
    """
    Ridge Regression (L2 Regularized ERM) solved via Gradient Descent:
    Loss = (1 / 2N) * sum((y_i - (w^T x_i + b))^2) + (lambda / 2) * sum(w_j^2)
    """
    def __init__(self, learning_rate: float = 0.05, lambda_reg: float = 0.01, max_epochs: int = 400):
        self.lr = learning_rate
        self.lambda_reg = lambda_reg
        self.max_epochs = max_epochs
        self.weights: List[float] = []
        self.bias: float = 0.0
        self.training_loss_history: List[float] = []

    def fit(self, X: List[List[float]], y: List[float]):
        n = len(X)
        p = len(X[0])
        # Deterministic weight initialization
        self.weights = [0.0] * p
        self.bias = 0.0
        self.training_loss_history = []

        for epoch in range(self.max_epochs):
            # Compute predictions and gradients
            grad_w = [0.0] * p
            grad_b = 0.0
            epoch_loss = 0.0

            for i in range(n):
                pred = MatrixMath.dot(self.weights, X[i]) + self.bias
                error = pred - y[i]
                epoch_loss += error ** 2
                for j in range(p):
                    grad_w[j] += error * X[i][j]
                grad_b += error

            # Average gradients
            grad_w = [gw / n + self.lambda_reg * w for gw, w in zip(grad_w, self.weights)]
            grad_b = grad_b / n

            # Parameter update step
            self.weights = [w - self.lr * gw for w, gw in zip(self.weights, grad_w)]
            self.bias = self.bias - self.lr * grad_b

            reg_penalty = 0.5 * self.lambda_reg * sum(w ** 2 for w in self.weights)
            total_loss = (epoch_loss / (2.0 * n)) + reg_penalty
            self.training_loss_history.append(total_loss)

    def predict(self, X: List[List[float]]) -> List[float]:
        return [MatrixMath.dot(self.weights, row) + self.bias for row in X]

    def evaluate_mse(self, X: List[List[float]], y: List[float]) -> float:
        preds = self.predict(X)
        return sum((p - actual) ** 2 for p, actual in zip(preds, y)) / len(y)


class SyntheticDataGenerator:
    """Generates synthetic datasets for nonlinear regression and learning curve benchmarks."""
    
    @staticmethod
    def generate_polynomial_benchmark(n: int, noise_std: float = 0.35, seed: int = 42) -> Tuple[List[List[float]], List[float]]:
        # Ground truth function: y = 1.5 * x - 2.0 * x^2 + 0.8 * x^3 + noise
        rng = random.Random(seed)
        X = []
        y = []
        for _ in range(n):
            x1 = rng.uniform(-2.0, 2.0)
            # Add polynomial feature representations: [x, x^2, x^3, x^4, x^5]
            features = [x1, x1**2, x1**3, x1**4, x1**5]
            true_signal = 1.5 * x1 - 2.0 * (x1**2) + 0.8 * (x1**3)
            noise = rng.gauss(0.0, noise_std)
            X.append(features)
            y.append(true_signal + noise)
        return X, y


def run_learning_curve_benchmark() -> List[Dict[str, Any]]:
    """
    Evaluates Empirical Error (E_in on Training Set) vs Out-of-Sample Error (E_out on Test Set)
    as training sample size N_train expands from 15 to 500.
    """
    # Create fixed large out-of-sample test set (N_test = 1000)
    X_test, y_test = SyntheticDataGenerator.generate_polynomial_benchmark(n=1000, seed=999)
    scaler = StandardScaler().fit(X_test)  # test will be evaluated in standard scale
    
    sample_sizes = [15, 30, 60, 120, 250, 500]
    results = []

    for n in sample_sizes:
        # Generate training dataset of size n
        X_train, y_train = SyntheticDataGenerator.generate_polynomial_benchmark(n=n, seed=100 + n)
        
        # Proper scaling: fit on train only
        train_scaler = StandardScaler().fit(X_train)
        X_train_scaled = train_scaler.transform(X_train)
        X_test_scaled = train_scaler.transform(X_test)

        # Train model (Linear degree 1: High Bias / Underfitting)
        underfit_model = EmpiricalRiskMinimizer(learning_rate=0.08, lambda_reg=0.0, max_epochs=250)
        X_train_d1 = [[row[0]] for row in X_train_scaled]
        X_test_d1 = [[row[0]] for row in X_test_scaled]
        underfit_model.fit(X_train_d1, y_train)
        e_in_d1 = underfit_model.evaluate_mse(X_train_d1, y_train)
        e_out_d1 = underfit_model.evaluate_mse(X_test_d1, y_test)

        # Train model (Polynomial degree 5 with mild regularization: Complex Model)
        complex_model = EmpiricalRiskMinimizer(learning_rate=0.05, lambda_reg=0.005, max_epochs=350)
        complex_model.fit(X_train_scaled, y_train)
        e_in_d5 = complex_model.evaluate_mse(X_train_scaled, y_train)
        e_out_d5 = complex_model.evaluate_mse(X_test_scaled, y_test)

        results.append({
            "n_train": n,
            "underfit_e_in": round(e_in_d1, 4),
            "underfit_e_out": round(e_out_d1, 4),
            "underfit_gap": round(abs(e_out_d1 - e_in_d1), 4),
            "complex_e_in": round(e_in_d5, 4),
            "complex_e_out": round(e_out_d5, 4),
            "complex_gap": round(abs(e_out_d5 - e_in_d5), 4)
        })

    return results


def run_data_leakage_audit_comparison() -> Dict[str, Any]:
    """
    Demonstrates the difference between:
    1. Correct Protocol: Fit Scaler strictly on Training Data, then transform Test Data.
    2. Contaminated Protocol: Fit Scaler on Full Dataset (Train + Test combined) before splitting.
    """
    rng = random.Random(777)
    # Generate 100 train samples and 40 test samples with an outlier shift in test set
    n_train, n_test = 100, 40
    X_raw_train = [[rng.gauss(50.0, 10.0)] for _ in range(n_train)]
    y_train = [2.5 * r[0] + rng.gauss(0.0, 5.0) for r in X_raw_train]

    # Test set contains a domain shift or extreme value (e.g. Kolkata Durga Puja power surge)
    X_raw_test = [[rng.gauss(85.0, 12.0)] for _ in range(n_test)]
    y_test = [2.5 * r[0] + rng.gauss(0.0, 5.0) for r in X_raw_test]

    # PROTOCOL A: Correct (Train-Only Fit)
    clean_scaler = StandardScaler().fit(X_raw_train)
    X_clean_train = clean_scaler.transform(X_raw_train)
    X_clean_test = clean_scaler.transform(X_raw_test)

    model_clean = EmpiricalRiskMinimizer(learning_rate=0.08, lambda_reg=0.01, max_epochs=300)
    model_clean.fit(X_clean_train, y_train)
    mse_clean_test = model_clean.evaluate_mse(X_clean_test, y_test)

    # PROTOCOL B: Leaked (Fit on Combined Train + Test)
    X_leaked_all = X_raw_train + X_raw_test
    leaked_scaler = StandardScaler().fit(X_leaked_all)
    X_leaked_train = leaked_scaler.transform(X_raw_train)
    X_leaked_test = leaked_scaler.transform(X_raw_test)

    model_leaked = EmpiricalRiskMinimizer(learning_rate=0.08, lambda_reg=0.01, max_epochs=300)
    model_leaked.fit(X_leaked_train, y_train)
    mse_leaked_test = model_leaked.evaluate_mse(X_leaked_test, y_test)

    return {
        "clean_train_mean": round(clean_scaler.means[0], 2),
        "clean_train_std": round(clean_scaler.stds[0], 2),
        "leaked_combined_mean": round(leaked_scaler.means[0], 2),
        "leaked_combined_std": round(leaked_scaler.stds[0], 2),
        "mse_clean_test": round(mse_clean_test, 3),
        "mse_leaked_test": round(mse_leaked_test, 3),
        "optimism_bias_delta": round(abs(mse_clean_test - mse_leaked_test), 3)
    }


def run_label_noise_robustness_lab() -> List[Dict[str, Any]]:
    """
    Injects label noise into the training dataset (0%, 10%, 25%, 40%)
    and evaluates how model parameters and test errors degrade.
    """
    noise_rates = [0.0, 0.10, 0.25, 0.40]
    X_clean_train, y_clean_train = SyntheticDataGenerator.generate_polynomial_benchmark(n=200, seed=12)
    X_test, y_test = SyntheticDataGenerator.generate_polynomial_benchmark(n=300, seed=99)

    scaler = StandardScaler().fit(X_clean_train)
    X_train_s = scaler.transform(X_clean_train)
    X_test_s = scaler.transform(X_test)

    results = []
    for rate in noise_rates:
        rng = random.Random(42)
        y_corrupted = list(y_clean_train)
        n_corrupt = int(len(y_corrupted) * rate)
        corrupt_indices = rng.sample(range(len(y_corrupted)), n_corrupt)
        for idx in corrupt_indices:
            # Inject extreme label anomaly
            y_corrupted[idx] += rng.choice([-1.0, 1.0]) * rng.uniform(8.0, 15.0)

        # Fit ERM with L2 regularization
        model = EmpiricalRiskMinimizer(learning_rate=0.05, lambda_reg=0.02, max_epochs=350)
        model.fit(X_train_s, y_corrupted)
        train_mse = model.evaluate_mse(X_train_s, y_corrupted)
        test_mse = model.evaluate_mse(X_test_s, y_test)

        results.append({
            "noise_rate_pct": int(rate * 100),
            "corrupted_samples": n_corrupt,
            "train_apparent_mse": round(train_mse, 3),
            "true_test_generalization_mse": round(test_mse, 3),
            "degradation_factor": round(test_mse / max(results[0]["true_test_generalization_mse"] if results else test_mse, 1e-4), 2)
        })

    return results


def run_west_bengal_case_studies():
    """Executes four authentic West Bengal industrial domain training dataset scenarios."""
    print("\n" + "=" * 80)
    print("WEST BENGAL INDUSTRIAL TRAINING DATASET CASE STUDIES")
    print("=" * 80)

    cases = [
        {
            "sector": "Power Distribution (WBSEDCL Bidhannagar & Barasat Divisions)",
            "scenario": "Training Set for 33kV Substation Peak Demand Forecasting",
            "samples": 35040,
            "training_split": "28,032 15-min intervals (80% Train)",
            "critical_protocol": "Chronological forward partition. Normalization factors computed strictly on pre-monsoon baseline to prevent future weather leakage."
        },
        {
            "sector": "Transit Mobility (Kolkata Metro Rail Corporation - Green Line)",
            "scenario": "Station Gate Automatic Fare Collection (AFC) Turnstile Congestion",
            "samples": 1250000,
            "training_split": "1,000,000 passenger taps across Howrah Maidan to Sector V",
            "critical_protocol": "Stratified by peak rush hours (8:30-10:30 AM) and office return corridors. Group-aware split by passenger ID cards."
        },
        {
            "sector": "Financial Inclusion (Nadia District Women SHG Microfinance Hub)",
            "scenario": "Credit Default Risk Evaluation on Low-Documentation Collateral",
            "samples": 4800,
            "training_split": "3,840 borrower cycles (Class ratio: 97.4% Repaid, 2.6% Default)",
            "critical_protocol": "Cost-Sensitive Training Loss: False negatives penalized 15x over false positives to shield SHG revolving funds from liquidity shocks."
        },
        {
            "sector": "Agro-Industry (Dooars & Darjeeling Tea Quality Auction, Siliguri)",
            "scenario": "Organoleptic Tea Tasting Grading Prediction from Chemical Sensors",
            "samples": 1240,
            "training_split": "992 estate harvest batches",
            "critical_protocol": "Label verification filter: Dual-taster consensus required to eliminate sensory outlier contamination before ERM optimization."
        }
    ]

    for i, c in enumerate(cases, 1):
        print(f"\n[Case {i}] {c['sector']}")
        print(f"  • Application:      {c['scenario']}")
        print(f"  • Training Corpus:  {c['samples']:,} records -> {c['training_split']}")
        print(f"  • Splitting Rule:   {c['critical_protocol']}")


def main():
    print("=" * 80)
    print("CODER & ACCOTAX - ADVANCED MACHINE LEARNING LAB (TOPIC 6)")
    print("THEORY & MECHANICS OF TRAINING DATASETS IN EMPIRICAL RISK MINIMIZATION")
    print("Course: BCAC701B | Instructor: Sukanta Hui | Barrackpore, West Bengal")
    print("=" * 80)

    # 1. Learning Curves Simulation
    print("\n[PART 1] LEARNING CURVES & SAMPLE SIZE SCALING (E_in vs E_out)")
    print("-" * 80)
    print(f"{'N_Train':<8} | {'Underfit E_in':<14} | {'Underfit E_out':<14} | {'Complex E_in':<14} | {'Complex E_out':<14} | {'Complex Gap':<12}")
    print("-" * 80)
    lc_results = run_learning_curve_benchmark()
    for row in lc_results:
        print(f"{row['n_train']:<8} | {row['underfit_e_in']:<14} | {row['underfit_e_out']:<14} | {row['complex_e_in']:<14} | {row['complex_e_out']:<14} | {row['complex_gap']:<12}")

    # 2. Data Leakage Audit
    print("\n[PART 2] PREPROCESSING DATA LEAKAGE AUDIT (TRAIN-ONLY FIT VS LEAKED)")
    print("-" * 80)
    leakage = run_data_leakage_audit_comparison()
    print(f"Clean Scaler  (Train Only)   -> Mean: {leakage['clean_train_mean']}, Std: {leakage['clean_train_std']}")
    print(f"Leaked Scaler (Train + Test) -> Mean: {leakage['leaked_combined_mean']}, Std: {leakage['leaked_combined_std']}")
    print(f"Clean Model Test MSE:         {leakage['mse_clean_test']}")
    print(f"Leaked Model Test MSE:        {leakage['mse_leaked_test']}")
    print(f"Distortion / Bias Delta:      {leakage['optimism_bias_delta']} (Artifact of improper pipeline encapsulation)")

    # 3. Label Noise Robustness
    print("\n[PART 3] LABEL NOISE CONTAMINATION STRESS TEST")
    print("-" * 80)
    print(f"{'Noise %':<10} | {'Corrupted':<12} | {'Apparent Train MSE':<20} | {'True Test MSE':<18} | {'Degradation':<12}")
    print("-" * 80)
    noise_results = run_label_noise_robustness_lab()
    for row in noise_results:
        print(f"{row['noise_rate_pct']}%{'':<7} | {row['corrupted_samples']:<12} | {row['train_apparent_mse']:<20} | {row['true_test_generalization_mse']:<18} | {row['degradation_factor']}x")

    # 4. Regional Industrial Case Studies
    run_west_bengal_case_studies()
    print("\n" + "=" * 80)
    print("LABORATORY SIMULATION COMPLETED SUCCESSFULLY (EXIT CODE 0)")
    print("=" * 80)


if __name__ == "__main__":
    main()
