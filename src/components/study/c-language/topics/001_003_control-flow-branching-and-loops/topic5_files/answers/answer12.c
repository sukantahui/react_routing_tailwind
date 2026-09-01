/**
 * ============================================================================
 * Project 12: Floyd's Triangle & Pascal's Binomial Coefficient Pattern Generator
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

void printFloydsTriangle(int rows) {
    printf("--- Floyd's Natural Number Triangle (%d Rows) ---\n", rows);
    int count = 1;
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            printf("%3d ", count++);
        }
        printf("\n");
    }
    printf("\n");
}

void printPascalsTriangle(int rows) {
    printf("--- Pascal's Binomial Coefficient Triangle (%d Rows) ---\n", rows);
    for (int i = 0; i < rows; i++) {
        /* Leading spaces for centered pyramid */
        for (int s = 0; s < rows - i - 1; s++) {
            printf("  ");
        }
        int val = 1;
        for (int j = 0; j <= i; j++) {
            printf("%4d", val);
            /* Compute next binomial coefficient iteratively */
            val = val * (i - j) / (j + 1);
        }
        printf("\n");
    }
    printf("\n");
}

int main(void) {
    printf("===================================================================\n");
    printf("     FLOYD'S & PASCAL'S PATTERN ENGINE - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    printFloydsTriangle(5);
    printPascalsTriangle(5);

    printf("===================================================================\n");
    return 0;
}
