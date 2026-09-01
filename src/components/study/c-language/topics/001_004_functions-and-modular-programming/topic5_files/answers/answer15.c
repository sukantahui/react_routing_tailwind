/**
 * ============================================================================
 * Project 15: Recursive Decimal to Binary / Hexadecimal Base Converter
 * Module: 001_004 - Functions & Modular Programming
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

/* Recursive Binary Printer: prints on stack unwinding! */
void printBinaryRecursive(unsigned int n) {
    if (n > 1) {
        printBinaryRecursive(n / 2);
    }
    printf("%d", n % 2);
}

/* Recursive Hexadecimal Printer: prints on stack unwinding! */
void printHexRecursive(unsigned int n) {
    const char hexDigits[] = "0123456789ABCDEF";
    if (n >= 16) {
        printHexRecursive(n / 16);
    }
    printf("%c", hexDigits[n % 16]);
}

int main(void) {
    printf("===================================================================\n");
    printf("     RECURSIVE NUMBER BASE CONVERTER - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    unsigned int testNumbers[] = {5, 29, 255, 1024, 65535};
    int count = sizeof(testNumbers) / sizeof(testNumbers[0]);

    for (int i = 0; i < count; i++) {
        unsigned int val = testNumbers[i];
        printf("Decimal: %-5u | Binary: ", val);
        printBinaryRecursive(val);
        printf(" | Hexadecimal: 0x");
        printHexRecursive(val);
        printf("\n");
    }

    printf("\n===================================================================\n");
    return 0;
}
