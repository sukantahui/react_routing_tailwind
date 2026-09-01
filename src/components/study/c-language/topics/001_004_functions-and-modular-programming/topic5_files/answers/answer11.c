/**
 * ============================================================================
 * Project 11: Pass-by-Const-Pointer High-Performance Student Record Manager
 * Module: 001_004 - Functions & Modular Programming
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

typedef struct {
    int rollNumber;
    char name[64];
    float marks[3]; // Physics, Chemistry, Math
    double gpa;
} StudentRecord;

/* Pass-by-const-pointer: avoids copying large struct memory while preventing mutation */
void printStudentTranscript(const StudentRecord *student) {
    if (student == NULL) return;

    printf("TRANSCRIPT: Roll #%d | Name: %s\n", student->rollNumber, student->name);
    printf("  Scores: Physics = %.1f, Chemistry = %.1f, Math = %.1f\n",
           student->marks[0], student->marks[1], student->marks[2]);
    printf("  Overall Calculated GPA: %.2f / 4.00 | Status: %s\n\n",
           student->gpa, (student->gpa >= 2.0) ? "IN GOOD STANDING" : "PROBATION");
}

int main(void) {
    printf("===================================================================\n");
    printf("     PASS-BY-CONST-POINTER STRUCT MANAGER - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    StudentRecord s1 = {101, "Swadeep Sharma", {88.0f, 92.5f, 95.0f}, 3.85};
    StudentRecord s2 = {102, "Tuhina Mukherjee", {94.0f, 89.0f, 96.5f}, 3.92};

    printStudentTranscript(&s1);
    printStudentTranscript(&s2);

    printf("===================================================================\n");
    return 0;
}
