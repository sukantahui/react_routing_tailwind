#include <stdio.h>
#include <string.h>

struct Student {
    int rollNumber;
    char name[50];
    float marks;
    char batch[20];
};

int main(void) {
    printf("====================================================\n");
    printf("  CODER & ACCOTAX - C STRUCTURE BASICS DEMONSTRATION\n");
    printf("  Center: Barrackpore | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    struct Student s1 = {.rollNumber = 101, .name = "Swadeep Biswas", .marks = 94.5f, .batch = "C-Systems-2026"};
    struct Student s2 = {102, "Tuhina Das", 91.0f, "C-Systems-2026"};
    struct Student s3;
    s3.rollNumber = 103;
    strcpy(s3.name, "Abhronila Roy");
    s3.marks = 96.8f;
    strcpy(s3.batch, "C-Systems-2026");

    printf("Student 1 Record:\n  Roll No : %d\n  Name    : %s\n  Marks   : %.2f%%\n  Batch   : %s\n\n", s1.rollNumber, s1.name, s1.marks, s1.batch);
    printf("Student 2 Record:\n  Roll No : %d\n  Name    : %s\n  Marks   : %.2f%%\n  Batch   : %s\n\n", s2.rollNumber, s2.name, s2.marks, s2.batch);
    printf("Student 3 Record:\n  Roll No : %d\n  Name    : %s\n  Marks   : %.2f%%\n  Batch   : %s\n\n", s3.rollNumber, s3.name, s3.marks, s3.batch);
    printf("Total Memory Size of struct Student: %lu bytes\n", sizeof(struct Student));
    return 0;
}