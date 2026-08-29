#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *array;
    size_t size;
    size_t capacity;
} DynamicVector;

void initVector(DynamicVector *v, size_t initialCapacity) {
    v->array = (int *)malloc(initialCapacity * sizeof(int));
    v->size = 0;
    v->capacity = initialCapacity;
}

void pushVector(DynamicVector *v, int val) {
    if (v->size == v->capacity) {
        size_t newCapacity = v->capacity * 2;
        int *temp = (int *)realloc(v->array, newCapacity * sizeof(int));
        if (!temp) {
            printf("[ERROR] Memory reallocation failed!\n");
            return;
        }
        v->array = temp;
        v->capacity = newCapacity;
        printf("[REALLOC] Capacity doubled to %zu elements\n", newCapacity);
    }
    v->array[v->size++] = val;
}

void freeVector(DynamicVector *v) {
    free(v->array);
    v->array = NULL;
    v->size = v->capacity = 0;
}

int main() {
    printf("=== Dynamic Vector Resizing with realloc() in C ===\n\n");
    DynamicVector v;
    initVector(&v, 2);

    pushVector(&v, 10);
    pushVector(&v, 20);
    pushVector(&v, 30); // Triggers realloc (Capacity 2 -> 4)
    pushVector(&v, 40);
    pushVector(&v, 50); // Triggers realloc (Capacity 4 -> 8)

    printf("\nFinal Dynamic Array (Size: %zu, Capacity: %zu):\n[ ", v.size, v.capacity);
    for (size_t i = 0; i < v.size; i++) printf("%d ", v.array[i]);
    printf("]\n");

    freeVector(&v);
    return 0;
}
