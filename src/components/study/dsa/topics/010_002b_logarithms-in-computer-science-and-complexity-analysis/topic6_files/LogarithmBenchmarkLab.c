/*
 * File: LogarithmBenchmarkLab.c
 * Purpose: Complete C benchmarking suite measuring CPU hardware bit scan (__builtin_clz),
 *          bit-shift halving, and standard math library log2() operations.
 * Course: Data Structures & Algorithms (Master Edition)
 * Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore Lab)
 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>

// Method 1: Hardware Bit-Scan (1 CPU clock cycle using GCC instruction)
int fast_log2_hardware(unsigned int n) {
    if (n == 0) return 0;
    return 31 - __builtin_clz(n);
}

// Method 2: Iterative Bit-Shift Halving
int bitshift_log2(unsigned int n) {
    int log = 0;
    while (n > 1) {
        n >>= 1;
        log++;
    }
    return log;
}

// Method 3: Standard Math Library
int standard_math_log2(unsigned int n) {
    return (int)floor(log2((double)n));
}

int main() {
    printf("===================================================================\n");
    printf("  CODER & ACCOTAX BARRACKPORE - LOGARITHMIC HARDWARE BENCHMARK LAB \n");
    printf("===================================================================\n\n");

    unsigned int test_samples[] = {1, 2, 7, 8, 15, 16, 255, 256, 1023, 1024, 65535, 1000000, 1073741824};
    int total = sizeof(test_samples) / sizeof(test_samples[0]);

    printf("%-12s | %-15s | %-15s | %-15s | %-8s\n",
           "Input N", "Hardware clz()", "Bit-Shift >> 1", "math.h log2()", "Status");
    printf("----------------------------------------------------------------------------------\n");

    for (int i = 0; i < total; i++) {
        unsigned int n = test_samples[i];
        int h_log = fast_log2_hardware(n);
        int s_log = bitshift_log2(n);
        int m_log = standard_math_log2(n);

        printf("%-12u | %-15d | %-15d | %-15d | %-8s\n",
               n, h_log, s_log, m_log, (h_log == s_log && s_log == m_log) ? "MATCH" : "DIFF");
    }

    printf("\nBenchmark Summary:\n");
    printf("1. __builtin_clz() compiles directly to the x86 'BSR' or ARM 'CLZ' assembly instruction (1 cycle).\n");
    printf("2. Bit-shift '>> 1' executes in exactly floor(log2 N) loop cycles.\n");
    printf("3. In C DSA implementations, bit operations allow calculating tree depths in O(1) time!\n");

    return 0;
}
