#include <stdio.h>

#define N 3

void rotate_180_clockwise(int matrix[N][N]) {
    for (int i = 0; i < N / 2; i++) {
        for (int j = 0; j < N; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[N - 1 - i][N - 1 - j];
            matrix[N - 1 - i][N - 1 - j] = temp;
        }
    }
    // Handle middle row if N is odd
    if (N % 2 != 0) {
        int mid = N / 2;
        for (int j = 0; j < N / 2; j++) {
            int temp = matrix[mid][j];
            matrix[mid][j] = matrix[mid][N - 1 - j];
            matrix[mid][N - 1 - j] = temp;
        }
    }
}

void print_matrix(int matrix[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            printf("%3d ", matrix[i][j]);
        }
        printf("\n");
    }
}

int main() {
    int matrix[N][N] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    printf("--- Original Matrix (3x3) ---\n");
    print_matrix(matrix);

    rotate_180_clockwise(matrix);

    printf("\n--- Matrix Rotated 180° ---\n");
    print_matrix(matrix);

    return 0;
}
