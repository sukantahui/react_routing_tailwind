/**
 * StackVsHeapMemoryDemo.c
 * Demonstrates Process Memory Layout: Stack vs Heap Allocation,
 * Lifetime differences, and Pointer Address Inspection.
 *
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

#include <stdio.h>
#include <stdlib.h>

// Global variable stored in Data Segment (.data)
int global_counter = 100;

// Uninitialized global stored in BSS Segment (.bss)
int global_uninitialized;

void demonstrate_stack_allocation(int recursion_depth) {
    // Local automatic variable allocated on the runtime Stack
    int stack_var = recursion_depth * 10;
    
    printf("  [Stack Frame %d] stack_var address: %p, value: %d\n", 
           recursion_depth, (void*)&stack_var, stack_var);
           
    if (recursion_depth < 3) {
        demonstrate_stack_allocation(recursion_depth + 1);
    }
}

int main(void) {
    printf("========================================================\n");
    printf("  CODER & ACCOTAX - STACK VS HEAP MEMORY ARCHITECTURE   \n");
    printf("========================================================\n\n");

    // 1. Process Segment Addresses
    printf("--- 1. PROCESS MEMORY SEGMENTS ---\n");
    printf("  Code/Text Segment (main function) : %p\n", (void*)main);
    printf("  Initialized Data Segment (.data)  : %p\n", (void*)&global_counter);
    printf("  Uninitialized Data Segment (.bss) : %p\n", (void*)&global_uninitialized);

    // 2. Stack Memory Behavior
    printf("\n--- 2. STACK MEMORY ALLOCATION (Downward Growth) ---\n");
    demonstrate_stack_allocation(1);

    // 3. Heap Memory Behavior
    printf("\n--- 3. HEAP DYNAMIC ALLOCATION (Upward Growth) ---\n");
    int *heap_ptr1 = (int*)malloc(sizeof(int));
    int *heap_ptr2 = (int*)malloc(sizeof(int));
    
    if (heap_ptr1 == NULL || heap_ptr2 == NULL) {
        fprintf(stderr, "Heap memory allocation failed!\n");
        return 1;
    }

    *heap_ptr1 = 42;
    *heap_ptr2 = 84;

    printf("  heap_ptr1 allocated address       : %p, value: %d\n", (void*)heap_ptr1, *heap_ptr1);
    printf("  heap_ptr2 allocated address       : %p, value: %d\n", (void*)heap_ptr2, *heap_ptr2);
    printf("  Address difference (bytes)        : %ld\n", (long)(heap_ptr2 - heap_ptr1) * sizeof(int));

    // 4. Memory Cleanup
    free(heap_ptr1);
    free(heap_ptr2);
    heap_ptr1 = NULL;
    heap_ptr2 = NULL;
    
    printf("\n  Heap buffers released and pointers reset to NULL.\n");
    printf("========================================================\n");

    return 0;
}
