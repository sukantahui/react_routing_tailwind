// modular_student.h – Header file (declarations only)
#ifndef STUDENT_MODULE_H
#define STUDENT_MODULE_H

#define MAX_STUDENTS 100
#define NAME_LEN 50

typedef struct {
    int id;
    char name[NAME_LEN];
    int age;
    float marks;
} Student;

// Core functions
void addStudent();
void displayAll();
float calculateAverage();
void searchById();

// File I/O
void saveToFile();
void loadFromFile();

#endif