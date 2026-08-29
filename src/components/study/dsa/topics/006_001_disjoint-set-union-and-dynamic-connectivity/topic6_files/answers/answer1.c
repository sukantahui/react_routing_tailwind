#include <stdio.h>

int parent[100];

void init_dsu(int n) {
    for (int i = 0; i < n; i++) parent[i] = i;
}

int find_basic(int i) {
    if (parent[i] == i) return i;
    return find_basic(parent[i]);
}

void union_basic(int i, int j) {
    int root_i = find_basic(i);
    int root_j = find_basic(j);
    if (root_i != root_j) parent[root_i] = root_j;
}

int main() {
    init_dsu(5);
    union_basic(0, 1); union_basic(1, 2);
    printf("--- Basic Disjoint Set Union (Naive) ---\n");
    printf("Find(0) == Find(2): %s\n", (find_basic(0) == find_basic(2)) ? "CONNECTED" : "DISCONNECTED");
    printf("Find(0) == Find(3): %s\n", (find_basic(0) == find_basic(3)) ? "CONNECTED" : "DISCONNECTED");
    return 0;
}
