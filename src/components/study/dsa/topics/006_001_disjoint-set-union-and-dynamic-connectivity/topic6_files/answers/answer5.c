#include <stdio.h>

int parent[100];

int find(int i) {
    if (parent[i] == i) return i;
    return parent[i] = find(parent[i]);
}

int count_components(int n, int edges[][2], int num_edges) {
    for (int i = 0; i < n; i++) parent[i] = i;
    int components = n;

    for (int i = 0; i < num_edges; i++) {
        int r1 = find(edges[i][0]);
        int r2 = find(edges[i][1]);
        if (r1 != r2) {
            parent[r1] = r2;
            components--;
        }
    }
    return components;
}

int main() {
    int edges[2][2] = {{0, 1}, {1, 2}};
    printf("--- Connected Components Count via DSU ---\nTotal Connected Components in Graph = %d\n", count_components(5, edges, 2));
    return 0;
}
