#include <stdio.h>

int main() {
    int x = 42;
    int *ptr = &x;   // ptr stores address of x

    printf("Value of x: %d\n", x);
    printf("Address of x: %p\n", (void*)&x);
    printf("Value stored in ptr (address): %p\n", (void*)ptr);
    printf("Value pointed to by ptr: %d\n", *ptr);

    *ptr = 100;      // change x via pointer
    printf("After *ptr = 100, x = %d\n", x);

    return 0;
}