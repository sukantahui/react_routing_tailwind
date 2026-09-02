#include <stdio.h>

/**
 * Project 5: Spiral Matrix Traversal Engine
 * Prints all elements of an M x N matrix in spiral (clockwise) order.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#define R 4
#define C 4

void printSpiral(int matrix[R][C]) {
    int top = 0, bottom = R - 1;
    int left = 0, right = C - 1;

    printf("Spiral Order Traversal:\n  ");

    while (top <= bottom && left <= right) {
        // 1. Traverse Right along top row
        for (int i = left; i <= right; i++) {
            printf("%d ", matrix[top][i]);
        }
        top++;

        // 2. Traverse Down along right column
        for (int i = top; i <= bottom; i++) {
            printf("%d ", matrix[i][right]);
        }
        right--;

        // 3. Traverse Left along bottom row
        if (top <= bottom) {
            for (int i = right; i >= left; i--) {
                printf("%d ", matrix[bottom][i]);
            }
            bottom--;
        }

        // 4. Traverse Up along left column
        if (left <= right) {
            for (int i = bottom; i >= top; i--) {
                printf("%d ", matrix[i][left]);
            }
            left++;
        }
    }
    printf("\n");
}

int main(void) {
    int matrix[R][C] = {
        { 1,  2,  3,  4},
        { 5,  6,  7,  8},
        { 9, 10, 11, 12},
        {13, 14, 15, 16}
    };

    printf("Input 4x4 Matrix:\n");
    for (int i = 0; i < R; i++) {
        printf("  [ ");
        for (int j = 0; j < C; j++) printf("%2d ", matrix[i][j]);
        printf("]\n");
    }
    printf("\n");

    printSpiral(matrix);

    return 0;
}
