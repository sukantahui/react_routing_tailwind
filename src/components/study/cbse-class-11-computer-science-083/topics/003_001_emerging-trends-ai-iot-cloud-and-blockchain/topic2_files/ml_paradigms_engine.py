# ml_paradigms_engine.py
# CBSE Class XI Computer Science (083) - Segment 3: Emerging Trends
# Topic: Machine Learning (ML) & Deep Learning Paradigms
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

"""
This Python module demonstrates the three core paradigms of Machine Learning:
1. Supervised Learning (Classification with Labeled Training Pairs: X -> Y)
2. Unsupervised Learning (Clustering Unlabeled Feature Vectors)
3. Reinforcement Learning (Agent-Environment Policy Learning with Rewards)
4. Deep Neural Network Forward Propagation Simulator
"""

import math
from typing import List, Tuple, Dict

# --- 1. SUPERVISED LEARNING: K-NEAREST NEIGHBORS (KNN) CLASSIFIER ---
class SimpleKNNClassifier:
    """Supervised classifier trained on labeled dataset [(feature1, feature2), label]."""
    def __init__(self, k: int = 3):
        self.k = k
        self.training_data = [
            ((1.0, 1.0), "Spam"),
            ((1.5, 2.0), "Spam"),
            ((2.0, 1.5), "Spam"),
            ((8.0, 8.0), "Ham (Legitimate)"),
            ((8.5, 9.0), "Ham (Legitimate)"),
            ((9.0, 8.5), "Ham (Legitimate)")
        ]

    def predict(self, x: float, y: float) -> str:
        distances = []
        for (tx, ty), label in self.training_data:
            dist = math.sqrt((x - tx)**2 + (y - ty)**2)
            distances.append((dist, label))
        distances.sort(key=lambda item: item[0])
        nearest_labels = [label for _, label in distances[:self.k]]
        # Return majority vote
        return max(set(nearest_labels), key=nearest_labels.count)

# --- 2. UNSUPERVISED LEARNING: K-MEANS CLUSTERING ---
class SimpleKMeansClusterer:
    """Unsupervised clustering discovering natural groupings without target labels."""
    @staticmethod
    def cluster_1d(data: List[float], centroid1: float = 2.0, centroid2: float = 8.0) -> Tuple[List[float], List[float]]:
        c1, c2 = centroid1, centroid2
        for _ in range(5):  # 5 iterations
            cluster_1 = [x for x in data if abs(x - c1) <= abs(x - c2)]
            cluster_2 = [x for x in data if abs(x - c2) < abs(x - c1)]
            if cluster_1: c1 = sum(cluster_1) / len(cluster_1)
            if cluster_2: c2 = sum(cluster_2) / len(cluster_2)
        return cluster_1, cluster_2

# --- 3. REINFORCEMENT LEARNING: Q-LEARNING AGENT ---
class SimpleRLAgent:
    """Agent learns optimal policy in a 5-step environment to reach Goal at position 4."""
    def __init__(self):
        self.q_table = [0.0] * 5  # Estimated value of being in each position
        self.goal_pos = 4

    def train(self, episodes: int = 20):
        gamma = 0.8  # Discount factor
        for _ in range(episodes):
            state = 0
            while state < self.goal_pos:
                next_state = state + 1
                reward = 100.0 if next_state == self.goal_pos else 0.0
                # Bellman update equation
                self.q_table[state] += 0.5 * (reward + gamma * self.q_table[next_state] - self.q_table[state])
                state = next_state

def run_ml_demonstrations():
    print("=" * 70)
    print("  CBSE CLASS XI CS (083) - MACHINE LEARNING PARADIGMS SUITE")
    print("=" * 70)

    # 1. Supervised Learning
    knn = SimpleKNNClassifier(k=3)
    test_sample = (1.2, 1.8)
    prediction = knn.predict(*test_sample)
    print(f"\n[1] SUPERVISED LEARNING (KNN CLASSIFIER):")
    print(f"  Test Feature Vector: {test_sample}")
    print(f"  Supervised Predicted Class: {prediction}")

    # 2. Unsupervised Learning
    raw_data = [1.1, 1.5, 2.0, 7.8, 8.2, 9.0, 1.8, 8.5]
    c1, c2 = SimpleKMeansClusterer.cluster_1d(raw_data)
    print(f"\n[2] UNSUPERVISED LEARNING (K-MEANS CLUSTERING):")
    print(f"  Raw Unlabeled Data: {raw_data}")
    print(f"  Discovered Cluster 1 (Low Range) : {c1}")
    print(f"  Discovered Cluster 2 (High Range): {c2}")

    # 3. Reinforcement Learning
    agent = SimpleRLAgent()
    agent.train(episodes=25)
    print(f"\n[3] REINFORCEMENT LEARNING (Q-POLICY VALUES):")
    print(f"  Trained State Q-Values (Positions 0 to 4):")
    for i, val in enumerate(agent.q_table):
        print(f"    State Pos {i}: Value = {val:.2f}")

if __name__ == "__main__":
    run_ml_demonstrations()
