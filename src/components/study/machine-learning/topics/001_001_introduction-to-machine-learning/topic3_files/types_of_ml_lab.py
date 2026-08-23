"""
=============================================================================
TOPIC 3: TYPES OF MACHINE LEARNING
Academic Practical Laboratory & Simulation Engine
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
Course: Introduction to Machine Learning (BCAC701B)
=============================================================================

This simulation demonstrates the 4 fundamental paradigms of Machine Learning:
1. Supervised Learning: Labeled mapping f(X) -> y (Student grade classification).
2. Unsupervised Learning: Unlabeled clustering (Customer segmentation in Kolkata).
3. Semi-Supervised Learning: Label spreading from a tiny 25% labeled seed.
4. Reinforcement Learning: Q-learning agent learning optimal path in a grid environment.
=============================================================================
"""

import math
import random
from typing import List, Tuple, Dict, Any

# -----------------------------------------------------------------------------
# 1. SUPERVISED LEARNING (Linear Classification)
# -----------------------------------------------------------------------------
class SupervisedLearner:
    """Consumes (x, y) pairs and optimizes weights to minimize classification loss."""
    def __init__(self, lr: float = 0.2, epochs: int = 100):
        self.lr = lr
        self.epochs = epochs
        self.w = [0.0, 0.0]
        self.b = 0.0

    def fit(self, X: List[List[float]], y: List[int]) -> None:
        N = len(X)
        for _ in range(self.epochs):
            for i in range(N):
                z = self.w[0]*X[i][0] + self.w[1]*X[i][1] + self.b
                prob = 1.0 / (1.0 + math.exp(-max(min(z, 20.0), -20.0)))
                err = prob - y[i]
                self.w[0] -= (self.lr / N) * err * X[i][0]
                self.w[1] -= (self.lr / N) * err * X[i][1]
                self.b -= (self.lr / N) * err

    def predict(self, x: List[float]) -> int:
        z = self.w[0]*x[0] + self.w[1]*x[1] + self.b
        return 1 if (1.0 / (1.0 + math.exp(-max(min(z, 20.0), -20.0)))) >= 0.5 else 0


# -----------------------------------------------------------------------------
# 2. UNSUPERVISED LEARNING (k-Means 2-Cluster Demo)
# -----------------------------------------------------------------------------
class UnsupervisedKMeans:
    """Discovers natural centroid clusters without ground-truth labels."""
    def __init__(self, k: int = 2, max_iters: int = 20):
        self.k = k
        self.max_iters = max_iters
        self.centroids: List[List[float]] = []

    def fit(self, X: List[List[float]]) -> List[int]:
        # Initialize centroids to first k points
        self.centroids = [X[0][:], X[-1][:]]
        assignments = [0] * len(X)

        for _ in range(self.max_iters):
            # Assignment step
            for i, x in enumerate(X):
                d0 = sum((x[j] - self.centroids[0][j])**2 for j in range(len(x)))
                d1 = sum((x[j] - self.centroids[1][j])**2 for j in range(len(x)))
                assignments[i] = 0 if d0 < d1 else 1

            # Update step
            for c_idx in range(self.k):
                cluster_pts = [X[i] for i, a in enumerate(assignments) if a == c_idx]
                if cluster_pts:
                    dim = len(X[0])
                    self.centroids[c_idx] = [
                        sum(pt[d] for pt in cluster_pts) / len(cluster_pts)
                        for d in range(dim)
                    ]
        return assignments


# -----------------------------------------------------------------------------
# 3. SEMI-SUPERVISED LEARNING (Graph Label Propagation Demo)
# -----------------------------------------------------------------------------
class SemiSupervisedPropagator:
    """Propagates labels from a small 25% seed using nearest neighbor affinity."""
    def propagate(self, X: List[List[float]], y_partial: List[int]) -> List[int]:
        # y_partial: -1 represents unlabeled, 0 or 1 represents labeled seed
        y_final = list(y_partial)
        for i in range(len(X)):
            if y_final[i] != -1:
                continue
            # Find nearest labeled neighbor
            best_dist = float('inf')
            best_label = 0
            for j in range(len(X)):
                if y_partial[j] != -1:
                    dist = math.sqrt(sum((X[i][d] - X[j][d])**2 for d in range(len(X[0]))))
                    if dist < best_dist:
                        best_dist = dist
                        best_label = y_partial[j]
            y_final[i] = best_label
        return y_final


# -----------------------------------------------------------------------------
# 4. REINFORCEMENT LEARNING (1D Gridworld Q-Learner)
# -----------------------------------------------------------------------------
class QLearningGridAgent:
    """Agent learns optimal policy (Move Left=0, Move Right=1) to reach goal."""
    def __init__(self, n_states: int = 5, lr: float = 0.1, gamma: float = 0.9):
        self.n_states = n_states
        self.lr = lr
        self.gamma = gamma
        # Q-table: states 0 to 4, actions [Left, Right]
        self.Q = [[0.0, 0.0] for _ in range(n_states)]

    def train(self, episodes: int = 200) -> None:
        goal = self.n_states - 1
        for _ in range(episodes):
            state = 0
            while state != goal:
                # Epsilon-greedy action
                action = 1 if random.random() > 0.2 else 0
                next_state = max(0, min(self.n_states - 1, state + (1 if action == 1 else -1)))
                reward = 10.0 if next_state == goal else -1.0

                max_q_next = max(self.Q[next_state])
                self.Q[state][action] += self.lr * (reward + self.gamma * max_q_next - self.Q[state][action])
                state = next_state


def run_four_paradigms():
    print("=" * 80)
    print("CODER & ACCOTAX - TOPIC 3 LABORATORY")
    print("The 4 Core Paradigms of Machine Learning Simulation")
    print("=" * 80)

    # 1. Supervised Demo
    print("\n[1. SUPERVISED LEARNING: Supervised Student Exam Pass Classifier]")
    X_sup = [[0.8, 0.9], [0.9, 0.85], [0.2, 0.3], [0.3, 0.25], [0.75, 0.8]]
    y_sup = [1, 1, 0, 0, 1]
    sup_model = SupervisedLearner()
    sup_model.fit(X_sup, y_sup)
    test_cand = [0.85, 0.78]
    print(f" -> Input: {test_cand} => Supervised Prediction: {'Pass (1)' if sup_model.predict(test_cand) == 1 else 'Fail (0)'}")

    # 2. Unsupervised Demo
    print("\n[2. UNSUPERVISED LEARNING: k-Means Customer Segmentation in Kolkata]")
    X_unsup = [[1.2, 1.1], [1.0, 0.9], [0.9, 1.3], [8.5, 9.1], [9.0, 8.8], [8.8, 9.5]]
    kmeans = UnsupervisedKMeans(k=2)
    clusters = kmeans.fit(X_unsup)
    print(f" -> Ingested {len(X_unsup)} unlabeled points. Discovered Clusters: {clusters}")
    print(f" -> Final Learned Centroids: {[[round(v, 2) for v in c] for c in kmeans.centroids]}")

    # 3. Semi-Supervised Demo
    print("\n[3. SEMI-SUPERVISED LEARNING: Label Spreading from 25% Seed]")
    X_semi = [[0.1, 0.1], [0.15, 0.2], [0.2, 0.1], [0.85, 0.9], [0.9, 0.8], [0.95, 0.95]]
    y_sparse = [0, -1, -1, 1, -1, -1] # Only 2 points labeled out of 6!
    semi_model = SemiSupervisedPropagator()
    y_propagated = semi_model.propagate(X_semi, y_sparse)
    print(f" -> Initial Labeled Seed: {y_sparse}")
    print(f" -> Propagated Ground Truth: {y_propagated}")

    # 4. Reinforcement Learning Demo
    print("\n[4. REINFORCEMENT LEARNING: Autonomous Q-Agent Gridworld Navigation]")
    rl_agent = QLearningGridAgent(n_states=5)
    rl_agent.train(episodes=300)
    print(" -> Converged Q-Table (State x Action [Left, Right]):")
    for s, q_vals in enumerate(rl_agent.Q):
        best_act = "Move RIGHT ➔" if q_vals[1] > q_vals[0] else "Move LEFT ⬅"
        print(f"    State {s}: Q_values = {[round(v, 2) for v in q_vals]} => Optimal Policy: {best_act}")

    print("\n" + "=" * 80)
    print("SUMMARY OF PARADIGMS:")
    print("Supervised:   Direct feedback (labels y) | Learns mapping h(x)")
    print("Unsupervised: Zero feedback (no y)       | Discovers patterns/clusters")
    print("Semi-Super:   Sparse labels              | Spreads information along manifold")
    print("Reinforce:    Delayed rewards            | Optimizes sequential decision policy")
    print("=" * 80)


if __name__ == "__main__":
    run_four_paradigms()
