#include <stdio.h>

#define MAXN 100

int tree[2 * MAXN];
int n;

void build_iterative(int arr[], int size) {
    n = size;
    for (int i = 0; i < n; i++) tree[n + i] = arr[i];
    for (int i = n - 1; i > 0; i--) tree[i] = tree[i << 1] + tree[i << 1 | 1];
}

void update_iterative(int p, int val) {
    for (tree[p += n] = val; p > 1; p >>= 1) tree[p >> 1] = tree[p] + tree[p ^ 1];
}

int query_iterative(int l, int r) {
    int res = 0;
    for (l += n, r += n + 1; l < r; l >>= 1, r >>= 1) {
        if (l & 1) res += tree[l++];
        if (r & 1) res += tree[--r];
    }
    return res;
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    build_iterative(arr, 5);
    printf("--- Iterative Non-Recursive Segment Tree ---\nRange Sum [1..3] = %d\n", query_iterative(1, 3));
    return 0;
}
