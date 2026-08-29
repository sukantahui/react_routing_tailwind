#include <stdio.h>

int parent[100], component_size[100];

void init_dsu(int n) {
    for (int i = 0; i < n; i++) { parent[i] = i; component_size[i] = 1; }
}

int find(int i) {
    if (parent[i] == i) return i;
    return parent[i] = find(parent[i]);
}

void union_sets(int i, int j) {
    int r1 = find(i), r2 = find(j);
    if (r1 != r2) {
        parent[r1] = r2;
        component_size[r2] += component_size[r1];
    }
}

int get_component_size(int i) {
    return component_size[find(i)];
}

int main() {
    init_dsu(5);
    union_sets(0, 1); union_sets(1, 2);
    printf("--- Component Size Query Engine ---\nSize of component containing element 0 = %d\n", get_component_size(0));
    return 0;
}
