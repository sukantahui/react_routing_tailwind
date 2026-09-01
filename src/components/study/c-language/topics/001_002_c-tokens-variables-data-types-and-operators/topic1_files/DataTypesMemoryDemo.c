/**
 * ============================================================================
 * Program: DataTypesMemoryDemo.c
 * Module: 001_002 - C Tokens, Data Types & Operator Mechanics
 * Topic 1: Fundamental Data Types & Memory Footprints across Architectures
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>
#include <limits.h>
#include <float.h>

int main(void) {
    /* 1. Declaration of Fundamental Primitive Data Types */
    char gradeChar = 'A';
    int countInt = 45000;
    short smallVal = 32000;
    long populationLong = 1428627663L;
    long long bigNumber = 9223372036854775807LL;
    float tempFloat = 36.6f;
    double preciseDouble = 3.141592653589793;
    long double highPrecision = 3.14159265358979323846L;

    printf("===================================================================\n");
    printf("     C DATA TYPES & MEMORY FOOTPRINTS - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | Barrackpore Systems Lab\n");
    printf("===================================================================\n\n");

    /* 2. Byte Sizes via sizeof Operator (%zu for size_t) */
    printf("%-20s %-12s %-18s\n", "Data Type", "Byte Size", "Bit Width");
    printf("-------------------------------------------------------------------\n");
    printf("%-20s %-12zu %-18zu\n", "char", sizeof(char), sizeof(char) * 8);
    printf("%-20s %-12zu %-18zu\n", "short", sizeof(short), sizeof(short) * 8);
    printf("%-20s %-12zu %-18zu\n", "int", sizeof(int), sizeof(int) * 8);
    printf("%-20s %-12zu %-18zu\n", "long", sizeof(long), sizeof(long) * 8);
    printf("%-20s %-12zu %-18zu\n", "long long", sizeof(long long), sizeof(long long) * 8);
    printf("%-20s %-12zu %-18zu\n", "float", sizeof(float), sizeof(float) * 8);
    printf("%-20s %-12zu %-18zu\n", "double", sizeof(double), sizeof(double) * 8);
    printf("%-20s %-12zu %-18zu\n", "long double", sizeof(long double), sizeof(long double) * 8);

    /* 3. Range Limits from <limits.h> and <float.h> */
    printf("\n--- Architectural Range Limits (<limits.h> / <float.h>) ---\n");
    printf("Signed char range    : %d to %d\n", SCHAR_MIN, SCHAR_MAX);
    printf("Unsigned char range  : 0 to %u\n", UCHAR_MAX);
    printf("Signed short range   : %d to %d\n", SHRT_MIN, SHRT_MAX);
    printf("Signed int range     : %d to %d\n", INT_MIN, INT_MAX);
    printf("Signed long long max : %lld\n", LLONG_MAX);
    printf("Float precision      : %d decimal digits (Min: %e, Max: %e)\n", FLT_DIG, FLT_MIN, FLT_MAX);
    printf("Double precision     : %d decimal digits (Min: %e, Max: %e)\n", DBL_DIG, DBL_MIN, DBL_MAX);

    /* 4. Formatted Value Inspection */
    printf("\n--- Sample Values in Memory ---\n");
    printf("Character       : %c (ASCII: %d)\n", gradeChar, (int)gradeChar);
    printf("Integer         : %d\n", countInt);
    printf("Long Population : %ld\n", populationLong);
    printf("Float Temp      : %.2f °C\n", tempFloat);
    printf("Double Precision: %.15f\n", preciseDouble);
    printf("===================================================================\n");

    return 0;
}
