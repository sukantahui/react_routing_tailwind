#include <stdio.h>
#include <stdbool.h>

int parent[100];

int find(int i) {
    if (parent[i] == i) return i;
    return parent[i] = find(parent[i]);
}

bool has_cycle_dsu(int n, int edges[][2], int num_edges) {
    for (int i = 0; i < n; i++) parent[i] = i;

    for (int i = 0; i < num_edges; i++) {
        int r1 = find(edges[i][0]);
        int r2 = find(edges[i][1]);
        if (r1 == r2) return true; // Cycle detected!
        parent[r1] = r2;
    }
    return false;
}

int main() {
    int edges[3][2] = {{0, 1}, {1, 2}, {2, 0}}; // Triangle cycle
    printf("--- Cycle Detection in Undirected Graph via DSU ---\n");
    printf("Cycle Present: %s\n", has_cycle_dsu(3, edges, 3) ? "YES" : "NO");
    return 0;
}
