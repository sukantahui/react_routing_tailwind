#include <stdio.h>

int main() {
    int i = 42;
    char c = 'Z';
    double d = 3.14159;

    void *vptr;

    // Point to int
    vptr = &i;
    printf("int value: %d\n", *(int*)vptr);

    // Point to char
    vptr = &c;
    printf("char value: %c\n", *(char*)vptr);

    // Point to double
    vptr = &d;
    printf("double value: %f\n", *(double*)vptr);

    // Generic swap using void* and memcpy
    int a = 10, b = 20;
    printf("Before swap: a=%d, b=%d\n", a, b);

    void *temp = malloc(sizeof(int));
    if (temp) {
        memcpy(temp, &a, sizeof(int));
        memcpy(&a, &b, sizeof(int));
        memcpy(&b, temp, sizeof(int));
        free(temp);
    }

    printf("After swap: a=%d, b=%d\n", a, b);

    return 0;
}