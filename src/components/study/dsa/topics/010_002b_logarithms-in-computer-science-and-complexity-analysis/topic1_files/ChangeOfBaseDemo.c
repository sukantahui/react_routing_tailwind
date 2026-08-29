/*
 * File: ChangeOfBaseDemo.c
 * Purpose: Demonstrates the Change of Base Theorem and proves why logarithmic
 *          bases differ only by a constant multiplier in Big-O analysis.
 * Mentor: Sukanta Hui (Coder & AccoTax)
 */

#include <stdio.h>
#include <math.h>

void print_base_comparison(long long n) {
    double log2_val = log2((double)n);
    double log10_val = log10((double)n);
    double ln_val = log((double)n);

    // Change of Base: log10(N) = log2(N) / log2(10)
    double constant_multiplier = 1.0 / log2(10.0); // approx 0.30103

    printf("N = %12lld | log2(N) = %7.3f | log10(N) = %7.3f | ln(N) = %7.3f | Ratio log10/log2 = %.5f\n",
           n, log2_val, log10_val, ln_val, log10_val / log2_val);
}

int main() {
    printf("===================================================================\n");
    printf("  CODER & ACCOTAX - CHANGE OF BASE THEOREM & ASYMPTOTIC INVARIANCE \n");
    printf("===================================================================\n\n");

    printf("Mathematical Law: log_a(N) = log_b(N) / log_b(a) = C * log_b(N)\n\n");

    long long test_cases[] = {10, 100, 1000, 1000000, 1000000000LL};
    for (int i = 0; i < 5; i++) {
        print_base_comparison(test_cases[i]);
    }

    printf("\nNote: The ratio log10(N) / log2(N) is ALWAYS strictly 0.30103.\n");
    printf("Because 0.30103 is a constant scalar, O(log2 N) = O(log10 N) = O(log N).\n");
    return 0;
}
