#include <stdio.h>
#include <stdlib.h>

/**
 * DoublePointersDemo.c
 * Demonstrates pointers to pointers (double pointers **),
 * modifying caller pointer addresses inside functions (e.g. dynamic buffer allocation),
 * and creating dynamic 2D jagged matrices on the heap.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

// 1. Modifying a caller's pointer address requires a double pointer!
void allocateBuffer(int **pBuffer, int size) {
    *pBuffer = (int*)malloc(size * sizeof(int));
    if (*pBuffer != NULL) {
        for (int i = 0; i < size; i++) {
            (*pBuffer)[i] = (i + 1) * 10;
        }
    }
}

int main(void) {
    int val = 42;
    int *pVal = &val;       // Single pointer: stores address of val
    int **ppVal = &pVal;    // Double pointer: stores address of pVal

    printf("====================================================\n");
    printf(" Double Pointers (Pointers to Pointers: **ptr)\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    printf("1. Two-Level Indirection Chain:\n");
    printf("   • val   = %d | Address (&val)   = %p\n", val, (void*)&val);
    printf("   • pVal  = %p | Address (&pVal)  = %p\n", (void*)pVal, (void*)&pVal);
    printf("   • ppVal = %p | Address (&ppVal) = %p\n\n", (void*)ppVal, (void*)&ppVal);

    printf("2. Dereferencing Levels:\n");
    printf("   • ppVal   (holds &pVal)  = %p\n", (void*)ppVal);
    printf("   • *ppVal  (holds &val)   = %p\n", (void*)*ppVal);
    printf("   • **ppVal (retrieves 42) = %d\n\n", **ppVal);

    // Modifying val through double pointer
    **ppVal = 99;
    printf("   • After **ppVal = 99: val = %d (Mutated via 2 indirection levels!)\n\n", val);

    // 3. Dynamic Buffer Allocation via Double Pointer
    int *dynamicArray = NULL;
    int size = 4;

    allocateBuffer(&dynamicArray, size);
    printf("3. Dynamic Array Allocated via Double Pointer Argument:\n   [ ");
    for (int i = 0; i < size; i++) {
        printf("%d ", dynamicArray[i]);
    }
    printf("]\n");

    free(dynamicArray);
    dynamicArray = NULL;

    return 0;
}
