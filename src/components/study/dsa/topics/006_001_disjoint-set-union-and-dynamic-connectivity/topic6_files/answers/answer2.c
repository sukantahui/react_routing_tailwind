#include <stdio.h>

int parent[100];

void init_dsu(int n) {
    for (int i = 0; i < n; i++) parent[i] = i;
}

int find_path_compression(int i) {
    if (parent[i] == i) return i;
    return parent[i] = find_path_compression(parent[i]); // Path compression
}

int main() {
    init_dsu(5);
    parent[4] = 3; parent[3] = 2; parent[2] = 1; parent[1] = 0; // Deep tree
    printf("--- DSU Path Compression Optimization ---\nBefore Find(4): parent[4] = %d\n", parent[4]);
    int root = find_path_compression(4);
    printf("Root = %d, After Path Compression: parent[4] = %d\n", root, parent[4]);
    return 0;
}
