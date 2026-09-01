/**
 * ============================================================================
 * Program: NestedLoopsPatternsDemo.c
 * Module: 001_003 - Control Flow: Branching, Decision Making & Loops
 * Topic 4: Building nested loop algorithms: matrix indexing, primes, pyramid patterns
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

int main(void) {
    printf("===================================================================\n");
    printf("     NESTED LOOPS & PATTERN ALGORITHMS - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | Barrackpore Systems Lab\n");
    printf("===================================================================\n\n");

    /* 1. Multiplication Table Grid (Matrix Coordinate Layout) */
    printf("--- [1] 5x5 Multiplication Table Matrix Grid ---\n");
    for (int row = 1; row <= 5; row++) {
        for (int col = 1; col <= 5; col++) {
            printf("%4d", row * col);
        }
        printf("\n");
    }

    /* 2. Right-Angled Number Triangle Pattern */
    printf("\n--- [2] Right-Angled Number Triangle Pattern ---\n");
    int rows = 5;
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            printf("%d ", j);
        }
        printf("\n");
    }

    /* 3. Centered Equilateral Star Pyramid */
    printf("\n--- [3] Centered Equilateral Star Pyramid ---\n");
    for (int i = 1; i <= rows; i++) {
        /* Print leading alignment spaces */
        for (int space = 1; space <= rows - i; space++) {
            printf(" ");
        }
        /* Print odd sequence of stars (2*i - 1) */
        for (int star = 1; star <= (2 * i - 1); star++) {
            printf("*");
        }
        printf("\n");
    }

    /* 4. Optimized Prime Number Search up to N (Nested Verification) */
    printf("\n--- [4] Prime Numbers up to 30 (Optimized sqrt(N) Check) ---\n");
    printf("Primes: ");
    for (int num = 2; num <= 30; num++) {
        bool isPrime = true;
        for (int d = 2; d * d <= num; d++) {
            if (num % d == 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            printf("%d ", num);
        }
    }
    printf("\n===================================================================\n");

    return 0;
}
