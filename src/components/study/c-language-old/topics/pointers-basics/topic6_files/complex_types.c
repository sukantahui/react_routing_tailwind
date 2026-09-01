#include <stdio.h>

int main() {
    // Reading/writing a char through a char pointer
    char c = 'A';
    char *cp = &c;
    printf("c = %c\n", *cp);
    *cp = 'B';
    printf("c = %c\n", c);

    // Reading/writing a double through a double pointer
    double d = 3.14159;
    double *dp = &d;
    printf("d = %f\n", *dp);
    *dp = 2.71828;
    printf("d = %f\n", d);

    // Reading/writing through a void* (requires cast)
    int x = 100;
    void *vp = &x;
    // *vp = 200;   // ERROR: cannot dereference void*
    *(int*)vp = 200;  // cast before dereference
    printf("x = %d\n", *(int*)vp);

    return 0;
}