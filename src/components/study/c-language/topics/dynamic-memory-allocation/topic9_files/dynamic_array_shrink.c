#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    int size;
    int capacity;
} DynArray;

DynArray* dyn_create(int cap) {
    DynArray *da = malloc(sizeof(DynArray));
    if (!da) return NULL;
    da->data = malloc(cap * sizeof(int));
    if (!da->data) { free(da); return NULL; }
    da->size = 0;
    da->capacity = cap;
    return da;
}

void dyn_append(DynArray *da, int val) {
    if (da->size == da->capacity) {
        int new_cap = da->capacity * 2;
        int *tmp = realloc(da->data, new_cap * sizeof(int));
        if (!tmp) return;
        da->data = tmp;
        da->capacity = new_cap;
    }
    da->data[da->size++] = val;
}

int dyn_pop(DynArray *da) {
    if (da->size == 0) return -1;
    int val = da->data[--da->size];
    // Shrink if size <= capacity/4 and capacity > 4
    if (da->size <= da->capacity / 4 && da->capacity > 4) {
        int new_cap = da->capacity / 2;
        int *tmp = realloc(da->data, new_cap * sizeof(int));
        if (tmp) {
            da->data = tmp;
            da->capacity = new_cap;
        }
    }
    return val;
}

void dyn_destroy(DynArray *da) {
    if (da) { free(da->data); free(da); }
}

int main() {
    DynArray *arr = dyn_create(8);
    for (int i = 0; i < 100; i++) dyn_append(arr, i);
    printf("After pushes: size=%d, capacity=%d\n", arr->size, arr->capacity);
    for (int i = 0; i < 80; i++) dyn_pop(arr);
    printf("After pops: size=%d, capacity=%d\n", arr->size, arr->capacity);
    dyn_destroy(arr);
    return 0;
}