#include <stdio.h>

/**
 * VoidPointersConstDemo.c
 * Demonstrates generic void pointers (void*), explicit type casting,
 * generic byte printer, and the 4 const pointer qualifier permutations.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

// 1. Generic Print Function using void* and type discriminator
void printGeneric(const void *ptr, char type) {
    switch (type) {
        case 'i':
            printf("Integer Value : %d\n", *(const int*)ptr);
            break;
        case 'f':
            printf("Float Value   : %.2f\n", *(const float*)ptr);
            break;
        case 'd':
            printf("Double Value  : %.2f\n", *(const double*)ptr);
            break;
        case 'c':
            printf("Char Value    : '%c'\n", *(const char*)ptr);
            break;
        default:
            printf("Unknown type!\n");
    }
}

// 2. Generic Byte-by-Byte Memory Inspector
void dumpMemoryBytes(const void *ptr, size_t numBytes) {
    const unsigned char *bytePtr = (const unsigned char*)ptr;
    printf("Memory Bytes (%zu B): [ ", numBytes);
    for (size_t i = 0; i < numBytes; i++) {
        printf("%02X ", bytePtr[i]);
    }
    printf("]\n");
}

int main(void) {
    int num = 305419896; // 0x12345678
    double pi = 3.14159;
    char letter = 'S';

    printf("====================================================\n");
    printf(" Generic Void Pointers (void*) & Const Qualifiers\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    printf("1. Polymorphic Function Calls via void*:\n");
    printGeneric(&num, 'i');
    printGeneric(&pi, 'd');
    printGeneric(&letter, 'c');
    printf("\n");

    printf("2. Raw Hexadecimal Memory Dump via void*:\n");
    printf("   • Integer 0x12345678 (Little-Endian Memory Order):\n     ");
    dumpMemoryBytes(&num, sizeof(num));
    printf("   • Double Pi:\n     ");
    dumpMemoryBytes(&pi, sizeof(pi));
    printf("\n");

    // 3. The 4 Const Pointer Permutations
    int a = 10, b = 20;

    // A. Pointer to Constant Data (Data read-only, pointer mutable)
    const int *pConstData = &a;
    pConstData = &b; // OK! Pointer can point elsewhere
    // *pConstData = 30; // ERROR! Data is read-only

    // B. Constant Pointer to Mutable Data (Data mutable, pointer fixed)
    int * const constPtr = &a;
    *constPtr = 15; // OK! Data can be modified
    // constPtr = &b; // ERROR! Pointer address is read-only

    // C. Constant Pointer to Constant Data (Both read-only)
    const int * const fullyConst = &a;
    // *fullyConst = 25; // ERROR!
    // fullyConst = &b;  // ERROR!

    printf("3. Const Pointer Rules:\n");
    printf("   • const int *ptr       : Read-only Data, Mutable Pointer Address\n");
    printf("   • int * const ptr       : Mutable Data, Read-only Pointer Address\n");
    printf("   • const int * const ptr : Read-only Data, Read-only Pointer Address\n");

    return 0;
}
