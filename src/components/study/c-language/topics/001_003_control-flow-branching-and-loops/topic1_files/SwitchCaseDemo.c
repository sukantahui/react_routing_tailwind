/**
 * ============================================================================
 * Program: SwitchCaseDemo.c
 * Module: 001_003 - Control Flow: Branching, Decision Making & Loops
 * Topic 1: The switch-case statement: jump tables, fall-through, break statement
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>

int main(void) {
    printf("===================================================================\n");
    printf("     SWITCH-CASE ARCHITECTURE & MECHANICS - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | Barrackpore Systems Lab\n");
    printf("===================================================================\n\n");

    /* 1. Interactive 4-Function Calculator */
    char operatorSymbol = '*';
    double num1 = 12.5, num2 = 4.0;
    double calcResult = 0.0;

    printf("--- [1] Menu Calculator using switch-case ---\n");
    switch (operatorSymbol) {
        case '+':
            calcResult = num1 + num2;
            printf("%.2f + %.2f = %.2f\n", num1, num2, calcResult);
            break;
        case '-':
            calcResult = num1 - num2;
            printf("%.2f - %.2f = %.2f\n", num1, num2, calcResult);
            break;
        case '*':
            calcResult = num1 * num2;
            printf("%.2f * %.2f = %.2f\n", num1, num2, calcResult);
            break;
        case '/':
            if (num2 != 0.0) {
                calcResult = num1 / num2;
                printf("%.2f / %.2f = %.2f\n", num1, num2, calcResult);
            } else {
                printf("Error: Division by zero!\n");
            }
            break;
        default:
            printf("Error: Unsupported operator '%c'!\n", operatorSymbol);
            break;
    }

    /* 2. Intentional Fall-Through: Days in a Month */
    int month = 2; /* February */
    int year = 2024;
    int days = 0;

    printf("\n--- [2] Intentional Fall-Through (Days in Month) ---\n");
    switch (month) {
        case 1:  /* Jan */
        case 3:  /* Mar */
        case 5:  /* May */
        case 7:  /* Jul */
        case 8:  /* Aug */
        case 10: /* Oct */
        case 12: /* Dec */
            days = 31;
            break;

        case 4:  /* Apr */
        case 6:  /* Jun */
        case 9:  /* Sep */
        case 11: /* Nov */
            days = 30;
            break;

        case 2:  /* Feb */
            if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
                days = 29; /* Leap year */
            } else {
                days = 28;
            }
            break;

        default:
            days = -1;
            break;
    }
    printf("Month %d in Year %d has %d days.\n", month, year, days);

    /* 3. Character Vowel/Consonant Classifier with Grouped Cases */
    char testChar = 'E';
    printf("\n--- [3] Grouped Case Statements (Vowel Classifier) ---\n");
    switch (testChar) {
        case 'a': case 'A':
        case 'e': case 'E':
        case 'i': case 'I':
        case 'o': case 'O':
        case 'u': case 'U':
            printf("Character '%c' is a VOWEL.\n", testChar);
            break;
        default:
            printf("Character '%c' is a CONSONANT or SYMBOL.\n", testChar);
            break;
    }

    printf("===================================================================\n");
    return 0;
}
