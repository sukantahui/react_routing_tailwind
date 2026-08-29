#include <stdio.h>

#define R 4
#define C 4

int P[R + 1][C + 1]; // 1-indexed Prefix Sum Table

void precompute_prefix_sum(int grid[R][C]) {
    for (int i = 0; i <= R; i++) {
        for (int j = 0; j <= C; j++) P[i][j] = 0;
    }

    for (int i = 1; i <= R; i++) {
        for (int j = 1; j <= C; j++) {
            P[i][j] = grid[i - 1][j - 1] + P[i - 1][j] + P[i][j - 1] - P[i - 1][j - 1];
        }
    }
}

int query_submatrix_sum(int r1, int c1, int r2, int c2) {
    // 0-indexed inputs converted to 1-indexed coordinates
    r1++; c1++; r2++; c2++;
    return P[r2][c2] - P[r1 - 1][c2] - P[r2][c1 - 1] + P[r1 - 1][c1 - 1];
}

int main() {
    int grid[R][C] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12},
        {13, 14, 15, 16}
    };

    precompute_prefix_sum(grid);

    printf("--- 2D Prefix Sum Submatrix Query Engine ---\n");
    int r1 = 1, c1 = 1, r2 = 2, c2 = 3;
    int sum = query_submatrix_sum(r1, c1, r2, c2);

    printf("Submatrix Query [(%d,%d) to (%d,%d)] Sum = %d (Instant O(1) Time!)\n", r1, c1, r2, c2, sum);
    return 0;
}
