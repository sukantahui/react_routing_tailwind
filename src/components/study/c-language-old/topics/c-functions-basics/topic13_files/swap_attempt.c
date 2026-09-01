#include <stdio.h>

// This is valid C – but it will NOT swap the original variables
void swap(int x, int y) {
    int temp = x;
    x = y;
    y = temp;
    printf("Inside swap: x = %d, y = %d\n", x, y);
}

int main() {
    int a = 10, b = 20;
    printf("Before: a = %d, b = %d\n", a, b);
    swap(a, b);
    printf("After:  a = %d, b = %d\n", a, b);   // Still 10,20
    return 0;
}