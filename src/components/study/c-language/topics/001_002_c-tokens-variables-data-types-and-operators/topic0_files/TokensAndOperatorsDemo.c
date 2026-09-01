#include <stdio.h>
#include <stdint.h>

/**
 * TokensAndOperatorsDemo.c
 * Demonstrates C tokens, exact-width data types, sizeof operator,
 * and arithmetic/bitwise operators.
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

int main(void) {
    uint8_t statusRegister = 0b00000101; // Binary literal (C23/GCC extension) or hex 0x05
    int a = 15, b = 4;
    float result;

    printf("=== C Tokens & Operator Mechanics ===\n\n");

    // Sizeof Operator
    printf("Size of char      : %zu byte\n", sizeof(char));
    printf("Size of int       : %zu bytes\n", sizeof(int));
    printf("Size of float     : %zu bytes\n", sizeof(float));
    printf("Size of double    : %zu bytes\n", sizeof(double));
    printf("Size of uint8_t   : %zu byte\n\n", sizeof(uint8_t));

    // Type Casting
    result = (float)a / b; // Explicit cast to prevent integer truncation
    printf("Implicit vs Explicit Cast:\n");
    printf("Integer Division 15 / 4 = %d\n", a / b);
    printf("Float Division (float)15 / 4 = %.2f\n\n", result);

    // Bitwise Operations
    printf("Bitwise Operations on statusRegister (0x05):\n");
    printf("Bitwise AND (status & 0x01) : %d\n", statusRegister & 0x01);
    printf("Bitwise OR  (status | 0x02) : %d\n", statusRegister | 0x02);
    printf("Bitwise XOR (status ^ 0x05) : %d\n", statusRegister ^ 0x05);
    printf("Left Shift  (status << 2)   : %d\n", statusRegister << 2);

    return 0;
}
