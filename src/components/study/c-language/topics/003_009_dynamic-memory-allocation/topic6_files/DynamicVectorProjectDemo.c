/**
 * DynamicVectorProjectDemo.c
 * Capstone Project: Industrial Resizable Dynamic Vector in Pure C
 * Supports initialization, push_back with geometric doubling,
 * get/set with bounds checking, pop_back, and clean deallocation.
 *
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Vector Struct Definition
typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} IntVector;

// 1. Initialize Vector with initial capacity
IntVector* vector_create(size_t initial_capacity) {
    if (initial_capacity == 0) initial_capacity = 4;
    
    IntVector *vec = (IntVector *)malloc(sizeof(IntVector));
    if (vec == NULL) return NULL;

    vec->data = (int *)malloc(initial_capacity * sizeof(int));
    if (vec->data == NULL) {
        free(vec);
        return NULL;
    }

    vec->size = 0;
    vec->capacity = initial_capacity;
    return vec;
}

// 2. Append element with automatic geometric expansion
bool vector_push_back(IntVector *vec, int value) {
    if (vec == NULL) return false;

    // Check if expansion is needed
    if (vec->size >= vec->capacity) {
        size_t new_cap = vec->capacity * 2;
        int *new_data = (int *)realloc(vec->data, new_cap * sizeof(int));
        if (new_data == NULL) {
            fprintf(stderr, "Vector expansion failed!\n");
            return false;
        }
        vec->data = new_data;
        vec->capacity = new_cap;
        printf("  [Vector Event] Capacity auto-expanded to %zu elements\n", vec->capacity);
    }

    vec->data[vec->size++] = value;
    return true;
}

// 3. Get element with bounds checking
bool vector_get(const IntVector *vec, size_t index, int *out_value) {
    if (vec == NULL || index >= vec->size || out_value == NULL) return false;
    *out_value = vec->data[index];
    return true;
}

// 4. Pop last element
bool vector_pop_back(IntVector *vec, int *out_value) {
    if (vec == NULL || vec->size == 0) return false;
    if (out_value != NULL) *out_value = vec->data[vec->size - 1];
    vec->size--;
    return true;
}

// 5. Destroy Vector and free heap memory
void vector_destroy(IntVector **vec_ptr) {
    if (vec_ptr != NULL && *vec_ptr != NULL) {
        IntVector *vec = *vec_ptr;
        if (vec->data != NULL) {
            free(vec->data);
            vec->data = NULL;
        }
        free(vec);
        *vec_ptr = NULL;
    }
}

int main(void) {
    printf("========================================================\n");
    printf("   CODER & ACCOTAX - DYNAMIC VECTOR CAPSTONE PROJECT    \n");
    printf("========================================================\n\n");

    // Create vector with initial capacity of 2
    IntVector *my_vec = vector_create(2);
    if (my_vec == NULL) {
        fprintf(stderr, "Failed to create vector!\n");
        return 1;
    }

    printf("--- 1. PUSHING ELEMENTS (Triggering Geometric Growth) ---\n");
    for (int i = 1; i <= 6; i++) {
        int val = i * 15;
        vector_push_back(my_vec, val);
        printf("  Pushed: %3d | Size: %zu | Capacity: %zu\n", val, my_vec->size, my_vec->capacity);
    }

    printf("\n--- 2. VECTOR CONTENTS ---\n  Elements: ");
    for (size_t i = 0; i < my_vec->size; i++) {
        int v;
        vector_get(my_vec, i, &v);
        printf("[%zu]: %d  ", i, v);
    }
    printf("\n\n");

    printf("--- 3. POPPING LAST ELEMENT ---\n");
    int popped;
    if (vector_pop_back(my_vec, &popped)) {
        printf("  Popped element: %d | New Size: %zu\n", popped, my_vec->size);
    }

    printf("\n--- 4. CLEAN DESTRUCTION ---\n");
    vector_destroy(&my_vec);
    printf("  Vector destroyed. my_vec pointer neutralized to: %p\n", (void*)my_vec);
    printf("========================================================\n");

    return 0;
}
