/**
 * ============================================================================
 * Program: ConsoleIODemo.c
 * Module: 001_001 - Getting Started with C & Compiler Pipeline
 * Topic 4: Formatted Console I/O: printf(), scanf() & Format Specifiers
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>

int main(void) {
    printf("===================================================================\n");
    printf("     FORMATTED CONSOLE I/O & SPECIFIERS - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | Barrackpore Systems Lab\n");
    printf("===================================================================\n\n");

    /* 1. Basic Type Specifiers */
    int studentId = 1042;
    float examGpa = 3.875f;
    double accountBalance = 158500.75;
    char gradeLetter = 'A';
    char studentName[] = "Swadeep Sharma";

    printf("--- [1] Standard Type Specifiers ---\n");
    printf("Student Name (%%s)        : %s\n", studentName);
    printf("Student ID (%%d)          : %d\n", studentId);
    printf("Letter Grade (%%c)        : %c\n", gradeLetter);
    printf("Semester GPA (%%.2f)      : %.2f\n", examGpa);
    printf("Account Balance (%%.2lf)  : INR %.2lf\n", accountBalance);

    /* 2. Number Bases: Decimal, Hexadecimal, Octal & Pointer Addresses */
    int memoryValue = 255;
    void *ptrAddress = &memoryValue;

    printf("\n--- [2] Integer Base & Memory Address Specifiers ---\n");
    printf("Decimal (%%d)             : %d\n", memoryValue);
    printf("Octal (%%o)               : %o\n", memoryValue);
    printf("Hexadecimal Lower (%%x)   : %x\n", memoryValue);
    printf("Hexadecimal Upper (%%#X)  : %#X (with prefix)\n", memoryValue);
    printf("Pointer Address (%%p)     : %p\n", ptrAddress);

    /* 3. Field Width, Padding & Alignment Flags */
    printf("\n--- [3] Width, Padding & Alignment Flags ---\n");
    printf("Right-Aligned (%%8d)     : [%8d]\n", studentId);
    printf("Left-Aligned (%%-8d)      : [%-8d]\n", studentId);
    printf("Zero-Padded (%%08d)       : [%08d]\n", studentId);
    printf("Positive Sign (%%+d)      : [%+d]\n", studentId);

    /* 4. Scientific Notation & Dynamic Precision */
    double planckConstant = 6.62607015e-34;
    printf("\n--- [4] Scientific Notation & Dynamic Width (*.*) ---\n");
    printf("Scientific (%%e)          : %e\n", planckConstant);
    printf("Shortest Rep (%%g)        : %g\n", 1200.500);
    int dynamicWidth = 10, dynamicPrecision = 3;
    printf("Dynamic Specifier (%%*.*f): [%*.*f]\n", dynamicWidth, dynamicPrecision, 3.14159265);

    printf("===================================================================\n");
    return 0;
}
