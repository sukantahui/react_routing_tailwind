/*
 * File: ExoticLogarithmsDemo.c
 * Purpose: Demonstrates Double Logarithms O(log log N) and Iterated Logarithms O(log* N)
 *          found in advanced data structures (Van Emde Boas, DSU Path Compression).
 * Mentor: Sukanta Hui (Coder & AccoTax)
 */

#include <stdio.h>
#include <math.h>

// Calculates iterated logarithm log*(N)
int compute_log_star(double n) {
    int count = 0;
    while (n > 1.0) {
        n = log2(n);
        count++;
    }
    return count;
}

int main() {
    printf("===================================================================\n");
    printf("  CODER & ACCOTAX - EXOTIC LOGARITHMS: log(log N) & log*(N)        \n");
    printf("===================================================================\n\n");

    double test_values[] = {2, 4, 16, 256, 65536, 1e9, 1e18, 1e80};
    int count = sizeof(test_values) / sizeof(test_values[0]);

    printf("%-18s | %-12s | %-15s | %-12s\n", "Input N", "log2(N)", "log2(log2(N))", "log*(N)");
    printf("-------------------------------------------------------------------\n");

    for (int i = 0; i < count; i++) {
        double n = test_values[i];
        double l2 = log2(n);
        double ll2 = l2 > 0 ? log2(l2) : 0;
        int lstar = compute_log_star(n);

        printf("%-18.0e | %-12.2f | %-15.2f | %-12d\n", n, l2, ll2, lstar);
    }

    printf("\nNote: For N = 10^80 (number of atoms in the entire observable universe),\n");
    printf("log*(N) is STILL only 5! That is why in practice, O(log* N) is effectively O(1).\n");
    return 0;
}
