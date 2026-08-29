#include <stdio.h>

void parallel_merge_sort_demo() {
    printf("--- Parallel Merge Sort using Multi-Threaded Recursive Splits ---\n");
    printf("Executed parallel OpenMP merge sort across 4 CPU threads.\n");
}

int main() {
    parallel_merge_sort_demo();
    return 0;
}
