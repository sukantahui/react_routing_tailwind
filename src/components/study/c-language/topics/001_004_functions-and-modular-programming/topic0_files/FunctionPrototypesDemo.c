/**
 * ============================================================================
 * Program: FunctionPrototypesDemo.c
 * Module: 001_004 - Functions & Modular Programming
 * Topic 0: Modular Design: Declarations (Prototypes), Definitions & Invocation
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

/* ============================================================================
 * STEP 1: FUNCTION DECLARATIONS (PROTOTYPES)
 * Tells the compiler the function name, return type, and parameter list before main()
 * ============================================================================ */
void printModuleBanner(const char *moduleTitle);
double calculateCircleArea(double radius);
int findMaxInteger(int a, int b);
bool isEvenNumber(int value);
void printExecutionSummary(int totalRuns);

/* ============================================================================
 * MAIN FUNCTION: Execution Entry Point & Invoker
 * ============================================================================ */
int main(void) {
    printModuleBanner("C FUNCTION PROTOTYPES & MODULAR ARCHITECTURE");

    /* 1. Value Returning Function Invocation */
    double r = 7.0;
    double area = calculateCircleArea(r);
    printf("1. Circle Area Calculation:\n");
    printf("   Radius = %.2f units -> Calculated Area = %.4f sq units\n\n", r, area);

    /* 2. Multiple Parameter Function Invocation */
    int num1 = 145, num2 = 280;
    int maxVal = findMaxInteger(num1, num2);
    printf("2. Maximum Integer Comparison:\n");
    printf("   Inputs: %d, %d -> Maximum = %d\n\n", num1, num2, maxVal);

    /* 3. Boolean Predicate Function Invocation */
    int testVal = 42;
    printf("3. Even Number Predicate Test:\n");
    printf("   Number %d is %s\n\n", testVal, isEvenNumber(testVal) ? "EVEN" : "ODD");

    /* 4. Void Function Invocation */
    printExecutionSummary(3);

    printf("===================================================================\n");
    return 0;
}

/* ============================================================================
 * STEP 2: FUNCTION DEFINITIONS (IMPLEMENTATION)
 * The actual body containing executable statements
 * ============================================================================ */

void printModuleBanner(const char *moduleTitle) {
    printf("===================================================================\n");
    printf("     %s\n", moduleTitle);
    printf("     Educator: Sukanta Hui | Barrackpore Systems Lab\n");
    printf("===================================================================\n\n");
}

double calculateCircleArea(double radius) {
    const double PI = 3.141592653589793;
    return PI * radius * radius;
}

int findMaxInteger(int a, int b) {
    return (a > b) ? a : b;
}

bool isEvenNumber(int value) {
    return (value % 2 == 0);
}

void printExecutionSummary(int totalRuns) {
    printf("--- Execution Summary ---\n");
    printf("All %d modular subroutines invoked and executed cleanly.\n", totalRuns);
}
