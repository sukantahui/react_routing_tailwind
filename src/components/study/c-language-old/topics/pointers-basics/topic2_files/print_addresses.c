#include <stdio.h>

int main() {
    int a = 10;
    char b = 'A';
    double c = 3.14;

    printf("Address of a (int):    %p\n", (void*)&a);
    printf("Address of b (char):   %p\n", (void*)&b);
    printf("Address of c (double): %p\n", (void*)&c);

    printf("Size of a: %zu bytes\n", sizeof(a));
    printf("Size of b: %zu bytes\n", sizeof(b));
    printf("Size of c: %zu bytes\n", sizeof(c));

    return 0;
}