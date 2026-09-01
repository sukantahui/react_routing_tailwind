#include <stdio.h>
#include <string.h>

// A moderately large structure
typedef struct {
    int id;
    char name[256];
    float scores[100];
} Student;

void printStudent(Student s) {   // passed by value – entire struct copied!
    printf("Student ID: %d\n", s.id);
    // imagine many more operations...
}

int main() {
    Student stu = {123, "Swadeep", {0}};
    printStudent(stu);   // huge copy here
    return 0;
}