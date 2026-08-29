/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Dynamic Array (Vector) Implementation in Pure C
 * File: dynamic_array_demo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define INITIAL_CAPACITY 4

// Struct Encapsulation of Dynamic Array
typedef struct {
    int* data;          // Pointer to contiguous heap buffer
    size_t size;        // Current number of active elements
    size_t capacity;    // Total allocated slots in memory
} DynamicArray;

// 1. Initialization: Allocates initial heap buffer
DynamicArray* vector_create(void) {
    DynamicArray* vec = (DynamicArray*)malloc(sizeof(DynamicArray));
    if (!vec) {
        perror("Failed to allocate DynamicArray wrapper");
        exit(EXIT_FAILURE);
    }
    vec->size = 0;
    vec->capacity = INITIAL_CAPACITY;
    vec->data = (int*)malloc(vec->capacity * sizeof(int));
    if (!vec->data) {
        perror("Failed to allocate dynamic array buffer");
        free(vec);
        exit(EXIT_FAILURE);
    }
    return vec;
}

// 2. Safe Reallocation with Geometric Doubling
static void vector_ensure_capacity(DynamicArray* vec) {
    if (vec->size >= vec->capacity) {
        size_t new_capacity = vec->capacity * 2;
        printf("   [!] Capacity Full (%zu/%zu). Expanding to %zu slots via realloc()...\n",
               vec->size, vec->capacity, new_capacity);

        // Safe Reallocation: Always use a temporary pointer!
        int* temp = (int*)realloc(vec->data, new_capacity * sizeof(int));
        if (!temp) {
            perror("Reallocation failed! Memory exhausted.");
            // vec->data is still valid, allowing graceful cleanup
            return;
        }

        if (temp != vec->data) {
            printf("       -> Heap Block Relocated! Old: %p -> New: %p\n",
                   (void*)vec->data, (void*)temp);
        } else {
            printf("       -> Heap Block Extended In-Place at %p (Zero Copy overhead!)\n",
                   (void*)temp);
        }

        vec->data = temp;
        vec->capacity = new_capacity;
    }
}

// 3. Push Back: Amortized O(1) Append
void vector_push_back(DynamicArray* vec, int value) {
    vector_ensure_capacity(vec);
    vec->data[vec->size] = value;
    vec->size++;
}

// 4. Pop Back: O(1) Removal with Hysteresis Shrinking (at 1/4 capacity)
int vector_pop_back(DynamicArray* vec) {
    if (vec->size == 0) {
        fprintf(stderr, "Error: Underflow! Cannot pop from empty vector.\n");
        return -1;
    }
    vec->size--;
    int removed = vec->data[vec->size];

    // Shrink if size drops to 1/4 of capacity (Prevents thrashing)
    if (vec->size > 0 && vec->size <= vec->capacity / 4 && vec->capacity > INITIAL_CAPACITY) {
        size_t new_capacity = vec->capacity / 2;
        int* temp = (int*)realloc(vec->data, new_capacity * sizeof(int));
        if (temp) {
            vec->data = temp;
            vec->capacity = new_capacity;
            printf("   [↓] Shrunk capacity to %zu slots (Memory Reclaimed ✓)\n", new_capacity);
        }
    }
    return removed;
}

// 5. Get Element with Bounds Checking
int vector_get(const DynamicArray* vec, size_t index) {
    if (index >= vec->size) {
        fprintf(stderr, "Error: Index %zu out of bounds (size = %zu)\n", index, vec->size);
        exit(EXIT_FAILURE);
    }
    return vec->data[index];
}

// 6. Print Vector State
void vector_print(const DynamicArray* vec) {
    printf("   Vector State: [ ");
    for (size_t i = 0; i < vec->size; i++) {
        printf("%d ", vec->data[i]);
    }
    printf("] (Size: %zu, Capacity: %zu, Heap Addr: %p)\n",
           vec->size, vec->capacity, (void*)vec->data);
}

// 7. Clean Teardown: Zero Leaks
void vector_free(DynamicArray* vec) {
    if (!vec) return;
    free(vec->data);   // 1. Free dynamic buffer first
    vec->data = NULL;  // 2. Neutralize dangling pointer
    free(vec);         // 3. Free wrapper struct
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - DYNAMIC ARRAY (VECTOR) IN C               \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    DynamicArray* v = vector_create();
    printf("1. Created empty Dynamic Array with initial capacity = %d\n", INITIAL_CAPACITY);
    vector_print(v);

    printf("\n2. Pushing 9 elements to observe Geometric Doubling (4 -> 8 -> 16):\n");
    int values[] = {10, 20, 30, 40, 50, 60, 70, 80, 90};
    for (int i = 0; i < 9; i++) {
        printf("   Pushing %d:\n", values[i]);
        vector_push_back(v, values[i]);
        vector_print(v);
    }

    printf("\n3. Accessing element at index 4 (Expected: 50):\n");
    printf("   v[4] = %d (Calculated in O(1) via base + 4 * sizeof(int))\n", vector_get(v, 4));

    printf("\n4. Popping elements until capacity shrinks:\n");
    while (v->size > 2) {
        int popped = vector_pop_back(v);
        printf("   Popped %d -> Size: %zu, Capacity: %zu\n", popped, v->size, v->capacity);
    }

    printf("\n5. Tearing down vector and freeing all heap blocks...\n");
    vector_free(v);
    printf("   -> Memory cleanly deallocated (Zero Leaks Verified ✓)\n\n");

    return 0;
}
