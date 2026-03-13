#include <stdio.h>

// Function that takes two integers and returns their sum
int add(int a, int b) {
    int sum = a + b;
    return sum;
}

int main() {
    int result = add(15, 27);
    printf("15 + 27 = %d\n", result);
    return 0;
}