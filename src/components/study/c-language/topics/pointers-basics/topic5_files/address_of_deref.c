#include <stdio.h>

int main() {
    int x = 42;
    int *p = &x;   // &x gives address, stored in p

    printf("x = %d\n", x);
    printf("&x = %p\n", (void*)&x);
    printf("p = %p\n", (void*)p);
    printf("*p = %d\n", *p);   // *p retrieves value at address

    // Modify through pointer
    *p = 99;
    printf("After *p = 99, x = %d\n", x);

    // Using & and * together
    printf("*(&x) = %d\n", *(&x));   // prints x's value

    return 0;
}