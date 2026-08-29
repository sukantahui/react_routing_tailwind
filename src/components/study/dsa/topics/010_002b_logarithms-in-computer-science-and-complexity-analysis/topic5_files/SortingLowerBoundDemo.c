/*
 * File: SortingLowerBoundDemo.c
 * Purpose: Proves the theoretical lower bound Omega(N log N) for comparison sorts
 *          using Decision Tree height h >= log2(N!) and Stirling's Approximation.
 * Mentor: Sukanta Hui (Coder & AccoTax)
 */

#include <stdio.h>
#include <math.h>

// Calculates log2(N!) = sum_{i=1}^N log2(i)
double compute_log2_factorial(int n) {
    double sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += log2((double)i);
    }
    return sum;
}

int main() {
    printf("===================================================================\n");
    printf("  CODER & ACCOTAX - COMPARISON SORTING LOWER BOUND: Omega(N log N) \n");
    printf("===================================================================\n\n");

    printf("%-10s | %-16s | %-16s | %-16s\n", "Size N", "Leaves (N!)", "Exact log2(N!)", "N * log2(N)");
    printf("-------------------------------------------------------------------\n");

    int test_sizes[] = {2, 4, 8, 16, 32, 64, 100};
    int count = sizeof(test_sizes) / sizeof(test_sizes[0]);

    for (int i = 0; i < count; i++) {
        int n = test_sizes[i];
        double exact_log2_nfact = compute_log2_factorial(n);
        double n_log2_n = (double)n * log2((double)n);

        printf("%-10d | %-16s | %-16.2f | %-16.2f\n",
               n, n <= 10 ? "exact" : "astronomical", exact_log2_nfact, n_log2_n);
    }

    printf("\nProof Conclusion: Any comparison-based sorting tree must have height\n");
    printf("h >= ceil(log2(N!)) = Theta(N log N). No comparison sort can ever beat O(N log N)!\n");
    return 0;
}
