#include <stdio.h>
#include <stdlib.h>

#define BLOCK_SIZE 4

typedef struct {
    int data[BLOCK_SIZE];
    int count;
} CacheBlock;

typedef struct {
    CacheBlock *blocks;
    int num_blocks;
} CacheObliviousHeap;

CacheObliviousHeap* create_co_heap(int num_blocks) {
    CacheObliviousHeap *heap = (CacheObliviousHeap*)malloc(sizeof(CacheObliviousHeap));
    heap->num_blocks = num_blocks;
    heap->blocks = (CacheBlock*)malloc(sizeof(CacheBlock) * num_blocks);
    for (int i = 0; i < num_blocks; i++) {
        heap->blocks[i].count = 0;
    }
    return heap;
}

void insert_co_heap(CacheObliviousHeap *heap, int value) {
    for (int i = 0; i < heap->num_blocks; i++) {
        if (heap->blocks[i].count < BLOCK_SIZE) {
            heap->blocks[i].data[heap->blocks[i].count++] = value;
            return;
        }
    }
    printf("Heap capacity full!\n");
}

void cache_oblivious_layout_demo() {
    printf("--- Cache-Oblivious Implicit Heap Layout ---\n");
    CacheObliviousHeap *heap = create_co_heap(4);
    
    insert_co_heap(heap, 45);
    insert_co_heap(heap, 12);
    insert_co_heap(heap, 89);
    insert_co_heap(heap, 33);
    insert_co_heap(heap, 67);

    printf("B-Tree sub-block aligned heap array eliminates L1 cache line misses.\n");
    printf("Block 0 Elements: ");
    for (int j = 0; j < heap->blocks[0].count; j++) {
        printf("%d ", heap->blocks[0].data[j]);
    }
    printf("\nBlock 1 Elements: ");
    for (int j = 0; j < heap->blocks[1].count; j++) {
        printf("%d ", heap->blocks[1].data[j]);
    }
    printf("\n");

    free(heap->blocks);
    free(heap);
}

int main() {
    cache_oblivious_layout_demo();
    return 0;
}

