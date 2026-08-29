/*
 * File: LogarithmFoundationsDemo.c
 * Purpose: Demonstrates the mathematical and physical concept of Logarithms (Base 2)
 *          as continuous halving in computer science and algorithmic step counting.
 * Course: Data Structures & Algorithms (Master Edition)
 * Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore Lab)
 */

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// Simulates the exact number of halving divisions until N reaches 1
int count_halving_steps(long long n) {
    int steps = 0;
    long long current = n;
    printf("\n[Step Trace for N = %lld]:\n", n);
    while (current > 1) {
        printf("  Step %2d: current = %12lld -> dividing by 2 -> %12lld\n", 
               steps + 1, current, current / 2);
        current /= 2;
        steps++;
    }
    return steps;
}

int main() {
    printf("==================================================================\n");
    printf("   CODER & ACCOTAX BARRACKPORE - LOGARITHMS IN COMPUTER SCIENCE   \n");
    printf("   Topic 0: Inverse Exponentiation & Continuous Halving (log2 N)  \n");
    printf("==================================================================\n\n");

    long long test_sizes[] = {8, 16, 64, 1024, 1000000, 1000000000LL};
    int num_tests = sizeof(test_sizes) / sizeof(test_sizes[0]);

    printf("%-15s | %-12s | %-12s | %-15s\n", "Input N", "Floor(log2 N)", "Exact Steps", "2^(Steps) Bounds");
    printf("------------------------------------------------------------------\n");

    for (int i = 0; i < num_tests; i++) {
        long long n = test_sizes[i];
        double exact_log2 = log2((double)n);
        int floor_log2 = (int)floor(exact_log2);
        int steps = 0;
        long long temp = n;
        while (temp > 1) {
            temp /= 2;
            steps++;
        }
        printf("%-15lld | %-12d | %-12d | 2^%d <= %lld < 2^%d\n", 
               n, floor_log2, steps, steps, n, steps + 1);
    }

    // Detailed walkthrough for N = 1000
    printf("\nDetailed execution for N = 1000:\n");
    int steps_1000 = count_halving_steps(1000);
    printf("Total halving divisions needed for N=1000: %d steps (floor(log2(1000)) = %d)\n",
           steps_1000, (int)floor(log2(1000.0)));

    printf("\nConclusion: While Linear O(N) requires 1,000,000 steps for 1M items,\n");
    printf("Logarithmic O(log2 N) requires only ~20 steps! That is the power of log in DSA.\n");

    return 0;
}
