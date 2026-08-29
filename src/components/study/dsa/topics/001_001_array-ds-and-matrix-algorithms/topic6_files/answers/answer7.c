#include <stdio.h>

#define R 4
#define C 4

void print_spiral_matrix(int matrix[R][C]) {
    int top = 0, bottom = R - 1;
    int left = 0, right = C - 1;

    printf("--- Spiral Order Traversal Output ---\n[ ");

    while (top <= bottom && left <= right) {
        // 1. Traverse Right along top boundary
        for (int i = left; i <= right; i++) {
            printf("%d ", matrix[top][i]);
        }
        top++;

        // 2. Traverse Down along right boundary
        for (int i = top; i <= bottom; i++) {
            printf("%d ", matrix[i][right]);
        }
        right--;

        // 3. Traverse Left along bottom boundary
        if (top <= bottom) {
            for (int i = right; i >= left; i--) {
                printf("%d ", matrix[bottom][i]);
            }
            bottom--;
        }

        // 4. Traverse Up along left boundary
        if (left <= right) {
            for (int i = bottom; i >= top; i--) {
                printf("%d ", matrix[i][left]);
            }
            left++;
        }
    }
    printf("]\n");
}

int main() {
    int matrix[R][C] = {
        { 1,  2,  3,  4},
        { 5,  6,  7,  8},
        { 9, 10, 11, 12},
        {13, 14, 15, 16}
    };

    print_spiral_matrix(matrix);

    return 0;
}
