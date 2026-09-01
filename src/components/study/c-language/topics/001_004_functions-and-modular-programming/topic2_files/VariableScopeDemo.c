/**
 * ============================================================================
 * Program: VariableScopeDemo.c
 * Module: 001_004 - Functions & Modular Programming
 * Topic 2: Variable Scope & Lifetime: Local/Block vs Global/File Scope
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>

/* ============================================================================
 * 1. GLOBAL / FILE SCOPE VARIABLE
 * Accessible across all functions in this translation unit; lives for program duration
 * ============================================================================ */
int globalSystemCounter = 100;
const double GLOBAL_TAX_RATE = 0.18;

void demonstrateGlobalAccess(void) {
    printf("   [demonstrateGlobalAccess] Reading globalSystemCounter = %d\n", globalSystemCounter);
    globalSystemCounter += 50;
    printf("   [demonstrateGlobalAccess] Updated globalSystemCounter = %d\n", globalSystemCounter);
}

void demonstrateLocalShadowing(void) {
    /* LOCAL VARIABLE: Shadows (masks) the outer globalSystemCounter variable */
    int globalSystemCounter = 999;
    printf("   [demonstrateLocalShadowing] Local Shadowed Value = %d\n", globalSystemCounter);
}

void demonstrateBlockScope(void) {
    int outerX = 10;
    printf("   [demonstrateBlockScope] Outer block: outerX = %d\n", outerX);

    {
        /* INNER NESTED BLOCK */
        int innerY = 20;
        int outerX = 55; /* Shadows outerX inside this block */
        printf("      [Nested Block] innerY = %d, Shadowed outerX = %d\n", innerY, outerX);
    } // innerY is destroyed here!

    printf("   [demonstrateBlockScope] After nested block: outerX = %d (Restored)\n", outerX);
    // printf("%d", innerY); // COMPILER ERROR: innerY undeclared outside block!
}

int main(void) {
    printf("===================================================================\n");
    printf("     VARIABLE SCOPE & LIFETIME LAB - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | Barrackpore Systems Lab\n");
    printf("===================================================================\n\n");

    /* 1. Global Scope Interaction */
    printf("--- [1] Global Variable Mutation Across Functions ---\n");
    printf("Initial globalSystemCounter in main() = %d\n", globalSystemCounter);
    demonstrateGlobalAccess();
    printf("After function call in main() = %d\n\n", globalSystemCounter);

    /* 2. Variable Shadowing */
    printf("--- [2] Variable Shadowing (Local Masks Global) ---\n");
    demonstrateLocalShadowing();
    printf("Global globalSystemCounter in main() remains = %d\n\n", globalSystemCounter);

    /* 3. Block Scope & Lifetime */
    printf("--- [3] Block Scope & Lifetime Inside Braces { } ---\n");
    demonstrateBlockScope();

    printf("\n===================================================================\n");
    return 0;
}
