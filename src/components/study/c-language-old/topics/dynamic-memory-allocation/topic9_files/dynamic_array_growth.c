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
        int new_cap = da->capacity * 2; // doubling
        int *tmp = realloc(da->data, new_cap * sizeof(int));
        if (!tmp) return;
        da->data = tmp;
        da->capacity = new_cap;
    }
    da->data[da->size++] = val;
}

void dyn_destroy(DynArray *da) {
    if (da) { free(da->data); free(da); }
}

int main() {
    DynArray *arr = dyn_create(1);
    for (int i = 0; i < 100; i++) {
        dyn_append(arr, i);
        printf("size=%d, capacity=%d\n", arr->size, arr->capacity);
    }
    dyn_destroy(arr);
    return 0;
}