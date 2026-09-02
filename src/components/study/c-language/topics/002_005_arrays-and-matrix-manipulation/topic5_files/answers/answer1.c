#include <stdio.h>

/**
 * Project 1: Matrix Multiplication & Dimension Verifier
 * Multiplies two matrices A (r1 x c1) and B (r2 x c2) after validating dimensions (c1 == r2).
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

int main(void) {
    int r1 = 2, c1 = 3;
    int r2 = 3, c2 = 2;

    int A[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    int B[3][2] = {
        {7, 8},
        {9, 1},
        {2, 3}
    };

    int C[2][2] = {0};

    // Dimension Compatibility Check
    if (c1 != r2) {
        printf("Error: Matrix multiplication impossible (Columns of A != Rows of B)!\n");
        return 1;
    }

    // Multiply A x B
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++) {
            C[i][j] = 0;
            for (int k = 0; k < c1; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    printf("Product Matrix C (2x2):\n");
    for (int i = 0; i < r1; i++) {
        printf("  [ ");
        for (int j = 0; j < c2; j++) {
            printf("%3d ", C[i][j]);
        }
        printf("]\n");
    }

    return 0;
}
