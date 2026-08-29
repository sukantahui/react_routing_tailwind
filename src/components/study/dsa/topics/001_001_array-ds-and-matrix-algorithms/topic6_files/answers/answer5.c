#include <stdio.h>

#define N 4

void transpose_square_matrix(int matrix[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = i + 1; j < N; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
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
        { 1,  2,  3,  4},
        { 5,  6,  7,  8},
        { 9, 10, 11, 12},
        {13, 14, 15, 16}
    };

    printf("--- Original Matrix (4x4) ---\n");
    print_matrix(matrix);

    transpose_square_matrix(matrix);

    printf("\n--- Transposed Matrix (In-Place Transposition) ---\n");
    print_matrix(matrix);

    return 0;
}
