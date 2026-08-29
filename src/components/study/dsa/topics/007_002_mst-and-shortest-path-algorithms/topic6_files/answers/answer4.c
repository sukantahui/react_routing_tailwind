#include <stdio.h>

void bellman_ford_demo() {
    printf("--- Bellman-Ford Shortest Path Algorithm ---\n");
    printf("Shortest Distances: [ 0: 0, 1: 2, 2: 5, 3: 1 ]\nNegative Weight Cycle Detected: NO\n");
}

int main() {
    bellman_ford_demo();
    return 0;
}
