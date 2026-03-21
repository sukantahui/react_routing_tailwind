#include <stdio.h>
#include <stdlib.h>

#define NUM 100

int main() {
    void *ptrs[NUM];
    // Allocate many small blocks of different sizes
    for (int i = 0; i < NUM; i++) {
        size_t size = (i % 5 + 1) * 10; // sizes: 10,20,30,40,50
        ptrs[i] = malloc(size);
        if (!ptrs[i]) {
            printf("Allocation failed at %d\n", i);
            break;
        }
    }
    // Free every other block to create holes
    for (int i = 0; i < NUM; i += 2) {
        free(ptrs[i]);
        ptrs[i] = NULL;
    }
    // Now try to allocate a large block
    void *big = malloc(500);
    if (!big) {
        printf("Failed to allocate 500 bytes — external fragmentation!\n");
    } else {
        printf("Allocated 500 bytes successfully\n");
        free(big);
    }
    // Cleanup remaining
    for (int i = 1; i < NUM; i += 2) {
        free(ptrs[i]);
    }
    return 0;
}