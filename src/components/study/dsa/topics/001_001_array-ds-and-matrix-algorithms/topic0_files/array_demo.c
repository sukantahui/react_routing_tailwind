#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// ============================================================================
// CODER & ACCOTAX BARRACKPORE LAB - C MEMORY ARCHITECTURE & DSA
// Topic: malloc vs calloc, Pointer Arithmetic & Dynamic Array Mechanics
// ============================================================================

// Structure for Dynamic Array on Heap
typedef struct {
    int *data;          // Pointer to dynamically allocated heap array block
    size_t size;        // Number of elements currently stored
    size_t capacity;    // Maximum capacity allocated before resizing
} DynamicArray;

// Initialize dynamic array using malloc (Uninitialized raw memory)
void initArrayWithMalloc(DynamicArray *arr, size_t initialCapacity) {
    arr->data = (int *)malloc(initialCapacity * sizeof(int));
    if (!arr->data) {
        fprintf(stderr, "[FATAL] malloc() failed to allocate %zu bytes!\n", initialCapacity * sizeof(int));
        exit(EXIT_FAILURE);
    }
    arr->size = 0;
    arr->capacity = initialCapacity;
    printf("[MALLOC] Allocated %zu bytes for %zu integers at address: %p\n",
           initialCapacity * sizeof(int), initialCapacity, (void*)arr->data);
}

// Demonstrate calloc() vs malloc()
void demonstrateMallocVsCalloc(size_t count) {
    printf("\n========================================================\n");
    printf("  DEMO: malloc() vs calloc() Memory Initialization\n");
    printf("========================================================\n");

    // 1. malloc(): Allocates raw memory (contains garbage values)
    int *mPtr = (int *)malloc(count * sizeof(int));
    if (!mPtr) return;

    printf("\n[1] malloc(%zu * sizeof(int)) Output (Uninitialized Garbage Values):\n", count);
    for (size_t i = 0; i < count; i++) {
        printf("    mPtr[%zu] at %p = %d (Garbage)\n", i, (void*)(mPtr + i), *(mPtr + i));
    }

    // 2. calloc(): Allocates and zero-initializes every single byte
    int *cPtr = (int *)calloc(count, sizeof(int));
    if (!cPtr) {
        free(mPtr);
        return;
    }

    printf("\n[2] calloc(%zu, sizeof(int)) Output (Guaranteed Zero-Initialized):\n", count);
    for (size_t i = 0; i < count; i++) {
        printf("    cPtr[%zu] at %p = %d (Clean Zero)\n", i, (void*)(cPtr + i), *(cPtr + i));
    }

    // Defensive Deallocation Protocol
    free(mPtr);
    mPtr = NULL; // Neutralize dangling pointer

    free(cPtr);
    cPtr = NULL; // Neutralize dangling pointer
    printf("\n[CLEANUP] Both heap memory blocks freed and pointers neutralized to NULL.\n");
}

// Push Element at End with Amortized O(1) Capacity Doubling using realloc()
void pushBack(DynamicArray *arr, int value) {
    if (arr->size == arr->capacity) {
        size_t newCapacity = arr->capacity * 2;
        int *newData = (int *)realloc(arr->data, newCapacity * sizeof(int));
        if (!newData) {
            fprintf(stderr, "[ERROR] realloc() failed!\n");
            return;
        }
        arr->data = newData;
        arr->capacity = newCapacity;
        printf("[REALLOC] Resized capacity from %zu to %zu elements (Address: %p)\n",
               arr->capacity / 2, arr->capacity, (void*)arr->data);
    }
    arr->data[arr->size++] = value;
    printf("[PUSH] Added %d (Size: %zu, Capacity: %zu)\n", value, arr->size, arr->capacity);
}

// Insert Element at Index - O(n) Shifting
void insertAt(DynamicArray *arr, size_t index, int value) {
    if (index > arr->size) {
        printf("[WARNING] Index %zu out of bounds!\n", index);
        return;
    }
    if (arr->size == arr->capacity) {
        pushBack(arr, value);
        return;
    }
    // Shift elements right
    for (size_t i = arr->size; i > index; i--) {
        arr->data[i] = arr->data[i - 1];
    }
    arr->data[index] = value;
    arr->size++;
    printf("[INSERT] Inserted %d at index %zu\n", value, index);
}

// Delete Element at Index - O(n) Shifting
void deleteAt(DynamicArray *arr, size_t index) {
    if (index >= arr->size) {
        printf("[WARNING] Delete index %zu out of bounds!\n", index);
        return;
    }
    int removedVal = arr->data[index];
    // Shift elements left
    for (size_t i = index; i < arr->size - 1; i++) {
        arr->data[i] = arr->data[i + 1];
    }
    arr->size--;
    printf("[DELETE] Removed %d from index %zu\n", removedVal, index);
}

// Print Array Contents & Physical Pointer Memory Addresses
void printMemoryDetails(const DynamicArray *arr) {
    printf("\n--- Physical Memory Map (Address = Base + i * sizeof(int)) ---\n");
    for (size_t i = 0; i < arr->size; i++) {
        int *addr = arr->data + i;
        ptrdiff_t offset = (char*)addr - (char*)arr->data;
        printf("Index [%zu] | Address: %p | Offset: +%2td B | Value: %3d | *(data + %zu) = %3d\n",
               i, (void*)addr, offset, arr->data[i], i, *(arr->data + i));
    }
    printf("---------------------------------------------------------------\n\n");
}

// Clean up heap memory and neutralize pointer
void freeArray(DynamicArray *arr) {
    free(arr->data);
    arr->data = NULL;
    arr->size = 0;
    arr->capacity = 0;
    printf("[CLEANUP] Dynamic array memory freed. Pointer set to NULL.\n");
}

// Demonstrate Row-Major Order 2D Array Address Mapping
void demonstrate2DMatrix() {
    printf("\n========================================================\n");
    printf("  2D Matrix Memory Layout (Row-Major Order in C)\n");
    printf("========================================================\n");
    int rows = 3, cols = 4;
    int matrix[3][4] = {
        {10, 20, 30, 40},
        {50, 60, 70, 80},
        {90, 100, 110, 120}
    };

    printf("2D Array Element Addresses (Contiguous Block in RAM):\n");
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            int *calculatedAddr = (int *)matrix + (i * cols + j);
            printf("matrix[%d][%d] = %3d at %p (Offset: +%2ld bytes)\n",
                   i, j, matrix[i][j], (void*)calculatedAddr,
                   (char*)calculatedAddr - (char*)matrix);
        }
    }
    printf("\n");
}

int main() {
    printf("========================================================\n");
    printf("  CODER & ACCOTAX - DYNAMIC MEMORY & ARRAY LAB IN C\n");
    printf("  Mentor: Sukanta Hui · Barrackpore, West Bengal\n");
    printf("========================================================\n");

    // 1. Demonstrate malloc vs calloc directly
    demonstrateMallocVsCalloc(5);

    // 2. Dynamic Array Lifecycle with malloc, realloc, and free
    printf("\n========================================================\n");
    printf("  Dynamic Array Growth & Pointer Arithmetic\n");
    printf("========================================================\n");
    DynamicArray arr;
    initArrayWithMalloc(&arr, 2);

    pushBack(&arr, 10);
    pushBack(&arr, 20);
    pushBack(&arr, 30);
    pushBack(&arr, 40);
    pushBack(&arr, 50);

    insertAt(&arr, 2, 25);
    printMemoryDetails(&arr);

    deleteAt(&arr, 1);
    printMemoryDetails(&arr);

    freeArray(&arr);

    // 3. Demonstrate 2D Matrix Address Mapping
    demonstrate2DMatrix();

    return 0;
}
