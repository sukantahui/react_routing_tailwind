#include <stdio.h>

#define N 4

void rotate_outer_ring(int matrix[N][N], int k) {
    // Top-left to bottom-right layer 0 ring elements length = 4 * (N - 1)
    int ring_len = 4 * (N - 1);
    int ring[ring_len];
    int idx = 0;

    int top = 0, bottom = N - 1, left = 0, right = N - 1;

    // Unpack Ring 0
    for (int j = left; j <= right; j++) ring[idx++] = matrix[top][j];
    for (int i = top + 1; i <= bottom; i++) ring[idx++] = matrix[i][right];
    for (int j = right - 1; j >= left; j--) ring[idx++] = matrix[bottom][j];
    for (int i = bottom - 1; i > top; i--) ring[idx++] = matrix[i][left];

    // Cyclic shift by k positions
    int rotated[ring_len];
    for (int i = 0; i < ring_len; i++) {
        rotated[(i + k) % ring_len] = ring[i];
    }

    // Repack Ring 0
    idx = 0;
    for (int j = left; j <= right; j++) matrix[top][j] = rotated[idx++];
    for (int i = top + 1; i <= bottom; i++) matrix[i][right] = rotated[idx++];
    for (int j = right - 1; j >= left; j--) matrix[bottom][j] = rotated[idx++];
    for (int i = bottom - 1; i > top; i--) matrix[i][left] = rotated[idx++];
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

    printf("--- Original Matrix ---\n");
    print_matrix(matrix);

    rotate_outer_ring(matrix, 2);

    printf("\n--- Outer Ring Rotated Clockwise by K=2 ---\n");
    print_matrix(matrix);

    return 0;
}
