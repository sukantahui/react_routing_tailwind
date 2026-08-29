#include <stdio.h>

#define MAXN 100

int bit[MAXN + 1];
int n = 10;

void update_diff(int idx, int val) {
    for (; idx <= n; idx += idx & -idx) bit[idx] += val;
}

void range_update(int L, int R, int val) {
    update_diff(L, val);
    update_diff(R + 1, -val);
}

int point_query(int idx) {
    int sum = 0;
    for (; idx > 0; idx -= idx & -idx) sum += bit[idx];
    return sum;
}

int main() {
    range_update(2, 5, 10);
    printf("--- Fenwick Tree Range Update & Point Query ---\nValue at Index 3 after +10 update to [2..5] = %d\n", point_query(3));
    return 0;
}
