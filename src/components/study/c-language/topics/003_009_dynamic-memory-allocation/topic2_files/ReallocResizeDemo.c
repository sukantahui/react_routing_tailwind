/**
 * ReallocResizeDemo.c
 * Demonstrates Dynamic Buffer Resizing with realloc()
 * In-place vs Relocated expansion and safe temporary pointer pattern.
 *
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int initial_size = 3;
    int expanded_size = 6;

    printf("========================================================\n");
    printf("   CODER & ACCOTAX - RESIZING HEAP BUFFERS WITH REALLOC \n");
    printf("========================================================\n\n");

    // 1. Initial Allocation
    printf("--- 1. INITIAL HEAP ALLOCATION (%d elements) ---\n", initial_size);
    int *arr = (int *)malloc(initial_size * sizeof(int));
    if (arr == NULL) {
        fprintf(stderr, "Initial allocation failed!\n");
        return 1;
    }

    // Populate initial elements
    for (int i = 0; i < initial_size; i++) {
        arr[i] = (i + 1) * 11;
    }

    printf("  Initial buffer address: %p\n  Values: ", (void*)arr);
    for (int i = 0; i < initial_size; i++) {
        printf("[%d]: %d  ", i, arr[i]);
    }
    printf("\n\n");

    // 2. Safe Resizing with Temporary Pointer
    printf("--- 2. EXPANDING BUFFER TO %d ELEMENTS WITH realloc() ---\n", expanded_size);
    
    // CRITICAL: Use temporary pointer to avoid memory leak if realloc fails
    int *temp = (int *)realloc(arr, expanded_size * sizeof(int));
    
    if (temp == NULL) {
        fprintf(stderr, "Error: realloc() failed! Original buffer is still intact.\n");
        free(arr); // Clean up original buffer before exiting
        return 1;
    }

    // Reassign pointer now that realloc succeeded
    arr = temp;

    printf("  Resized buffer address: %p (%s)\n", (void*)arr,
           (arr == temp) ? "Memory expanded in-place or safely relocated" : "Relocated");

    // Initialize the newly added elements
    for (int i = initial_size; i < expanded_size; i++) {
        arr[i] = (i + 1) * 11;
    }

    printf("  All values after expansion:\n  ");
    for (int i = 0; i < expanded_size; i++) {
        printf("[%d]: %d  ", i, arr[i]);
    }
    printf("\n\n");

    // 3. Shrinking Buffer
    int shrunk_size = 2;
    printf("--- 3. SHRINKING BUFFER TO %d ELEMENTS ---\n", shrunk_size);
    temp = (int *)realloc(arr, shrunk_size * sizeof(int));
    if (temp != NULL) {
        arr = temp;
        printf("  Shrunk buffer address : %p\n  Values: ", (void*)arr);
        for (int i = 0; i < shrunk_size; i++) {
            printf("[%d]: %d  ", i, arr[i]);
        }
        printf("\n\n");
    }

    // 4. Final Cleanup
    free(arr);
    arr = NULL;
    temp = NULL;

    printf("  Heap memory successfully freed.\n");
    printf("========================================================\n");

    return 0;
}
