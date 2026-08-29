#include <stdio.h>

#define N 3

void rotate_matrix_90_clockwise(int matrix[N][N]) {
    // Step 1: Transpose matrix in-place
    for (int i = 0; i < N; i++) {
        for (int j = i + 1; j < N; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }

    // Step 2: Reverse each row
    for (int i = 0; i < N; i++) {
        int left = 0, right = N - 1;
        while (left < right) {
            int temp = matrix[i][left];
            matrix[i][left] = matrix[i][right];
            matrix[i][right] = temp;
            left++;
            right--;
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

    rotate_matrix_90_clockwise(matrix);

    printf("\n--- Rotated Matrix 90° Clockwise ---\n");
    print_matrix(matrix);

    return 0;
}
