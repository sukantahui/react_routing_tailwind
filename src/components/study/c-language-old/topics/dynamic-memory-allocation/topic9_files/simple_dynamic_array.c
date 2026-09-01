#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    int size;
    int capacity;
} DynamicArray;

DynamicArray* create(int capacity) {
    DynamicArray *arr = malloc(sizeof(DynamicArray));
    if (!arr) return NULL;
    arr->data = malloc(capacity * sizeof(int));
    if (!arr->data) {
        free(arr);
        return NULL;
    }
    arr->size = 0;
    arr->capacity = capacity;
    return arr;
}

void append(DynamicArray *arr, int value) {
    if (arr->size == arr->capacity) {
        // Grow
        arr->capacity *= 2;
        int *new_data = realloc(arr->data, arr->capacity * sizeof(int));
        if (!new_data) return; // Error handling omitted for brevity
        arr->data = new_data;
    }
    arr->data[arr->size++] = value;
}

int get(DynamicArray *arr, int index) {
    if (index >= 0 && index < arr->size)
        return arr->data[index];
    return -1; // error
}

void destroy(DynamicArray *arr) {
    if (arr) {
        free(arr->data);
        free(arr);
    }
}

int main() {
    DynamicArray *vec = create(2);
    append(vec, 10);
    append(vec, 20);
    append(vec, 30); // forces growth

    for (int i = 0; i < vec->size; i++)
        printf("%d ", get(vec, i));
    printf("\n");

    destroy(vec);
    return 0;
}