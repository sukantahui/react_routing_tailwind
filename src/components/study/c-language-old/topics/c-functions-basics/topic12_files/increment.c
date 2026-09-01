#include <stdio.h>

void increment(int x) {
    x = x + 1;
    printf("Inside function: x = %d\n", x);
}

int main() {
    int a = 5;
    printf("Before call: a = %d\n", a);
    increment(a);
    printf("After call: a = %d\n", a);   // Still 5!
    return 0;
}