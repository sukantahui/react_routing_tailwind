#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Generic dynamic array storing void* elements
typedef struct {
    void** data;
    size_t size;
    size_t capacity;
} GenericArray;

GenericArray* array_create() {
    GenericArray* arr = malloc(sizeof(GenericArray));
    arr->size = 0;
    arr->capacity = 4;
    arr->data = malloc(arr->capacity * sizeof(void*));
    return arr;
}

void array_push(GenericArray* arr, void* elem) {
    if (arr->size == arr->capacity) {
        arr->capacity *= 2;
        arr->data = realloc(arr->data, arr->capacity * sizeof(void*));
    }
    arr->data[arr->size++] = elem;
}

void* array_get(GenericArray* arr, size_t index) {
    if (index < arr->size) return arr->data[index];
    return NULL;
}

void array_free(GenericArray* arr, void (*free_elem)(void*)) {
    if (free_elem) {
        for (size_t i = 0; i < arr->size; i++)
            free_elem(arr->data[i]);
    }
    free(arr->data);
    free(arr);
}

int main() {
    GenericArray* arr = array_create();
    
    // Store integers (heap allocated)
    int* pi = malloc(sizeof(int)); *pi = 42;
    array_push(arr, pi);
    pi = malloc(sizeof(int)); *pi = 100;
    array_push(arr, pi);
    
    // Store a string (literal, no free needed)
    array_push(arr, "Hello generic");
    
    printf("Element 0: %d\n", *(int*)array_get(arr, 0));
    printf("Element 1: %d\n", *(int*)array_get(arr, 1));
    printf("Element 2: %s\n", (char*)array_get(arr, 2));
    
    // Free with custom destructor for ints (but not for string literal)
    array_free(arr, free);
    return 0;
}