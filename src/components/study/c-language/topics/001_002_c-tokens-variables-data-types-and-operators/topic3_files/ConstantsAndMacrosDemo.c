/**
 * ============================================================================
 * Program: ConstantsAndMacrosDemo.c
 * Module: 001_002 - C Tokens, Data Types & Operator Mechanics
 * Topic 3: Constants in C: #define Preprocessor Macros vs const Keyword
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>

/* 1. Preprocessor Symbolic Constants (#define) */
#define MAX_STUDENTS 60
#define PI_MACRO 3.14159265f
#define CALC_SQUARE(x) ((x) * (x))
#define BAD_SQUARE(x) x * x  /* Intentional pitfall demonstration */

/* 2. Enumeration Constants (enum) */
enum SecurityLevel {
    LEVEL_GUEST = 0,
    LEVEL_STUDENT = 10,
    LEVEL_FACULTY = 20,
    LEVEL_ADMIN = 99
};

int main(void) {
    /* 3. The 'const' Type Qualifier (Read-Only Variables) */
    const float piConst = 3.14159265f;
    const int maxLabCapacity = 45;
    const char instituteCity[] = "Barrackpore";

    /* 4. Pointer to Const vs Const Pointer */
    int currentEnrolled = 38;
    int waitlisted = 7;

    /* A: Pointer to Constant (Data cannot be changed through ptr) */
    const int *ptrToConst = &currentEnrolled;

    /* B: Constant Pointer (Pointer address cannot be changed) */
    int * const constPtr = &currentEnrolled;

    printf("===================================================================\n");
    printf("     CONSTANTS & PREPROCESSOR MACROS - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | City: %s\n", instituteCity);
    printf("===================================================================\n\n");

    printf("--- [1] #define vs const Comparison ---\n");
    printf("#define MAX_STUDENTS : %d (Textual Preprocessor Replacement)\n", MAX_STUDENTS);
    printf("const maxLabCapacity : %d (Typed Memory Variable in .rodata)\n", maxLabCapacity);
    printf("PI (#define)         : %.6f\n", PI_MACRO);
    printf("PI (const float)     : %.6f\n", piConst);

    printf("\n--- [2] Preprocessor Macro Expansion Pitfall ---\n");
    int val = 2 + 3; /* 5 */
    printf("CALC_SQUARE(2 + 3)   : %d (Correct: ((2+3) * (2+3)) = 25)\n", CALC_SQUARE(val));
    printf("BAD_SQUARE(2 + 3)    : %d (Pitfall: 2 + 3 * 2 + 3 = 11!)\n", BAD_SQUARE(2 + 3));

    printf("\n--- [3] Enumeration Constants (enum) ---\n");
    enum SecurityLevel userRole = LEVEL_FACULTY;
    printf("Faculty Security Lvl : %d\n", userRole);
    printf("Admin Security Lvl   : %d\n", LEVEL_ADMIN);

    printf("\n--- [4] Pointer Constness Invariants ---\n");
    printf("Value via ptrToConst : %d\n", *ptrToConst);
    ptrToConst = &waitlisted; /* Allowed: Pointer can point elsewhere */
    printf("ptrToConst redirected: %d (points to waitlisted)\n", *ptrToConst);
    /* *ptrToConst = 50;     // COMPILER ERROR: Assignment of read-only location */

    *constPtr = 40;          /* Allowed: Data can change */
    printf("Modified via constPtr: %d (currentEnrolled updated)\n", currentEnrolled);
    /* constPtr = &waitlisted; // COMPILER ERROR: Assignment of read-only variable */

    printf("===================================================================\n");
    return 0;
}
