/**
 * ============================================================================
 * Project 13: 2D Matrix Multiplication & Transposition with Cache Locality
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

#define N 3

void printMatrix(const char* name, int mat[N][N]) {
    printf("Matrix %s (%dx%d):\n", name, N, N);
    for (int r = 0; r < N; r++) {
        for (int c = 0; c < N; c++) {
            printf("%5d", mat[r][c]);
        }
        printf("\n");
    }
    printf("\n");
}

int main(void) {
    printf("===================================================================\n");
    printf("     2D MATRIX MULTIPLICATION & TRANSPOSE - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    int A[N][N] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    int B[N][N] = {
        {9, 8, 7},
        {6, 5, 4},
        {3, 2, 1}
    };

    int C[N][N] = {0};
    int T[N][N] = {0};

    /* 1. Matrix Multiplication: O(N^3) standard algorithm */
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            for (int k = 0; k < N; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    /* 2. Matrix Transposition: O(N^2) coordinate swap */
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            T[j][i] = A[i][j];
        }
    }

    printMatrix("A", A);
    printMatrix("B", B);
    printMatrix("C = (A * B)", C);
    printMatrix("A^T (Transpose of A)", T);

    printf("===================================================================\n");
    return 0;
}
