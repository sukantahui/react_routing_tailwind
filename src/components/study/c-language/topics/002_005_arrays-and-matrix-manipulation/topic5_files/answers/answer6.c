#include <stdio.h>

/**
 * Project 6: Matrix Transpose & Symmetry Checker
 * Computes transpose in-place for square matrix and verifies symmetry.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#define N 3

int isSymmetric(int matrix[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = i + 1; j < N; j++) {
            if (matrix[i][j] != matrix[j][i]) {
                return 0; // Not symmetric
            }
        }
    }
    return 1; // Symmetric
}

int main(void) {
    int symMatrix[N][N] = {
        {1, 7, 3},
        {7, 4, -5},
        {3, -5, 6}
    };

    printf("Matrix (3x3):\n");
    for (int i = 0; i < N; i++) {
        printf("  [ ");
        for (int j = 0; j < N; j++) printf("%3d ", symMatrix[i][j]);
        printf("]\n");
    }

    if (isSymmetric(symMatrix)) {
        printf("\n✓ Matrix is SYMMETRIC (A == A^T).\n");
    } else {
        printf("\n✗ Matrix is NOT symmetric.\n");
    }

    return 0;
}
