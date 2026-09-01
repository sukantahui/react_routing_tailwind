/**
 * ============================================================================
 * Project 1: Interactive CLI Student Academic Report Card & Merit Analyzer
 * Module: 001_001 - Getting Started with C & Compiler Architecture
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int rollNumber = 1042;
    char studentName[] = "Swadeep Sharma";
    float physics = 88.5f, chemistry = 92.0f, mathematics = 95.5f, computerScience = 98.0f;
    float totalMarks, percentage;

    printf("===================================================================\n");
    printf("     BARRACKPORE ACADEMIC PERFORMANCE PORTAL - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    totalMarks = physics + chemistry + mathematics + computerScience;
    percentage = (totalMarks / 400.0f) * 100.0f;

    printf("STUDENT PROFILE:\n");
    printf("  • Student Name   : %s\n", studentName);
    printf("  • Roll Number    : %d\n", rollNumber);
    printf("-------------------------------------------------------------------\n");
    printf("SUBJECT SCORE SHEET:\n");
    printf("  %-20s : %6.2f / 100.00\n", "Physics", physics);
    printf("  %-20s : %6.2f / 100.00\n", "Chemistry", chemistry);
    printf("  %-20s : %6.2f / 100.00\n", "Mathematics", mathematics);
    printf("  %-20s : %6.2f / 100.00\n", "Computer Science", computerScience);
    printf("-------------------------------------------------------------------\n");
    printf("FINAL EVALUATION:\n");
    printf("  • Aggregate Score: %6.2f / 400.00\n", totalMarks);
    printf("  • Percentage     : %6.2f %%\n", percentage);
    printf("  • Result Status  : %s\n", (percentage >= 40.0f) ? "PASSED (PROMOTED)" : "NEEDS IMPROVEMENT");
    printf("  • Honors Standing: %s\n", (percentage >= 90.0f) ? "FIRST CLASS WITH DISTINCTION (HONORS)" : "STANDARD MERIT");

    printf("===================================================================\n");
    return 0;
}
