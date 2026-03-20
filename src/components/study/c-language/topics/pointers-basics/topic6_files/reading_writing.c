#include <stdio.h>

int main() {
    int a = 10;
    int *p = &a;

    // Reading
    printf("Value of a: %d\n", a);
    printf("Value via pointer: %d\n", *p);

    // Writing
    *p = 20;
    printf("After *p = 20, a = %d\n", a);

    // Reading and writing in one expression
    *p = *p + 5;   // increment a by 5
    printf("After *p = *p + 5, a = %d\n", a);

    // Using pointer to modify a variable in a different function
    void increment(int *x) {
        (*x)++;
    }

    increment(&a);
    printf("After increment(&a), a = %d\n", a);

    return 0;
}