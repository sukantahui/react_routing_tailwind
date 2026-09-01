#include <stdio.h>

int main() {
    int x = 42;
    int *p;          // declaration
    p = &x;          // assignment of address

    printf("x = %d\n", x);
    printf("*p = %d\n", *p);

    // Multiple declarations
    int a = 10, b = 20;
    int *pa = &a, *pb = &b;   // both are pointers

    printf("a = %d, b = %d\n", *pa, *pb);
    return 0;
}