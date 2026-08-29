/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Asymptotic Notations: Big-O, Big-Omega, Big-Theta Mathematical Bounds
 * File: AsymptoticAnalysisDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <stdbool.h>

// Step counter global for pedagogical benchmarking
static unsigned long long totalElementaryOps = 0;

// O(1) Constant Time Operation
int constantTimeOperation(const int arr[], int n) {
    totalElementaryOps += 1;
    return (n > 0) ? arr[0] : -1;
}

// O(log N) Logarithmic Search Operation
int logarithmicSearch(const int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        totalElementaryOps += 3; // Comparison, arithmetic, assignment
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

// O(N) Linear Time Operation
long long linearSum(const int arr[], int n) {
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        totalElementaryOps += 2; // Loop step + addition
        sum += arr[i];
    }
    return sum;
}

// O(N^2) Quadratic Nested Loops
long long quadraticMatrixPairs(int n) {
    long long pairCount = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            totalElementaryOps += 2;
            pairCount += (i * j);
        }
    }
    return pairCount;
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - ASYMPTOTIC NOTATIONS & STEP ANALYSIS      \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    int testSizes[] = {10, 100, 1000, 10000};
    int numTests = sizeof(testSizes) / sizeof(testSizes[0]);

    printf("Asymptotic Operation Step Counting vs Input Size N:\n");
    printf("----------------------------------------------------------------------\n");
    printf(" N Size    | O(1) Ops  | O(log2 N) Ops | O(N) Ops    | O(N^2) Ops     \n");
    printf("----------------------------------------------------------------------\n");

    for (int t = 0; t < numTests; t++) {
        int N = testSizes[t];
        int* data = (int*)malloc(N * sizeof(int));
        for (int i = 0; i < N; i++) data[i] = i * 2;

        // O(1)
        totalElementaryOps = 0;
        constantTimeOperation(data, N);
        unsigned long long ops1 = totalElementaryOps;

        // O(log N)
        totalElementaryOps = 0;
        logarithmicSearch(data, N, -99);
        unsigned long long opsLogN = totalElementaryOps;

        // O(N)
        totalElementaryOps = 0;
        linearSum(data, N);
        unsigned long long opsN = totalElementaryOps;

        // O(N^2) - capped at N=1000 for demo speed
        unsigned long long opsN2 = 0;
        if (N <= 1000) {
            totalElementaryOps = 0;
            quadraticMatrixPairs(N);
            opsN2 = totalElementaryOps;
        }

        if (N <= 1000) {
            printf(" %-9d | %-9llu | %-13llu | %-11llu | %-15llu\n", N, ops1, opsLogN, opsN, opsN2);
        } else {
            printf(" %-9d | %-9llu | %-13llu | %-11llu | (100,000,000+ ops)\n", N, ops1, opsLogN, opsN);
        }

        free(data);
    }
    printf("----------------------------------------------------------------------\n\n");

    printf("Mathematical Invariants:\n");
    printf("• Big-O (O):     Upper Asymptotic Bound -> T(n) <= c * g(n) for n >= n0\n");
    printf("• Big-Omega (Ω): Lower Asymptotic Bound -> T(n) >= c * g(n) for n >= n0\n");
    printf("• Big-Theta (Θ): Tight Asymptotic Bound -> c1 * g(n) <= T(n) <= c2 * g(n)\n");

    return 0;
}
