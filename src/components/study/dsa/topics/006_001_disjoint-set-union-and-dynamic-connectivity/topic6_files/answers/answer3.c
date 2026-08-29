#include <stdio.h>

int parent[100], rank_arr[100];

void init_dsu(int n) {
    for (int i = 0; i < n; i++) { parent[i] = i; rank_arr[i] = 0; }
}

int find(int i) {
    if (parent[i] == i) return i;
    return parent[i] = find(parent[i]);
}

void union_by_rank(int i, int j) {
    int root_i = find(i);
    int root_j = find(j);
    if (root_i != root_j) {
        if (rank_arr[root_i] < rank_arr[root_j]) parent[root_i] = root_j;
        else if (rank_arr[root_i] > rank_arr[root_j]) parent[root_j] = root_i;
        else {
            parent[root_j] = root_i;
            rank_arr[root_i]++;
        }
    }
}

int main() {
    init_dsu(5);
    union_by_rank(0, 1); union_by_rank(2, 3); union_by_rank(1, 3);
    printf("--- DSU Union by Rank ---\nTree Root of Element 3 = %d\n", find(3));
    return 0;
}
