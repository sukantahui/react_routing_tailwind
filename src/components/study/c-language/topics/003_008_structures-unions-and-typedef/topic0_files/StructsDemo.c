#include <stdio.h>
#include <string.h>

/**
 * StructsDemo.c
 * Struct declarations, member access (.), pointer access (->),
 * and typedef aliases in C.
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

typedef struct {
    int id;
    char name[50];
    float marks;
} Student;

void displayStudent(const Student *s) {
    printf("ID   : %d\n", s->id);
    printf("Name : %s\n", s->name);
    printf("Marks: %.2f\n", s->marks);
}

int main(void) {
    Student s1;
    s1.id = 101;
    strcpy(s1.name, "Swadeep");
    s1.marks = 92.5f;

    printf("=== C Structs & typedef Demo ===\n\n");
    displayStudent(&s1);

    return 0;
}
