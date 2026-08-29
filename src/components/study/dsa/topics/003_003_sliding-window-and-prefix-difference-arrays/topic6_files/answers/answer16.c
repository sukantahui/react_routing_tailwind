#include <stdio.h>

void update_2d_diff(int D[4][4], int r1, int c1, int r2, int c2, int val) {
    D[r1][c1] += val;
    D[r1][c2 + 1] -= val;
    D[r2 + 1][c1] -= val;
    D[r2 + 1][c2 + 1] += val;
}

int main() {
    int D[4][4] = {{0}};
    printf("--- 2D Difference Array Matrix Range Update ---\n");
    update_2d_diff(D, 1, 1, 2, 2, 5);
    printf("Applied +5 update to submatrix [(1,1)..(2,2)] in O(1) time.\n");
    return 0;
}
