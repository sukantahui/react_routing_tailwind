/**
 * ============================================================================
 * Project 4: High-Speed Four-Function Arithmetic & Bitwise Logic Unit (ALU)
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

int main(void) {
    printf("===================================================================\n");
    printf("     VIRTUAL ARITHMETIC & LOGIC UNIT (ALU) - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    char testOps[] = {'+', '-', '*', '/', '%', '&', '|', '^'};
    int a = 24, b = 6;
    int opCount = sizeof(testOps) / sizeof(testOps[0]);

    printf("Executing Operations with Operands: A = %d, B = %d\n\n", a, b);

    for (int i = 0; i < opCount; i++) {
        char op = testOps[i];
        int result = 0;

        switch (op) {
            case '+':
                result = a + b;
                printf("[ADD] %d + %d = %d\n", a, b, result);
                break;
            case '-':
                result = a - b;
                printf("[SUB] %d - %d = %d\n", a, b, result);
                break;
            case '*':
                result = a * b;
                printf("[MUL] %d * %d = %d\n", a, b, result);
                break;
            case '/':
                if (b != 0) {
                    result = a / b;
                    printf("[DIV] %d / %d = %d\n", a, b, result);
                } else {
                    printf("[DIV] Error: Zero Divisor!\n");
                }
                break;
            case '%':
                if (b != 0) {
                    result = a % b;
                    printf("[MOD] %d %% %d = %d\n", a, b, result);
                }
                break;
            case '&':
                result = a & b;
                printf("[AND] %d & %d = %d (0x%02X)\n", a, b, result, result);
                break;
            case '|':
                result = a | b;
                printf("[ OR] %d | %d = %d (0x%02X)\n", a, b, result, result);
                break;
            case '^':
                result = a ^ b;
                printf("[XOR] %d ^ %d = %d (0x%02X)\n", a, b, result, result);
                break;
            default:
                printf("[ALU] Error: Opcode '%c' not recognized!\n", op);
                break;
        }
    }

    printf("===================================================================\n");
    return 0;
}
