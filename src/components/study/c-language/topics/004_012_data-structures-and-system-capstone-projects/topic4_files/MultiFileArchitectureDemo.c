#include <stdio.h>
#include <stdlib.h>

/* =====================================================================
 * MULTI-FILE MODULAR ARCHITECTURE SIMULATION
 * =====================================================================
 * In real production systems, this code is divided across 3 separate files:
 * 1. student_module.h  (Public API & Struct Schema)
 * 2. student_module.c  (Private Implementation & Static Helpers)
 * 3. main.c            (Application Entry Point)
 * ===================================================================== */

/* --- SIMULATED student_module.h --- */
#ifndef STUDENT_MODULE_H
#define STUDENT_MODULE_H

typedef struct {
    int id;
    char name[40];
    float gpa;
} Student;

/* Public API Prototypes (External Linkage) */
Student createStudent(int id, const char *name, float gpa);
void printStudentDetails(const Student *s);
extern int g_totalStudentsRegistered; /* Global declaration (NO STORAGE) */

#endif /* STUDENT_MODULE_H */

/* --- SIMULATED student_module.c --- */
#include <string.h>

/* Global variable definition (Allocates actual storage) */
int g_totalStudentsRegistered = 0;

/* Internal helper function with Internal Linkage (static = private to module) */
static void formatGradeLetter(float gpa, char *outGrade) {
    if (gpa >= 3.75f) *outGrade = 'A';
    else if (gpa >= 3.0f) *outGrade = 'B';
    else if (gpa >= 2.0f) *outGrade = 'C';
    else *outGrade = 'F';
}

/* Public API Implementation */
Student createStudent(int id, const char *name, float gpa) {
    Student s;
    s.id = id;
    strncpy(s.name, name, sizeof(s.name) - 1);
    s.name[sizeof(s.name) - 1] = '\0';
    s.gpa = gpa;
    g_totalStudentsRegistered++;
    return s;
}

void printStudentDetails(const Student *s) {
    char grade;
    formatGradeLetter(s->gpa, &grade);
    printf("    [ID: %d] %-18s | GPA: %4.2f | Grade: %c\n", s->id, s->name, s->gpa, grade);
}

/* --- SIMULATED main.c --- */
int main(void) {
    printf("=====================================================\n");
    printf("  Multi-File C Project Architecture & Linkage\n");
    printf("=====================================================\n\n");

    printf(">>> 1. Creating Student Records via Module API:\n");
    Student s1 = createStudent(101, "Swadeep Sharma", 3.85f);
    Student s2 = createStudent(102, "Tuhina Roy",     3.95f);
    Student s3 = createStudent(103, "Abhronila Das",  3.70f);

    printStudentDetails(&s1);
    printStudentDetails(&s2);
    printStudentDetails(&s3);

    printf("\n-----------------------------------------------------\n");
    printf(">>> 2. Inspecting Shared Global State via extern linkage:\n");
    printf("    Total Students Registered = %d\n", g_totalStudentsRegistered);

    printf("\n=== Multi-File Architecture Demonstration Completed ===\n");
    return EXIT_SUCCESS;
}
