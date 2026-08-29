#include <stdio.h>
#include <stdlib.h>

#define R1 2
#define C1 3
#define R2 3
#define C2 2

void multiplyMatrices(int A[R1][C1], int B[R2][C2], int C[R1][C2]) {
    for (int i = 0; i < R1; i++) {
        for (int j = 0; j < C2; j++) {
            C[i][j] = 0;
            for (int k = 0; k < C1; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}

void printMatrix(int rows, int cols, const int mat[rows][cols], const char *name) {
    printf("Matrix %s (%dx%d):\n", name, rows, cols);
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%4d ", mat[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}

int main() {
    printf("=== Matrix Multiplication Algorithm O(n^3) in C ===\n\n");
    int A[R1][C1] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    int B[R2][C2] = {
        {7, 8},
        {9, 1},
        {2, 3}
    };

    int C[R1][C2];

    multiplyMatrices(A, B, C);

    printMatrix(R1, C1, A, "A");
    printMatrix(R2, C2, B, "B");
    printMatrix(R1, C2, C, "C (Product A x B)");

    return 0;
}
