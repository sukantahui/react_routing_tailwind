#include <stdio.h>

/**
 * PointersBasicsDemo.c
 * Pointer dereferencing, address arithmetic, and double pointers
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

int main(void) {
    int val = 100;
    int *ptr = &val;
    int **pptr = &ptr;

    printf("=== Pointer Fundamentals & Address Arithmetic ===\n\n");
    printf("Value of 'val'              : %d\n", val);
    printf("Address of 'val' (&val)     : %p\n", (void*)&val);
    printf("Pointer 'ptr' holds address : %p\n", (void*)ptr);
    printf("Dereferenced '*ptr'         : %d\n\n", *ptr);

    printf("Double Pointer 'pptr' holds : %p\n", (void*)pptr);
    printf("Dereferenced '**pptr'       : %d\n\n", **pptr);

    // Pointer Arithmetic
    printf("Pointer Arithmetic:\n");
    printf("ptr     : %p\n", (void*)ptr);
    printf("ptr + 1 : %p (Advanced by %zu bytes)\n", (void*)(ptr + 1), sizeof(int));

    return 0;
}
