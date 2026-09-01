/**
 * ============================================================================
 * Program: ConditionalBranchingDemo.c
 * Module: 001_003 - Control Flow: Branching, Decision Making & Loops
 * Topic 0: Conditional Branching (if, if-else, else-if ladder, nested if)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

int main(void) {
    /* 1. Simple if Statement */
    int examScore = 85;
    printf("===================================================================\n");
    printf("     CONDITIONAL BRANCHING DEMONSTRATION - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | Barrackpore Systems Lab\n");
    printf("===================================================================\n\n");

    printf("--- [1] Simple if & if-else Decision ---\n");
    if (examScore >= 40) {
        printf("Result: PASSED (Score: %d)\n", examScore);
    } else {
        printf("Result: NEEDS IMPROVEMENT (Score: %d)\n", examScore);
    }

    /* 2. else-if Ladder: Academic Grade Classification */
    printf("\n--- [2] Grade Classification (else-if Ladder) ---\n");
    char grade;
    if (examScore >= 90) {
        grade = 'O'; /* Outstanding */
    } else if (examScore >= 80) {
        grade = 'E'; /* Excellent */
    } else if (examScore >= 70) {
        grade = 'A'; /* Very Good */
    } else if (examScore >= 60) {
        grade = 'B'; /* Good */
    } else if (examScore >= 50) {
        grade = 'C'; /* Fair */
    } else if (examScore >= 40) {
        grade = 'D'; /* Pass */
    } else {
        grade = 'F'; /* Fail */
    }
    printf("Exam Score: %d -> Awarded Grade: '%c'\n", examScore, grade);

    /* 3. Nested if-else: College Admission Eligibility */
    int age = 19;
    float mathScore = 92.5f;
    float physicsScore = 88.0f;
    bool hasCleanRecord = true;

    printf("\n--- [3] College Admission Decision Tree (Nested if-else) ---\n");
    if (age >= 17 && age <= 25) {
        if (mathScore >= 80.0f && physicsScore >= 75.0f) {
            if (hasCleanRecord) {
                printf("Status: ADMISSION GRANTED to B.Tech Computer Science!\n");
            } else {
                printf("Status: REJECTED (Disciplinary Background Check Failed)\n");
            }
        } else {
            printf("Status: REJECTED (Academic Cutoff Criteria Not Met)\n");
        }
    } else {
        printf("Status: REJECTED (Age outside eligibility bracket)\n");
    }

    /* 4. Complex Boolean Conditions: Leap Year Test */
    int year = 2024;
    bool isLeap = ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0));
    printf("\n--- [4] Leap Year Boolean Logic ---\n");
    printf("Year %d is %s.\n", year, isLeap ? "a LEAP YEAR (366 days)" : "NOT a leap year (365 days)");
    printf("===================================================================\n");

    return 0;
}
