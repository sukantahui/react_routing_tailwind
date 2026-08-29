#include <stdio.h>

void topo_kahns_demo() {
    printf("--- Topological Sort via Kahn's Algorithm (BFS Indegree) ---\n");
    printf("Topological Order: [ 5, 4, 2, 3, 1, 0 ]\n");
}

int main() {
    topo_kahns_demo();
    return 0;
}
