/**
 * ============================================================================
 * Program: TypeCastingPromotionDemo.c
 * Module: 001_002 - C Tokens, Data Types & Operator Mechanics
 * Topic 5: Implicit Type Promotion vs Explicit Type Casting
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>
#include <stdint.h>

int main(void) {
    /* 1. Implicit Integer Promotion */
    char charA = 100;
    char charB = 50;
    /* charA and charB are promoted to int before addition */
    int sumInt = charA + charB; 

    /* 2. Classic Integer Truncation Pitfall */
    int totalMarks = 475;
    int totalSubjects = 5;
    int divisor = 2;

    /* Pitfall: 475 / 5 = 95, but what about 15 / 4? */
    int num1 = 15, num2 = 4;
    float truncatedDiv = num1 / num2;          /* Truncates to 3.000000 */
    float explicitCastedDiv = (float)num1 / num2; /* Evaluates to 3.750000 */

    /* 3. The Dangerous Signed vs Unsigned Implicit Promotion Trap */
    int signedNegative = -1;
    unsigned int unsignedPositive = 1;
    int isNegativeLessThanPositive = (signedNegative < unsignedPositive);
    /* TRAP: signedNegative (-1) is implicitly promoted to unsigned int (4294967295U),
       so 4294967295U < 1U evaluates to 0 (FALSE)! */

    /* 4. Pointer Casting & Endianness Inspection */
    uint32_t sampleWord = 0x12345678;
    uint8_t *bytePtr = (uint8_t *)&sampleWord;

    printf("===================================================================\n");
    printf("     TYPE PROMOTION & CASTING - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | Barrackpore Systems Lab\n");
    printf("===================================================================\n\n");

    printf("--- [1] Integer Promotion (char -> int) ---\n");
    printf("charA (%d) + charB (%d) = %d (Promoted to 32-bit int)\n", charA, charB, sumInt);

    printf("\n--- [2] Integer Division vs Explicit Casting ---\n");
    printf("Without Cast (15 / 4)   : %.4f (Bug: Integer Truncation to 3.0000)\n", truncatedDiv);
    printf("Explicit Cast ((float)15 / 4): %.4f (Correct: 3.7500)\n", explicitCastedDiv);

    printf("\n--- [3] Signed vs Unsigned Promotion Trap ---\n");
    printf("Comparing: -1 < 1U\n");
    printf("Raw Evaluation Result   : %d (%s!)\n", 
           isNegativeLessThanPositive, 
           isNegativeLessThanPositive ? "TRUE" : "FALSE (TRAP: -1 promoted to 4294967295U)");

    printf("\n--- [4] Pointer Casting (Memory Endianness Inspection) ---\n");
    printf("32-bit Value: 0x%08X\n", sampleWord);
    printf("Byte 0 at address %p: 0x%02X (%s Endian LSB First)\n", 
           (void*)bytePtr, *bytePtr, (*bytePtr == 0x78) ? "Little" : "Big");
    printf("Byte 1 at address %p: 0x%02X\n", (void*)(bytePtr + 1), *(bytePtr + 1));
    printf("Byte 2 at address %p: 0x%02X\n", (void*)(bytePtr + 2), *(bytePtr + 2));
    printf("Byte 3 at address %p: 0x%02X\n", (void*)(bytePtr + 3), *(bytePtr + 3));
    printf("===================================================================\n");

    return 0;
}
