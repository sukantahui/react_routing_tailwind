#include <stdio.h>

void try_to_swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    printf("Inside function: a=%d, b=%d\n", a, b);
}

void try_to_increment(int x) {
    x++;
    printf("Inside function: x=%d\n", x);
}

int main() {
    int x = 10, y = 20;
    printf("Before swap: x=%d, y=%d\n", x, y);
    try_to_swap(x, y);
    printf("After swap: x=%d, y=%d (unchanged)\n", x, y);

    int a = 5;
    printf("Before increment: a=%d\n", a);
    try_to_increment(a);
    printf("After increment: a=%d (unchanged)\n", a);
    return 0;
}