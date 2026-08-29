#include <stdio.h>

#define MAXN 100

int bit[MAXN + 1];
int n = 10;

void update_bit(int idx, int val) {
    for (; idx <= n; idx += idx & -idx) bit[idx] += val;
}

int query_prefix_sum(int idx) {
    int sum = 0;
    for (; idx > 0; idx -= idx & -idx) sum += bit[idx];
    return sum;
}

int main() {
    int arr[] = {0, 1, 3, 5, 7, 9, 11}; // 1-indexed
    for (int i = 1; i <= 6; i++) update_bit(i, arr[i]);

    printf("--- 1D Fenwick Tree (Binary Indexed Tree) ---\n");
    printf("Prefix Sum [1..4] (1+3+5+7) = %d\n", query_prefix_sum(4));
    return 0;
}
