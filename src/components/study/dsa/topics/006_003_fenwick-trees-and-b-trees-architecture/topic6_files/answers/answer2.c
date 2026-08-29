#include <stdio.h>

#define MAXN 100

int bit[MAXN + 1];
int n = 10;

void update_bit(int idx, int val) {
    for (; idx <= n; idx += idx & -idx) bit[idx] += val;
}

int query_prefix(int idx) {
    int sum = 0;
    for (; idx > 0; idx -= idx & -idx) sum += bit[idx];
    return sum;
}

int query_range_sum(int L, int R) {
    return query_prefix(R) - query_prefix(L - 1);
}

int main() {
    int arr[] = {0, 2, 4, 6, 8, 10}; // 1-indexed
    for (int i = 1; i <= 5; i++) update_bit(i, arr[i]);

    printf("--- Range Sum Query using 1D Fenwick Tree ---\nRange Sum [2..4] (4+6+8) = %d\n", query_range_sum(2, 4));
    return 0;
}
