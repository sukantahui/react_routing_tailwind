/**
 * ============================================================================
 * Program: OperatorsPrecedenceBitwiseDemo.c
 * Module: 001_002 - C Tokens, Data Types & Operator Mechanics
 * Topic 4: Operator Precedence & Associativity, Bitwise Operations
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>
#include <stdint.h>

/* Helper function to print an 8-bit binary representation */
void printBinary8(uint8_t val) {
    for (int i = 7; i >= 0; i--) {
        printf("%d", (val >> i) & 1);
        if (i == 4) printf(" ");
    }
}

int main(void) {
    /* 1. Arithmetic & Precedence Evaluation */
    int a = 10, b = 20, c = 5, d = 2;
    int arithmeticResult = a + b * c / d - 3; 
    /* Step 1: b * c = 100
       Step 2: 100 / d = 50
       Step 3: a + 50 = 60
       Step 4: 60 - 3 = 57 */

    /* 2. Logical Short-Circuit Evaluation */
    int x = 0;
    int evaluated = 0;
    /* In &&, if first operand is FALSE, second is never evaluated! */
    if (x != 0 && (evaluated = 100)) {
        /* Not reached */
    }

    /* 3. Bitwise Operators Demonstration */
    uint8_t regA = 0x55; /* 0101 0101 in binary */
    uint8_t regB = 0x0F; /* 0000 1111 in binary */

    uint8_t andRes  = regA & regB;  /* Bitwise AND */
    uint8_t orRes   = regA | regB;  /* Bitwise OR  */
    uint8_t xorRes  = regA ^ regB;  /* Bitwise XOR */
    uint8_t notRes  = (uint8_t)(~regA); /* Bitwise NOT */
    uint8_t shlRes  = (uint8_t)(regA << 2); /* Left Shift */
    uint8_t shrRes  = (uint8_t)(regA >> 2); /* Right Shift */

    /* 4. Bit Manipulation Idioms */
    uint8_t statusRegister = 0x00; /* Start with all 0s */
    
    /* Set Bit 3 (0000 1000) */
    statusRegister |= (1 << 3);
    
    /* Set Bit 6 (0100 1000) */
    statusRegister |= (1 << 6);

    /* Check Bit 3 */
    int isBit3Set = (statusRegister & (1 << 3)) ? 1 : 0;

    /* Clear Bit 3 (0100 0000) */
    statusRegister &= ~(1 << 3);

    /* Toggle Bit 6 (0000 0000) */
    statusRegister ^= (1 << 6);

    /* 5. Ternary & Compound Assignment */
    int score = 82;
    char grade = (score >= 90) ? 'E' : (score >= 80) ? 'A' : 'B';

    printf("===================================================================\n");
    printf("     OPERATORS & BITWISE MECHANICS - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | Barrackpore Systems Lab\n");
    printf("===================================================================\n\n");

    printf("--- [1] Precedence Evaluation ---\n");
    printf("Expression : 10 + 20 * 5 / 2 - 3\n");
    printf("Calculated : %d (Matches Step-by-Step = 57)\n", arithmeticResult);

    printf("\n--- [2] Short-Circuit Safety ---\n");
    printf("Condition  : if (x != 0 && (evaluated = 100))\n");
    printf("x value    : %d | evaluated value : %d (Safe: RHS Skipped!)\n", x, evaluated);

    printf("\n--- [3] 8-Bit Bitwise Operations ---\n");
    printf("regA (0x%02X)   : ", regA); printBinary8(regA); printf("\n");
    printf("regB (0x%02X)   : ", regB); printBinary8(regB); printf("\n");
    printf("regA & regB    : "); printBinary8(andRes); printf(" (AND)\n");
    printf("regA | regB    : "); printBinary8(orRes);  printf(" (OR)\n");
    printf("regA ^ regB    : "); printBinary8(xorRes); printf(" (XOR)\n");
    printf("~regA          : "); printBinary8(notRes); printf(" (NOT)\n");
    printf("regA << 2      : "); printBinary8(shlRes); printf(" (Left Shift x 4)\n");
    printf("regA >> 2      : "); printBinary8(shrRes); printf(" (Right Shift / 4)\n");

    printf("\n--- [4] Bit Manipulation Tests ---\n");
    printf("Was Bit 3 Set? : %s\n", isBit3Set ? "YES (1)" : "NO (0)");
    printf("Final StatusReg: 0x%02X (Bits 3 cleared, Bit 6 toggled)\n", statusRegister);

    printf("\n--- [5] Ternary Evaluation ---\n");
    printf("Score: %d -> Grade: %c\n", score, grade);
    printf("===================================================================\n");

    return 0;
}
