#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int square(int x) {
    return x * x;
}

int main() {
    int result = square(add(3, 4));   // add called first, then square
    printf("Result = %d\n", result);  // (3+4)^2 = 49
    return 0;
}