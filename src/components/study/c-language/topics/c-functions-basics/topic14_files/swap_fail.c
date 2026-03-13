#include <stdio.h>

void swap(int x, int y) {
    int temp = x;
    x = y;
    y = temp;
    printf("Inside swap: x = %d, y = %d\n", x, y);
}

int main() {
    int a = 5, b = 10;
    printf("Before: a = %d, b = %d\n", a, b);
    swap(a, b);
    printf("After:  a = %d, b = %d\n", a, b);   // Still 5,10
    return 0;
}