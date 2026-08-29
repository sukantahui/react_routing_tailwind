#include <stdio.h>
#include <stdlib.h>

#define POOL_SIZE 5

typedef struct Node {
    int data;
    struct Node *next;
} Node;

typedef struct {
    Node memory[POOL_SIZE];
    Node *free_list;
} MemoryPool;

void init_pool(MemoryPool *pool) {
    for (int i = 0; i < POOL_SIZE - 1; i++) {
        pool->memory[i].next = &pool->memory[i + 1];
    }
    pool->memory[POOL_SIZE - 1].next = NULL;
    pool->free_list = &pool->memory[0];
}

Node* pool_alloc(MemoryPool *pool, int val) {
    if (!pool->free_list) return NULL;
    Node *n = pool->free_list;
    pool->free_list = pool->free_list->next;
    n->data = val;
    n->next = NULL;
    return n;
}

void pool_free(MemoryPool *pool, Node *n) {
    if (!n) return;
    n->next = pool->free_list;
    pool->free_list = n;
}

int main() {
    MemoryPool pool;
    init_pool(&pool);

    printf("--- Fixed-Size Custom Memory Pool Allocator ---\n");
    Node *n1 = pool_alloc(&pool, 100);
    Node *n2 = pool_alloc(&pool, 200);

    if (n1 && n2) {
        printf("Allocated Node 1 Val=%d at RAM %p\n", n1->data, (void*)n1);
        printf("Allocated Node 2 Val=%d at RAM %p\n", n2->data, (void*)n2);
    }

    pool_free(&pool, n1);
    pool_free(&pool, n2);
    printf("Freed nodes back to custom pool successfully!\n");

    return 0;
}
