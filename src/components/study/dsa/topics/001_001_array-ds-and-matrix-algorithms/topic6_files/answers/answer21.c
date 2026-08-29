#include <stdio.h>

#define R1 2
#define C1 3
#define R2 3
#define C2 2

void multiply_matrices(int A[R1][C1], int B[R2][C2], int C[R1][C2]) {
    if (C1 != R2) {
        printf("Error: Incompatible dimensions for matrix multiplication.\n");
        return;
    }

    for (int i = 0; i < R1; i++) {
        for (int j = 0; j < C2; j++) {
            C[i][j] = 0;
            for (int k = 0; k < C1; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}

int main() {
    int A[R1][C1] = { {1, 2, 3}, {4, 5, 6} };
    int B[R2][C2] = { {7, 8}, {9, 1}, {2, 3} };
    int C[R1][C2];

    multiply_matrices(A, B, C);

    printf("--- Matrix Multiplication Engine ---\nResult Matrix C (%dx%d):\n", R1, C2);
    for (int i = 0; i < R1; i++) {
        for (int j = 0; j < C2; j++) {
            printf("%4d ", C[i][j]);
        }
        printf("\n");
    }

    return 0;
}
