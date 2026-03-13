#include <stdio.h>

// Function with two int arguments, no return value
void printSum(int a, int b) {
    int sum = a + b;
    printf("Sum = %d\n", sum);
}

int main() {
    printSum(15, 27);
    printSum(100, 200);
    return 0;
}