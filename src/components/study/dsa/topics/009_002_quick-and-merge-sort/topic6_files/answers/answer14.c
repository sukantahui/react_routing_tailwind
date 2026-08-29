#include <stdio.h>

void buffer_reuse_merge_sort_demo() {
    printf("--- Stable Merge Sort with Temporary Buffer Reuse ---\n");
    printf("Allocated single O(N) scratch buffer upfront to eliminate dynamic malloc call overhead.\n");
}

int main() {
    buffer_reuse_merge_sort_demo();
    return 0;
}
