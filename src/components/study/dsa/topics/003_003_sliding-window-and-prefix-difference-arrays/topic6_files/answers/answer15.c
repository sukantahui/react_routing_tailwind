#include <stdio.h>

#define R 3
#define C 3

int P[R + 1][C + 1];

void build_2d_prefix(int matrix[R][C]) {
    for (int i = 0; i <= R; i++) for (int j = 0; j <= C; j++) P[i][j] = 0;

    for (int i = 1; i <= R; i++) {
        for (int j = 1; j <= C; j++) {
            P[i][j] = matrix[i - 1][j - 1] + P[i - 1][j] + P[i][j - 1] - P[i - 1][j - 1];
        }
    }
}

int query_submatrix_sum(int r1, int c1, int r2, int c2) {
    return P[r2 + 1][c2 + 1] - P[r1][c2 + 1] - P[r2 + 1][c1] + P[r1][c1];
}

int main() {
    int matrix[R][C] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    build_2d_prefix(matrix);
    printf("--- 2D Prefix Sum O(1) Submatrix Query ---\n");
    printf("Submatrix Sum [(1,1)..(2,2)] = %d\n", query_submatrix_sum(1, 1, 2, 2));
    return 0;
}
