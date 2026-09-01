#include <stdio.h>
#include <stdlib.h>

/**
 * DynamicVectorDemo.c
 * Resizable Dynamic Array (Vector) in C
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} IntVector;

void initVector(IntVector *v, size_t initialCapacity) {
    v->data = (int *)malloc(initialCapacity * sizeof(int));
    v->size = 0;
    v->capacity = initialCapacity;
}

void pushVector(IntVector *v, int val) {
    if (v->size == v->capacity) {
        v->capacity *= 2;
        v->data = (int *)realloc(v->data, v->capacity * sizeof(int));
    }
    v->data[v->size++] = val;
}

void freeVector(IntVector *v) {
    free(v->data);
    v->data = NULL;
    v->size = v->capacity = 0;
}

int main(void) {
    IntVector vec;
    initVector(&vec, 2);

    pushVector(&vec, 10);
    pushVector(&vec, 20);
    pushVector(&vec, 30); // Triggers realloc capacity expansion to 4

    printf("=== Dynamic Resizable Vector ===\n");
    printf("Vector Size    : %zu\n", vec.size);
    printf("Vector Capacity: %zu\n", vec.capacity);
    for (size_t i = 0; i < vec.size; i++) {
        printf("vec[%zu] = %d\n", i, vec.data[i]);
    }

    freeVector(&vec);
    return 0;
}
