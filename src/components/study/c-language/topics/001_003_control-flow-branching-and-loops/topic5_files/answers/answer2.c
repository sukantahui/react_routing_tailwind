/**
 * ============================================================================
 * Project 2: Multi-Criterion Grade & Honors Classifier with Yoda Equality Protection
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

void classifyStudent(const char* name, double score, double attendancePercent, bool disciplinaryClearance) {
    printf("Student: %-12s | Score: %5.1f%% | Attendance: %5.1f%% | Record: %s\n",
           name, score, attendancePercent, disciplinaryClearance ? "CLEAN" : "FLAGGED");

    /* Defensive Guard Clause: Boundary Validation */
    if (score < 0.0 || score > 100.0 || attendancePercent < 0.0 || attendancePercent > 100.0) {
        printf(">> Status: INVALID DATA (Marks or Attendance outside 0-100%% range)\n\n");
        return;
    }

    /* Attendance Policy Check */
    if (attendancePercent < 75.0) {
        printf(">> Status: DEBARRED FROM FINAL EXAM (Attendance < 75.0%% cutoff)\n\n");
        return;
    }

    /* Academic Grade Classification using else-if ladder with Yoda Style */
    char grade;
    const char* awardHonor;

    if (score >= 90.0) {
        grade = 'O'; /* Outstanding */
        awardHonor = "President's Gold Medalist";
    } else if (score >= 80.0) {
        grade = 'E'; /* Excellent */
        awardHonor = "Dean's High Honors List";
    } else if (score >= 70.0) {
        grade = 'A'; /* Very Good */
        awardHonor = "First Class Division";
    } else if (score >= 60.0) {
        grade = 'B'; /* Good */
        awardHonor = "Second Class Division";
    } else if (score >= 50.0) {
        grade = 'C'; /* Fair */
        awardHonor = "Pass Division";
    } else if (score >= 40.0) {
        grade = 'D'; /* Marginal Pass */
        awardHonor = "Remedial Coaching Recommended";
    } else {
        grade = 'F'; /* Fail */
        awardHonor = "Academic Probation / Retake Required";
    }

    /* Yoda Condition Check for Disciplinary Invariant */
    if (true == disciplinaryClearance) {
        printf(">> Grade Awarded: '%c' | Classification: %s\n\n", grade, awardHonor);
    } else {
        printf(">> Grade Awarded: '%c' | WITHHELD (Pending Disciplinary Review)\n\n", grade);
    }
}

int main(void) {
    printf("===================================================================\n");
    printf("     ACADEMIC PERFORMANCE & HONORS CLASSIFIER - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    classifyStudent("Swadeep", 94.5, 92.0, true);
    classifyStudent("Tuhina", 82.0, 88.5, true);
    classifyStudent("Abhronila", 73.0, 68.0, true);  /* Debarred */
    classifyStudent("Debangshu", 91.0, 85.0, false); /* Disciplinary hold */

    printf("===================================================================\n");
    return 0;
}
