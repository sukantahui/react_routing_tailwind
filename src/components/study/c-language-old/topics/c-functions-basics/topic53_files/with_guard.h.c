// with_guard.h – Header with proper include guard
#ifndef CNA_STUDENT_H
#define CNA_STUDENT_H

typedef struct {
    int id;
    char name[50];
} Student;

void printStudent(Student s);
int calculateGrade(Student s);

#endif // CNA_STUDENT_H