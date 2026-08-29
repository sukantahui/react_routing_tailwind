/**
 * ============================================================================
 * SAFE DYNAMIC ARRAY REALLOCATION & MEMORY HAZARD PREVENTION IN C
 * Author: Sukanta Hui (Coder & AccoTax Barrackpore Lab)
 * Description: Demonstrates proper dynamic array resizing, safe realloc() 
 *              idioms, memory leak prevention, and dangling pointer neutralization.
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} DynamicVector;

/**
 * Initialize dynamic vector with initial capacity.
 */
DynamicVector* createVector(size_t initial_capacity) {
    if (initial_capacity == 0) initial_capacity = 4;
    
    DynamicVector *vec = (DynamicVector*)malloc(sizeof(DynamicVector));
    if (!vec) {
        fprintf(stderr, "[ERROR] Heap allocation failed for vector struct!\n");
        return NULL;
    }

    vec->data = (int*)malloc(initial_capacity * sizeof(int));
    if (!vec->data) {
        fprintf(stderr, "[ERROR] Heap allocation failed for vector data buffer!\n");
        free(vec); // Clean up container to prevent memory leak
        return NULL;
    }

    vec->size = 0;
    vec->capacity = initial_capacity;
    printf("[INIT] Vector created at %p with capacity = %zu (%zu bytes)\n", 
           (void*)vec->data, vec->capacity, vec->capacity * sizeof(int));
    return vec;
}

/**
 * SAFE REALLOCATION IDIOM:
 * Never do: vec->data = realloc(vec->data, new_cap * sizeof(int));
 * If realloc fails and returns NULL, the original pointer is overwritten,
 * and the existing heap block becomes an unrecoverable MEMORY LEAK!
 */
bool resizeVector(DynamicVector *vec, size_t new_capacity) {
    if (!vec) return false;

    printf("[REALLOC] Resizing vector from capacity %zu to %zu...\n", vec->capacity, new_capacity);
    
    // Step 1: Allocate to temporary pointer
    int *temp = (int*)realloc(vec->data, new_capacity * sizeof(int));
    
    // Step 2: Validate temp before overwriting original pointer
    if (!temp) {
        fprintf(stderr, "[ERROR] realloc() failed! Original buffer at %p is SAFE and intact.\n", (void*)vec->data);
        return false; // Original memory is NOT leaked!
    }

    // Step 3: Successfully reallocated - update pointer and capacity
    vec->data = temp;
    vec->capacity = new_capacity;
    printf("[SUCCESS] Reallocated successfully. New buffer address: %p\n", (void*)vec->data);
    return true;
}

/**
 * Push an element into the vector, doubling capacity if needed (Geometric Growth).
 */
bool pushBack(DynamicVector *vec, int value) {
    if (!vec) return false;

    if (vec->size >= vec->capacity) {
        size_t new_cap = vec->capacity * 2;
        if (!resizeVector(vec, new_cap)) {
            return false;
        }
    }

    vec->data[vec->size++] = value;
    printf("[PUSH] Inserted %d at index [%zu]. Size = %zu / %zu\n", value, vec->size - 1, vec->size, vec->capacity);
    return true;
}

/**
 * SAFE DEALLOCATION & DANGLING POINTER NEUTRALIZATION:
 * Free internal buffer, free struct, and neutralize caller pointer to NULL.
 */
void freeVector(DynamicVector **vec_ptr) {
    if (!vec_ptr || !*vec_ptr) return;

    DynamicVector *vec = *vec_ptr;
    
    if (vec->data) {
        printf("[FREE] Releasing data buffer at %p (%zu bytes)...\n", (void*)vec->data, vec->capacity * sizeof(int));
        free(vec->data);
        vec->data = NULL; // Neutralize internal pointer
    }

    printf("[FREE] Releasing vector struct at %p...\n", (void*)vec);
    free(vec);
    
    // Neutralize external caller pointer to prevent Dangling Pointer / Use-After-Free
    *vec_ptr = NULL;
    printf("[CLEAN] Pointer neutralized to NULL. Dangling pointer hazard eliminated!\n");
}

int main() {
    printf("=================================================================\n");
    printf("  CODER & ACCOTAX: SAFE ARRAY REALLOCATION & LEAK PREVENTION IN C\n");
    printf("=================================================================\n\n");

    DynamicVector *v = createVector(2);
    if (!v) return 1;

    pushBack(v, 10);
    pushBack(v, 20);
    pushBack(v, 30); // Triggers geometric doubling 2 -> 4
    pushBack(v, 40);
    pushBack(v, 50); // Triggers geometric doubling 4 -> 8

    printf("\nVector Contents: [ ");
    for (size_t i = 0; i < v->size; i++) {
        printf("%d ", v->data[i]);
    }
    printf("]\n\n");

    // Clean up memory safely
    freeVector(&v);

    // Verify pointer is neutralized
    if (v == NULL) {
        printf("[VERIFIED] v is safely NULL. Accidental dereference will trigger instant predictable fault instead of silent memory corruption.\n");
    }

    return 0;
}
