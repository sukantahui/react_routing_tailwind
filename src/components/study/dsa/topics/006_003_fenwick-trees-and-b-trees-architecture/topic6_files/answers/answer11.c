#include <stdio.h>

#define R 4
#define C 4

int bit2d[R + 1][C + 1];

void update_2d(int r, int c, int val) {
    for (int i = r; i <= R; i += i & -i) {
        for (int j = c; j <= C; j += j & -j) {
            bit2d[i][j] += val;
        }
    }
}

int query_2d(int r, int c) {
    int sum = 0;
    for (int i = r; i > 0; i -= i & -i) {
        for (int j = c; j > 0; j -= j & -j) {
            sum += bit2d[i][j];
        }
    }
    return sum;
}

int main() {
    update_2d(2, 2, 5);
    printf("--- 2D Fenwick Tree Matrix Prefix Sums ---\n2D Prefix Sum [(1,1)..(2,2)] = %d\n", query_2d(2, 2));
    return 0;
}
