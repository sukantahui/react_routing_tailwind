#include <stdio.h>

/**
 * PointerArrayEquivalenceDemo.c
 * Demonstrates the duality of arrays and pointers in C:
 * arr[i] == *(arr + i) == i[arr], array name decay to pointer,
 * and the crucial type distinction between arr and &arr.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

void printViaPointer(const int *p, int size) {
    printf("   Inside function (sizeof(p) = %zu B - Pointer!): [ ", sizeof(p));
    for (int i = 0; i < size; i++) {
        printf("%d ", *(p + i));
    }
    printf("]\n");
}

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};

    printf("====================================================\n");
    printf(" Pointer & Array Equivalence: arr[i] vs *(arr + i)\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    printf("1. Four Equivalent Ways to Access Index 2 (Value = 30):\n");
    printf("   • arr[2]     = %d (Standard Subscript)\n", arr[2]);
    printf("   • *(arr + 2) = %d (Pointer Arithmetic Offset)\n", *(arr + 2));
    printf("   • *(2 + arr) = %d (Commutative Addition)\n", *(2 + arr));
    printf("   • 2[arr]     = %d (Commutative Subscript - Completely Legal in C!)\n\n", 2[arr]);

    printf("2. Array Name Decay to Pointer:\n");
    printf("   • Array Base Address (arr)      = %p\n", (void*)arr);
    printf("   • Address of First Element (&arr[0]) = %p\n", (void*)&arr[0]);
    printf("   • sizeof(arr) in main()          = %zu Bytes (Entire Array!)\n\n", sizeof(arr));

    printf("3. Array Passing to Function (Array Decays into Pointer):\n");
    printViaPointer(arr, 5);
    printf("\n");

    printf("4. Crucial Distinction: arr vs &arr:\n");
    printf("   • arr       = %p (Type: int* | Points to 1st element)\n", (void*)arr);
    printf("   • arr + 1   = %p (Diff: +%td Bytes - Advances by 1 int)\n", 
           (void*)(arr + 1), (char*)(arr + 1) - (char*)arr);
    printf("   • &arr      = %p (Type: int(*)[5] | Points to ENTIRE array)\n", (void*)&arr);
    printf("   • &arr + 1  = %p (Diff: +%td Bytes - Advances by ENTIRE 20-byte array!)\n", 
           (void*)(&arr + 1), (char*)(&arr + 1) - (char*)&arr);

    return 0;
}
