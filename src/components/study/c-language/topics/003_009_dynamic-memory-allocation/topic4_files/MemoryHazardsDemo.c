/**
 * MemoryHazardsDemo.c
 * Demonstrates Common Dynamic Memory Hazards:
 * 1. Memory Leaks (Lost references)
 * 2. Dangling Pointers & Use-After-Free
 * 3. Double Free Corruption
 * 4. Diagnostic Sanitizers (-fsanitize=address / Valgrind)
 *
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

#include <stdio.h>
#include <stdlib.h>

void simulate_memory_leak(void) {
    // Allocates 100 bytes on heap but never calls free()
    // When the function returns, the pointer 'leak' on the stack is destroyed,
    // leaving 100 bytes permanently stranded on the heap!
    int *leak = (int *)malloc(25 * sizeof(int));
    if (leak != NULL) {
        leak[0] = 777;
        printf("  [Hazard 1: Leak] Allocated 100 bytes at %p without free().\n", (void*)leak);
    }
}

int main(void) {
    printf("========================================================\n");
    printf("   CODER & ACCOTAX - MEMORY HAZARDS & DIAGNOSTIC LAB    \n");
    printf("========================================================\n\n");

    // 1. Simulating Memory Leak
    printf("--- 1. SIMULATING MEMORY LEAK (Lost Stack Pointer) ---\n");
    simulate_memory_leak();
    printf("  Function returned. Memory block is now orphaned (unreachable).\n\n");

    // 2. Safe Heap Lifecycle Example
    printf("--- 2. CORRECT MANAGED LIFECYCLE (Zero Leaks) ---\n");
    int *safe_buf = (int *)malloc(10 * sizeof(int));
    if (safe_buf != NULL) {
        for (int i = 0; i < 10; i++) {
            safe_buf[i] = i * i;
        }
        printf("  Managed buffer allocated at %p and used safely.\n", (void*)safe_buf);
        
        // Deallocate and nullify
        free(safe_buf);
        safe_buf = NULL;
        printf("  Buffer freed and nullified. Clean memory hygiene!\n\n");
    }

    // 3. Diagnostic Compilation Flags
    printf("--- 3. INDUSTRIAL COMPILER DIAGNOSTIC FLAGS ---\n");
    printf("  To automatically detect memory leaks and invalid accesses:\n");
    printf("  1. GCC AddressSanitizer : gcc -fsanitize=address -g MemoryHazardsDemo.c\n");
    printf("  2. Valgrind Memcheck    : valgrind --leak-check=full ./a.out\n\n");

    printf("========================================================\n");
    return 0;
}
