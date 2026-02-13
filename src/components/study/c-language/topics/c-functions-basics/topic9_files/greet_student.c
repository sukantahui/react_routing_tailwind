#include <stdio.h>

// Function with a character array (string) argument, no return
void greetStudent(char name[]) {
    printf("Hello, %s! Welcome to C programming.\n", name);
}

int main() {
    greetStudent("Swadeep");
    greetStudent("Tuhina");
    greetStudent("Abhronila");
    return 0;
}