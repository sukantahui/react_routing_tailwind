#include <stdio.h>
#include <stdlib.h>

// Simple fixed-size pool for objects of size 32 bytes
#define POOL_SIZE 100
#define OBJECT_SIZE 32

typedef struct {
    char data[OBJECT_SIZE];
    int used;
} PoolObject;

PoolObject pool[POOL_SIZE];

void* pool_alloc() {
    for (int i = 0; i < POOL_SIZE; i++) {
        if (!pool[i].used) {
            pool[i].used = 1;
            return &pool[i];
        }
    }
    return NULL;
}

void pool_free(void *p) {
    PoolObject *obj = (PoolObject*)p;
    obj->used = 0;
}

int main() {
    // Allocate many objects from pool
    void *objects[50];
    for (int i = 0; i < 50; i++) {
        objects[i] = pool_alloc();
        if (!objects[i]) {
            printf("Pool allocation failed at %d\n", i);
            break;
        }
    }
    // Free some in arbitrary order (no fragmentation in the pool)
    for (int i = 0; i < 50; i += 2) {
        pool_free(objects[i]);
    }
    // Allocate again — pool still works
    void *new_obj = pool_alloc();
    if (new_obj) {
        printf("Pool reallocation successful — no external fragmentation.\n");
        pool_free(new_obj);
    }
    // Cleanup
    for (int i = 1; i < 50; i += 2) {
        pool_free(objects[i]);
    }
    return 0;
}