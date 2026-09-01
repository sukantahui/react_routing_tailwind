#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int id;
    char name[20];
} Student;

int main() {
    // Allocate memory for 5 Student structures, all zero-initialized
    Student *students = (Student*)calloc(5, sizeof(Student));
    if (students == NULL) {
        printf("Allocation failed\n");
        return 1;
    }

    // calloc ensures id=0 and name[0]='\0' for each student
    for (int i = 0; i < 5; i++) {
        printf("Student %d: id=%d, name='%s'\n", i, students[i].id, students[i].name);
    }

    free(students);
    return 0;
}