/**
 * ============================================================================
 * Program: CTokensDemo.c
 * Module: 001_002 - C Tokens, Data Types & Operator Mechanics
 * Topic 0: C Tokens Breakdown (Keywords, Identifiers, Constants, Strings,
 *          Special Symbols, and Operators)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>

/* Global Constant Definition */
#define INSTITUTE_NAME "Coder & AccoTax"
#define BATCH_YEAR 2026

int main(void) {
    /* 1. KEYWORDS: 'const', 'int', 'float', 'char', 'void', 'return'
       2. IDENTIFIERS: 'studentRoll', 'studentAge', 'scorePercentage', 'gradeSection' */
    const int studentRoll = 101;
    int studentAge = 19;
    float scorePercentage = 94.75f;
    char gradeSection = 'A';

    /* 3. STRING LITERALS: Read-only character array terminated with '\0' */
    const char studentName[] = "Abhronila Saha";
    const char centerLocation[] = "Barrackpore, Kolkata";

    /* 4. CONSTANTS:
          - Decimal integer literal: 101, 19
          - Floating-point literal: 94.75f
          - Character constant: 'A'
          - Hexadecimal constant: 0x2A (42 in decimal)
          - Octal constant: 052 (42 in decimal) */
    int hexVal = 0x2A;
    int octVal = 052;

    /* 5. SPECIAL SYMBOLS / PUNCTUATORS:
          - Semicolons (;), Braces ({}), Parentheses (()), Brackets ([]), Commas (,) */
    
    /* 6. OPERATORS:
          - Assignment (=), Addition (+), Multiplication (*), Relational (>=) */
    int totalClasses = 120;
    int attendedClasses = 114;
    float attendanceRate = ((float)attendedClasses / (float)totalClasses) * 100.0f;

    /* Formatted Console Output */
    printf("========================================================\n");
    printf("     C TOKENS DEMONSTRATION - %s\n", INSTITUTE_NAME);
    printf("     Location: %s | Year: %d\n", centerLocation, BATCH_YEAR);
    printf("========================================================\n\n");

    printf("--- [1 & 2] Keywords & Valid Identifiers ---\n");
    printf("Student Name      : %s\n", studentName);
    printf("Roll Number       : %d\n", studentRoll);
    printf("Age               : %d years\n", studentAge);
    printf("Section           : %c\n", gradeSection);
    printf("Exam Score        : %.2f%%\n", scorePercentage);

    printf("\n--- [3 & 4] Constants & Numeric Literals ---\n");
    printf("Hex Constant 0x2A : Decimal %d\n", hexVal);
    printf("Octal Constant 052: Decimal %d\n", octVal);

    printf("\n--- [5 & 6] Operators & Evaluated Expressions ---\n");
    printf("Classes Attended  : %d / %d\n", attendedClasses, totalClasses);
    printf("Attendance Rate   : %.2f%%\n", attendanceRate);
    printf("Eligibility Status: %s\n", (attendanceRate >= 75.0f) ? "ELIGIBLE FOR LAB EXAM" : "DISQUALIFIED");
    printf("========================================================\n");

    return 0;
}
