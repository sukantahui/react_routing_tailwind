#include <stdio.h>

#define MAXN 100

int tree[4 * MAXN];

void build_tree(int arr[], int node, int start, int end) {
    if (start == end) {
        tree[node] = arr[start];
        return;
    }
    int mid = (start + end) / 2;
    build_tree(arr, 2 * node, start, mid);
    build_tree(arr, 2 * node + 1, mid + 1, end);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

int query_sum(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 0; // Completely outside
    if (l <= start && end <= r) return tree[node]; // Completely inside
    int mid = (start + end) / 2;
    return query_sum(2 * node, start, mid, l, r) + query_sum(2 * node + 1, mid + 1, end, l, r);
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11};
    int n = 6;
    build_tree(arr, 1, 0, n - 1);
    printf("--- Segment Tree Range Sum Query ---\nRange Sum [1..3] (3+5+7) = %d\n", query_sum(1, 0, n - 1, 1, 3));
    return 0;
}
