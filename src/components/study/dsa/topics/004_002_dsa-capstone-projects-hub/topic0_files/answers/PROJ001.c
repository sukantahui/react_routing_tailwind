#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define POOL_SIZE 1024

typedef struct Block {
    size_t size;
    bool isFree;
    struct Block *next;
} Block;

static char memoryPool[POOL_SIZE];
static Block *freeList = (Block *)memoryPool;

void initMemoryPool() {
    freeList->size = POOL_SIZE - sizeof(Block);
    freeList->isFree = true;
    freeList->next = NULL;
    printf("[MEM POOL] Initialized %d bytes memory pool\n", POOL_SIZE);
}

void* myMalloc(size_t size) {
    Block *curr = freeList;
    while (curr != NULL) {
        if (curr->isFree && curr->size >= size) {
            curr->isFree = false;
            printf("[MY_MALLOC] Allocated %zu bytes at offset %ld\n", size, (char*)curr - memoryPool);
            return (void*)(curr + 1);
        }
        curr = curr->next;
    }
    printf("[MY_MALLOC FAILED] Out of pool memory!\n");
    return NULL;
}

void myFree(void *ptr) {
    if (!ptr) return;
    Block *block = (Block*)ptr - 1;
    block->isFree = true;
    printf("[MY_FREE] Deallocated block of size %zu\n", block->size);
}

int main() {
    printf("=== Project 1: Dynamic Memory Pool Allocator ===\n\n");
    initMemoryPool();

    int *arr = (int*)myMalloc(10 * sizeof(int));
    if (arr) {
        for (int i = 0; i < 10; i++) arr[i] = (i + 1) * 100;
        printf("Array element arr[4] = %d\n", arr[4]);
    }

    myFree(arr);
    return 0;
}
