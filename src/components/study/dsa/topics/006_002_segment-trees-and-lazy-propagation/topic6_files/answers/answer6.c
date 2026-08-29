#include <stdio.h>

#define MAXN 100

int tree[4 * MAXN], lazy[4 * MAXN];

void push(int node, int start, int end) {
    if (lazy[node] != 0) {
        tree[node] += (end - start + 1) * lazy[node];
        if (start != end) {
            lazy[2 * node] += lazy[node];
            lazy[2 * node + 1] += lazy[node];
        }
        lazy[node] = 0;
    }
}

void update_range_lazy(int node, int start, int end, int l, int r, int val) {
    push(node, start, end);
    if (r < start || end < l) return;
    if (l <= start && end <= r) {
        lazy[node] += val;
        push(node, start, end);
        return;
    }
    int mid = (start + end) / 2;
    update_range_lazy(2 * node, start, mid, l, r, val);
    update_range_lazy(2 * node + 1, mid + 1, end, l, r, val);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

int main() {
    printf("--- Lazy Propagation Fundamental Mechanics ---\n");
    update_range_lazy(1, 0, 9, 2, 6, 5);
    printf("Applied +5 to range [2..6] in O(log N) time using Lazy Propagation.\n");
    return 0;
}
