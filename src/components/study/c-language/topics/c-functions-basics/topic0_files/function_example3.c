#include <stdio.h>

// Function that greets a specific student
void greet_student(char name[]) {
    printf("Hello, %s! Ready to learn functions?\n", name);
}

int main() {
    greet_student("Swadeep");
    greet_student("Tuhina");
    greet_student("Abhronila");
    return 0;
}