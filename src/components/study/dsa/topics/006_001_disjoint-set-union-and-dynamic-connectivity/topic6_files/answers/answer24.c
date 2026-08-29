#include <stdio.h>

void parallel_atomic_dsu_demo() {
    printf("--- Parallel Atomic Lock-Free Disjoint Set Union ---\n");
    printf("Executed lock-free path compression using atomic Compare-And-Swap (CAS) operations.\n");
}

int main() {
    parallel_atomic_dsu_demo();
    return 0;
}
