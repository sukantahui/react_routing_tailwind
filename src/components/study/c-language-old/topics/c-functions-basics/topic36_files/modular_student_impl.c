// modular_student_impl.c – Implementation of student module
#include <stdio.h>
#include <string.h>
#include "modular_student.h"  // Note: in real code this would be "modular_student.h"

static Student students[MAX_STUDENTS];
static int studentCount = 0;

void addStudent() {
    if (studentCount >= MAX_STUDENTS) {
        printf("Database full!\n");
        return;
    }
    Student s;
    printf("Enter ID: ");
    scanf("%d", &s.id);
    printf("Enter name: ");
    scanf("%s", s.name);
    printf("Enter age: ");
    scanf("%d", &s.age);
    printf("Enter marks: ");
    scanf("%f", &s.marks);
    students[studentCount++] = s;
    printf("Student added.\n");
}

void displayAll() {
    printf("\n--- Student Records ---\n");
    for (int i = 0; i < studentCount; i++) {
        printf("ID: %d, Name: %s, Age: %d, Marks: %.2f\n",
               students[i].id, students[i].name, students[i].age, students[i].marks);
    }
}

float calculateAverage() {
    if (studentCount == 0) return 0;
    float sum = 0;
    for (int i = 0; i < studentCount; i++) {
        sum += students[i].marks;
    }
    return sum / studentCount;
}

void searchById() {
    int id;
    printf("Enter ID to search: ");
    scanf("%d", &id);
    for (int i = 0; i < studentCount; i++) {
        if (students[i].id == id) {
            printf("Found: %s, Age: %d, Marks: %.2f\n",
                   students[i].name, students[i].age, students[i].marks);
            return;
        }
    }
    printf("Student not found.\n");
}

void saveToFile() {
    FILE *fp = fopen("students.txt", "w");
    if (!fp) {
        printf("Error opening file!\n");
        return;
    }
    for (int i = 0; i < studentCount; i++) {
        fprintf(fp, "%d %s %d %.2f\n",
                students[i].id, students[i].name, students[i].age, students[i].marks);
    }
    fclose(fp);
    printf("Data saved.\n");
}

void loadFromFile() {
    FILE *fp = fopen("students.txt", "r");
    if (!fp) return;
    studentCount = 0;
    while (fscanf(fp, "%d %s %d %f",
                  &students[studentCount].id,
                  students[studentCount].name,
                  &students[studentCount].age,
                  &students[studentCount].marks) == 4) {
        studentCount++;
    }
    fclose(fp);
    printf("Data loaded.\n");
}