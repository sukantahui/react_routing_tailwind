#include <stdio.h>
#include <stdbool.h>

#define MAXN 100

int parent[MAXN], sz[MAXN];

void init_dsu(int n) {
    for (int i = 0; i < n; i++) { parent[i] = i; sz[i] = 1; }
}

int find(int i) {
    if (parent[i] == i) return i;
    return parent[i] = find(parent[i]); // Path Compression
}

bool union_sets(int i, int j) {
    int root_i = find(i);
    int root_j = find(j);
    if (root_i == root_j) return false;

    if (sz[root_i] < sz[root_j]) {
        parent[root_i] = root_j;
        sz[root_j] += sz[root_i];
    } else {
        parent[root_j] = root_i;
        sz[root_i] += sz[root_j];
    }
    return true;
}

int main() {
    init_dsu(5);
    union_sets(0, 1); union_sets(2, 3); union_sets(1, 2);
    printf("--- Complete Optimized DSU Engine (O(alpha(N))) ---\nComponent size containing 0 = %d\n", sz[find(0)]);
    return 0;
}
