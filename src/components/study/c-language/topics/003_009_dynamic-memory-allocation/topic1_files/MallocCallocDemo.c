/**
 * MallocCallocDemo.c
 * Demonstrates Dynamic Memory Allocation: malloc() vs calloc()
 * Null pointer verification and zero-initialization mechanics.
 *
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 5;

    printf("========================================================\n");
    printf("     CODER & ACCOTAX - MALLOC() VS CALLOC() MECHANICS   \n");
    printf("========================================================\n\n");

    // 1. Memory Allocation with malloc() (Leaves Garbage Values)
    printf("--- 1. ALLOCATION WITH malloc(%zu bytes) ---\n", n * sizeof(int));
    int *malloc_arr = (int *)malloc(n * sizeof(int));
    
    // MANDATORY NULL CHECK
    if (malloc_arr == NULL) {
        fprintf(stderr, "Error: malloc() failed to allocate memory!\n");
        return 1;
    }

    printf("  malloc_arr initial values (uninitialized garbage):\n  ");
    for (int i = 0; i < n; i++) {
        printf("[%d]: %d  ", i, malloc_arr[i]);
    }
    printf("\n");

    // Populating malloc array
    for (int i = 0; i < n; i++) {
        malloc_arr[i] = (i + 1) * 10;
    }
    printf("  malloc_arr after assignment:\n  ");
    for (int i = 0; i < n; i++) {
        printf("[%d]: %d  ", i, malloc_arr[i]);
    }
    printf("\n\n");

    // 2. Memory Allocation with calloc() (Guaranteed Zero-Initialized)
    printf("--- 2. ALLOCATION WITH calloc(%d elements, %zu bytes) ---\n", n, sizeof(int));
    int *calloc_arr = (int *)calloc(n, sizeof(int));

    // MANDATORY NULL CHECK
    if (calloc_arr == NULL) {
        fprintf(stderr, "Error: calloc() failed to allocate memory!\n");
        free(malloc_arr);
        return 1;
    }

    printf("  calloc_arr initial values (guaranteed zeroes):\n  ");
    for (int i = 0; i < n; i++) {
        printf("[%d]: %d  ", i, calloc_arr[i]);
    }
    printf("\n");

    // Populating calloc array
    for (int i = 0; i < n; i++) {
        calloc_arr[i] = (i + 1) * 100;
    }
    printf("  calloc_arr after assignment:\n  ");
    for (int i = 0; i < n; i++) {
        printf("[%d]: %d  ", i, calloc_arr[i]);
    }
    printf("\n\n");

    // 3. Clean-up
    free(malloc_arr);
    free(calloc_arr);
    malloc_arr = NULL;
    calloc_arr = NULL;

    printf("  All heap memory successfully freed and pointers reset to NULL.\n");
    printf("========================================================\n");

    return 0;
}
