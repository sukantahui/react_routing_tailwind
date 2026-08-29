#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// ============================================================================
// Dynamic Array Structure & Memory Control in C
// ============================================================================
typedef struct {
    int *data;          // Pointer to dynamically allocated heap array block
    size_t size;        // Number of elements currently stored
    size_t capacity;    // Maximum capacity allocated before resizing
} DynamicArray;

// Initialize dynamic array on Heap
void initArray(DynamicArray *arr, size_t initialCapacity) {
    arr->data = (int *)malloc(initialCapacity * sizeof(int));
    if (!arr->data) {
        fprintf(stderr, "[ERROR] Memory allocation failed!\n");
        exit(EXIT_FAILURE);
    }
    arr->size = 0;
    arr->capacity = initialCapacity;
    printf("[INIT] Dynamic Array initialized with Capacity = %zu\n", arr->capacity);
}

// Push Element at End with Amortized O(1) Capacity Doubling
void pushBack(DynamicArray *arr, int value) {
    if (arr->size == arr->capacity) {
        size_t newCapacity = arr->capacity * 2;
        int *newData = (int *)realloc(arr->data, newCapacity * sizeof(int));
        if (!newData) {
            fprintf(stderr, "[ERROR] Reallocation failed!\n");
            return;
        }
        arr->data = newData;
        arr->capacity = newCapacity;
        printf("[REALLOC] Resized capacity from %zu to %zu elements\n", arr->capacity / 2, arr->capacity);
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
    printf("\n--- Physical Memory Map ---\n");
    for (size_t i = 0; i < arr->size; i++) {
        int *addr = arr->data + i;
        printf("Index [%zu] | Address: %p | Value: %d | Direct ptr: *(data + %zu) = %d\n",
               i, (void*)addr, arr->data[i], i, *(arr->data + i));
    }
    printf("---------------------------\n\n");
}

// Clean up heap memory
void freeArray(DynamicArray *arr) {
    free(arr->data);
    arr->data = NULL;
    arr->size = 0;
    arr->capacity = 0;
    printf("[CLEANUP] Dynamic array memory freed\n");
}

// Demonstrate Row-Major Order 2D Array Address Mapping
void demonstrate2DMatrix() {
    printf("=== 2D Matrix Memory Layout (Row-Major Order) ===\n");
    int rows = 3, cols = 4;
    int matrix[3][4] = {
        {10, 20, 30, 40},
        {50, 60, 70, 80},
        {90, 100, 110, 120}
    };

    printf("2D Array Element Addresses (Contiguous Block):\n");
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            int *calculatedAddr = (int *)matrix + (i * cols + j);
            printf("matrix[%d][%d] = %3d at %p (Offset: %ld bytes)\n",
                   i, j, matrix[i][j], (void*)calculatedAddr,
                   (char*)calculatedAddr - (char*)matrix);
        }
    }
    printf("\n");
}

int main() {
    printf("========================================================\n");
    printf("  CODER & ACCOTAX - DYNAMIC ARRAY & MATRIX LAB IN C\n");
    printf("========================================================\n\n");

    DynamicArray arr;
    initArray(&arr, 2);

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
    printf("\n");

    demonstrate2DMatrix();
    return 0;
}
