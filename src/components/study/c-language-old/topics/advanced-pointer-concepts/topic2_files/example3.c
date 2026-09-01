#include <stdio.h>

int main() {
    int var = 42;
    int *ptr = &var;
    int **dptr = &ptr;
    
    printf("=== Memory Layout Visualization ===\n\n");
    
    // Print addresses and values
    printf("Variable 'var':\n");
    printf("  Address: %p\n", (void*)&var);
    printf("  Value: %d\n", var);
    printf("  Size: %zu bytes\n\n", sizeof(var));
    
    printf("Pointer 'ptr' (int*):\n");
    printf("  Address: %p\n", (void*)&ptr);
    printf("  Value (stored address): %p\n", (void*)ptr);
    printf("  Points to value: %d\n", *ptr);
    printf("  Size: %zu bytes\n\n", sizeof(ptr));
    
    printf("Double Pointer 'dptr' (int**):\n");
    printf("  Address: %p\n", (void*)&dptr);
    printf("  Value (stored address): %p\n", (void*)dptr);
    printf("  Points to pointer at: %p\n", *dptr);
    printf("  Points to value: %d\n", **dptr);
    printf("  Size: %zu bytes\n\n", sizeof(dptr));
    
    // Demonstrate pointer arithmetic effect on addresses
    printf("=== Pointer Arithmetic Address Changes ===\n");
    printf("ptr: %p\n", (void*)ptr);
    printf("ptr + 1: %p (adds %zu bytes)\n", (void*)(ptr + 1), sizeof(int));
    printf("dptr: %p\n", (void*)dptr);
    printf("dptr + 1: %p (adds %zu bytes)\n", (void*)(dptr + 1), sizeof(int*));
    
    return 0;
}