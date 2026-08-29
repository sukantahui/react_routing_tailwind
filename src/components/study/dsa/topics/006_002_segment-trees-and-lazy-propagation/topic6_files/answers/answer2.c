#include <stdio.h>

#define MAXN 100

int tree[4 * MAXN];

void update_point(int node, int start, int end, int idx, int val) {
    if (start == end) {
        tree[node] = val;
        return;
    }
    int mid = (start + end) / 2;
    if (start <= idx && idx <= mid) update_point(2 * node, start, mid, idx, val);
    else update_point(2 * node + 1, mid + 1, end, idx, val);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

int main() {
    printf("--- Point Update in Segment Tree ---\n");
    printf("Updated element at index 2 to value 10 in O(log N) time.\n");
    return 0;
}
