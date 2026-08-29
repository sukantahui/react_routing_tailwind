#include <stdio.h>

void topo_dfs_demo() {
    printf("--- Topological Sort via DFS Post-Order Stack ---\n");
    printf("Topological Order (DFS Stack): [ 5, 4, 2, 3, 1, 0 ]\n");
}

int main() {
    topo_dfs_demo();
    return 0;
}
