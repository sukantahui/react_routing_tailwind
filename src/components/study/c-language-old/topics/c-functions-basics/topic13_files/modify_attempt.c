#include <stdio.h>

void setToZero(int x) {
    x = 0;
    printf("Inside function: x = %d\n", x);
}

int main() {
    int value = 100;
    printf("Before: value = %d\n", value);
    setToZero(value);
    printf("After:  value = %d\n", value);   // Still 100
    return 0;
}