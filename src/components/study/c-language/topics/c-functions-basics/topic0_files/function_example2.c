#include <stdio.h>

// Function with arguments and return value
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(15, 27);
    printf("Sum = %d\n", result);
    return 0;
}