"""
advantages_limitations_lab.py
Module 006_001: K-Medoids Clustering
Topic 8: Advantages, Limitations & Computational Complexity Profile
Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
"""

import time
import numpy as np

def benchmark_scalability(sizes=[100, 300, 600]):
    """Measure how computation time scales with dataset size N in K-Medoids."""
    print("=" * 65)
    print(" K-Medoids Scalability & Complexity Profiler")
    print(" Coder & AccoTax | Educator: Sukanta Hui (Barrackpore)")
    print("=" * 65)
    
    results = []
    
    for n in sizes:
        np.random.seed(42)
        data = np.random.randn(n, 4) # n points in 4D space
        
        start_time = time.time()
        
        # 1. Precompute distance matrix O(N^2 * d)
        D = np.sum(np.abs(data[:, None] - data[None, :]), axis=2)
        
        # 2. Run 5 iterations of Alternate K-Medoids
        k = 3
        medoids = np.random.choice(n, k, replace=False)
        for _ in range(5):
            labels = np.argmin(D[:, medoids], axis=1)
            new_medoids = np.zeros(k, dtype=int)
            for j in range(k):
                members = np.where(labels == j)[0]
                if len(members) > 0:
                    sub_D = D[np.ix_(members, members)]
                    new_medoids[j] = members[np.argmin(np.sum(sub_D, axis=1))]
                else:
                    new_medoids[j] = medoids[j]
            medoids = new_medoids
            
        elapsed = time.time() - start_time
        mem_mb = (n * n * 8) / (1024 * 1024)
        
        results.append((n, elapsed * 1000, mem_mb))
        print(f"  Dataset Size N = {n:<5} -> Elapsed Time: {elapsed * 1000:.2f} ms | Distance Matrix RAM: {mem_mb:.3f} MB")
        
    print("\nKey Analytical Takeaways:")
    print("  [+] Advantage: 100% immune to outliers; real exemplars for all clusters.")
    print("  [-] Limitation: Memory and runtime scale quadratically O(N^2).")
    print("  [✓] Remedy: Use CLARA (Sampling PAM) for large datasets N > 10,000.")

if __name__ == "__main__":
    benchmark_scalability()
