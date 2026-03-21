#include <stdio.h>
#include <stdlib.h>

// Simulate a simple allocator with alignment to 8 bytes
void* my_malloc(size_t size) {
    // For demonstration, round up to multiple of 8 (minimum 16 for header?)
    // Actually, just show the effect: allocate 8 bytes more than requested.
    size_t aligned = (size + 7) & ~7;
    return malloc(aligned);
}

int main() {
    // Request various sizes and see the actual allocated space (if we could)
    // This example just illustrates the concept.
    size_t requests[] = {1, 5, 8, 9, 16, 17};
    for (int i = 0; i < 6; i++) {
        void *p = my_malloc(requests[i]);
        printf("Requested %zu bytes, pointer %p\n", requests[i], p);
        free(p);
    }
    // In reality, you can't see the internal fragmentation directly,
    // but you can infer it by measuring memory usage.
    printf("\nInternal fragmentation: wasted space due to alignment and metadata.\n");
    return 0;
}