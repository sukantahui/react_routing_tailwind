#include <stdio.h>

typedef struct {
    int id;
    char name[40];
    double gpa;
} Student_t;

typedef void (*LogHandler)(const char*);

void consoleLogger(const char* msg) {
    printf("[LOG]: %s\n", msg);
}

int main(void) {
    printf("====================================================\n");
    printf("  CODER & ACCOTAX - TYPEDEF & TYPE ALIAS DEMO\n");
    printf("  Center: Barrackpore | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    Student_t s1 = {2001, "Swadeep Biswas", 3.92};
    printf("Student Record (Created via typedef Student_t):\n");
    printf("  ID:   %d\n  Name: %s\n  GPA:  %.2f / 4.00\n\n", s1.id, s1.name, s1.gpa);

    LogHandler logger = consoleLogger;
    logger("Typedef Function Pointer Handler Invoked Successfully!");
    return 0;
}