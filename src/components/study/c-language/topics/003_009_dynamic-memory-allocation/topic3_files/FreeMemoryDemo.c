/**
 * FreeMemoryDemo.c
 * Demonstrates Heap Deallocation with free(), Dangling Pointer Elimination,
 * and Safe Pointer Nullification.
 *
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

#include <stdio.h>
#include <stdlib.h>

void safe_free(void **pptr) {
    if (pptr != NULL && *pptr != NULL) {
        free(*pptr);
        *pptr = NULL; // Automatically nullifies the caller's pointer
    }
}

int main(void) {
    printf("========================================================\n");
    printf("   CODER & ACCOTAX - HEAP DEALLOCATION & DANGLING PTRS  \n");
    printf("========================================================\n\n");

    // 1. Dynamic Allocation
    int *data = (int *)malloc(3 * sizeof(int));
    if (data == NULL) {
        fprintf(stderr, "Allocation failed!\n");
        return 1;
    }

    data[0] = 100;
    data[1] = 200;
    data[2] = 300;
    printf("--- 1. ACTIVE HEAP BUFFER ---\n");
    printf("  data address: %p, values: [%d, %d, %d]\n\n", 
           (void*)data, data[0], data[1], data[2]);

    // 2. Demonstrating the Dangling Pointer Trap
    printf("--- 2. THE DANGLING POINTER HAZARD ---\n");
    free(data);
    // CRITICAL OBSERVATION:
    // Calling free() releases the heap memory to the OS,
    // but DOES NOT change the memory address stored inside 'data'!
    printf("  After free(data), pointer still holds address: %p (DANGLING!)\n", (void*)data);
    
    // NULLIFY IMMEDIATELY to eliminate the hazard
    data = NULL;
    printf("  After data = NULL, pointer safely neutralized: %p\n\n", (void*)data);

    // 3. Demonstrating Safe Free Utility Wrapper
    printf("--- 3. INDUSTRIAL SAFE-FREE HELPER (Pointer-to-Pointer) ---\n");
    int *buffer = (int *)malloc(5 * sizeof(int));
    if (buffer != NULL) {
        buffer[0] = 999;
        printf("  buffer address before safe_free: %p\n", (void*)buffer);
        
        // Pass address of pointer (&buffer) so safe_free can free & set to NULL
        safe_free((void**)&buffer);
        
        printf("  buffer address after safe_free : %p (Guaranteed NULL)\n\n", (void*)buffer);
    }

    // 4. Calling free on NULL is 100% Safe (No-op in standard C)
    printf("--- 4. CALLING FREE ON NULL POINTER ---\n");
    free(NULL); // Standard C guarantees this is a safe no-op!
    printf("  free(NULL) executed safely with zero crashes.\n");
    printf("========================================================\n");

    return 0;
}
