#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int id;
    char name[50];
    float score;
} Student;

int main() {
    // calloc ensures all fields are zeroed
    Student *students = (Student*)calloc(3, sizeof(Student));
    if (!students) return 1;

    // No need to manually initialize id=0, name[0]='\0', score=0.0
    for (int i = 0; i < 3; i++) {
        printf("Student %d: id=%d, name='%s', score=%.2f\n",
               i, students[i].id, students[i].name, students[i].score);
    }

    free(students);
    return 0;
}