/**
 * ============================================================================
 * Project 14: Spiral Number Matrix (NxN) Clockwise Inward Boundary Shrinking
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

#define SIZE 4

int main(void) {
    printf("===================================================================\n");
    printf("     NxN SPIRAL NUMBER MATRIX ENGINE - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    int matrix[SIZE][SIZE];
    int val = 1;
    int top = 0, bottom = SIZE - 1;
    int left = 0, right = SIZE - 1;

    /* 4-Phase Boundary Shrinking Loop */
    while (top <= bottom && left <= right) {
        /* Phase 1: Traverse Left to Right along Top Boundary */
        for (int col = left; col <= right; col++) {
            matrix[top][col] = val++;
        }
        top++;

        /* Phase 2: Traverse Top to Bottom along Right Boundary */
        for (int row = top; row <= bottom; row++) {
            matrix[row][right] = val++;
        }
        right--;

        /* Phase 3: Traverse Right to Left along Bottom Boundary */
        if (top <= bottom) {
            for (int col = right; col >= left; col--) {
                matrix[bottom][col] = val++;
            }
            bottom--;
        }

        /* Phase 4: Traverse Bottom to Top along Left Boundary */
        if (left <= right) {
            for (int row = bottom; row >= top; row--) {
                matrix[row][left] = val++;
            }
            left++;
        }
    }

    /* Print Resulting Spiral Grid */
    printf("Generated %dx%d Clockwise Spiral Grid:\n\n", SIZE, SIZE);
    for (int r = 0; r < SIZE; r++) {
        for (int c = 0; c < SIZE; c++) {
            printf("%4d", matrix[r][c]);
        }
        printf("\n");
    }

    printf("\n===================================================================\n");
    return 0;
}
